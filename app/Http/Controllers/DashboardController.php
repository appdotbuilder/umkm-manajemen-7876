<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get statistics
        $totalProducts = Product::count();
        $totalCustomers = Customer::count();
        $totalOrders = Order::count();
        $lowStockProducts = Product::where('stock', '<=', 10)->count();

        // Recent orders
        $recentOrders = Order::with(['customer', 'orderItems'])
            ->latest('order_date')
            ->take(5)
            ->get();

        // Monthly sales data for chart
        $monthlySales = DB::table('orders')
            ->select(
                DB::raw("strftime('%Y', order_date) as year"),
                DB::raw("strftime('%m', order_date) as month"),
                DB::raw('SUM(total) as total_sales'),
                DB::raw('COUNT(*) as total_orders')
            )
            ->where('status', '!=', 'cancelled')
            ->where('order_date', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->take(12)
            ->get()
            ->reverse()
            ->values();

        // Top selling products
        $topProducts = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select(
                'products.name',
                DB::raw('SUM(order_items.quantity) as total_quantity'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->where('orders.status', '!=', 'cancelled')
            ->where('orders.order_date', '>=', now()->subMonth())
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_quantity')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCustomers' => $totalCustomers,
                'totalOrders' => $totalOrders,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentOrders' => $recentOrders,
            'monthlySales' => $monthlySales,
            'topProducts' => $topProducts,
        ]);
    }
}