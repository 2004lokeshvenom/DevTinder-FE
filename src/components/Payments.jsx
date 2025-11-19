import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from '../Utils/constants'

const Payments = () => {
  const [isPremium, setIsPremium] = useState(false)
  const verifypremium = async () => {
    try {
      const res = await axios.get(BASE_URL + '/ispremium/verify', {
        withCredentials: true,
      })
      setIsPremium(res.data.isPremium)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    verifypremium()
  }, [])

  const handlePayment = async (plan) => {
    try {
      const payment = await axios.post(
        BASE_URL + '/payments/create',
        {
          plan: plan,
        },
        {
          withCredentials: true,
        }
      )
      const { orderId, amount, currency, notes, keyId } = payment.data
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Dev Tinder',
        description: 'Connect to Developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + ' ' + notes.lastName,
          email: notes.email,
          contact: '+91 9014194673',
        },
        theme: {
          color: '#F37254',
        },
        handler: function (response) {
          verifypremium()
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.log(err)
    }
  }
  return isPremium ? (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="p-8 bg-gradient-to-r from-black-600/40 to-amber-500/20 border border-red-600 rounded-2xl shadow-xl text-center max-w-sm">
        <div className="text-4xl mb-3">👑</div>
        <h2 className="text-2xl font-bold text-yellow-400">Premium Activated</h2>
        <p className="text-gray-300 mt-2 text-sm">You already have premium access. Thank you for supporting us!</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap gap-6 bg-base-100 p-6 justify-center">
      <div className="stat bg-base-300/40 border border-base-300 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-200 w-72">
        <div className="stat-title text-gray-300 text-lg font-semibold flex items-center gap-2">🥈 Silver Plan</div>

        <ul className="mt-3 text-sm text-gray-400 space-y-1">
          <li>• Limited Live Chat</li>
          <li>• Monthly Email Recommendation Letter</li>
          <li>• Blue Tick Badge</li>
          <li>• Increased Visibility</li>
        </ul>

        <div className="stat-value text-primary text-3xl mt-4">₹500</div>

        <div className="stat-actions mt-3">
          <button onClick={() => handlePayment('silver')} className="btn btn-primary btn-sm w-full">
            Buy Now
          </button>
        </div>
      </div>

      <div className="stat bg-base-300/40 border border-yellow-500 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-200 w-72">
        <div className="stat-title text-yellow-400 text-lg font-semibold flex items-center gap-2">🥇 Gold Plan</div>

        <ul className="mt-3 text-sm text-gray-400 space-y-1">
          <li>• Unlimited Live Chat</li>
          <li>• Weekly Email Recommendation Letter</li>
          <li>• Golden Tick Badge</li>
          <li>• Highest Visibility</li>
        </ul>

        <div className="stat-value text-yellow-400 text-3xl mt-4">₹700</div>

        <div className="stat-actions mt-3">
          <button onClick={() => handlePayment('gold')} className="btn btn-warning btn-sm w-full">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payments
