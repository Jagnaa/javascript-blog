'use strict';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author a';
const optTagsListSelector = '.tags.list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const hrefAttribute = clickedElement.getAttribute('href');
  const article = document.querySelector(hrefAttribute);
  article.classList.add('active');
};

const clearLinks = function(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
};

const generateTitleLinks = function(customSelector = ''){
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  let html = '';
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray) {
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + ' ' + tagLinkHTML;
      if(allTags.indexOf(tagLinkHTML) == -1){
        allTags.push(tagLinkHTML); 
      }
      tagsWrapper.innerHTML = html;
    }
  }
  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTags.join(' ');
};

const tagClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }
  const allTagLinksSameHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of allTagLinksSameHref) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function(){
  const tagsLinks = document.querySelectorAll('.list-horizontal a');
  for(let tagLink of tagsLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
};

const generateAuthors = function(){
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);
  for(let article of articles){
    const authorWrapper = article.querySelector('.post-author');
    const articleAuthor = article.getAttribute('data-author');
    const authorLink = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    authorWrapper.innerHTML = authorLink;  
  }
};

const authorClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#author-', '');
  generateTitleLinks('[data-author="' + tag + '"]');
};

const addClickListenersToAuthors = function() {
  const authorsLinks = document.querySelectorAll(optArticleAuthorSelector);
  for(let authorLink of authorsLinks)
    authorLink.addEventListener('click', authorClickHandler); 
};


clearLinks();
generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();