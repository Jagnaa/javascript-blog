'use strict';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

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
  console.log('hrefAttribute:', hrefAttribute);
  const article = document.querySelector(hrefAttribute);
  article.classList.add('active');
};

const clearLinks = function(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
};

const generateTitleLinks = function(customSelector = ''){
  // const articles = document.querySelectorAll(optArticleSelector);
  console.log('customSelector:', customSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles:',articles);
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    // console.log('tagsWrapper:', tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('articleTags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('articleTagsArray:', articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      // console.log('tag:', tag);
      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      // console.log('tagLinkHTML:', tagLinkHTML);
      /* add generated code to html variable */
      html = html + ' ' + tagLinkHTML;
      // console.log('html:', html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:', tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTagLinks:', activeTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
  /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinksSameHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('allTagLinksSameHref', allTagLinksSameHref);
  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinksSameHref) {
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagsLinks = document.querySelectorAll('.list-horizontal a');
  console.log('tagsLinks:', tagsLinks);
  /* START LOOP: for each link */
  for(let tagLink of tagsLinks){
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

function generateAuthor(){
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);
  for(let article of articles){
    const authorWrapper = article.querySelector('.post-author');
    console.log('authorWrapper:', authorWrapper); 
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor:', articleAuthor);
    authorWrapper.innerHTML = articleAuthor;  
  }
}

generateTags();
clearLinks();
addClickListenersToTags();
generateAuthor();