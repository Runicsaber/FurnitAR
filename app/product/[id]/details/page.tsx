import { fetchProduct } from '@/lib/data';
import { Product, ProductWith3d } from '@prisma/client';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGalleryComponent from '@/components/ui/product-details/image-gallery';
import { getRandomNumber } from '@/lib/utils';
import RatingComponent from '@/components/ui/product-details/rating';
import Link from 'next/link';
import { routes } from '@/lib/route-list';
import FavButton from '@/components/ui/product-details/fav-button';
import { checkFavorite } from '@/lib/actions';
import { getUserInfo } from '@/lib/userfunctions';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import ArrowBack from '@/components/ui/arrow-back';

type ProductFull = Product & {
  productWith3d?: ProductWith3d;
};

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserInfo();
  const email = user?.email;

  if (!params.id) return;
  const product = (await fetchProduct(params.id)) as ProductFull;
  if (!product.id) return;
  const isFavorite = email ? await checkFavorite(product.id, email) : false;
  // console.log('Product: ', isFavorite, product);

  const productImages = [
    {
      original: product.contextualImageUrl,
      thumbnail: product.contextualImageUrl,
    },
    {
      original: product.image,
      thumbnail: product.image,
    },
  ];

  //start - if a product has variants, add them to the images array
  const variants = product.variants.length
    ? product.variants.map((variant) => {
        return {
          original: variant.contextualImageUrl ?? variant.image,
          thumbnail: variant.contextualImageUrl ?? variant.image,
        };
      })
    : null;

  const images = variants ? [...variants, ...productImages] : productImages;
  //end - if a product has variants, add them to the images array

  return (
    <section className="flex flex-col gap-6 md:max-w-xl md:mx-auto">
      <div className="px-6 pb-20 pt-5">
        <ArrowBack />
        <div className="">
          <ImageGalleryComponent images={images} />
          <div className="row flex justify-between items-center py-4 text-slate-300">
            <div className="rating">
              <RatingComponent />
              <span className="ml-3 text-sm text-slate-500">
                ({getRandomNumber(200)})
              </span>
            </div>
            <FavButton
              productId={product.id}
              isFavorite={isFavorite}
              user={user}
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl pb-2">{product.name}</h1>
          <div className="flex flex-wrap gap-2">
            {product.categoryPath.map((subcategory) => (
              <button
                key={subcategory.key}
                className="p-[3px] border rounded-lg border-slate-400 p text-slate-400 text-sm hover:scale-105 transition-all delay-50"
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>
        <p className="my-4">{product.description}</p>

        <div>
          <h2 className="text-lg">Specifications:</h2>
          <p>
            {product.measurement.length
              ? product.measurement
              : 'No measurements'}
          </p>
        </div>

        {product.productWith3d && (
          <Link
            href={routes.details3D(product.id_)}
            className="inline-flex gap-2 items-center justify-center transition-all delay-50 bg-blue-600 hover:bg-blue-800 rounded-lg text-white p-2 text-center w-full my-2"
          >
            <ArrowPathIcon className="aria-hidden size-5" />
            View in 3D
          </Link>
        )}
      </div>
    </section>
  );
}
