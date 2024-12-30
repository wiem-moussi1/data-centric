"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import NavbarFilter from "@/app/filter/navbarFilter/page";
import Carousel from "@/app/filter/greenSpaces/carousel";
import Spinner from "@/app/components/spinner";

// Interface pour GeoShape
interface GeoShape {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
  properties: Record<string, unknown>;
}

// Interface pour GeoPoint2D
interface GeoPoint2D {
  lon: number;
  lat: number;
}

// Interface pour un espace vert
interface GreenSpace {
  identifiant: string;
  nsq_espace_vert: number;
  nom: string;
  type: string;
  p_vegetation_h: number;
  proportion_vegetation_haute: number;
  adresse: string;
  arrondissement: string;
  statut_ouverture: string | null;
  ouvert_24h: string;
  canicule_ouverture: string;
  ouverture_estivale_nocturne: string;
  horaires_periode: string;
  horaires_lundi: string | null;
  horaires_mardi: string | null;
  horaires_mercredi: string | null;
  horaires_jeudi: string | null;
  horaires_vendredi: string | null;
  horaires_samedi: string | null;
  horaires_dimanche: string | null;
  categorie: string;
  proposition_usager: string | null;
  id_dicom: string;
  geo_shape: GeoShape;
  geo_point_2d: GeoPoint2D;
}

// Interface pour la réponse API
interface ApiResponse {
  total_count: number;
  results: GreenSpace[];
}

const GreenSpaces = () => {
  const [greenSpaces, setGreenSpaces] = useState<GreenSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // États pour les filtres
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [filterProportionVegetation, setFilterProportionVegetation] = useState<
    string[]
  >([]);
  const [availableProportionVegetation, setAvailableProportionVegetation] =
    useState<string[]>([]);
  const [filterOuvert24h, setFilterOuvert24h] = useState<string[]>([]);
  const [availableOuvert24h, setAvailableOuvert24h] = useState<string[]>([]);

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
          "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=20"
        );
        const data: ApiResponse = await res.json();
        console.log("Réponse API :", data);
        setGreenSpaces(data.results);

        const categories = Array.from(
          new Set(data.results.map((item) => item.categorie))
        );
        setAvailableCategories(categories);

        const types = Array.from(
          new Set(data.results.map((item) => item.type))
        );
        setAvailableTypes(types);

        const proportions = Array.from(
          new Set(
            data.results.map((item) =>
              item.proportion_vegetation_haute.toString()
            )
          )
        );
        setAvailableProportionVegetation(proportions);

        const ouvert24h = Array.from(
          new Set(data.results.map((item) => item.ouvert_24h))
        );
        setAvailableOuvert24h(ouvert24h);
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

  // Fonction de filtrage des espaces verts
  const filtered = greenSpaces.filter((greenSpace) => {
    return (
      (searchQuery
        ? greenSpace.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          greenSpace.adresse.toLowerCase().includes(searchQuery.toLowerCase())
        : true) &&
      (filterCategories.length > 0
        ? filterCategories.includes(greenSpace.categorie)
        : true) &&
      (filterTypes.length > 0 ? filterTypes.includes(greenSpace.type) : true) &&
      (filterProportionVegetation.length > 0
        ? filterProportionVegetation.some((proportion) => {
            if (proportion === "inf25") {
              return greenSpace.proportion_vegetation_haute < 25;
            } else if (proportion === "25-50") {
              return (
                greenSpace.proportion_vegetation_haute >= 25 &&
                greenSpace.proportion_vegetation_haute <= 50
              );
            } else if (proportion === "sup50") {
              return greenSpace.proportion_vegetation_haute > 50;
            }
            return false;
          })
        : true) &&
      (filterOuvert24h.length > 0
        ? filterOuvert24h.includes(greenSpace.ouvert_24h)
        : true)
    );
  });

  const filteredActivitesCount = filtered.length;

  // Ouvre ou ferme la fenêtre de filtre
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleCategorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterCategories((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTypes((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handleVegetationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterProportionVegetation((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handleOuvert24hChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterOuvert24h((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  return (
    <>
      <div className="p-8">
        <Navbar />
        <NavbarFilter />

        <div className="relative">
          <Carousel />

          {/* Barre de recherche */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
            <h1 className="text-4xl font-bold mb-8 text-white">
              Ilots de fraîcheur - Espaces verts "frais"
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
              <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl mb-4">Filtres</h2>

                {/* Ajouter les cases à cocher dynamiquement */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Catégorie</h3>
                  <div className="space-y-2">
                    {availableCategories.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type || "default"}
                          value={type || "default"}
                          checked={filterCategories.includes(type)}
                          onChange={handleCategorieChange}
                          className="mr-2"
                        />
                        <label htmlFor={type || "default"} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ajouter les cases à cocher dynamiquement */}
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
                {/* Filtre Proportion de végétation */}
                <div>
                  <h3 className="mb-2">Proportion de végétation</h3>
                  <label>
                    <input
                      type="checkbox"
                      value="inf25"
                      onChange={handleVegetationChange}
                      className="mb-2"
                    />
                    Très exposé au soleil (Inférieure à 25%)
                  </label>{" "}
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      value="25-50"
                      onChange={handleVegetationChange}
                      className="mb-2"
                    />
                    Partiellement ombragé (Entre 25% et 50%)
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      value="sup50"
                      onChange={handleVegetationChange}
                      className="mb-2"
                    />
                    Très ombragé (Supérieure à 50%)
                  </label>
                </div>

                {/* Ajouter les cases à cocher dynamiquement */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Ouvert 24h</h3>
                  <div className="space-y-2">
                    {availableOuvert24h.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type || "default"}
                          value={type || "default"}
                          checked={filterOuvert24h.includes(type)}
                          onChange={handleOuvert24hChange}
                          className="mr-2"
                        />
                        <label htmlFor={type || "default"} className="text-sm">
                          {type}
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
          <h3>
            Nombre de résultats affichés :{" "}
            <p className="text-red-600 font-bold">{filteredActivitesCount}</p>
          </h3>
        </div>

        {/* Tableau */}
        {filteredActivitesCount > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100  ">
                  <th className="px-4 py-2 border-b text-left">Nom</th>
                  <th className="px-4 py-2 border-b text-left">Catégorie</th>
                  <th className="px-4 py-2 border-b text-left">Type</th>
                  <th className="px-4 py-2 border-b text-left">Adresse</th>
                  <th className="px-4 py-2 border-b text-left">
                    Arrondissement
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Espace Vert (m²)
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Proportion Végétation Haute
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Statut Ouverture
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Ouvert 24h
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Canicule Ouverture
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Ouverture Estivale Nocturne
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Période
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Lundi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Mardi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Mercredi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Jeudi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Vendredi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Samedi
                  </th>
                  <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                    Horaires Dimanche
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((greenSpace) => (
                  <tr key={greenSpace.identifiant}>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.nom || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.categorie || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.type || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.adresse || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.arrondissement || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.nsq_espace_vert || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.proportion_vegetation_haute.toFixed(1)}%
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.statut_ouverture || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.ouvert_24h || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.canicule_ouverture || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.ouverture_estivale_nocturne ||
                        "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_periode || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_lundi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_mardi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_mercredi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_jeudi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_vendredi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_samedi || "Information manquante"}
                    </td>
                    <td className="px-4 py-2 border-b whitespace-nowrap">
                      {greenSpace.horaires_dimanche || "Information manquante"}
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

export default GreenSpaces;
