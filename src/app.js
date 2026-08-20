import express from "express";
import authRoutes from "./routes/AuthRoutes.js";
import session from "express-session";
import userRoutes from "./routes/UserRoutes.js"
import adminRoutes from "./routes/AdminRoutes.js";
const app = express();

app.use( //Jo bhi request meri application mein aaye, uspar ye middleware available hona chahiye.
  session({  // express-session ka middleware hai 
  secret: process.env.SESSION_SECRET, // ye session ki secret key hai 
  resave:false, // agar sessio n mai koi change nhi hua hai toh request ane pr session dobara change matt kro 
  saveUninitialized:false, // man lo ek user aata hai aur usne login nhi kiya , vo just get request bhej rha hai , toh hum uska session create nhi krenge  kyoki vo ek unneccessary session create hoga which is not neeed , for eg jab tak hum kisi website pr login ya signup nhi krte hai tab tak humre pass uss website se koi msg nhi ata hia 
  cookie:{ // ye session ki setting hai  , ki kab expire hoga , secure  hoga ya nhi 
    httpOnly:true, // iska matlb hai ki browser ki javascript directly iss cookie ko read ya store nhi kr skti hai 
    secure:false, // jab hum localhost pr kaam krte hai toh secure ko false rhte hai lkain jab http pr kaam krte hai secure ko true rkhte hai  that means ki cookies http tak restrict ho jayegi  
    maxAge:1000 * 60 * 60 * 24 //Session cookie approximately 24 hours ke liye valid rahegi.
  }
}))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure User API is running 🚀"
  });
});

export default app;