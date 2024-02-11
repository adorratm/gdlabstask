<template>
  <div class="navbar bg-base-300 sticky top-0 z-50">
    <div class="flex-none">
      <label class="btn btn-square btn-ghost drawer-button" for="my-drawer">
        <Icon name="gg:menu" size="2em" />
      </label>
    </div>
    <div class="flex-1">
      <NuxtLink to="/" title="GD Labs Job Application Task" class="btn btn-ghost sm:text-sm md:text-base lg:text-lg  w-fit">GD Labs Job Application Task</NuxtLink>
    </div>

    <div class="flex justify-end px-2">
      <details @blur="" class="dropdown dropdown-end">
        <summary class="btn btn-square btn-ghost">
          <Icon name="mdi:user-circle" size="2em" />
        </summary>
        <ul  class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box p-auto">
          <li class="text-center align-middle flex-1 justify-center">
            <NuxtLink to="mailto:emrekilic19983@gmail.com" title="Emre KILIÇ" class="flex flex-col gap-0">
              <span>Emre KILIÇ</span>
              <span class="divider m-0"></span>
            </NuxtLink>
            
          </li>
          <li>
            <NuxtLink
              to="https://linkedin.com/in/emrekilic98"
              title="Emre KILIÇ Linkedin"
              target="_blank"
            >
              <Icon name="mdi:linkedin" class="text-[#0a66c2]" size="1.5em" />
              Linkedin
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://github.com/adorratm"
              title="Emre KILIÇ Github"
              target="_blank"
            >
              <Icon name="mdi:github" size="1.5em" />
              Github
            </NuxtLink>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>