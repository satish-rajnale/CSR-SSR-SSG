export default interface RestaurantType {
  id: string;
  name: string;
  price: number;
  image_url: string;
  statusDesc: string;
  category: string;
  count?: number;
}
