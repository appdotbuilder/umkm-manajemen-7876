import React from 'react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Package, 
    Users, 
    ShoppingCart, 
    AlertTriangle, 
    TrendingUp,
    Eye,
    Plus,
    BarChart3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        totalProducts: number;
        totalCustomers: number;
        totalOrders: number;
        lowStockProducts: number;
    };
    recentOrders: Array<{
        id: number;
        order_number: string;
        customer: {
            name: string;
        } | null;
        total: string;
        status: string;
        order_date: string;
        order_items: Array<{
            product_name: string;
            quantity: number;
        }>;
    }>;
    monthlySales: Array<{
        year: number;
        month: number;
        total_sales: string;
        total_orders: number;
    }>;
    topProducts: Array<{
        name: string;
        total_quantity: number;
        total_revenue: string;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentOrders, monthlySales, topProducts }: DashboardProps) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date));
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts = {
            pending: 'Menunggu',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan',
        };
        return texts[status as keyof typeof texts] || status;
    };

    const statCards = [
        {
            title: 'Total Produk',
            value: stats.totalProducts,
            icon: <Package className="h-6 w-6" />,
            description: 'Produk aktif dalam sistem',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Total Pelanggan',
            value: stats.totalCustomers,
            icon: <Users className="h-6 w-6" />,
            description: 'Pelanggan terdaftar',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Total Pesanan',
            value: stats.totalOrders,
            icon: <ShoppingCart className="h-6 w-6" />,
            description: 'Semua pesanan',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Stok Rendah',
            value: stats.lowStockProducts,
            icon: <AlertTriangle className="h-6 w-6" />,
            description: 'Produk stok ≤ 10',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard UMKM" />
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">📊 Dashboard UMKM Manager</h1>
                    <p className="text-blue-100 text-lg">Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value.toLocaleString('id-ID')}
                                </div>
                                <p className="text-xs text-gray-500">{stat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Aksi Cepat
                        </CardTitle>
                        <CardDescription>Tambah data baru dengan cepat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href="/products/create">
                                    <Package className="h-4 w-4 mr-2" />
                                    Tambah Produk
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/customers/create">
                                    <Users className="h-4 w-4 mr-2" />
                                    Tambah Pelanggan
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/orders/create">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Buat Pesanan
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/reports">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Lihat Laporan
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Pesanan Terbaru</CardTitle>
                                <CardDescription>5 pesanan terakhir</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/orders">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Lihat Semua
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{order.order_number}</span>
                                                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                                                        {getStatusText(order.status)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {order.customer?.name || 'Guest'} • {formatDate(order.order_date)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {order.order_items.length} item(s)
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">
                                                    {formatCurrency(order.total)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Belum ada pesanan</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Products */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Produk Terlaris</CardTitle>
                                <CardDescription>Bulan ini</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/products">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Lihat Semua
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topProducts.length > 0 ? (
                                    topProducts.map((product, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{product.name}</span>
                                                    <Badge variant="outline">
                                                        #{index + 1}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {product.total_quantity} terjual
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">
                                                    {formatCurrency(product.total_revenue)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    revenue
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Belum ada data penjualan</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Sales Chart Placeholder */}
                {monthlySales.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Penjualan Bulanan</CardTitle>
                            <CardDescription>Tren penjualan 12 bulan terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                                <div className="text-center text-gray-500">
                                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Grafik penjualan akan ditampilkan di sini</p>
                                    <p className="text-sm">
                                        Total: {formatCurrency(
                                            monthlySales.reduce((sum, month) => sum + parseFloat(month.total_sales), 0)
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}