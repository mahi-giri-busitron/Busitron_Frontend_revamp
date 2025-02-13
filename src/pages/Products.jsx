import React from 'react'


const data = [
    {id:1, icon:"pi pi-apple", name:"Support", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!"},
   { id:2, icon:" pi pi-graduation-cap", name:"Education", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!"},
   { id:3, icon:"pi pi-user", name:"Volunteers", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!"},
    {id:4, icon:"pi pi-box", name:"Donation", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!"},
]

const Products = () => {
  return (
    <div className="product h-[40vh] bg-white ">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
        {data.map((item, index) => (
          <div key={index} className="product_card p-4 w-full">
            <div className="product_wrapper bg-white text-center">
              <span className="h-[50px] w-[50px] rounded-full flex justify-center items-center bg-[#00715D] text-white text-xl">
                <i className={item.icon}></i>
              </span>
              <h6 className="text-lg md:text-xl text-left font-bold my-2  text-[#00715D]">{item.name}</h6>
              <p className="text-sm md:text-base text-left text-[10px] ">{item.description}</p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  </div>
  
  )
}

export default Products