"use client";

import React from "react";

export default function Assorti() {
  return (
    <div>
      <div className="text-center text-3xl font-bold p-10 text-blue-600">НАШ АССОРТИМЕНТ</div>
      <div className="container w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center">
        <figure class="relative  max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a className="" href="/relax">
            <img
              className="rounded-lg h-60"
              src="./images/relax.jpg"
              alt="image description"
            ></img>
          </a>
          <figcaption class="absolute px-4 text-lg text-white bottom-6">
          <p className="font-bold text-2xl">
                ОТДЫХ
            </p>
          </figcaption>
        </figure>
        <figure class="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="/outside">
            <img
              className="rounded-lg  h-60"
              src="./images/силовые.png"
              alt="image description"
            ></img>
          </a>
          <figcaption class="absolute px-4 text-lg text-white bottom-6">
            <p className="font-bold text-2xl">
                ТРЕНАЖЕРЫ
            </p>
          </figcaption>
        </figure>
        <figure class="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="/house">
            <img
              className="rounded-lg  h-60"
              src="./images/atHome.jpg"
              alt="image description"
            ></img>
          </a>
          <figcaption class="absolute px-4 text-lg text-white bottom-6">
          <p className="font-bold text-2xl">
                ФИТНЕС
            </p>
          </figcaption>
        </figure>
        <figure class="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="/fight">
            <img
              class="rounded-lg  h-60"
              src="./images/стадион.jpg"
              alt="image description"
            ></img>
          </a>
          <figcaption class="absolute px-4 text-lg text-white bottom-6">
          <p className="font-bold text-2xl">
                ЛЕГКАЯ АТЛЕТИКА
            </p>
          </figcaption>
        </figure>
      </div>
      <div className="container w-full mx-auto text-center">
      <div class="inline-flex items-center justify-center w-full">
    <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded "></hr>
    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-700 " viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
    </div>
</div>
<p class="text-gray-500 ">Мы также предлагаем услугу по доставке товаров, чтобы обеспечить нашим клиентам максимальный комфорт и удобство при покупке.

Мы уверены, что наши товары будут полезны для любого спортсмена, от начинающего до проессионального уровня. Спасибо, что выбираете нас!</p>
      </div>
    </div>
  );
}
