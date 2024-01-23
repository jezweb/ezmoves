/*! elementor-pro - v3.18.0 - 20-12-2023 */"use strict";(self["webpackChunkelementor_pro"]=self["webpackChunkelementor_pro"]||[]).push([["video-playlist"],{"../modules/video-playlist/assets/js/frontend/base-tabs.js":
/*!*****************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/base-tabs.js ***!
  \*****************************************************************/
((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;class baseTabs extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{tablist:'[role="tablist"]',tabTitle:'.e-tab-title',tabContent:'.e-tab-content'},classes:{active:'e-active'},showTabFn:'show',hideTabFn:'hide',toggleSelf:true,hidePrevious:true,autoExpand:true,keyDirection:{ArrowLeft:elementorFrontendConfig.is_rtl?1:-1,ArrowUp:-1,ArrowRight:elementorFrontendConfig.is_rtl?-1:1,ArrowDown:1}};}
getDefaultElements(){const selectors=this.getSettings('selectors');return{$tabTitles:this.findElement(selectors.tabTitle),$tabContents:this.findElement(selectors.tabContent)};}
activateDefaultTab(videoId){const settings=this.getSettings();if(!settings.autoExpand||'editor'===settings.autoExpand&&!this.isEdit){return;}
const defaultActiveTab=this.getEditSettings('activeItemIndex')||videoId||1,originalToggleMethods={showTabFn:settings.showTabFn,hideTabFn:settings.hideTabFn};this.setSettings({showTabFn:'show',hideTabFn:'hide'});this.changeActiveTab(defaultActiveTab);this.setSettings(originalToggleMethods);}
handleKeyboardNavigation(event){const tab=event.currentTarget,$tabList=jQuery(tab.closest(this.getSettings('selectors').tablist)),$tabs=$tabList.find(this.getSettings('selectors').tabTitle),isVertical='vertical'===$tabList.attr('aria-orientation');switch(event.key){case'ArrowLeft':case'ArrowRight':if(isVertical){return;}
break;case'ArrowUp':case'ArrowDown':if(!isVertical){return;}
event.preventDefault();break;case'Home':event.preventDefault();$tabs.first().trigger('focus');return;case'End':event.preventDefault();$tabs.last().trigger('focus');return;default:return;}
const tabIndex=tab.getAttribute('data-tab')-1,direction=this.getSettings('keyDirection')[event.key],nextTab=$tabs[tabIndex+direction];if(nextTab){nextTab.focus();}else if(-1===tabIndex+direction){$tabs.last().trigger('focus');}else{$tabs.first().trigger('focus');}}
deactivateActiveTab(tabIndex){const settings=this.getSettings(),activeClass=settings.classes.active,activeFilter=tabIndex?'[data-tab="'+tabIndex+'"]':'.'+activeClass,$activeTitle=this.elements.$tabTitles.filter(activeFilter),$activeContent=this.elements.$tabContents.filter(activeFilter);$activeTitle.add($activeContent).removeClass(activeClass);$activeTitle.attr({tabindex:'-1','aria-selected':'false'});$activeContent[settings.hideTabFn]();$activeContent.attr('hidden','hidden');}
activateTab(tabIndex){const settings=this.getSettings(),activeClass=settings.classes.active,$requestedTitle=this.elements.$tabTitles.filter('[data-tab="'+tabIndex+'"]'),$requestedContent=this.elements.$tabContents.filter('[data-tab="'+tabIndex+'"]'),animationDuration='show'===settings.showTabFn?0:400;$requestedTitle.add($requestedContent).addClass(activeClass);$requestedTitle.attr({tabindex:'0','aria-selected':'true'});$requestedContent[settings.showTabFn](animationDuration,()=>elementorFrontend.elements.$window.trigger('resize'));$requestedContent.removeAttr('hidden');}
isActiveTab(tabIndex){return this.elements.$tabTitles.filter('[data-tab="'+tabIndex+'"]').hasClass(this.getSettings('classes.active'));}
bindEvents(){this.elements.$tabTitles.on({keydown:event=>{if(jQuery(event.target).is('a')&&`Enter`===event.key){event.preventDefault();}
if(['End','Home','ArrowUp','ArrowDown'].includes(event.key)){this.handleKeyboardNavigation(event);}},keyup:event=>{switch(event.key){case'ArrowLeft':case'ArrowRight':this.handleKeyboardNavigation(event);break;case'Enter':case'Space':event.preventDefault();this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));break;}},click:event=>{event.preventDefault();this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));}});}
onInit(){super.onInit(...arguments);}
changeActiveTab(tabIndex){const isActiveTab=this.isActiveTab(tabIndex),settings=this.getSettings();if((settings.toggleSelf||!isActiveTab)&&settings.hidePrevious){this.deactivateActiveTab();}
if(!settings.hidePrevious&&isActiveTab){this.deactivateActiveTab(tabIndex);}
if(!isActiveTab){this.activateTab(tabIndex);}}}
exports["default"]=baseTabs;}),"../modules/video-playlist/assets/js/frontend/event-trigger.js":
/*!*********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/event-trigger.js ***!
  \*********************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=triggerEvent;var _playlistEvent=_interopRequireDefault(__webpack_require__(/*! ./playlist-event */"../modules/video-playlist/assets/js/frontend/playlist-event.js"));function getEventTabsObject(widgetObject){const currentInnerTabsTitleElements=widgetObject.elements.$innerTabs.filter('.e-active').find('.e-inner-tabs-wrapper .e-inner-tab-title');if(currentInnerTabsTitleElements.length){const activeInnerTabTitleElement=currentInnerTabsTitleElements.filter('.e-inner-tab-active');return{name:activeInnerTabTitleElement.text().trim(),index:activeInnerTabTitleElement.index()+1};}
return{name:'none',index:'none'};}
function getEventPlaylistObject(widgetObject,positionInVideoList){const currentVideoIndex=positionInVideoList||widgetObject.currentPlaylistItemIndex;return{name:widgetObject.getElementSettings('playlist_title'),currentItem:currentVideoIndex,amount:widgetObject.playlistItemsArray.filter(video=>video.videoType!=='section').length};}
function getEventVideoObject(widgetObject,positionInVideoList){const currentVideoIndex=positionInVideoList||widgetObject.currentPlaylistItemIndex,currentVideo=widgetObject.playlistItemsArray[currentVideoIndex-1];return{provider:currentVideo.videoType,url:currentVideo.videoUrl,title:currentVideo.videoTitle,duration:currentVideo.videoDuration};}
async function getEventEventObject(widgetObject,eventType,eventTrigger,positionInVideoList){const currentVideoIndex=positionInVideoList||widgetObject.currentPlaylistItemIndex,currentVideo=widgetObject.playlistItemsArray[currentVideoIndex-1];return{type:eventType,time:await currentVideo.playerInstance.getCurrentTime(),element:widgetObject.$element,trigger:eventTrigger,watchCount:currentVideo.playerInstance.watchCount};}
async function triggerEvent(widgetObject,eventType,eventTrigger,positionInVideoList){const currentEvent=new _playlistEvent.default({event:await getEventEventObject(widgetObject,eventType,eventTrigger,positionInVideoList),tab:getEventTabsObject(widgetObject),playlist:getEventPlaylistObject(widgetObject,positionInVideoList),video:getEventVideoObject(widgetObject,positionInVideoList)});jQuery('body').trigger('elementor-video-playList',currentEvent);}}),"../modules/video-playlist/assets/js/frontend/handler.js":
/*!***************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/handler.js ***!
  \***************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;var _baseTabs=_interopRequireDefault(__webpack_require__(/*! ./base-tabs */"../modules/video-playlist/assets/js/frontend/base-tabs.js"));var _playerYoutube=_interopRequireDefault(__webpack_require__(/*! ./player-youtube */"../modules/video-playlist/assets/js/frontend/player-youtube.js"));var _playerVimeo=_interopRequireDefault(__webpack_require__(/*! ./player-vimeo */"../modules/video-playlist/assets/js/frontend/player-vimeo.js"));var _playerHosted=_interopRequireDefault(__webpack_require__(/*! ./player-hosted */"../modules/video-playlist/assets/js/frontend/player-hosted.js"));var _scrollUtils=__webpack_require__(/*! ./scroll-utils */"../modules/video-playlist/assets/js/frontend/scroll-utils.js");var _innerTabs=__webpack_require__(/*! ./inner-tabs */"../modules/video-playlist/assets/js/frontend/inner-tabs.js");var _urlParams=__webpack_require__(/*! ./url-params */"../modules/video-playlist/assets/js/frontend/url-params.js");var _eventTrigger=_interopRequireDefault(__webpack_require__(/*! ./event-trigger */"../modules/video-playlist/assets/js/frontend/event-trigger.js"));class VideoPlaylistHandler extends _baseTabs.default{getDefaultSettings(){const defaultSettings=super.getDefaultSettings(),selectors={tabsWrapper:'.e-tabs-items-wrapper',tabsItems:'.e-tabs-items',toggleVideosDisplayButton:'.e-tabs-toggle-videos-display-button',videos:'.e-tabs-content-wrapper .e-tab-content',innerTabs:'.e-tabs-inner-tabs .e-tab-content',imageOverlay:'.elementor-custom-embed-image-overlay'};return{...defaultSettings,selectors:{...defaultSettings.selectors,...selectors}};}
getDefaultElements(){const elements=super.getDefaultElements(),selectors=this.getSettings('selectors');return{...elements,$tabsWrapper:this.findElement(selectors.tabsWrapper),$tabsItems:this.findElement(selectors.tabsItems),$toggleVideosDisplayButton:this.findElement(selectors.toggleVideosDisplayButton),$videos:this.findElement(selectors.videos),$innerTabs:this.findElement(selectors.innerTabs),$imageOverlay:this.findElement(selectors.imageOverlay)};}
initEditorListeners(){super.initEditorListeners();this.editorListeners.push({event:'elementorPlaylistWidget:fetchVideoData',to:elementor.channels.editor,callback:e=>{this.getCurrentPlayerSelected().setVideoProviderData().then(()=>{e.currentItem=this.getCurrentItemSelected();elementor.channels.editor.trigger('elementorPlaylistWidget:setVideoData',e);});}});}
bindEvents(){super.bindEvents();this.elements.$imageOverlay.on({click:e=>{e.currentTarget.remove();this.getCurrentPlayerSelected().play();}});this.elements.$innerTabs.on({click:event=>{(0,_innerTabs.handleInnerTabs)(event,this);}});this.elements.$tabsItems.on({scroll:event=>{(0,_scrollUtils.handleVideosPanelScroll)(this.elements,event);}});this.elements.$toggleVideosDisplayButton.on({click:event=>{jQuery(event.target).toggleClass('rotate-up');jQuery(event.target).toggleClass('rotate-down');this.elements.$tabsWrapper.slideToggle('slow');}});}
onInit(){super.onInit(...arguments);this.playlistId=this.getID();this.storageKey='watched_videos_'+this.getID();const storageObject=elementorFrontend.storage.get(this.storageKey);if(storageObject){this.watchedVideosArray=JSON.parse(storageObject);}else{this.watchedVideosArray=[];}
this.watchedIndication=this.getElementSettings('show_watched_indication');(0,_scrollUtils.handleVideosPanelScroll)(this.elements);this.isAutoplayOnLoad='yes'===this.getElementSettings('autoplay_on_load');this.isAutoplayNextUp='yes'===this.getElementSettings('autoplay_next');this.isFirstVideoActivated=true;this.createPlaylistItems();this.isCollapsible=this.getElementSettings('inner_tab_is_content_collapsible');this.innerTabsHeightLimit=this.getElementSettings('inner_tab_collapsible_height');this.currentPlayingPlaylistItemIndex=1;this.activateInitialVideo();this.activateInnerTabInEditMode();}
onEditSettingsChange(propertyName){if('panel'===propertyName){this.preventTabActivation=true;}
if('activeItemIndex'!==propertyName){return;}
if(this.preventTabActivation){this.preventTabActivation=false;return;}
this.activateDefaultTab();}
activateInitialVideo(){this.isPageOnLoad=true;const isLazyLoad=!!this.getElementSettings('lazy_load'),initialTabIndex=(0,_urlParams.handleURLParams)(this.playlistId,this.playlistItemsArray);let isUrlParamsExist=false;if(initialTabIndex){this.currentPlaylistItemIndex=initialTabIndex;this.currentPlayingPlaylistItemIndex=initialTabIndex;isUrlParamsExist=true;}else{this.currentPlaylistItemIndex=1;this.currentPlayingPlaylistItemIndex=1;}
if(this.isAutoplayOnLoad&&!isUrlParamsExist){(0,_urlParams.setVideoParams)(this.playlistId,this.playlistItemsArray,this.currentPlaylistItemIndex);}
if(isUrlParamsExist){this.$element[0]?.scrollIntoView({behavior:'smooth'});}
this.handleFirstVideoActivation(isLazyLoad);}
handleFirstVideoActivation(isLazyLoad){if(!isLazyLoad){this.activateDefaultTab(this.currentPlaylistItemIndex);return;}
const playlistElement=document.querySelector('.elementor-element-'+this.playlistId+' .e-tabs-main-area'),observer=elementorModules.utils.Scroll.scrollObserver({callback:event=>{if(event.isInViewport){this.activateDefaultTab(this.currentPlaylistItemIndex);observer.unobserve(playlistElement);}}});observer.observe(playlistElement);}
getCurrentItemSelected(){return this.playlistItemsArray[this.currentPlaylistItemIndex-1];}
getCurrentPlayerSelected(){return this.getCurrentItemSelected().playerInstance;}
getCurrentPlayerPlaying(){return this.playlistItemsArray[this.currentPlayingPlaylistItemIndex-1].playerInstance;}
isVideoShouldBePlayed(){if(this.currentPlayingPlaylistItemIndex!==this.currentPlaylistItemIndex){if(this.getCurrentPlayerPlaying()){this.getCurrentPlayerPlaying().pause();}
this.currentPlayingPlaylistItemIndex=this.currentPlaylistItemIndex;}else if(this.getCurrentPlayerPlaying().isVideoPlaying){this.getCurrentPlayerPlaying().pause();return false;}
return true;}
activateInnerTabInEditMode(){if(this.isEdit&&this.getEditSettings('innerActiveIndex')){const innerTabActivated=this.getEditSettings('innerActiveIndex'),innerTabs=jQuery(this.elements.$innerTabs.eq(this.currentPlaylistItemIndex-1).find('.e-inner-tab-title a'));innerTabs[innerTabActivated].click();}}
handleVideo(playListItem){if(playListItem.playerInstance){if(this.isVideoShouldBePlayed()){if(1===this.currentPlaylistItemIndex&&this.elements.$imageOverlay){this.elements.$imageOverlay.remove();}
this.playVideoAfterCreation(playListItem);}}else{const players={youtube:_playerYoutube.default,vimeo:_playerVimeo.default,hosted:_playerHosted.default};playListItem.playerInstance=new players[playListItem.videoType](playListItem,this.currentPlaylistItemIndex);playListItem.playerInstance.create().then(()=>{if(this.isVideoShouldBePlayed()){this.playVideoOnCreation(playListItem);}
playListItem.playerInstance.handleFullScreenChange(isEnterFullScreenMode=>{(0,_eventTrigger.default)(this,isEnterFullScreenMode?'videoFullScreen':'videoExitFullScreen','click');});playListItem.playerInstance.handlePlayed(()=>{const currentPlaylistItem=this.getCurrentItemSelected();let videoTrigger='click';if(currentPlaylistItem.isAutoplayOnLoad){videoTrigger='onLoad';playListItem.isAutoplayOnLoad=false;}else if(currentPlaylistItem.isAutoPlayNextUp){videoTrigger='nextVideo';}
(0,_eventTrigger.default)(this,currentPlaylistItem.playerInstance.isVideoPausedLocal?'videoResume':'videoStart',videoTrigger);});playListItem.playerInstance.handleEnded(()=>{(0,_eventTrigger.default)(this,'videoEnded','click');if(this.watchedIndication){this.elements.$tabTitles.filter('.e-active').addClass('watched-video');}
const endedVideoId=this.getCurrentItemSelected().dataItemId;if(!this.watchedVideosArray.includes(endedVideoId)&&this.watchedIndication){this.watchedVideosArray.push(this.getCurrentItemSelected().dataItemId);elementorFrontend.storage.set(this.storageKey,JSON.stringify(this.watchedVideosArray));}
if(this.isAutoplayNextUp){if(this.playlistItemsArray.length>=++this.currentPlaylistItemIndex){while('section'===this.getCurrentItemSelected().videoType){this.currentPlaylistItemIndex++;if(this.playlistItemsArray.length<this.currentPlaylistItemIndex){this.currentPlaylistItemIndex=this.playlistItemsArray.length;return;}}
this.changeActiveTab(this.currentPlaylistItemIndex,true);}}});playListItem.playerInstance.handlePaused(positionInVideoList=>{(0,_eventTrigger.default)(this,'videoPaused','click',positionInVideoList);});});}}
playVideoAfterCreation(playListItem){playListItem.playerInstance.play();}
playVideoOnCreation(playListItem){if(this.isAutoplayOnLoad){playListItem.isAutoplayOnLoad=true;playListItem.playerInstance.mute();playListItem.playerInstance.play();this.isAutoplayOnLoad=false;}else if(!this.isFirstVideoActivated){playListItem.isAutoPlayNextUp=true;playListItem.playerInstance.play();}
this.isFirstVideoActivated=false;}
createPlaylistItems(){this.playlistItemsArray=[];this.elements.$videos.each((index,tabContent)=>{const playListItem={};const $tabContent=jQuery(tabContent);playListItem.videoUrl=$tabContent.attr('data-video-url');playListItem.videoType=$tabContent.attr('data-video-type');playListItem.videoTitle=$tabContent.attr('data-video-title');playListItem.videoDuration=$tabContent.attr('data-video-duration');playListItem.tabContent=tabContent;playListItem.dataTab=index+1;playListItem.dataItemId=this.getElementSettings().tabs[index]._id;this.playlistItemsArray.push(playListItem);});if(this.watchedVideosArray.length>0&&this.watchedIndication){this.watchedVideosArray.forEach(watchedVideoId=>{const watchedPlaylistItem=this.playlistItemsArray.find(playlistItem=>playlistItem.dataItemId===watchedVideoId);this.elements.$tabTitles.filter('[data-tab="'+watchedPlaylistItem.dataTab+'"]').addClass('watched-video');});}}
changeActiveTab(tabIndex,isVideoSelectedAutomatically){super.changeActiveTab(tabIndex);if(this.playlistItemsArray[tabIndex-1]&&this.playlistItemsArray[tabIndex-1].videoType!=='section'){this.currentPlaylistItemIndex=parseInt(tabIndex);if(isVideoSelectedAutomatically){this.currentPlayingPlaylistItemIndex=this.currentPlaylistItemIndex;}
this.handleVideo(this.getCurrentItemSelected(),isVideoSelectedAutomatically);if(!this.isPageOnLoad){(0,_urlParams.setVideoParams)(this.playlistId,this.playlistItemsArray,this.currentPlaylistItemIndex);}
this.isPageOnLoad=false;if(jQuery(this.elements.$innerTabs.eq(tabIndex-1)).find('.e-inner-tab-content').length>0){const innerTabsContent=this.elements.$innerTabs.filter('.e-active').find('.e-inner-tab-content');(0,_innerTabs.handleInnerTabsButtonsDisplay)(innerTabsContent.toArray(),this.isCollapsible,this.innerTabsHeightLimit);}}}}
exports["default"]=VideoPlaylistHandler;}),"../modules/video-playlist/assets/js/frontend/inner-tabs.js":
/*!******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/inner-tabs.js ***!
  \******************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports.handleInnerTabs=handleInnerTabs;exports.handleInnerTabsButtonsDisplay=handleInnerTabsButtonsDisplay;exports.onTabContentButtonsClick=onTabContentButtonsClick;var _eventTrigger=_interopRequireDefault(__webpack_require__(/*! ./event-trigger */"../modules/video-playlist/assets/js/frontend/event-trigger.js"));function toggleInnerTabs(event,clickedTab,widgetObject){const activeTabWrapper=event.currentTarget,tabTitles=activeTabWrapper.querySelectorAll('.e-inner-tab-title');if(clickedTab.hasClass('e-inner-tab-active')||tabTitles.length<2){return;}
const tabsContents=activeTabWrapper.querySelectorAll('.e-inner-tab-content');tabTitles.forEach(tabTitle=>{tabTitle.classList.toggle('e-inner-tab-active');});tabsContents.forEach(tabContent=>{tabContent.toggleAttribute('hidden');tabContent.classList.toggle('e-inner-tab-active');});handleInnerTabsButtonsDisplay(Array.from(tabsContents),widgetObject.isCollapsible,widgetObject.innerTabsHeightLimit);(0,_eventTrigger.default)(widgetObject,'tabOpened','click');}
function handleInnerTabs(event,widgetObject){const clickedTarget=event.target;const clickedTagType=clickedTarget.tagName;if(clickedTarget.classList.contains('e-inner-tab-title-text')){event.preventDefault();const $clickedTab=jQuery(clickedTarget).parent('.e-inner-tab-title');toggleInnerTabs(event,$clickedTab,widgetObject);}
if(clickedTarget.classList.contains('e-tab-mobile-title')){const $clickedTab=jQuery(clickedTarget);toggleInnerTabs(event,$clickedTab,widgetObject);}
if('button'===clickedTagType.toLowerCase()){onTabContentButtonsClick(event,widgetObject);}}
function handleInnerTabsButtonsDisplay(tabsContents,isCollapsible,innerTabsHeightLimit){if(!isCollapsible){return;}
const activeInnerTab=tabsContents.filter(tabsContent=>tabsContent.classList.contains('e-inner-tab-active')),innerTabScrollableHeight=activeInnerTab[0].querySelector('.e-inner-tab-text > div').offsetHeight,innerTabsLimitHeight=parseInt(innerTabsHeightLimit.size);if(innerTabsLimitHeight&&innerTabScrollableHeight>innerTabsLimitHeight){activeInnerTab[0].classList.add('show-inner-tab-buttons');}}
function onTabContentButtonsClick(event,widgetObject){const $tabsContent=jQuery(event.currentTarget).find('.e-inner-tab-content'),$activeTabContent=$tabsContent.filter('.e-inner-tab-active'),buttonsElements=$activeTabContent.find('button');buttonsElements.toggleClass('show-button');$activeTabContent.toggleClass('show-full-height');const eventType=$activeTabContent.hasClass('show-full-height')?'tabExpanded':'tabCollapsed';(0,_eventTrigger.default)(widgetObject,eventType,'click');}}),"../modules/video-playlist/assets/js/frontend/player-base.js":
/*!*******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-base.js ***!
  \*******************************************************************/
((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;class PlayerBase{constructor(playlistItem,videoIndex){this.playlistItem=playlistItem;this.positionInVideoList=videoIndex;}
formatDuration(duration){const dateObj=new Date(duration*1000),hours=dateObj.getUTCHours(),minutes=dateObj.getUTCMinutes(),seconds=dateObj.getSeconds();if(hours!==0){return`${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;}
return`${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;}}
exports["default"]=PlayerBase;}),"../modules/video-playlist/assets/js/frontend/player-hosted.js":
/*!*********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-hosted.js ***!
  \*********************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;var _playerBase=_interopRequireDefault(__webpack_require__(/*! ./player-base */"../modules/video-playlist/assets/js/frontend/player-base.js"));class playerHosted extends _playerBase.default{constructor(playlistItem,videoIndex){super(playlistItem,videoIndex);this.playerObject=null;this.watchCount=0;this.isVideoPlaying=false;this.isVideoPausedLocal=false;this.isVideoSeeking=false;this.isVideoEnded=false;this.isReady=false;}
create(){const videoPromise=new Promise(resolve=>{const video=document.createElement('video');video.setAttribute('controls','');const text=document.createTextNode('Sorry, your browser doesn\'t support embedded videos.');const source=document.createElement('source');source.setAttribute('src',this.playlistItem.videoUrl);source.setAttribute('type','video/'+this.playlistItem.videoUrl.split('.').pop());video.appendChild(source);video.appendChild(text);this.playerObject=video;this.playlistItem.tabContent.querySelector('div').replaceWith(this.playerObject);this.playerObject.addEventListener('canplay',()=>{this.isReady=true;resolve();});this.playerObject.addEventListener('seeked',()=>{this.isVideoSeeking=false;});this.playerObject.addEventListener('seeking',()=>{clearTimeout(this.seekTimeOut);this.isVideoSeeking=true;});});return videoPromise;}
handleEnded(callback){this.playerObject.addEventListener('ended',()=>{this.watchCount++;this.isVideoEnded=true;this.isVideoPlaying=false;callback(this.playlistItem);});}
handlePaused(callback){this.playerObject.addEventListener('pause',()=>{this.seekTimeOut=setTimeout(()=>{if(!this.isVideoSeeking&&!this.isVideoEnded){callback(this.positionInVideoList);this.isVideoPausedLocal=true;}else{this.isVideoEnded=false;}},30);});}
handlePlayed(callback){this.playerObject.addEventListener('play',()=>{if(!this.isVideoSeeking){callback(this.playlistItem);}});}
handleFullScreenChange(callback){jQuery(this.playerObject).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',()=>{callback(document.fullscreenElement);});}
getCurrentTime(){return this.playerObject.currentTime;}
play(){if(!this.isReady){return;}
this.isVideoPlaying=true;this.playerObject.play();}
pause(){if(!this.isReady){return;}
this.isVideoPlaying=false;this.playerObject.pause();}
mute(){this.playerObject.muted=true;}}
exports["default"]=playerHosted;}),"../modules/video-playlist/assets/js/frontend/player-vimeo.js":
/*!********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-vimeo.js ***!
  \********************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;var _playerBase=_interopRequireDefault(__webpack_require__(/*! ./player-base */"../modules/video-playlist/assets/js/frontend/player-base.js"));class playerVimeo extends _playerBase.default{constructor(playlistItem,videoIndex){super(playlistItem,videoIndex);this.apiProvider=elementorFrontend.utils.vimeo;this.playerObject=null;this.watchCount=0;this.isVideoInFullScreenChange=false;this.isReady=false;}
create(){this.currentVideoID=this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);return new Promise(resolve=>{this.apiProvider.onApiReady(apiObject=>{const playerOptions={id:this.currentVideoID,autoplay:false};this.playerObject=new apiObject.Player(this.playlistItem.tabContent.querySelector('div'),playerOptions);this.playerObject.ready().then(()=>{this.isReady=true;resolve();});});});}
handleEnded(callback){this.playerObject.on('ended',()=>{this.watchCount++;callback(this.playlistItem);});}
handlePaused(callback){this.playerObject.on('pause',event=>{if(0===event.percent||event.percent>=1||this.isVideoInFullScreenChange){return;}
callback(this.positionInVideoList);});}
handlePlayed(callback){this.playerObject.on('play',()=>{if(this.isVideoInFullScreenChange){this.isVideoInFullScreenChange=false;return;}
callback(this.playlistItem);});}
handleFullScreenChange(callback){this.playerObject.element.addEventListener('fullscreenchange',()=>{callback(document.fullscreenElement);this.isVideoInFullScreenChange=true;});}
getCurrentTime(){return this.playerObject.getCurrentTime().then(seconds=>seconds);}
play(){if(!this.isReady){return;}
this.playerObject.play();}
pause(){if(!this.isReady){return;}
this.playerObject.pause();}
mute(){this.playerObject.setMuted(true);}
async setVideoProviderData(){if(!this.currentVideoID&&9===!this.currentVideoID.length){return;}
const videoId=await this.playerObject.getVideoId();const response=await fetch('https://vimeo.com/api/v2/video/'+videoId+'.json');const videoData=await response.json();this.playlistItem.duration=this.formatDuration(videoData[0].duration);this.playlistItem.video_title=videoData[0].title;this.playlistItem.thumbnail={url:videoData[0].thumbnail_medium};return this.playlistItem;}}
exports["default"]=playerVimeo;}),"../modules/video-playlist/assets/js/frontend/player-youtube.js":
/*!**********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/player-youtube.js ***!
  \**********************************************************************/
((__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */"../node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;var _playerBase=_interopRequireDefault(__webpack_require__(/*! ./player-base */"../modules/video-playlist/assets/js/frontend/player-base.js"));class playerYoutube extends _playerBase.default{constructor(playlistItem,videoIndex){super(playlistItem,videoIndex);this.apiProvider=elementorFrontend.utils.youtube;this.playerObject=null;this.watchCount=0;this.isVideoPlaying=false;this.isVideoPausedLocal=false;this.isVideoEnded=false;this.seekSequenceArray=[];this.pauseCurrentTime=null;this.isReady=false;}
create(){this.currentVideoID=this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);const videoPromise=new Promise(resolve=>{this.apiProvider.onApiReady(apiObject=>{const playerOptions={width:'773',videoId:this.currentVideoID,playerVars:{rel:0,showinfo:0,ecver:2},events:{onReady:()=>{this.isReady=true;resolve();}}};this.playerObject=new apiObject.Player(this.playlistItem.tabContent.querySelector('div'),playerOptions);this.playerObject.addEventListener('onStateChange',event=>{if(3===event.data){if(2===this.seekSequenceArray[this.seekSequenceArray.length-1]){this.seekSequenceArray.push(3);}else{this.seekSequenceArray=[];clearTimeout(this.seekTimeOut);}}});});});return videoPromise;}
handleEnded(callback){this.playerObject.addEventListener('onStateChange',event=>{if(0===event.data){this.watchCount++;this.isVideoEnded=true;event.target.seekTo(0);event.target.stopVideo();this.isVideoPlaying=false;callback();}});}
handlePaused(callback){this.playerObject.addEventListener('onStateChange',event=>{if(2===event.data){this.seekSequenceArray=[];this.seekSequenceArray.push(2);this.pauseCurrentTime=this.playerObject.playerInfo.currentTime;this.seekTimeOut=setTimeout(()=>{if(2===this.seekSequenceArray.length&&2===this.seekSequenceArray[0]&&3===this.seekSequenceArray[1]){this.seekSequenceArray=[];clearTimeout(this.seekTimeOut);}else{callback(this.positionInVideoList);this.isVideoPausedLocal=true;}},1000);}});}
handlePlayed(callback){this.playerObject.addEventListener('onStateChange',event=>{if(1===event.data&&!this.isVideoEnded){if(!(2===this.seekSequenceArray.length&&2===this.seekSequenceArray[0]&&3===this.seekSequenceArray[1])){callback();}}else{this.isVideoEnded=false;}});}
handleError(callback){this.playerObject.addEventListener('onError',()=>{callback();});}
handleFullScreenChange(callback){this.playerObject.h.addEventListener('fullscreenchange',()=>{callback(document.fullscreenElement);});}
getCurrentTime(){const currentTime=this.pauseCurrentTime?this.pauseCurrentTime:this.playerObject.playerInfo.currentTime;this.pauseCurrentTime=null;return currentTime;}
play(){if(!this.isReady){return;}
this.isVideoPlaying=true;this.playerObject.playVideo();}
pause(){if(!this.isReady){return;}
this.isVideoPlaying=false;this.playerObject.pauseVideo();}
mute(){this.playerObject.mute();}
async setVideoProviderData(){if(!this.isReady){return;}
if(this.currentVideoID&&11===this.currentVideoID.length){this.playlistItem.thumbnail={url:'https://img.youtube.com/vi/'+this.playerObject.getVideoData().video_id+'/maxresdefault.jpg'};this.playlistItem.video_title=this.playerObject.getVideoData().title;this.playlistItem.duration=this.formatDuration(this.playerObject.getDuration());}else{this.playlistItem.thumbnail={url:''};this.playlistItem.video_title='';this.playlistItem.duration='';}}}
exports["default"]=playerYoutube;}),"../modules/video-playlist/assets/js/frontend/playlist-event.js":
/*!**********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/playlist-event.js ***!
  \**********************************************************************/
((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports["default"]=void 0;class PlaylistEvent{constructor(_ref){let{event,tab,playlist,video}=_ref;this.event={type:event.type||'',time:event.time||0,element:event.element,trigger:event.trigger||'',watchCount:event.watchCount||0};this.tab={name:tab.name,index:tab.index};this.playlist={name:playlist.name,currentItem:playlist.currentItem,amount:playlist.amount};this.video={provider:video.provider,url:video.url,title:video.title,duration:video.duration};}}
exports["default"]=PlaylistEvent;}),"../modules/video-playlist/assets/js/frontend/scroll-utils.js":
/*!********************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/scroll-utils.js ***!
  \********************************************************************/
((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports.handleVideosPanelScroll=handleVideosPanelScroll;function handleVideosPanelScroll(elements,event){if(!event){if(elements.$tabsItems[0].offsetHeight<elements.$tabsItems[0].scrollHeight){elements.$tabsWrapper.addClass('bottom-shadow');}
return;}
if(event.target.scrollTop>0){elements.$tabsWrapper.addClass('top-shadow');}else{elements.$tabsWrapper.removeClass('top-shadow');}
if(event.target.offsetHeight+event.target.scrollTop>=event.target.scrollHeight){elements.$tabsWrapper.removeClass('bottom-shadow');}else{elements.$tabsWrapper.addClass('bottom-shadow');}}}),"../modules/video-playlist/assets/js/frontend/url-params.js":
/*!******************************************************************!*\
  !*** ../modules/video-playlist/assets/js/frontend/url-params.js ***!
  \******************************************************************/
((__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",({value:true}));exports.handleURLParams=handleURLParams;exports.setVideoParams=setVideoParams;function handleURLParams(playlistId,playlistItemsArray){const params=new URLSearchParams(location.search),playlistName=params.get('playlist'),defaultTabIndex=1;if(!playlistName){return false;}
if(playlistName===playlistId){const videoId=params.get('video');const videoItem=playlistItemsArray.find(playlistItem=>videoId===playlistItem.dataItemId),tabIndex=videoItem?videoItem.dataTab:defaultTabIndex;if(!tabIndex){setVideoParams(playlistId,playlistItemsArray,defaultTabIndex);}
return tabIndex||false;}}
function setVideoParams(playlistId,playlistItemsArray,videoId){const params=new URLSearchParams(location.search);params.set('playlist',playlistId);params.set('video',playlistItemsArray[videoId-1].dataItemId);history.replaceState({},'',location.pathname+'?'+params);}})}]);