import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  const services = [
    "Tournois ESports",
    "Événements Gaming",
    "Production Streaming",
    "Coaching Professionnel",
    "Community Management",
    "Compétitions Corporate",
  ]

  const quickLinks = [
    { href: "#home", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "À Propos" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="North Events Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                North Events
              </span>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire d'excellence pour créer des expériences ESports inoubliables en Tunisie. Depuis 2019,
              nous révolutionnons la scène gaming tunisienne.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-brand-primary/20 hover:bg-brand-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-primary/20 hover:bg-brand-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-brand-primary/20 hover:bg-brand-primary rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href="#services"
                    className="text-gray-300 hover:text-brand-primary transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors duration-200">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors duration-200">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Avenue Habib Bourguiba</p>
                  <p>Tunis 1000, Tunisie</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <div className="text-gray-300">
                  <p>+216 70 123 456</p>
                  <p>+216 98 765 432</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <div className="text-gray-300">
                  <p>contact@northevents.tn</p>
                  <p>info@northevents.tn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} North Events. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Fait avec <Heart className="w-4 h-4 text-red-500 mx-1" /> en Tunisie
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
