"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import NavbarFilter from "@/app/filter/navbarFilter/page";
import Carousel from "@/app/filter/activities/carousel";
import Spinner from "@/app/components/spinner";

// Interface pour GeoShape
interface GeoShape {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: Record<string, unknown>;
}

// Interface pour GeoPoint2D
interface GeoPoint2D {
  lon: number;
  lat: number;
}

// Interface pour une activité
interface Activites {
  identifiant: string;
  id_dicom: null | string;
  nom: string;
  type: string | null;
  payant: string | null;
  adresse: string | null;
  arrondissement: string;
  statut_ouverture: null | string;
  horaires_periode: string | null;
  horaires_lundi: null | string;
  horaires_mardi: null | string;
  horaires_mercredi: null | string;
  horaires_jeudi: null | string;
  horaires_vendredi: null | string;
  horaires_samedi: null | string;
  horaires_dimanche: null | string;
  geo_shape: GeoShape;
  geo_point_2d: GeoPoint2D;
  proposition_usager: string;
}

// Interface pour la réponse API
interface ApiResponse {
  total_count: number;
  results: Activites[];
}

const Activities = () => {
  const [activites, setActivites] = useState<Activites[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filterTypes, setFilterTypes] = useState<(string | null)[]>([]);
  const [availableTypes, setAvailableTypes] = useState<(string | null)[]>([]);
  const [filterPayants, setFilterPayants] = useState<(string | null)[]>([]);
  const [availablePayants, setAvailablePayants] = useState<(string | null)[]>(
    []
  );

  const [filterStatutOuvertures, setFilterStatutOuvertures] = useState<
    (string | null)[]
  >([]);
  const [availableStatutOuvertures, setAvailableStatutOuvertures] = useState<
    (string | null)[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=20"
        );
        const data: ApiResponse = await res.json();
        console.log("Réponse API :", data);
        setActivites(data.results);

        const types = Array.from(
          new Set(data.results.map((activite) => activite.type))
        );
        setAvailableTypes(types);

        const payants = Array.from(
          new Set(
            data.results.map((activite) => activite.payant ?? "Non spécifié")
          )
        );
        setAvailablePayants(payants);
        console.log("Tableau des payants :", payants);

        const StatutOuvertures = Array.from(
          new Set(
            data.results.map(
              (activite) => activite.statut_ouverture ?? "Non spécifié"
            )
          )
        );
        setAvailableStatutOuvertures(StatutOuvertures);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-600 mt-4">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const filteredActivites = activites
    .filter(
      (activite) =>
        activite.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activite.adresse &&
          activite.adresse.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter((activite) => {
      return filterTypes.length > 0
        ? filterTypes.includes(activite.type)
        : true;
    })
    .filter((activite) => {
      return filterPayants.length > 0
        ? filterPayants.includes(activite.payant ?? "Non spécifié")
        : true;
    })
    .filter((activite) => {
      return filterStatutOuvertures.length > 0
        ? filterStatutOuvertures.includes(
            activite.statut_ouverture ?? "Non spécifié"
          )
        : true;
    });
  // Ouvre ou ferme la fenêtre de filtre
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTypes((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };
  const handlePayantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterPayants((prevPayants) =>
      prevPayants.includes(value)
        ? prevPayants.filter((payant) => payant !== value)
        : [...prevPayants, value]
    );
  };
  const handleStatutOuverture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterStatutOuvertures((prevStatutOuverture) =>
      prevStatutOuverture.includes(value)
        ? prevStatutOuverture.filter(
            (StatutOuverture) => StatutOuverture !== value
          )
        : [...prevStatutOuverture, value]
    );
  };

  const filteredActivitesCount = filteredActivites.length;

  return (
    <>
      <div className="p-8">
        <Navbar />
        <NavbarFilter />

        <div className="relative">
          <Carousel />

          {/* Barre de recherche   */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
            <h1 className="text-4xl font-bold mb-8 text-white">
              Équipements et Activités
            </h1>
            <div className="flex items-center gap-4 w-11/12 md:w-8/12 lg:w-6/12">
              <div className="flex items-center flex-grow border border-gray-300 rounded-md bg-white shadow-md">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 549.41 546.15"
                  className="w-6 h-6 mx-2 text-gray-500"
                >
                  <defs>
                    <style>
                      {`.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:17.23px;}`}
                    </style>
                  </defs>
                  <path d="M521.5,447.05,408.33,333.89l-15.78,15.35L373.93,331.9a199.14,199.14,0,0,0,40.94-121.26c0-110.46-89.55-200-200-200s-200,89.55-200,200,89.55,200,200,200a199.06,199.06,0,0,0,114.92-36.3l18.6,18.17-17.54,16.37,119.3,117s38.9,26.47,71.35-8.18C521.5,517.67,550.88,487.84,521.5,447.05ZM214.87,359.76A149.13,149.13,0,1,1,364,210.64,149.11,149.11,0,0,1,214.87,359.76Z" />
                  <path
                    className="cls-1"
                    d="M209.57,108.73s-56.95-4.51-84.35,53.67"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f259f]"
                />
              </div>

              {/* Bouton Filter */}
              <button
                onClick={toggleFilterModal}
                className="flex items-center gap-2 bg-[#5f259f] text-white px-4 py-2 border-gray-300 rounded-md shadow-md"
              >
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 549.1 546.66"
                  className="w-6 h-6"
                >
                  <defs>
                    <style>
                      {`
        .cls-1 {
          fill: none;
          stroke: #ffffff; /* Contour blanc */
          stroke-miterlimit: 10;
          stroke-width: 18px;
        }
        .cls-2 {
          fill: #ffffff; /* Remplissage blanc */
        }
      `}
                    </style>
                  </defs>
                  <rect
                    className="cls-1"
                    x="108.46"
                    y="113.89"
                    width="74.89"
                    height="74.89"
                    rx="21.53"
                  />
                  <path
                    className="cls-2"
                    d="M108.46,139.08H11.15A11.15,11.15,0,0,0,0,150.23v2.21a11.15,11.15,0,0,0,11.15,11.15h97.31Z"
                  />
                  <path
                    className="cls-2"
                    d="M537.09,139.08H183.35v24.51H537.09a11.15,11.15,0,0,0,11.15-11.15v-2.21A11.15,11.15,0,0,0,537.09,139.08Z"
                  />
                  <rect
                    className="cls-1"
                    x="319.26"
                    y="235.89"
                    width="74.89"
                    height="74.89"
                    rx="21.53"
                  />
                  <path
                    className="cls-2"
                    d="M319.26,261.08H11.58A11.15,11.15,0,0,0,.43,272.22v2.22a11.15,11.15,0,0,0,11.15,11.14H319.26Z"
                  />
                  <path
                    className="cls-2"
                    d="M537.52,261.08H394.14v24.5H537.52a11.15,11.15,0,0,0,11.15-11.14v-2.22A11.15,11.15,0,0,0,537.52,261.08Z"
                  />
                  <rect
                    className="cls-1"
                    x="115.49"
                    y="357.88"
                    width="74.89"
                    height="74.89"
                    rx="21.53"
                  />
                  <path
                    className="cls-2"
                    d="M115.49,383.07H12A11.15,11.15,0,0,0,00.86,394.22v2.21A11.15,11.15,0,0,0,12,407.58H115.49Z"
                  />
                  <path
                    className="cls-2"
                    d="M538,383.07H190.37v24.51H538a11.15,11.15,0,0,0,11.15-11.15v-2.21A11.15,11.15,0,0,0,538,383.07Z"
                  />
                </svg>
                Filtres
              </button>
            </div>
          </div>

          {/* Fenêtre de filtre (Modal) */}
          {isFilterModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Filtres</h2>

                {/* Ajouter les cases à cocher dynamiquement pour les types */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Type</h3>
                  <div className="space-y-2">
                    {availableTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type || "default"}
                          value={type || "default"}
                          checked={filterTypes.includes(type)}
                          onChange={handleTypeChange}
                          className="mr-2"
                        />
                        <label htmlFor={type || "default"} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ajouter le filtre "payant" */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Payant</h3>
                  <div className="space-y-2">
                    {availablePayants.map((payant) => (
                      <div key={payant} className="flex items-center">
                        <input
                          type="checkbox"
                          id={payant || "default"}
                          value={payant || "default"}
                          checked={filterPayants.includes(payant)}
                          onChange={handlePayantChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor={payant || "default"}
                          className="text-sm"
                        >
                          {payant}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ajouter le filtre "Statut Ouverture" */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Statut Ouverture
                  </h3>
                  <div className="space-y-2">
                    {availableStatutOuvertures.map((StatutOuverture) => (
                      <div key={StatutOuverture} className="flex items-center">
                        <input
                          type="checkbox"
                          id={StatutOuverture || "default"}
                          value={StatutOuverture || "default"}
                          checked={filterStatutOuvertures.includes(
                            StatutOuverture
                          )}
                          onChange={handleStatutOuverture}
                          className="mr-2"
                        />
                        <label
                          htmlFor={StatutOuverture || "default"}
                          className="text-sm"
                        >
                          {StatutOuverture}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={toggleFilterModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={toggleFilterModal}
                    className="px-4 py-2 bg-[#5f259f] text-white rounded-md"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-gray-700 mt-4 text-center ">
          <h3>Nombre de résultats affichés : <p className="text-red-600 font-bold">{filteredActivitesCount}</p></h3>
        </div>

        {/* Tableau */}
        {filteredActivitesCount > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className=" px-4  py-2 text-left">Nom</th>
                <th className=" px-4  py-2 text-left">Type</th>
                <th className=" px-4  py-2 text-left">Payant</th>
                <th className=" px-4  py-2 text-left">Adresse</th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Statut Ouverture
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Période
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Lundi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Mardi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Mercredi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Jeudi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Vendredi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Samedi
                </th>
                <th className=" px-4  py-2 text-left whitespace-nowrap">
                  Horaires Dimanche
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredActivites.map((activite) => (
                <tr key={activite.identifiant}>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.nom || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.type || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.payant || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.adresse || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.statut_ouverture || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_periode || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_lundi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_mardi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_mercredi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_jeudi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_vendredi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_samedi || "Information manquante"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {activite.horaires_dimanche || "Information manquante"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </>
  );
};

export default Activities;
