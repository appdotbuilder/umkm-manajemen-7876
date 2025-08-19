<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class UMKMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create products
        $products = Product::factory()
            ->count(50)
            ->create();

        // Create some low stock products
        Product::factory()
            ->count(10)
            ->lowStock()
            ->create();

        // Create some out of stock products
        Product::factory()
            ->count(5)
            ->outOfStock()
            ->create();

        // Create customers
        $customers = Customer::factory()
            ->count(30)
            ->active()
            ->create();

        // Create orders with order items
        for ($i = 0; $i < 50; $i++) {
            $order = Order::factory()
                ->for($customers->random())
                ->create([
                    'subtotal' => 0,
                    'tax' => 0,
                    'total' => 0,
                ]);

            // Create 1-5 order items per order
            $itemCount = random_int(1, 5);
            $orderTotal = 0;

            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = random_int(1, 3);
                $subtotal = (float) $product->price * $quantity;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_price' => $product->price,
                    'quantity' => $quantity,
                    'subtotal' => $subtotal,
                ]);

                $orderTotal += $subtotal;

                // Update product stock
                $product->decrement('stock', $quantity);
            }

            // Update order totals
            $tax = $orderTotal * 0.1;
            $total = $orderTotal + $tax;

            $order->update([
                'subtotal' => $orderTotal,
                'tax' => $tax,
                'total' => $total,
            ]);
        }
    }
}