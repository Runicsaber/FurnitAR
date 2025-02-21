import { searchProducts } from '@/lib/data';
import { routes } from '@/lib/route-list';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Quattrocento } from 'next/font/google';

const quattrocento = Quattrocento({ weight: '700', subsets: ['latin'] });

export default async function SearchList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const filteredProducts = await searchProducts(query, currentPage);

  return (
    <div className="py-6">
      <h2 className={`${quattrocento.className} font-bold text-xl`}>
        Browse products
      </h2>
      <div className="grid grid-cols-2  py-4 text-slate-400 gap-x-3 gap-y-5">
        {filteredProducts.map((item) => (
          <Link
            className="hover:bg-slate-50 dark:hover:bg-slate-50/10 transition-all delay-50 rounded-lg"
            href={routes.details(item.id_)}
            key={item.id_}
          >
            <div className="relative w-full h-40 bg-slate-100/0">
              <Image
                className="rounded-lg "
                src={item.contextualImageUrl}
                alt={item.name}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                sizes="(max-width: 640px) 100vw, 200px"
              ></Image>
            </div>
            <p className=" text-slate-800 mt-2 dark:text-slate-100">
              {item.name}
            </p>
            <p className=" text-slate-600 dark:text-slate-300">
              {item.typeName}
            </p>
            <span className=" text-slate-400">
              {formatPrice(item.price.currentPrice, item.price.currency)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
