import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ShoppingBag, 
    Users, 
    FileText, 
    BarChart3, 
    Package,
    TrendingUp,
    Shield,
    Smartphone
} from 'lucide-react';

export default function Welcome() {
    const features = [
        {
            icon: <Package className="h-6 w-6" />,
            title: 'Manajemen Produk',
            description: 'Kelola katalog produk dengan mudah, atur stok, harga, dan kategori'
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Manajemen Pelanggan',
            description: 'Simpan data pelanggan lengkap dengan riwayat pembelian'
        },
        {
            icon: <FileText className="h-6 w-6" />,
            title: 'Pencatatan Transaksi',
            description: 'Catat setiap pesanan dan transaksi dengan detail lengkap'
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: 'Laporan Penjualan',
            description: 'Analisis performa bisnis dengan laporan bulanan dan stok'
        }
    ];

    const benefits = [
        {
            icon: <TrendingUp className="h-5 w-5" />,
            text: 'Tingkatkan efisiensi operasional bisnis'
        },
        {
            icon: <Shield className="h-5 w-5" />,
            text: 'Data aman dengan sistem autentikasi'
        },
        {
            icon: <Smartphone className="h-5 w-5" />,
            text: 'Akses dari berbagai perangkat'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="container mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">UMKM Manager</h1>
                    </div>
                    <div className="space-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Masuk</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Daftar Gratis</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-4">
                        🚀 Platform Terpadu untuk UMKM
                    </Badge>
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Kelola Bisnis UMKM Anda dengan{' '}
                        <span className="text-blue-600">Lebih Mudah</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Sistem manajemen lengkap untuk mengelola produk, pelanggan, transaksi, 
                        dan menganalisis performa bisnis Anda dalam satu platform yang mudah digunakan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="px-8 py-4 text-lg">
                            <Link href="/register">
                                Mulai Gratis Sekarang 
                                <TrendingUp className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg">
                            <Link href="/login">
                                Login ke Akun Anda
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Fitur Lengkap untuk Bisnis Anda
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Semua yang Anda butuhkan untuk mengelola UMKM dengan efisien
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Mengapa Memilih UMKM Manager?
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Solusi terpercaya untuk mengoptimalkan operasional bisnis UMKM
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50">
                                    <div className="text-green-600 flex-shrink-0">
                                        {benefit.icon}
                                    </div>
                                    <p className="text-gray-700">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots/Demo Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Dashboard yang Intuitif
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Lihat semua data bisnis Anda dalam satu tampilan yang mudah dipahami
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
                            <h4 className="text-2xl font-bold mb-2">📊 Dashboard Analitik</h4>
                            <p className="opacity-90">Monitor performa bisnis real-time</p>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">248</div>
                                    <div className="text-sm text-gray-600">Total Produk</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600 mb-1">1,234</div>
                                    <div className="text-sm text-gray-600">Pelanggan Aktif</div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600 mb-1">856</div>
                                    <div className="text-sm text-gray-600">Pesanan Bulan Ini</div>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">24</div>
                                    <div className="text-sm text-gray-600">Stok Rendah</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-4">
                        Siap Mengembangkan Bisnis UMKM Anda?
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                        Bergabunglah dengan ribuan UMKM yang telah merasakan manfaatnya
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild className="px-8 py-4 text-lg">
                            <Link href="/register">
                                🎉 Daftar Gratis Sekarang
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg text-white border-white hover:bg-white hover:text-blue-600">
                            <Link href="/login">
                                Sudah Punya Akun? Login
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <ShoppingBag className="h-6 w-6" />
                        <span className="text-xl font-bold">UMKM Manager</span>
                    </div>
                    <p className="text-gray-400">
                        © 2024 UMKM Manager. Platform manajemen bisnis untuk UMKM Indonesia.
                    </p>
                </div>
            </footer>
        </div>
    );
}