import Axios from "axios";

console.log("process.env.API_APP: ", process.env.API_APP);

export default Axios.create({
  baseURL: `${process.env.API_APP || location.origin}/api`,
});
