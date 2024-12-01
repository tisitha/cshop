import { Route,Routes,Navigate } from 'react-router-dom'
import { HomePage,Items,Item, Login,Register,ForgotPass1,ForgotPass2,ForgotPass3, ResetSuccess, Deals,Service,HelpCenter,RegisterSuccess,Cart,SearchResult } from './components'

function App() {

  const isAuthenticated = !!localStorage.getItem('token');
  
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>

      <Route exact path="/category-desktops" element={<Items cate={"Desktops"}/>}/>
      <Route exact path="/category-laptops" element={<Items cate={"Laptops"}/>}/>
      <Route exact path="/category-cpus" element={<Items cate={"CPUs"}/>}/>
      <Route exact path="/category-gpus" element={<Items cate={"GPUs"}/>}/>
      <Route exact path="/category-motherboards" element={<Items cate={"Motherboards"}/>}/>
      <Route exact path="/category-rams" element={<Items cate={"RAMs"}/>}/>
      <Route exact path="/category-storages" element={<Items cate={"HDDSSDs"}/>}/>
      <Route exact path="/category-psus" element={<Items cate={"PSUs"}/>}/>
      <Route exact path="/category-cases" element={<Items cate={"Cases"}/>}/>
      <Route exact path="/category-coolings" element={<Items cate={"Coolings"}/>}/>
      <Route exact path="/category-peripherals" element={<Items cate={"Peripherals"}/>}/>
      <Route exact path="/category-softwares" element={<Items cate={"Softwares"}/>}/>
      <Route exact path="/category-networkings" element={<Items cate={"Networkings"}/>}/>

      <Route exact path="/searchresult/:searchname" element={<SearchResult/>}/>

      <Route exact path="/deals" element={<Deals/>}/>
      <Route exact path="/service" element={<Service/>}/>
      <Route exact path="/help" element={<HelpCenter/>}/>

      <Route exact path="/item/:id" element={<Item/>}/>

      <Route exact path="/login" element={isAuthenticated ? <Navigate to="/" />:<Login/>}/>
      <Route exact path="/register" element={isAuthenticated ? <Navigate to="/" />:<Register/>}/>
      <Route exact path="/registersuccess" element={isAuthenticated ? <Navigate to="/" />:<RegisterSuccess/>}/>

      <Route exact path="/cart" element={<Cart/>}/>

      <Route exact path="/forgotpass" element={isAuthenticated ? <Navigate to="/" />:<ForgotPass1/>}/>
      <Route exact path="/enterotp/:email" element={isAuthenticated ? <Navigate to="/" />:<ForgotPass2/>}/>
      <Route exact path="/resetpass/:otp/:email" element={isAuthenticated ? <Navigate to="/" />:<ForgotPass3/>}/>
      <Route exact path="/resetsuccess" element={isAuthenticated ? <Navigate to="/" />:<ResetSuccess/>}/>

      <Route exact path="*" element={ <Navigate to="/" />} />

    </Routes>
  )
}

export default App