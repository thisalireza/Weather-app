export interface locationDetails {
  location: Location
}

export interface Location {
  address: string[]
  adminDistrict: string[]
  adminDistrictCode: any[]
  city: string[]
  country: string[]
  countryCode: string[]
  displayName: string[]
  displayContext: string[]
  ianaTimeZone: string[]
  latitude: number[]
  locale: Locale[]
  longitude: number[]
  neighborhood: any[]
  placeId: string[]
  postalCode: string[]
  postalKey: string[]
  disputedArea: boolean[]
  disputedCountries: any[]
  disputedCountryCodes: any[]
  disputedCustomers: any[]
  disputedShowCountry: boolean[][]
  iataCode: string[]
  icaoCode: string[]
  locId: string[]
  locationCategory: any[]
  pwsId: string | undefined[]
  type: string[]
}

export interface Locale {
  locale1: any
  locale2: string
  locale3?: string
  locale4: any
}
