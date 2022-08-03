# Database
## CORS
```Cross-Origin Resource Sharing```
- Accept or Reject the access of resources existing in server by domain
- ```HTTP request``` create ```origin``` header, meaning whici domain sends the request

## Axios
- To get axios.post|put(data) in req.body, use 
```
app.use(express.json());
app.use(express.urlencoded({extended:true}));
```