"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+216 70 123 456", "+216 98 765 432"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@northevents.tn", "info@northevents.tn"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Avenue Habib Bourguiba", "Tunis 1000, Tunisie"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun - Ven: 9h00 - 18h00", "Sam: 9h00 - 14h00"],
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Contactez-Nous
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Lancez Votre Projet ESports</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prêt à organiser votre tournoi ou événement gaming ? Contactez notre équipe d'experts ESports pour un devis
            personnalisé et gratuit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Demande de Devis Tournoi</h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Envoyé !</h4>
                  <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Nom Complet *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="+216 XX XXX XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType" className="text-gray-700 font-medium">
                        Type d'Événement
                      </Label>
                      <Input
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="Valorant, LoL, FIFA, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Décrivez Votre Projet *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-2 border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                      placeholder="Décrivez votre projet ESports : jeu, format de tournoi, nombre de participants, budget approximatif, besoins techniques (streaming, coaching, etc.)..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-semibold py-4 rounded-full transition-all duration-300 transform hover:scale-105 group"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Envoyer ma Demande
                    <CheckCircle className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              <p className="text-lg text-gray-600 mb-8">
                Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans la
                réalisation de votre événement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
                  >
                    <CardContent className="p-0">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="h-64 bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Notre Bureau</h4>
                  <p className="text-white/90">123 Avenue Habib Bourguiba</p>
                  <p className="text-white/90">Tunis 1000, Tunisie</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
