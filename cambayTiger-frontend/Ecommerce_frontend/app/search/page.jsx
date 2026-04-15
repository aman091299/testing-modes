'use client'
 
import { useSearchParams } from 'next/navigation'
import { BASE_URL } from '../utils/constants'
import {useState,useEffect,useRef, useCallback} from "react";
import Loader from '../components/Loader';
import ProductCardContainer from '../components/ProductCardContainer';

const searchPage = () => {
    console.log("inside search page ....1233")

  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
   const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const searchParams = useSearchParams()
 const searchText = searchParams.get('searchText')
  const observerRef = useRef(null);

  const getSearchQueryProducts=async()=>{
      try {
        // setLoading(true);
        // if (!searchText || !hasMore) return;
        setIsFetching(true);
        const res=await fetch(BASE_URL+"/product/search?searchText="+searchText+"&page="+page+"&limit="+5,{credentials:'include'});
        const data =await res.json();
        console.log("data",data)
    if (page === 1) {
          setProducts(data.products);
        } else {
          //all the products including previous products
          setProducts(prev => {
            const prevProductsIds=new Set(prev.map(p=>p._id));
            const newProducts=data.products.filter(p=>!prevProductsIds.has(p._id));
          return [...prev, ...newProducts];
          })
        }
        if (data.countProducts < 5) {
          setHasMore(false); // no more pages
        }
      } catch (error) {
        console.log("Error while get search text products",error);
      }finally{
        setLoading(false);
        setIsFetching(false);

      }
  }


  // Infinite scroll trigger
  const lastProductRef = useCallback(node => {
    // if (isFetching) return;
   
    if (observerRef.current) observerRef.current.disconnect();
        

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
     setPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [hasMore]);

 useEffect(()=>{
  let timer;
       if(searchText){
    timer=setTimeout(()=>{
           getSearchQueryProducts();
  },900)
     }
    return ()=>clearTimeout(timer);
 },[searchText,page])

 useEffect(() => {
  setProducts([]);
  setPage(1);
  setHasMore(true);
  setIsFetching(false);
  setLoading(true);

}, [searchText]);

 if(loading){

 return  <div className="relative w-screen h-screen">
    <Loader/>
  </div>

 }
  return (
    <div className="py-28 px-9 ml-3">
      <h1 className="text-xl font-semibold mb-4">Search Results for: "{searchText}"</h1>
    <ProductCardContainer products={products} lastProductRef={lastProductRef}/>
      {isFetching && (
        <div className="relative w-screen h-screen">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default searchPage