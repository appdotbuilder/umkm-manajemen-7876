<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50000, 2000000);
        $tax = $subtotal * 0.1;
        $total = $subtotal + $tax;

        return [
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => Customer::factory(),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'notes' => fake()->optional()->sentence(),
            'order_date' => fake()->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}