import { ProductCard } from './ProductCard';
import { TestConnectionApi } from './TestConnectionApi';
import { useHomepage } from '../hooks/useHomepage';
import { getImageUrl } from '../utils/getImageUrl';

interface HomeProps {
}

export function Home({}: HomeProps) {

  const { isLoading, error, data } = useHomepage();
  const productRetrieved = data;

  return (
    <div className='pb-5' >
    <div className="carousel relative container mx-auto" style={{ maxWidth: '1600px' }}>
        <div className="carousel-inner relative overflow-hidden w-full">
          <div className="carousel-item absolute opacity-0" style={{ height: '50vh', opacity: 1, position: 'static' }}>
            <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" 
            style={{ backgroundImage: `url('${getImageUrl('/shared/bakery_header_1536x1024.jpg')}')` }}>
            </div>
          </div>
          <label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
        </div>
      </div>

      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <TestConnectionApi />
          
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                New Arrivals
              </a>
            </div>
          </nav>
          {/* Product Cards */}
          {productRetrieved.newArrivals.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}

          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                Trending Products
              </a>
            </div>
          </nav>
          {/* Product Cards */}
          {productRetrieved.trendings.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}

          
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                On Sales
              </a>
            </div>
          </nav>
          {/* Product Cards */}
          {productRetrieved.onSales.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container pb-2 px-6 mx-auto">
          <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8" href="#">About</a>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Vitae aliquet nec ullamcorper sit. Nullam eget felis eget nunc lobortis mattis aliquam. In est ante in nibh mauris. Egestas congue quisque egestas diam in. Facilisi nullam vehicula ipsum a arcu. Nec nam aliquam sem et tortor consequat. </p>
        </div>
      </section>
      
    </div>
  );
}