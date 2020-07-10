(function(){var GH=(function(details){"use strict";if(!this){return new GH(details);};var user,repo,org,events,connectToAPI,successHandler,errorHandler;successHandler=function(success){return JSON.parse(success);};errorHandler=function(){throw new Error("Please provide either the user, repo's name and/or confirm events");};connectToAPI=function(req){var xhrToGH=new XMLHttpRequest();xhrToGH.open("get",req,false);xhrToGH.send();return xhrToGH.onload=(function(){return xhrToGH.response}());};user=function(){var url="https://api.github.com/users/"+details.user;return details.user?successHandler(connectToAPI(url)):errorHandler();};org=function(){var url="https://api.github.com/orgs/"+details.organization;return details.organization?successHandler(connectToAPI(url)):errorHandler();};repo=function(){var url="https://api.github.com/repos/"+[details.user||details.organization,details.repo].join("/");return details.repo&&(details.user||details.organization)?successHandler(connectToAPI(url)):errorHandler();};events=function(){var url="https://api.github.com/users/"+[details.user||details.organization,"events"].join("/");return details.events&&(details.user||details.organization)?successHandler(connectToAPI(url)):errorHandler();};return{getUser:user,getOrganization:org,getRepo:repo,getEvents:events};});if(typeof exports!=='undefined'){module.exports=GH;}else{window.GH=GH;}})();

(function(){var kado=new GH({user:"kdamball",events:true}),kadoEvents=kado.getEvents(),eventsType={"PushEvent":"Pushed to","DeleteEvent":"Deleted something from","WatchEvent":"Starred","IssueCommentEvent":"Commented on","ForkEvent":"Forked","CreateEvent":"Created","PullRequestEvent":"Pull Request on","PullRequestReviewCommentEvent":"Commented on a pull request to","FollowEvent":"Followed","GollumEvent":"Wiki Edits for","IssuesEvent":"Raised an issue on","MemberEvent":"Joined"},parseTime=function(t){var t=t.split("T")[0].split("-").map(function(e){return Number(e)}),then=new Date(t[0],t[1]-1,t[2]),timeDiff=Math.floor((Date.now()-then.getTime())/86400000);return timeDiff?timeDiff+" day(s) ago":"Today";};var ghAPI=$(".gh-api li");ghAPI.each(function(index){$(this).html(eventsType[kadoEvents[index].type]+" <a href='"+
kadoEvents[index].repo.url.replace(/api\./,'').replace(/repos\//,'')+"'>"+kadoEvents[index].repo.name+"</a> Repo ["+
parseTime(kadoEvents[index].created_at)+"]");});$("#mail").mouseover(function(){$(this).html("kado [at] kdamball [dot] com").fadeIn();}).mouseleave(function(){$(this).html("Email").fadeIn();});})();
