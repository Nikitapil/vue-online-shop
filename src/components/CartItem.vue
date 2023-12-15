<template>
  <div class="flex justify-between items-center gap-3 w-full border border-slate-200 p-4 rounded-xl">
    <img
      class="w-16 h-16"
      src="/sneakers/sneakers-1.jpg"
      alt="Sneaker"
    />
    <div class="flex flex-col gap-2">
      <p>Sneakers Nike AirMax 700</p>
      <!--      TODO buttons for increase count and decrease count-->
      <div class="flex justify-between">
        <b>12990руб</b>
        <button>
          <img
            class="opacity-50 hover:opacity-100 transition duration-300"
            src="/close.svg"
            alt="cross"
          />
        </button>
      </div>
    </div>
  </div>
</template>
