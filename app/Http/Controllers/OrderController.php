<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['customer', 'orderItems.product'])
            ->latest('order_date')
            ->paginate(10);
        
        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::active()->orderBy('name')->get();
        $products = Product::active()->orderBy('name')->get();

        return Inertia::render('orders/create', [
            'customers' => $customers,
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        
        // Calculate totals
        $subtotal = 0;
        $orderItems = [];
        
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $itemSubtotal = $product->price * $item['quantity'];
            $subtotal += $itemSubtotal;
            
            $orderItems[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'product_price' => $product->price,
                'quantity' => $item['quantity'],
                'subtotal' => $itemSubtotal,
            ];
            
            // Update product stock
            $product->decrement('stock', $item['quantity']);
        }
        
        $tax = $subtotal * 0.1; // 10% tax
        $total = $subtotal + $tax;
        
        // Create order
        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => $validated['customer_id'],
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'status' => 'pending',
            'notes' => $validated['notes'],
            'order_date' => $validated['order_date'],
        ]);
        
        // Create order items
        $order->orderItems()->createMany($orderItems);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Pesanan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['customer', 'orderItems.product']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load(['customer', 'orderItems.product']);
        $customers = Customer::active()->orderBy('name')->get();

        return Inertia::render('orders/edit', [
            'order' => $order,
            'customers' => $customers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'notes' => 'nullable|string',
        ]);

        $order->update($request->only(['customer_id', 'status', 'notes']));

        return redirect()->route('orders.show', $order)
            ->with('success', 'Pesanan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        // Restore product stock if order is cancelled
        if ($order->status !== 'cancelled') {
            foreach ($order->orderItems as $item) {
                $item->product->increment('stock', $item->quantity);
            }
        }

        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Pesanan berhasil dihapus.');
    }
}