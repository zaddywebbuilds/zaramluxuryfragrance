import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ChevronDown, AlertCircle, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/useStore'
import { NIGERIAN_STATES } from '../data/products'
import { siteConfig } from '../config/site'
import { supabase } from '../lib/supabase'
import { formatPrice, generateOrderRef, validateNigerianPhone } from '../lib/utils'

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const watchState = watch('state', '')

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryFee = watchState.toLowerCase().includes('lagos') ? 3000 : 7500
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-gradient flex flex-col items-center justify-center text-center px-4 pt-24">
        <ShoppingBag size={40} className="text-champagne-200 mb-4" />
        <h1 className="font-display text-3xl text-brown-100 mb-3">Your bag is empty</h1>
        <p className="font-body text-sm text-brown-50 mb-6">Add fragrances to your bag before checking out.</p>
        <Link to="/shop" className="btn-primary">Shop the Collection</Link>
      </div>
    )
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    try {
      const ref = generateOrderRef()
      const order = {
        reference: ref,
        customerName: data.fullName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        state: data.state,
        city: data.city,
        address: data.address,
        landmark: data.landmark,
        deliveryInstructions: data.deliveryInstructions,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          size: i.size,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        deliveryFee,
        total,
        orderStatus: 'pending_confirmation',
        paymentStatus: 'not_requested',
        createdAt: new Date().toISOString(),
      }

      // Save to Supabase if configured
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.from('orders').insert({
          reference: ref,
          customer_name: data.fullName,
          customer_email: data.email,
          customer_phone: data.phone,
          customer_whatsapp: data.whatsapp || data.phone,
          state: data.state,
          city: data.city,
          address: data.address,
          landmark: data.landmark,
          delivery_instructions: data.deliveryInstructions,
          order_items: order.items,
          subtotal,
          delivery_fee: deliveryFee,
          total,
          order_status: 'pending_confirmation',
          payment_status: 'not_requested',
        })
      }

      // Store order for confirmation page
      sessionStorage.setItem('last_order', JSON.stringify(order))
      clearCart()
      navigate(`/order-confirmation/${ref}`)
    } catch (err) {
      setError('There was an issue submitting your order. Please try WhatsApp instead.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-cream-100 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <p className="section-label">Order Request</p>
          <h1 className="font-display text-4xl text-brown-100">Your Details</h1>
          <p className="font-body text-sm text-brown-50 mt-2">
            No payment required now. We confirm availability and send payment instructions after reviewing your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-4">Personal Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input {...register('fullName', { required: 'Full name is required' })}
                           placeholder="Full Name *" className="input-luxury" />
                    {errors.fullName && <p className="font-body text-xs text-blush-300 mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                           type="email" placeholder="Email Address *" className="input-luxury" />
                    {errors.email && <p className="font-body text-xs text-blush-300 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <input {...register('phone', { required: 'Phone is required', validate: (v) => validateNigerianPhone(v) || 'Enter a valid Nigerian phone number' })}
                           placeholder="Phone Number *" className="input-luxury" />
                    {errors.phone && <p className="font-body text-xs text-blush-300 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <input {...register('whatsapp')} placeholder="WhatsApp Number (if different)" className="input-luxury" />
                  </div>
                  <div>
                    <input {...register('altPhone')} placeholder="Alternative Phone (optional)" className="input-luxury" />
                  </div>
                </div>
              </div>

              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-4">Delivery Address</p>
                <div className="space-y-4">
                  <div className="relative">
                    <select {...register('state', { required: 'Select your state' })} className="input-luxury appearance-none pr-8">
                      <option value="">Select State *</option>
                      {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-50 pointer-events-none" />
                    {errors.state && <p className="font-body text-xs text-blush-300 mt-1">{errors.state.message}</p>}
                  </div>
                  <input {...register('city', { required: 'City/LGA is required' })}
                         placeholder="City / Local Government Area *" className="input-luxury" />
                  {errors.city && <p className="font-body text-xs text-blush-300 mt-1">{errors.city.message}</p>}
                  <input {...register('address', { required: 'Street address is required' })}
                         placeholder="Street Address *" className="input-luxury" />
                  {errors.address && <p className="font-body text-xs text-blush-300 mt-1">{errors.address.message}</p>}
                  <input {...register('landmark')} placeholder="Closest Landmark (helps with delivery)" className="input-luxury" />
                  <textarea {...register('deliveryInstructions')} rows={2}
                            placeholder="Special delivery instructions (optional)" className="input-luxury resize-none" />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-blush-100/60 border border-blush-200/50 font-body text-sm text-brown-100">
                  <AlertCircle size={16} className="text-blush-300 shrink-0" />
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base">
                {submitting ? 'Submitting Order Request…' : 'Submit Order Request'}
              </button>
              <p className="font-body text-xs text-brown-50 text-center">
                No payment is required now. You will receive confirmation and payment instructions from our team.
              </p>
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-cream-50 border border-[rgba(180,132,61,0.12)] p-6 sticky top-24">
              <h2 className="font-display text-xl text-brown-100 mb-5">Order Summary</h2>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-brown-100 truncate">{item.name}</p>
                      <p className="font-body text-xs text-brown-50">{item.size}ml × {item.quantity}</p>
                      <p className="font-body text-sm text-champagne-500">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(180,132,61,0.1)] pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-brown-50">Subtotal</span>
                  <span className="text-brown-100">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-brown-50">Est. Delivery</span>
                  <span className="text-brown-100">{watchState ? formatPrice(deliveryFee) : 'TBC'}</span>
                </div>
                <div className="flex justify-between font-body font-semibold border-t border-[rgba(180,132,61,0.1)] pt-2 mt-2">
                  <span className="text-brown-100">Est. Total</span>
                  <span className="text-brown-100">{watchState ? formatPrice(total) : `${formatPrice(subtotal)} + delivery`}</span>
                </div>
              </div>
              <p className="font-body text-xs text-brown-50/70 mt-4 leading-relaxed">
                Final total confirmed after our team reviews your order and delivery location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
