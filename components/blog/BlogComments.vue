<template>
  <div>
    <!-- Comment Container -->
    <div
      v-for="(comment, index) in commentList"
      :key="index"
      class="flex w-full justify-between bg-base-100 border my-2 rounded-md"
    >
      <div class="p-3" :style="{ marginLeft: comment.indentLevel * 20 + 'px' }">
        <div class="flex gap-3 items-center">
          <img
            :src="comment.authorAvatar"
            class="object-cover w-10 h-10 rounded-full border-2 border-emerald-400 shadow-emerald-400"
          />
          <h3 class="font-bold">
            {{ comment.author }}
            <br />
            <span class="text-sm text-gray-400 font-normal"
              >{{ comment.email }}</span
            >
          </h3>
        </div>
        <p class="text-gray-600 mt-2" v-html="formatCommentBody(comment.body)">
        </p>
        <div class="flex gap-3 items-center">
          <button @click="likeComment(index)" class="text-right text-blue-500">
            <svg
              class="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {{ comment.likes }}
          </button>
          <button @click="dislikeComment(index)" class="text-right text-blue-500">
            <svg
              class="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-3 pr-3 py-3">
        <div>
          <svg
            class="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
        <div>
          <svg
            class="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- END Comment Container  -->

    <!-- Comment Form -->
    <div class="w-full px-3 mb-2 mt-6">
      <textarea
        v-model="newComment.body"
        class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
        name="body"
        placeholder="Comment"
        required
      ></textarea>
    </div>

    <div class="w-full flex justify-end px-3 my-3">
      <button
        @click="postComment"
        class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg"
      >
        Post Comment
      </button>
    </div>
    <!-- END Comment Form -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const commentList = ref([...props.comments]);

commentList.value.forEach((comment) => {
    comment.likes = Math.floor(Math.random() * 100); // Rastgele 0-100 arası beğeni sayısı
    comment.authorLevel = Math.floor(Math.random() * 10); // Rastgele 0-10 arası seviye
    comment.authorAvatar = `https://api.dicebear.com/7.x/lorelei/svg?seed=${comment.author}`; // Yorumu gönderen kullanıcının avatar URL'si
    comment.author = comment.email.split("@")[0]; // Yorumu gönderen kullanıcının adı
    comment.indentLevel = 0; // Varsayılan girinti seviyesi
  const randomMinutes = Math.floor(Math.random() * (60 * 24 * 7)); // 7 gün içinde rastgele dakika
  comment.date = new Date(Date.now() - randomMinutes * 60000); // Şu andan rastgele dakika öncesi
});

const newComment = ref({ body: "" });

const postComment = async () => {
  try {
    // Burada yeni yorumu göndermek için bir HTTP isteği gönderin
    // Örnek olarak JSONPlaceholder'a bir POST isteği gönderebilirsiniz.
    console.log("Posting comment:", newComment.value.body);
    // Başarılı bir şekilde yorum gönderildikten sonra comments dizisine de ekleyebilirsiniz.
    commentList.value.unshift({
      body: newComment.value.body,
      author: "adorratm", // Yorumu gönderen kullanıcının adını buraya ekleyin.
      authorAvatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=adorratm`, // Kullanıcının avatar URL'sini buraya ekleyin.
      date: new Date(), // Şu anki zaman
      indentLevet: 0, // Varsayılan girinti seviyesi
    });
    // Yorum gönderildikten sonra metni sıfırlayın
    newComment.value.body = "";
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

const likeComment = (index) => {
    commentList.value[index].likes++;
};

const dislikeComment = (index) => {
  commentList.value[index].likes--;
};

const deleteComment = (index) => {
    commentList.value.splice(index, 1);
};

const editComment = (index) => {
  // Yorumu düzenleme işlemleri
};

const replyToComment = (index) => {
  // Yoruma yanıt verme işlemleri
  // @ işaretiyle etiketleme
  newComment.value.body = `@${commentList.value[index].author} `;
};

const formatCommentBody = (body) => {
    // Yorumda @ işaretiyle etiketlenen kullanıcıları bulma
    const explodedBody = body.split(" ");
    let splittedWord = "";
    explodedBody.forEach((word, index) => {
        splittedWord = word.split("@")[0];
    });
    const findComment = commentList.value.find((comment) => comment?.email?.split("@")[0] === splittedWord);
  // @ işaretiyle etiketlenen kullanıcıları yorumda link haline getirme
  return body.replace(/@(\w+)/g, '<a class="text-primary font-bold" href="'+findComment?.email+'" target="_blank">@$1</a>');
};
</script>
