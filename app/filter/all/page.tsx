"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import NavbarFilter from "@/app/filter/navbarFilter/page";
import image1 from "@/public/all/arc-de-triomphe-7213188_1920.jpg";
import Image from "next/image";
import Spinner from "@/app/components/spinner";

interface Fountains {
  gid: string;
  type_objet: string;
  modele: string;
  no_voirie_pair: string | null;
  no_voirie_impair: string | null;
  voie: string;
  commune: string;
  dispo: string;
  debut_ind: string | null;
  fin_ind: string | null;
  motif_ind: string | null;
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
  proposition_usager: string;
}

interface CommonPlace {
  id: string;
  nom_objet: string;
  categorie: string;
  adresse: string;
  statut_ouverture: string;
  payant: string;
}
const AllPlaces = () => {
  const [commonPlaces, setCommonPlaces] = useState<CommonPlace[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [filterStatutOuvertures, setFilterStatutOuvertures] = useState<
    string[]
  >([]);
  const [availableStatutOuvertures, setAvailableStatutOuvertures] = useState<
    string[]
  >([]);
  const [filterPayants, setFilterPayants] = useState<string[]>([]);
  const [availablePayants, setAvailablePayants] = useState<string[]>([]);

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchFountains = async () => {
    try {
      const response = await fetch(
        "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=20"
      );
      const data = await response.json();
      const mappedFountains = data.results.map((fountain: Fountains) => ({
        id: fountain.gid,
        nom_objet: fountain.modele,
        categorie: "Fontaines à Boire",
        adresse: fountain.voie ?? "Non précisé",
        statut_ouverture: fountain.dispo,
        payant: "inconnu",
      }));
      console.log("Fontaines mappées:", mappedFountains);
      return mappedFountains;
    } catch (error) {
      console.error("Erreur lors de la récupération des fontaines :", error);
      return [];
    }
  };

  const fetchGreenSpaces = async () => {
    try {
      const response = await fetch(
        "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=20"
      );
      const data = await response.json();
      const mappedGreenSpaces = data.results.map((greenSpace: GreenSpace) => ({
        id: greenSpace.identifiant,
        nom_objet: greenSpace.nom,
        categorie: "Espaces Verts",
        adresse: greenSpace.adresse ?? "Non précisé",
        statut_ouverture: greenSpace.statut_ouverture ?? "inconnu",
        payant: "non",
      }));
      console.log("Espaces verts mappés:", mappedGreenSpaces);
      return mappedGreenSpaces;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des espaces verts :",
        error
      );
      return [];
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=20"
      );
      const data = await response.json();
      const mappedActivities = data.results.map((activity: Activites) => ({
        id: activity.identifiant,
        nom_objet: activity.nom,
        categorie: "Équipements et Activités",
        adresse: activity.adresse ?? "Non précisé",
        statut_ouverture: activity.statut_ouverture ?? "inconnu",
        payant: activity.payant ?? "inconnu",
      }));
      console.log("Activités mappées:", mappedActivities);
      return mappedActivities;
    } catch (error) {
      console.error("Erreur lors de la récupération des activités :", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fountains = await fetchFountains();
        const greenSpaces = await fetchGreenSpaces();
        const activities = await fetchActivities();
        const allPlaces = [...fountains, ...greenSpaces, ...activities];
        console.log("Toutes les données mappées:", allPlaces);
        setCommonPlaces(allPlaces);

        const categories = Array.from(
          new Set(allPlaces.map((place) => place.categorie))
        );
        setAvailableCategories(categories);
        const statutOuvertures = Array.from(
          new Set(allPlaces.map((place) => place.statut_ouverture))
        );
        setAvailableStatutOuvertures(statutOuvertures);
        const payants = Array.from(
          new Set(allPlaces.map((place) => place.payant))
        );
        setAvailablePayants(payants);
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

  // Filtrer les données en fonction des filtres sélectionnés
  const filtered = commonPlaces.filter((data) => {
    const matchesSearchQuery =
      (data.nom_objet &&
        data.nom_objet.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.categorie &&
        data.categorie.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (data.adresse &&
        data.adresse.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategoryFilter =
      filterCategories.length === 0 ||
      filterCategories.includes(data.categorie);
    const matchesStatutOuvertureFilter =
      filterStatutOuvertures.length === 0 ||
      filterStatutOuvertures.includes(data.statut_ouverture);
    const matchesPayantFilter =
      filterPayants.length === 0 || filterPayants.includes(data.payant);

    return (
      matchesSearchQuery &&
      matchesCategoryFilter &&
      matchesStatutOuvertureFilter &&
      matchesPayantFilter
    );
  });

  const filteredActivitesCount = filtered.length;

  const handleCategorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterCategories((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handleDispoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterStatutOuvertures((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handlePayantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterPayants((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  return (
    <div className="p-0">
      <Navbar />
      <NavbarFilter />
      <Image
        src={image1}
        alt="rrr"
        className="fixed top-0 left-0 h-[32rem] w-full object-cover -z-50"
      />

<h1 className="text-5xl font-bold mb-8 text-white mt-48 text-center">Rechercher des Endroits à Paris</h1>
      {/* Barre de recherche */}
      <div className="mt-2 mb-3 flex items-center gap-4 pl-10 pr-10 ">
      
        <div className="items-center flex w-11/12 border border-gray-300 rounded-md">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 549.41 546.15"
            className="w-6 h-6 mx-2 text-gray-500 "
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
        <div>
          <button
            onClick={toggleFilterModal}
            className="flex items-center gap-2 bg-[#5f259f] text-white px-4 py-2 border-gray-300 rounded-md w-full"
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

      {/* Fenêtre de filtre  */}
      {isFilterModalOpen && (
        <div className="p-0 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Filtres</h2>

            {/* Ajouter les cases à cocher dynamiquement */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Catégorie / Type</h3>
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
              <h3 className="text-lg font-semibold mb-2">
                Statut d'Ouverture / Disponibilité
              </h3>
              <div className="space-y-2">
                {availableStatutOuvertures.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type || "default"}
                      value={type || "default"}
                      checked={filterStatutOuvertures.includes(type)}
                      onChange={handleDispoChange}
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
              <h3 className="text-lg font-semibold mb-2">Payant</h3>
              <div className="space-y-2">
                {availablePayants.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type || "default"}
                      value={type || "default"}
                      checked={filterPayants.includes(type)}
                      onChange={handlePayantChange}
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

      <div className="text-gray-700 mt-4 text-center bg-white mr-8 ml-8">
        <h3>
          Nombre de résultats affichés :{" "}
          <p className="text-red-600 font-bold">{filteredActivitesCount}</p>
        </h3>
      </div>
      {/* Tableau */}
      {filteredActivitesCount > 0 && (
        <div className="overflow-x-auto pr-8 pl-8 pt-4 mb-10">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-[#60259f] to-[#ff35f2] border-[#60259f] border-[1.5px] border-b-2">
                <th className="px-4 py-2 text-white border-b text-left">
                  Nom de l'objet
                </th>
                <th className="px-4 py-2 text-white border-b text-left">
                  Catégorie / Type
                </th>
                <th className="px-4 py-2 text-white border-b text-left">
                  Adresse / Voie
                </th>
                <th className="px-4 py-2 text-white border-b text-left">
                  Statut d'Ouverture / Disponibilité
                </th>
                <th className="px-4 text-white py-2 border-b text-left">
                  Payant
                </th>
              </tr>
            </thead>
            <tbody>
              {commonPlaces.length > 0 ? (
                filtered.map((place) => (
                  <tr key={place.id}>
                    <td className="px-4 py-2 border-b">{place.nom_objet}</td>
                    <td className="px-4 py-2 border-b">{place.categorie}</td>
                    <td className="px-4 py-2 border-b">
                      {place.adresse || "Non précisé"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {place.statut_ouverture}
                    </td>
                    <td className="px-4 py-2 border-b">{place.payant}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 border-b text-center">
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPlaces;
