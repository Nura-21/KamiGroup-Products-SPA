<template>
  <header class="header glass">
    <aside class="header-logo glass">
      <router-link to="/"
        ><img src="@/assets/images/logo.png" alt="Logo" draggable="false"
      /></router-link>
    </aside>
    <nav class="header-nav">
      <router-link to="/products" class="glass header-nav-link"
        >Продукты</router-link
      >
      <router-link to="/cities" class="glass header-nav-link"
        >Города</router-link
      >
    </nav>
    <aside class="header-contacts glass">
      <a href="https://t.me/trdln" target="_blank"
        ><i class="fa-brands fa-telegram"></i
      ></a>
      <a href="https://www.instagram.com/trdln_/" target="_blank">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/turdalin-nurassyl-86695723a/"
        target="_blank"
        ><i class="fa-brands fa-linkedin"></i
      ></a>
      <a href="mailto:n_turdalin@kbtu.kz"
        ><i class="fa-solid fa-envelope"></i
      ></a>
      <a href="tel:+77711196655"><i class="fa-solid fa-phone"></i></a>
    </aside>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>
