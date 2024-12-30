"use client";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import paris from "../public/home/tower-1950742_1280.jpg";
import warmingStripes from "../public/home/1860.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900 text-white">
        <div className="relative flex items-center justify-center h-screen">
          <Image
            src={paris}
            alt="Paris"
            layout="fill"
            className="absolute inset-0 z-0 brightness-75 transform transition-transform duration-500 hover:scale-105"
          />
          <div className="relative z-10 text-center max-w-2xl p-6">
            <h1 className="text-4xl md:text-6xl mb-6 animate-fadeInDown text-white">
              Trouvez un lieu frais à Paris en un clic !
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fadeInUp">
              Découvrez les meilleurs espaces verts, fontaines et lieux
              climatisés pour vous détendre, même en pleine chaleur.
            </p>
            <Link
              href="/filter/all"
              className="px-8 py-3 text-lg bg-[rgba(95,37,159)] rounded-lg shadow-lg hover:bg-[#4e1e81] transition-all animate-fadeIn"
            >
              Trouver un lieu frais
            </Link>
          </div>
        </div>

        {/* Section "Warming Stripes" */}
        <section className="bg-white text-gray-900 py-16 px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src={warmingStripes}
                alt="Warming Stripes Paris"
                width={600}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Comprendre les "Warming Stripes"
              </h2>
              <p className="text-lg leading-relaxed text-gray-800 mb-4">
                Connaissez-vous les{" "}
                <strong className="text-[rgba(95,37,159)]">
                  “warming stripes”
                </strong>{" "}
                ? Chaque barre représente une année. Plus c’est rouge, plus
                l’année a été chaude. Ces bandes illustrent l'évolution des
                températures à Paris entre 1850 et 2023. Il est urgent d’agir
                face au changement climatique. Découvrez comment nous pouvons
                rendre la ville plus vivable, même en pleine chaleur.
              </p>
            </div>
          </div>
        </section>

        {/* Section "Pourquoi explorer avec nous ?" */}
        <div className="text-center px-8 bg-white py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Pourquoi explorer avec nous ?
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="max-w-xs p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-2xl"></i> 
              </div>
              <h3 className="text-xl  text-[rgba(95,37,159)] mb-4">
                Espaces verts
              </h3>
              <p className="text-gray-600">
                Découvrez des parcs et jardins pour une expérience en plein air.
              </p>
            </div>
            <div className="max-w-xs p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-water text-2xl"></i>{" "}
               
              </div>
              <h3 className="text-xl  text-[rgba(95,37,159)] mb-4">
                Fontaines
              </h3>
              <p className="text-gray-600">
                Rafraîchissez-vous près des plus belles fontaines de Paris.
              </p>
            </div>
            <div className="max-w-xs p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-building text-2xl"></i>{" "}
               
              </div>
              <h3 className="text-xl  text-[rgba(95,37,159)] mb-4">
                Lieux climatisés
              </h3>
              <p className="text-gray-600">
                Profitez d'espaces intérieurs frais et confortables.
              </p>
            </div>
          </div>
        </div>

        {/* Section "Comment ça marche ?" */}
        <section className="bg-white text-gray-900 py-16 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {/* Filtres de recherche */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-filter text-2xl"></i>
                </div>
                <h3 className="text-xl  text-[rgba(95,37,159)] mb-4">
                  Filtres de recherche
                </h3>
                <p className=" text-gray-600">
                  Utilisez notre système de filtres pour sélectionner les
                  critères qui vous intéressent (type de lieu, disponibilité,
                  etc.).
                </p>
              </div>

              {/* Tableau des résultats */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-table text-2xl"></i>
                </div>
                <h3 className="text-xl  text-[rgba(95,37,159)] mb-4">
                  Tableau des résultats
                </h3>
                <p className=" text-gray-600">
                  Une fois les filtres appliqués, consultez les résultats dans
                  un tableau clair et détaillé.
                </p>
              </div>

              {/* Accès aux données */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-[rgba(95,37,159)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-database text-2xl"></i>
                </div>
                <h3 className="text-xl text-[rgba(95,37,159)] mb-4">
                  Accès aux données
                </h3>
                <p className=" text-gray-600">
                  Notre site utilise plusieurs datasets pour vous fournir des
                  informations complètes sur les endroits frais à Paris.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section "Contact" */}
        <section className="bg-[rgba(95,37,159)] text-white ">
          <div className=" mx-auto text-center bg-black bg-opacity-50 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-100 mb-6">
              Contact
            </h2>
            <p className=" text-gray-300 mb-6">
              Si vous avez des questions ou des suggestions concernant notre
              site, n'hésitez pas à nous contacter via notre formulaire de
              contact.
            </p>

            {/* Formulaire de contact */}
            <form className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
              {/* Champ Nom */}
              <div className="flex flex-col sm:flex-row sm:items-center ">
                <label
                  htmlFor="name"
                  className="text-gray-800 font-bold mb-2 sm:w-1/4 text-left"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom..."
                  required
                  className="w-full sm:w-3/4 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(95,37,159)]"
                />
              </div>

              {/* Champ Email */}
              <div className="flex flex-col sm:flex-row sm:items-center ">
                <label
                  htmlFor="email"
                  className="text-gray-800 font-bold mb-2 sm:w-1/4 text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  required
                  className="w-full sm:w-3/4 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(95,37,159)]"
                />
              </div>

              {/* Champ Message */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label
                  htmlFor="message"
                  className="text-gray-800 font-bold mb-2 sm:w-1/4 text-left"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message..."
                  required
                  className="w-full sm:w-3/4 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(95,37,159)]"
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[rgba(95,37,159)] text-white rounded-lg shadow-lg hover:bg-[#4e1e81] transition-all"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <style jsx>{`
        .rounded-r-3xl {
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-in-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-in-out;
        }
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
