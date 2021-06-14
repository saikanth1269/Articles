const ArticlesAPI = {
    getArticles() {
      return config.API.get(`/director/settings/targets?filter=${data.filter==='prof-teacher'? 'prof' : data.filter }` + (data.id!=undefined ?  `&id_teacher=${data.id}` : '') )
    },
  
  };
  export { ArticlesAPI }