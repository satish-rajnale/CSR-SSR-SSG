export default interface RestaurantType {
  id: string;
  name: string;
  price: number;
  image_url: string;
  address: { city: string; country: string; state: string };
  statusDesc: string;
  rating: string;
  category: string;
}
