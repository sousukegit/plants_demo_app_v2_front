<script setup lang="ts">
  import { register } from 'swiper/element/bundle';
  register();
</script>

<template>
  <swiper-container
            navigation="true"
            pagination="true"
            scrollbar="true"
            >
              <swiper-slide
              >
              <div>
                  <a href="#" target="_blank">
                    <img class="object-cover h-80 lg:h-96 mx-auto w-full xl:max-w-screen-lg" src="/assets/images/plantimage.jpg" />
                  </a>
                  </div>
              </swiper-slide>
    </swiper-container>
  <TheContainer>

  <WhiteContainer>

    <AppLink  :href="`/place`">場所から探す</AppLink>
    <AppLink  :href="`/species`">種類から探す</AppLink>
  </WhiteContainer>

  </TheContainer>
</template>