import axios from "axios";

axios.get('https://api.themoviedb.org/3/movie/now_playing', {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzZhOTRhODExZjdlNTZkNmU2NDViOGYwZmZkN2JlMSIsIm5iZiI6MTc2NTU1MTMxOS43NzEwMDAxLCJzdWIiOiI2OTNjMmNkNzRjYzQzNTFhYjdmYzQ5YjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bdBmohOOpj4vaW9h2XHXXoA5ybyzJ29W4IEd7T9DTAM` }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));