export interface RestaurantBrandConfig {
  readonly nameEn: string;
  readonly nameAr: string;
  readonly wordmarkEn: string;
  readonly taglineEn: string;
  readonly taglineAr: string;
  readonly locationEn: string;
  readonly locationAr: string;
  readonly hoursEn: string;
  readonly hoursAr: string;
  readonly phoneDisplay: string;
}

/**
 * Single-source Restaurant Brand config (L-08 locked: Krave / كريف).
 * Strictly separated from the FlameLink platform brand (footer badge + /kds only).
 */
export const RESTAURANT_BRAND: RestaurantBrandConfig = {
  nameEn: "Krave",
  nameAr: "كريف",
  wordmarkEn: "KRAVE",
  taglineEn: "Open-fire craft ordered together at the table.",
  taglineAr: "مطبخ نار مفتوحة وطلب واحد مشترك على الترابيزة.",
  locationEn: "Road 9, Maadi, Cairo",
  locationAr: "شارع 9، المعادي، القاهرة",
  hoursEn: "Daily 12:00 PM to 1:00 AM",
  hoursAr: "يوميا 12 ظهرا حتى 1 صباحا",
  phoneDisplay: "+20 2 2380 4250",
};

export const PLATFORM_BRAND = {
  name: "FlameLink",
  poweredByEn: "Powered by FlameLink",
  poweredByAr: "مشغل بواسطة FlameLink",
} as const;
