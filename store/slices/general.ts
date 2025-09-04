/* eslint-disable @typescript-eslint/no-empty-object-type */
import toaster from "@/lib/toastify";
import { httpServerGet, promiseTracker } from "@/lib/api";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  Country as CountryType,
  Nationality as NationalityType,
  City as CityType,
  CountryResponse,
  NationalityResponse,
  CityResponse,
  DocList,
} from "@/types";

export interface Country extends CountryType {}
export interface Nationality extends NationalityType {}
export interface City extends CityType {}

interface GeneralState {
  countries: Country[];
  nationalities: Nationality[];
  cities: City[];
  docList: DocList[] | null;
}

const initialState: GeneralState = {
  countries: [],
  nationalities: [],
  cities: [],
  docList: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
    updateNationalities: (state, action: PayloadAction<Nationality[]>) => {
      state.nationalities = action.payload;
    },
    updateCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    updateDocumentList(state, action: PayloadAction<DocList[] | null>) {
      state.docList = action.payload;
    },
  },
});

export const {
  updateCountries,
  updateNationalities,
  updateCities,
  updateDocumentList,
} = generalSlice.actions;

export default generalSlice.reducer;

//fetch country
export function fetchCountries() {
  return async function (dispatch: Dispatch) {
    try {
      const resp = await promiseTracker(
        httpServerGet<CountryResponse[]>("/general/countries")
      );

      if (resp.data.data) {
        dispatch(updateCountries(resp.data.data));
      }
    } catch {
      toaster.error("An unexpected error occurred. Please try again later");
    }
  };
}

// fetch nationality codes
export function fetchNationalities() {
  return async function (dispatch: Dispatch) {
    try {
      const resp = await promiseTracker(
        httpServerGet<NationalityResponse[]>("/general/nationalities")
      );

      if (resp.data.data) {
        dispatch(updateNationalities(resp.data.data));
      }
    } catch {
      toaster.error("An unexpected error occurred. Please try again later");
    }
  };
}

//fetch cities ny country Id
export function fetchCitiesById(countryID: number) {
  return async function (dispatch: Dispatch) {
    try {
      const resp = await promiseTracker(
        httpServerGet<CityResponse[]>(`/general/cities?countryID=${countryID}`)
      );

      if (resp.data.data) {
        dispatch(updateCities(resp.data.data));
      }
    } catch {
      toaster.error("An unexpected error occurred. Please try again later");
    }
  };
}

//fetch document types
export function fetchDocumentType(caseEventGUID: string) {
  return async function (dispatch: Dispatch) {
    try {
      const resp = await promiseTracker(
        httpServerGet<DocList[]>(
          `/auth/documents/document-types?caseEventGUID=${caseEventGUID}`
        )
      );

      if (resp.data.data) dispatch(updateDocumentList(resp.data.data));
    } catch {
      toaster.error("An unexpected error occurred. Please try again later");
    }
  };
}
