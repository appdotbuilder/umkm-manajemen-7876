<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display sales reports.
     */
    public function index(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        $year = $request->input('year', now()->year);

        // Monthly sales report
        $monthlySales = Order::where(DB::raw("strftime('%Y', order_date)"), $year)
            ->where(DB::raw("strftime('%m', order_date)"), date('m', strtotime($month)))
            ->where('status', '!=', 'cancelled')
            ->with(['orderItems.product', 'customer'])
            ->orderBy('order_date', 'desc')
            ->get();

        $totalSales = $monthlySales->sum('total');
        $totalOrders = $monthlySales->count();

        // Product sales summary
        $productSales = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->where(DB::raw("strftime('%Y', orders.order_date)"), $year)
            ->where(DB::raw("strftime('%m', orders.order_date)"), date('m', strtotime($month)))
            ->where('orders.status', '!=', 'cancelled')
            ->select(
                'products.name',
                DB::raw('SUM(order_items.quantity) as total_quantity'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_revenue')
            ->get();

        return Inertia::render('reports/index', [
            'monthlySales' => $monthlySales,
            'productSales' => $productSales,
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    /**
     * Show a specific report.
     */
    public function show($id)
    {
        if ($id === 'stock') {
            $products = Product::select(['id', 'name', 'stock', 'price', 'category'])
                ->orderBy('stock', 'asc')
                ->get();

            $lowStockProducts = $products->where('stock', '<=', 10);
            $outOfStockProducts = $products->where('stock', '=', 0);

            return Inertia::render('reports/stock', [
                'products' => $products,
                'lowStockProducts' => $lowStockProducts,
                'outOfStockProducts' => $outOfStockProducts,
            ]);
        }

        abort(404);
    }
}