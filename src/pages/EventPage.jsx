
import React from 'react';

const data=[
    {id:1, img:"https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D", name:"Jassoore", date:"02/12/2025",},
    {id:2, img:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D", name:"Jassoore", date:"02/12/2025",},
    {id:3, img:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D", name:"Jassoore", date:"02/12/2025",},
   

]

const EventPage = () => {
  return (
    <div className="event_page">
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="heading_content">
        <h6 className="text-[#00715D] text-lg md:text-xl lg:text-2xl text-center font-bold my-2">
          Our Event
        </h6>
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold my-2">
          Our Upcoming Event
        </h1>
      </div>
  
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div className="p-4" key={item.id}>
            <div
              className="image_wrapper_product text-white p-6 rounded-lg shadow-md flex justify-center items-center bg-center bg-no-repeat bg-cover h-[200px]"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="content button_wrapper_left text-center">
                <h5 className="text-lg font-semibold">{item.name}</h5>
                <p className="text-sm">{item.date}</p>
              </div>
              {/* Overlay */}
              <div className="overlay bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white font-bold">Hello World</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  )
}

export default EventPage