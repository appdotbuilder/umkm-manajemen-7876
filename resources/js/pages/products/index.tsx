import React from 'react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Package, 
    Plus, 
    Eye,
    Edit,
    AlertTriangle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Produk',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    category: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ProductsIndexProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    };

    const getStockColor = (stock: number) => {
        if (stock === 0) return 'text-red-600 bg-red-50';
        if (stock <= 10) return 'text-orange-600 bg-orange-50';
        return 'text-green-600 bg-green-50';
    };

    const getStockText = (stock: number) => {
        if (stock === 0) return 'Habis';
        if (stock <= 10) return 'Rendah';
        return 'Tersedia';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Produk" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Package className="h-8 w-8 text-blue-600" />
                            Manajemen Produk
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Kelola katalog produk dan layanan UMKM Anda
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <Link href="/products/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Produk
                        </Link>
                    </Button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {products.total.toLocaleString('id-ID')}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Produk Aktif
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {products.data.filter(p => p.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Stok Rendah
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                                {products.data.filter(p => p.stock <= 10).length}
                                {products.data.filter(p => p.stock <= 10).length > 0 && (
                                    <AlertTriangle className="h-5 w-5" />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.length > 0 ? (
                        products.data.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg line-clamp-2">
                                                {product.name}
                                            </CardTitle>
                                            {product.category && (
                                                <Badge variant="secondary" className="mt-2">
                                                    {product.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {!product.is_active && (
                                                <Badge variant="destructive">Nonaktif</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {product.description && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">Harga:</span>
                                            <span className="text-lg font-bold text-green-600">
                                                {formatCurrency(product.price)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">Stok:</span>
                                            <Badge className={getStockColor(product.stock)}>
                                                {product.stock} • {getStockText(product.stock)}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4">
                                        <Button size="sm" variant="outline" asChild className="flex-1">
                                            <Link href={`/products/${product.id}`}>
                                                <Eye className="h-4 w-4 mr-1" />
                                                Lihat
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="outline" asChild className="flex-1">
                                            <Link href={`/products/${product.id}/edit`}>
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Belum Ada Produk
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Mulai dengan menambahkan produk pertama Anda
                                    </p>
                                    <Button asChild>
                                        <Link href="/products/create">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Tambah Produk Pertama
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <Card>
                        <CardContent className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {((products.current_page - 1) * products.per_page) + 1} - {Math.min(products.current_page * products.per_page, products.total)} dari {products.total} produk
                                </div>
                                <div className="flex gap-2">
                                    {products.current_page > 1 && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/products?page=${products.current_page - 1}`}>
                                                Sebelumnya
                                            </Link>
                                        </Button>
                                    )}
                                    {products.current_page < products.last_page && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/products?page=${products.current_page + 1}`}>
                                                Selanjutnya
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}