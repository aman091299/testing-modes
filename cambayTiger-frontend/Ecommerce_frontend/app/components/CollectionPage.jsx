"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ProductCardContainer from "@/app/components/ProductCardContainer";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  BASE_URL,
  categories,
  filterValues,
  formattedValue,
} from "@/app/utils/constants";
import Loader from "@/app/components/Loader";

const CollectionPage = () => {
  console.log("inside collection.................")
  const [products, setProducts] = useState(null);
  const [loading,setLoading]=useState(true);
  const [filterCurrentIndex, setFilterCurrentIndex] = useState(-1);
  const [collectionDropdownCurrentIndex, setCollectionDropdownCurrentIndex] =useState(0);
  const [selectedFilters, setSelectedFilters] = useState({});
  const dropdownRef = useRef(null);
  const params = useParams();
  const formatedCollectionName = params.slug[0];

 
  const collectionName = formatedCollectionName
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\band\b/g, "&") // Replace 'and' with '&'
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word;

   
  const formatedTagName = params?.slug[1];
  const tagName = formatedTagName
    ?.replace(/-/g, " ") // Replace dashes with spaces
    ?.replace(/\band\b/g, "&") // Replace 'and' with '&'
    ?.replace(/\b\w/g, (char) => char.toUpperCase());

  const dynamicRoute = params?.slug?.join("/");
  const router = useRouter();
 

  
  useEffect(() => {
    const handleScroll = () => {
      setFilterCurrentIndex(-1);
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterCurrentIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    console.log("inside usefeefjjjjjjjjjj")
    getProductData(null);

    const category = categories?.find((cat) => cat.name === collectionName);
    
    const index = category?.dropdown?.findIndex((dropdownlist) => {
      return (
       formattedValue(dropdownlist)  ===
        formatedTagName
      );
    });
    setCollectionDropdownCurrentIndex(index);
  }, [dynamicRoute]);

  const handleTabClick = (collectionDropdownValue) => {
    const formatedLink = formattedValue(collectionDropdownValue);
    router.push("/collection/" + formatedCollectionName + "/" + formatedLink);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked, name } = e.target;

    if (checked) {
      setSelectedFilters((prev) => {
        const updated = { ...prev };

        if (!updated[name]) {
          updated[name] = [];
        }

        if (!updated[name].includes(value)) {
          updated[name].push(value);
        }

        return updated;
      });
    } else {
      setSelectedFilters((prev) => {
        const updated = { ...prev };

        updated[name] = updated[name]?.filter((item) => item !== value);

        return updated;
      });
    }
  };

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "") // remove special chars if needed
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };
  const getQueryString = (checkboxItems) => {
    const queryParams = [];
    for (const [key, values] of Object.entries(checkboxItems)) {
      const formattedKey = toCamelCase(key);

      values.forEach((value) => {
        const formattedValue = value.toLowerCase().replace(/\s+/g, "-");

        queryParams.push(formattedKey + "=" + formattedValue);
      });
    }
    const queryString = queryParams.join("&");

    return queryString;
  };

  const getProductData = async (checkboxItems) => {

    try {

      let queryStringValue = null;
      if (checkboxItems) {
        queryStringValue = getQueryString(checkboxItems);
        queryStringValue = "&" + queryStringValue;
      }
       let queryTagName="?tags="+formatedTagName ;
      let fullUrl = BASE_URL+"/product/viewAllProducts/" +formatedCollectionName

       if(formatedTagName){
        fullUrl= fullUrl+queryTagName;
       }
      if (queryStringValue && !formatedTagName) {
        fullUrl =fullUrl+"?"+queryStringValue;
      }
      if(queryStringValue && formatedTagName) {
        fullUrl =fullUrl+queryStringValue;
      }

      const products = await axios.get(fullUrl);
      setProducts(products?.data?.products);
    } catch (error) {
      console.error("Error in getting products" + error);
    }
    finally{
      console.log("insdie loading false.......")
      setLoading(false);
    }
    return;
  };


  if (loading) {
      console.log("insdie loading ")

    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="mx-12 pt-25">
      <p>
        <Link href="/">
          <span className="hover:text-orange-600"> Home </span>
        </Link>
        {" > "}
        <Link href={"/collection/" + formatedCollectionName}>
          <span className="hover:text-orange-600">{collectionName}</span>
        </Link>
        {" > "} <span className="text-orange-600">{tagName}</span>
      </p>
      <div className="font-bold  text-3xl mt-4">{collectionName}</div>
      <div>
        <div className="flex py-2 ">
          {categories?.map((catObj) => (
            <div className="flex " key={catObj?.name}>
              {catObj.name === collectionName &&
                catObj?.dropdown?.map((collectionDropdownValue, index) => (
                  <div
                    key={collectionDropdownValue}
                    className={
                      collectionDropdownCurrentIndex === index
                        ? "border-b-3 border-bg-orange-500 text-orange-500 py-3"
                        : "" +
                          " border-b-1 border-bg-[#ebebeb] px-5 cursor-pointer py-3"
                    }
                    onClick={() => {
                      if (collectionDropdownCurrentIndex !== index)
                        handleTabClick(collectionDropdownValue);
                    }}
                  >
                    {collectionDropdownValue}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="flex gap-3 py-2 ">
          {filterValues?.map((filterValue, index) => (
            <div key={filterValue.name}>
              <div
                className={
                  (filterCurrentIndex === index
                    ? "border-b-2 text-orange-500  "
                    : "text-[#8c8c8c]") +
                  " cursor-pointer  shadow-lg border-1 border-[#f1eded] px-4 py-3 rounded-lg flex items-center justify-center gap-2"
                }
                onClick={() => {
                  if (index === filterCurrentIndex) setFilterCurrentIndex(-1);
                  else setFilterCurrentIndex(index);
                }}
              >
                <div className="cursor-pointer font-semibold text-sm">
                  {filterValue?.name}
                </div>
                <div>
                  {filterCurrentIndex === index ? (
                    <svg
                      className=""
                      width="12"
                      height="6"
                      viewBox="0 0 12 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.8402 0.853933L6.38589 5.85337C6.33523 5.89986 6.27508 5.93673 6.20887 5.96189C6.14265 5.98705 6.07168 6 6 6C5.92832 6 5.85735 5.98705 5.79113 5.96189C5.72492 5.93673 5.66476 5.89986 5.61411 5.85337L0.159841 0.853933C0.0574964 0.760123 0 0.632889 0 0.500222C0 0.367555 0.0574964 0.240321 0.159841 0.146511C0.262185 0.0527015 0.400994 0 0.54573 0C0.690467 0 0.829275 0.0527015 0.93162 0.146511L6 4.79287L11.0684 0.146511C11.1191 0.100061 11.1792 0.0632154 11.2454 0.0380769C11.3116 0.0129384 11.3826 0 11.4543 0C11.5259 0 11.5969 0.0129384 11.6631 0.0380769C11.7293 0.0632154 11.7895 0.100061 11.8402 0.146511C11.8908 0.192961 11.931 0.248106 11.9585 0.308795C11.9859 0.369485 12 0.434532 12 0.500222C12 0.565912 11.9859 0.630959 11.9585 0.691649C11.931 0.752339 11.8908 0.807483 11.8402 0.853933Z"
                        fill="orange"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="rotate-180"
                      width="12"
                      height="6"
                      viewBox="0 0 12 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.8402 0.853933L6.38589 5.85337C6.33523 5.89986 6.27508 5.93673 6.20887 5.96189C6.14265 5.98705 6.07168 6 6 6C5.92832 6 5.85735 5.98705 5.79113 5.96189C5.72492 5.93673 5.66476 5.89986 5.61411 5.85337L0.159841 0.853933C0.0574964 0.760123 0 0.632889 0 0.500222C0 0.367555 0.0574964 0.240321 0.159841 0.146511C0.262185 0.0527015 0.400994 0 0.54573 0C0.690467 0 0.829275 0.0527015 0.93162 0.146511L6 4.79287L11.0684 0.146511C11.1191 0.100061 11.1792 0.0632154 11.2454 0.0380769C11.3116 0.0129384 11.3826 0 11.4543 0C11.5259 0 11.5969 0.0129384 11.6631 0.0380769C11.7293 0.0632154 11.7895 0.100061 11.8402 0.146511C11.8908 0.192961 11.931 0.248106 11.9585 0.308795C11.9859 0.369485 12 0.434532 12 0.500222C12 0.565912 11.9859 0.630959 11.9585 0.691649C11.931 0.752339 11.8908 0.807483 11.8402 0.853933Z"
                        fill="#858585"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
              {filterCurrentIndex === index && (
                <div
                  ref={dropdownRef}
                  className=" bg-white z-100 absolute py-2 mt-2 rounded-lg min-w-[270px]"
                >
                  <div className=" grid grid-cols-2 ">
                    {filterValue?.dropdownList?.map(
                      (filterDropdownValue, dropDownListIndex) => (
                        <div
                          key={dropDownListIndex}
                          className="flex gap-2 mx-6 "
                        >
                          <input
                            type="checkbox"
                            value={filterDropdownValue}
                            name={filterValue?.name}
                            checked={
                              !!selectedFilters[filterValue?.name]?.includes(
                                filterDropdownValue
                              )
                            }
                            onChange={handleCheckboxChange}
                            className="accent-orange-500  rounded focus:ring-orange-300"
                          />
                          <div className="text-sm leading-10">
                            {filterDropdownValue}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-evenly items-center px-4 pt-2 mt-2 w-full border-t-1  border-[#f1eded] ">
                    <div
                      className="btn text-sm text-[#8c8c8c]"
                      onClick={() => {
                        setSelectedFilters({});
                        getProductData(null);
                        setFilterCurrentIndex(-1);
                      }}
                    >
                      CLEAR ALL
                    </div>
                    <div
                      className="btn btn-neutral text-sm"
                      onClick={() => {
                        getProductData(selectedFilters);
                        setFilterCurrentIndex(-1);
                      }}
                    >
                      APPLY
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ProductCardContainer products={products} />
    </div>
  );
};

export default CollectionPage;
