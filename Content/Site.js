// $begin{copyright}
//
// This file is part of WebSharper
//
// Copyright (c) 2008-2014 IntelliFactory
//
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License.  You may
// obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied.  See the License for the specific language governing
// permissions and limitations under the License.
//
// $end{copyright}

try {
    Object.defineProperty(Error.prototype, 'message', { enumerable: true });
} catch (e) { }

var IntelliFactory =
{
    Runtime:
    {

        Class:
            function (p, s) {
                function r() { }
                r.prototype = p;
                for (var f in s) { r[f] = s[f]; }
                return r;
            },

        Define:
            function (a, b) {
                var overwrite = !!this.overwrite;
                function define(a, b) {
                    for (var k in b) {
                        var t1 = typeof a[k];
                        var t2 = typeof b[k];
                        if (t1 == "object" && t2 == "object") {
                            define(a[k], b[k]);
                        } else if (t1 == "undefined" || overwrite) {
                            a[k] = b[k];
                        } else {
                            throw new Error("Name conflict: " + k);
                        }
                    }
                }
                define(a, b);
            },

        Field:
            function (f) {
                var value, ready = false;
                return function () {
                    if (!ready) { ready = true; value = f(); }
                    return value;
                }
            },

        For:
            function (lowerBound, upperBound, body) {
                for (var i = lowerBound; i <= upperBound; i++) {
                    body(i);
                }
            },

        ForEach:
            function (obj, body) {
                for (var f in obj) {
                    body(f);
                }
            },

        New:
            function (ctor, fields) {
                var r = new ctor();
                for (var f in fields) {
                    if (!(f in r)) {
                        r[f] = fields[f];
                    }
                }
                return r
            },

        OnInit:
            function (f) {
                if (!("init" in this)) {
                    this.init = [];
                }
                this.init.push(f);
            },

        OnLoad:
            function (f) {
                if (!("load" in this)) {
                    this.load = [];
                }
                this.load.push(f);
            },

        Inherit:
            function (a, b) {
                var p = a.prototype;
                a.prototype = new b();
                for (var f in p) {
                    a.prototype[f] = p[f];
                }
            },

        Safe:
            function (x) {
                if (x === undefined) return {};
                return x;
            },

        Start:
            function () {
                function run(c) {
                    for (var i = 0; i < c.length; i++) {
                        c[i]();
                    }
                }
                if ("init" in this) {
                    run(this.init);
                    this.init = [];
                }
                if ("load" in this) {
                    run(this.load);
                    this.load = [];
                }
            },

        Throw:
            function (e) {
                throw e;
            },

        Tupled:
            function (f) {
                return function (x) {
                    if (arguments.length > 1) {
                        return f(arguments);
                    } else {
                        return f(x);
                    }
                }
            },

        Try:
            function (block, handler) {
                try {
                    return block();
                } catch (e) {
                    return handler(e);
                }
            },

        TryFinally:
            function (block, handler) {
                try {
                    return block();
                } finally {
                    handler();
                }
            },

        While:
            function (guard, body) {
                while (guard()) {
                    body();
                }
            }
    }
};

// Polyfill

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
;
var JSON;JSON||(JSON={}),function(){"use strict";function i(n){return n<10?"0"+n:n}function f(n){return o.lastIndex=0,o.test(n)?'"'+n.replace(o,function(n){var t=s[n];return typeof t=="string"?t:"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+n+'"'}function r(i,e){var s,l,h,a,v=n,c,o=e[i];o&&typeof o=="object"&&typeof o.toJSON=="function"&&(o=o.toJSON(i)),typeof t=="function"&&(o=t.call(e,i,o));switch(typeof o){case"string":return f(o);case"number":return isFinite(o)?String(o):"null";case"boolean":case"null":return String(o);case"object":if(!o)return"null";if(n+=u,c=[],Object.prototype.toString.apply(o)==="[object Array]"){for(a=o.length,s=0;s<a;s+=1)c[s]=r(s,o)||"null";return h=c.length===0?"[]":n?"[\n"+n+c.join(",\n"+n)+"\n"+v+"]":"["+c.join(",")+"]",n=v,h}if(t&&typeof t=="object")for(a=t.length,s=0;s<a;s+=1)typeof t[s]=="string"&&(l=t[s],h=r(l,o),h&&c.push(f(l)+(n?": ":":")+h));else for(l in o)Object.prototype.hasOwnProperty.call(o,l)&&(h=r(l,o),h&&c.push(f(l)+(n?": ":":")+h));return h=c.length===0?"{}":n?"{\n"+n+c.join(",\n"+n)+"\n"+v+"}":"{"+c.join(",")+"}",n=v,h}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+i(this.getUTCMonth()+1)+"-"+i(this.getUTCDate())+"T"+i(this.getUTCHours())+":"+i(this.getUTCMinutes())+":"+i(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var e=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,o=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n,u,s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t;typeof JSON.stringify!="function"&&(JSON.stringify=function(i,f,e){var o;if(n="",u="",typeof e=="number")for(o=0;o<e;o+=1)u+=" ";else typeof e=="string"&&(u=e);if(t=f,f&&typeof f!="function"&&(typeof f!="object"||typeof f.length!="number"))throw new Error("JSON.stringify");return r("",{"":i})}),typeof JSON.parse!="function"&&(JSON.parse=function(n,t){function r(n,i){var f,e,u=n[i];if(u&&typeof u=="object")for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&(e=r(u,f),e!==undefined?u[f]=e:delete u[f]);return t.call(n,i,u)}var i;if(n=String(n),e.lastIndex=0,e.test(n)&&(n=n.replace(e,function(n){return"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return i=eval("("+n+")"),typeof t=="function"?r({"":i},""):i;throw new SyntaxError("JSON.parse");})}();;
(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Arrays,Operators,Number,IntrinsicFunctionProxy,Array,Seq,Unchecked,Enumerator,Arrays2D,Concurrency,AggregateException,Option,clearTimeout,setTimeout,CancellationTokenSource,Char,Util,Lazy,Error,Pervasives,List,Date,console,Scheduler,T,Html,Client,Activator,document,jQuery,Json,JSON,JavaScript,JS,HtmlContentExtensions,SingleNode,T1,Math,Strings,PrintfHelpers,Remoting,XhrProvider,AsyncProxy,Enumerable,String,RegExp;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    AggregateException:Runtime.Class({},{
     New:function($innerExceptions)
     {
      var $0=this,$this=this;
      return Global.e=new Global.Error("AggregateException"),Global.e.InnerExceptions=$innerExceptions,Global.e;
     }
    }),
    Arrays:{
     Find:function(f,arr)
     {
      var matchValue,_,x;
      matchValue=Arrays.tryFind(f,arr);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     FindIndex:function(f,arr)
     {
      var matchValue,_,x;
      matchValue=Arrays.tryFindIndex(f,arr);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     Pick:function(f,arr)
     {
      var matchValue,_,x;
      matchValue=Arrays.tryPick(f,arr);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     average:function(arr)
     {
      return Number(Arrays.sum(arr))/Number(IntrinsicFunctionProxy.GetLength(arr));
     },
     averageBy:function(f,arr)
     {
      return Number(Arrays.sumBy(f,arr))/Number(IntrinsicFunctionProxy.GetLength(arr));
     },
     blit:function(arr1,start1,arr2,start2,length)
     {
      var i;
      Arrays.checkRange(arr1,start1,length);
      Arrays.checkRange(arr2,start2,length);
      for(i=0;i<=length-1;i++){
       IntrinsicFunctionProxy.SetArray(arr2,start2+i,IntrinsicFunctionProxy.GetArray(arr1,start1+i));
      }
      return;
     },
     checkLength:function(arr1,arr2)
     {
      return IntrinsicFunctionProxy.GetLength(arr1)!==IntrinsicFunctionProxy.GetLength(arr2)?Operators.FailWith("Arrays differ in length."):null;
     },
     checkRange:function(arr,start,size)
     {
      return((size<0?true:start<0)?true:IntrinsicFunctionProxy.GetLength(arr)<start+size)?Operators.FailWith("Index was outside the bounds of the array."):null;
     },
     choose:function(f,arr)
     {
      var q,i,matchValue,_,x;
      q=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       matchValue=f(IntrinsicFunctionProxy.GetArray(arr,i));
       if(matchValue.$==0)
        {
         _=null;
        }
       else
        {
         x=matchValue.$0;
         _=q.push(x);
        }
      }
      return q;
     },
     collect:function(f,x)
     {
      return Array.prototype.concat.apply([],Arrays.map(f,x));
     },
     concat:function(xs)
     {
      return Array.prototype.concat.apply([],Arrays.ofSeq(xs));
     },
     create:function(size,value)
     {
      var r,i;
      r=Array(size);
      for(i=0;i<=size-1;i++){
       IntrinsicFunctionProxy.SetArray(r,i,value);
      }
      return r;
     },
     exists2:function(f,arr1,arr2)
     {
      Arrays.checkLength(arr1,arr2);
      return Seq.exists2(f,arr1,arr2);
     },
     fill:function(arr,start,length,value)
     {
      var i;
      Arrays.checkRange(arr,start,length);
      for(i=start;i<=start+length-1;i++){
       IntrinsicFunctionProxy.SetArray(arr,i,value);
      }
      return;
     },
     filter:function(f,arr)
     {
      var r,i;
      r=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       f(IntrinsicFunctionProxy.GetArray(arr,i))?r.push(IntrinsicFunctionProxy.GetArray(arr,i)):null;
      }
      return r;
     },
     fold:function(f,zero,arr)
     {
      var acc,i;
      acc=zero;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       acc=(f(acc))(IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return acc;
     },
     fold2:function(f,zero,arr1,arr2)
     {
      var accum,i;
      Arrays.checkLength(arr1,arr2);
      accum=zero;
      for(i=0;i<=arr1.length-1;i++){
       accum=((f(accum))(IntrinsicFunctionProxy.GetArray(arr1,i)))(IntrinsicFunctionProxy.GetArray(arr2,i));
      }
      return accum;
     },
     foldBack:function(f,arr,zero)
     {
      var acc,len,i;
      acc=zero;
      len=IntrinsicFunctionProxy.GetLength(arr);
      for(i=1;i<=len;i++){
       acc=(f(IntrinsicFunctionProxy.GetArray(arr,len-i)))(acc);
      }
      return acc;
     },
     foldBack2:function(f,arr1,arr2,zero)
     {
      var len,accum,i;
      Arrays.checkLength(arr1,arr2);
      len=IntrinsicFunctionProxy.GetLength(arr1);
      accum=zero;
      for(i=1;i<=len;i++){
       accum=((f(IntrinsicFunctionProxy.GetArray(arr1,len-i)))(IntrinsicFunctionProxy.GetArray(arr2,len-i)))(accum);
      }
      return accum;
     },
     forall2:function(f,arr1,arr2)
     {
      Arrays.checkLength(arr1,arr2);
      return Seq.forall2(f,arr1,arr2);
     },
     init:function(size,f)
     {
      var r,i;
      size<0?Operators.FailWith("Negative size given."):null;
      r=Array(size);
      for(i=0;i<=size-1;i++){
       IntrinsicFunctionProxy.SetArray(r,i,f(i));
      }
      return r;
     },
     iter:function(f,arr)
     {
      var i;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       f(IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return;
     },
     iter2:function(f,arr1,arr2)
     {
      var i;
      Arrays.checkLength(arr1,arr2);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       (f(IntrinsicFunctionProxy.GetArray(arr1,i)))(IntrinsicFunctionProxy.GetArray(arr2,i));
      }
      return;
     },
     iteri:function(f,arr)
     {
      var i;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       (f(i))(IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return;
     },
     iteri2:function(f,arr1,arr2)
     {
      var i;
      Arrays.checkLength(arr1,arr2);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       ((f(i))(IntrinsicFunctionProxy.GetArray(arr1,i)))(IntrinsicFunctionProxy.GetArray(arr2,i));
      }
      return;
     },
     map:function(f,arr)
     {
      var r,i;
      r=Array(IntrinsicFunctionProxy.GetLength(arr));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       IntrinsicFunctionProxy.SetArray(r,i,f(IntrinsicFunctionProxy.GetArray(arr,i)));
      }
      return r;
     },
     map2:function(f,arr1,arr2)
     {
      var r,i;
      Arrays.checkLength(arr1,arr2);
      r=Array(IntrinsicFunctionProxy.GetLength(arr2));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr2)-1;i++){
       IntrinsicFunctionProxy.SetArray(r,i,(f(IntrinsicFunctionProxy.GetArray(arr1,i)))(IntrinsicFunctionProxy.GetArray(arr2,i)));
      }
      return r;
     },
     mapi:function(f,arr)
     {
      var y,i;
      y=Array(IntrinsicFunctionProxy.GetLength(arr));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       IntrinsicFunctionProxy.SetArray(y,i,(f(i))(IntrinsicFunctionProxy.GetArray(arr,i)));
      }
      return y;
     },
     mapi2:function(f,arr1,arr2)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      res=Array(IntrinsicFunctionProxy.GetLength(arr1));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       IntrinsicFunctionProxy.SetArray(res,i,((f(i))(IntrinsicFunctionProxy.GetArray(arr1,i)))(IntrinsicFunctionProxy.GetArray(arr2,i)));
      }
      return res;
     },
     max:function(x)
     {
      return Arrays.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Max(e1,e2);
       };
      },x);
     },
     maxBy:function(f,arr)
     {
      return Arrays.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===1?x:y;
       };
      },arr);
     },
     min:function(x)
     {
      return Arrays.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Min(e1,e2);
       };
      },x);
     },
     minBy:function(f,arr)
     {
      return Arrays.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===-1?x:y;
       };
      },arr);
     },
     nonEmpty:function(arr)
     {
      return IntrinsicFunctionProxy.GetLength(arr)===0?Operators.FailWith("The input array was empty."):null;
     },
     ofSeq:function(xs)
     {
      var q,_enum;
      q=[];
      _enum=Enumerator.Get(xs);
      while(_enum.MoveNext())
       {
        q.push(_enum.get_Current());
       }
      return q;
     },
     partition:function(f,arr)
     {
      var ret1,ret2,i;
      ret1=[];
      ret2=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       f(IntrinsicFunctionProxy.GetArray(arr,i))?ret1.push(IntrinsicFunctionProxy.GetArray(arr,i)):ret2.push(IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return[ret1,ret2];
     },
     permute:function(f,arr)
     {
      var ret,i;
      ret=Array(IntrinsicFunctionProxy.GetLength(arr));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       IntrinsicFunctionProxy.SetArray(ret,f(i),IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return ret;
     },
     reduce:function(f,arr)
     {
      var acc,i;
      Arrays.nonEmpty(arr);
      acc=IntrinsicFunctionProxy.GetArray(arr,0);
      for(i=1;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       acc=(f(acc))(IntrinsicFunctionProxy.GetArray(arr,i));
      }
      return acc;
     },
     reduceBack:function(f,arr)
     {
      var len,acc,i;
      Arrays.nonEmpty(arr);
      len=IntrinsicFunctionProxy.GetLength(arr);
      acc=IntrinsicFunctionProxy.GetArray(arr,len-1);
      for(i=2;i<=len;i++){
       acc=(f(IntrinsicFunctionProxy.GetArray(arr,len-i)))(acc);
      }
      return acc;
     },
     reverse:function(array,offset,length)
     {
      var a;
      a=Arrays.sub(array,offset,length).slice().reverse();
      return Arrays.blit(a,0,array,offset,IntrinsicFunctionProxy.GetLength(a));
     },
     scan:function(f,zero,arr)
     {
      var ret,i;
      ret=Array(1+IntrinsicFunctionProxy.GetLength(arr));
      IntrinsicFunctionProxy.SetArray(ret,0,zero);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       IntrinsicFunctionProxy.SetArray(ret,i+1,(f(IntrinsicFunctionProxy.GetArray(ret,i)))(IntrinsicFunctionProxy.GetArray(arr,i)));
      }
      return ret;
     },
     scanBack:function(f,arr,zero)
     {
      var len,ret,i;
      len=IntrinsicFunctionProxy.GetLength(arr);
      ret=Array(1+len);
      IntrinsicFunctionProxy.SetArray(ret,len,zero);
      for(i=0;i<=len-1;i++){
       IntrinsicFunctionProxy.SetArray(ret,len-i-1,(f(IntrinsicFunctionProxy.GetArray(arr,len-i-1)))(IntrinsicFunctionProxy.GetArray(ret,len-i)));
      }
      return ret;
     },
     sort:function(arr)
     {
      return Arrays.sortBy(function(x)
      {
       return x;
      },arr);
     },
     sortBy:function(f,arr)
     {
      var f1;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var x,y;
       x=tupledArg[0];
       y=tupledArg[1];
       return Operators.Compare(f(x),f(y));
      });
      return arr.slice().sort(f1);
     },
     sortInPlace:function(arr)
     {
      return Arrays.sortInPlaceBy(function(x)
      {
       return x;
      },arr);
     },
     sortInPlaceBy:function(f,arr)
     {
      var f1;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var x,y;
       x=tupledArg[0];
       y=tupledArg[1];
       return Operators.Compare(f(x),f(y));
      });
      return arr.sort(f1);
     },
     sortInPlaceWith:function(comparer,arr)
     {
      var f;
      f=Runtime.Tupled(function(tupledArg)
      {
       var x,y;
       x=tupledArg[0];
       y=tupledArg[1];
       return(comparer(x))(y);
      });
      return arr.sort(f);
     },
     sortWith:function(comparer,arr)
     {
      var f;
      f=Runtime.Tupled(function(tupledArg)
      {
       var x,y;
       x=tupledArg[0];
       y=tupledArg[1];
       return(comparer(x))(y);
      });
      return arr.slice().sort(f);
     },
     sub:function(arr,start,length)
     {
      Arrays.checkRange(arr,start,length);
      return arr.slice(start,start+length);
     },
     sum:function($arr)
     {
      var $0=this,$this=this;
      var sum=0;
      for(var i=0;i<$arr.length;i++)sum+=$arr[i];
      return sum;
     },
     sumBy:function($f,$arr)
     {
      var $0=this,$this=this;
      var sum=0;
      for(var i=0;i<$arr.length;i++)sum+=$f($arr[i]);
      return sum;
     },
     tryFind:function(f,arr)
     {
      var res,i;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        f(IntrinsicFunctionProxy.GetArray(arr,i))?res={
         $:1,
         $0:IntrinsicFunctionProxy.GetArray(arr,i)
        }:null;
        i=i+1;
       }
      return res;
     },
     tryFindIndex:function(f,arr)
     {
      var res,i;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        f(IntrinsicFunctionProxy.GetArray(arr,i))?res={
         $:1,
         $0:i
        }:null;
        i=i+1;
       }
      return res;
     },
     tryPick:function(f,arr)
     {
      var res,i,matchValue;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        matchValue=f(IntrinsicFunctionProxy.GetArray(arr,i));
        matchValue.$==1?res=matchValue:null;
        i=i+1;
       }
      return res;
     },
     unzip:function(arr)
     {
      var x,y,i,patternInput,b,a;
      x=[];
      y=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       patternInput=IntrinsicFunctionProxy.GetArray(arr,i);
       b=patternInput[1];
       a=patternInput[0];
       x.push(a);
       y.push(b);
      }
      return[x,y];
     },
     unzip3:function(arr)
     {
      var x,y,z,i,matchValue,c,b,a;
      x=[];
      y=[];
      z=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       matchValue=IntrinsicFunctionProxy.GetArray(arr,i);
       c=matchValue[2];
       b=matchValue[1];
       a=matchValue[0];
       x.push(a);
       y.push(b);
       z.push(c);
      }
      return[x,y,z];
     },
     zip:function(arr1,arr2)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      res=Array(arr1.length);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       IntrinsicFunctionProxy.SetArray(res,i,[IntrinsicFunctionProxy.GetArray(arr1,i),IntrinsicFunctionProxy.GetArray(arr2,i)]);
      }
      return res;
     },
     zip3:function(arr1,arr2,arr3)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      Arrays.checkLength(arr2,arr3);
      res=Array(arr1.length);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       IntrinsicFunctionProxy.SetArray(res,i,[IntrinsicFunctionProxy.GetArray(arr1,i),IntrinsicFunctionProxy.GetArray(arr2,i),IntrinsicFunctionProxy.GetArray(arr3,i)]);
      }
      return res;
     }
    },
    Arrays2D:{
     copy:function(array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return IntrinsicFunctionProxy.GetArray2D(array,i,j);
       };
      });
     },
     init:function(n,m,f)
     {
      var array,i,j;
      array=Arrays2D.zeroCreate(n,m);
      for(i=0;i<=n-1;i++){
       for(j=0;j<=m-1;j++){
        IntrinsicFunctionProxy.SetArray2D(array,i,j,(f(i))(j));
       }
      }
      return array;
     },
     iter:function(f,array)
     {
      var count1,count2,i,j;
      count1=array.length;
      count2=array.length?array[0].length:0;
      for(i=0;i<=count1-1;i++){
       for(j=0;j<=count2-1;j++){
        f(IntrinsicFunctionProxy.GetArray2D(array,i,j));
       }
      }
      return;
     },
     iteri:function(f,array)
     {
      var count1,count2,i,j;
      count1=array.length;
      count2=array.length?array[0].length:0;
      for(i=0;i<=count1-1;i++){
       for(j=0;j<=count2-1;j++){
        ((f(i))(j))(IntrinsicFunctionProxy.GetArray2D(array,i,j));
       }
      }
      return;
     },
     map:function(f,array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return f(IntrinsicFunctionProxy.GetArray2D(array,i,j));
       };
      });
     },
     mapi:function(f,array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return((f(i))(j))(IntrinsicFunctionProxy.GetArray2D(array,i,j));
       };
      });
     },
     zeroCreate:function(n,m)
     {
      return IntrinsicFunctionProxy.Array2DZeroCreate(n,m);
     }
    },
    AsyncProxy:Runtime.Class({},{
     get_CancellationToken:function()
     {
      return Concurrency.GetCT();
     },
     get_DefaultCancellationToken:function()
     {
      return Concurrency.defCTS().contents;
     }
    }),
    CancellationTokenSource:Runtime.Class({
     Cancel:function()
     {
      var _,chooser,array,errors;
      if(!this.c)
       {
        this.c=true;
        chooser=function(a)
        {
         var _1,e;
         try
         {
          a(null);
          _1={
           $:0
          };
         }
         catch(e)
         {
          _1={
           $:1,
           $0:e
          };
         }
         return _1;
        };
        array=this.r;
        errors=Arrays.choose(chooser,array);
        _=IntrinsicFunctionProxy.GetLength(errors)>0?Operators.Raise(AggregateException.New(errors)):null;
       }
      else
       {
        _=null;
       }
      return _;
     },
     Cancel1:function(throwOnFirstException)
     {
      var _,_1,action,array;
      if(!throwOnFirstException)
       {
        _=this.Cancel();
       }
      else
       {
        if(!this.c)
         {
          this.c=true;
          action=function(a)
          {
           return a(null);
          };
          array=this.r;
          _1=Arrays.iter(action,array);
         }
        else
         {
          _1=null;
         }
        _=_1;
       }
      return _;
     },
     CancelAfter:function(delay)
     {
      var _,option,arg0,_this=this;
      if(!this.c)
       {
        option=this.pending;
        Option.iter(function(handle)
        {
         return clearTimeout(handle);
        },option);
        arg0=setTimeout(function()
        {
         return _this.Cancel();
        },delay);
        _=void(this.pending={
         $:1,
         $0:arg0
        });
       }
      else
       {
        _=null;
       }
      return _;
     },
     get_IsCancellationRequested:function()
     {
      return this.c;
     }
    },{
     CreateLinkedTokenSource:function(t1,t2)
     {
      return CancellationTokenSource.CreateLinkedTokenSource1([t1,t2]);
     },
     CreateLinkedTokenSource1:function(tokens)
     {
      var cts,action;
      cts=CancellationTokenSource.New();
      action=function(t)
      {
       var callback,value;
       callback=function()
       {
        return cts.Cancel();
       };
       value=Concurrency.Register(t,function()
       {
        return callback();
       });
       return;
      };
      return Arrays.iter(action,tokens);
     },
     New:function()
     {
      var r;
      r=Runtime.New(this,{});
      r.c=false;
      r.pending={
       $:0
      };
      r.r=[];
      return r;
     }
    }),
    Char:Runtime.Class({},{
     GetNumericValue:function(c)
     {
      return(c>=48?c<=57:false)?Number(c)-Number(48):-1;
     },
     IsControl:function(c)
     {
      return(c>=0?c<=31:false)?true:c>=128?c<=159:false;
     },
     IsDigit:function(c)
     {
      return c>=48?c<=57:false;
     },
     IsLetter:function(c)
     {
      return(c>=65?c<=90:false)?true:c>=97?c<=122:false;
     },
     IsLetterOrDigit:function(c)
     {
      return Char.IsLetter(c)?true:Char.IsDigit(c);
     },
     IsLower:function(c)
     {
      return c>=97?c<=122:false;
     },
     IsUpper:function(c)
     {
      return c>=65?c<=90:false;
     },
     IsWhiteSpace:function($c)
     {
      var $0=this,$this=this;
      return Global.String.fromCharCode($c).match(/\s/)!==null;
     },
     Parse:function(s)
     {
      return s.length===1?s.charCodeAt(0):Operators.FailWith("String must be exactly one character long.");
     }
    }),
    Concurrency:{
     AwaitEvent:function(e)
     {
      var r;
      r=function(c)
      {
       var sub,sub1,creg,creg1,sub2,creg2;
       sub=function()
       {
        return Util.subscribeTo(e,function(x)
        {
         var action;
         Lazy.Force(sub1).Dispose();
         Lazy.Force(creg1).Dispose();
         action=function()
         {
          return c.k.call(null,{
           $:0,
           $0:x
          });
         };
         return Concurrency.scheduler().Fork(action);
        });
       };
       sub1=Lazy.Create(sub);
       creg=function()
       {
        return Concurrency.Register(c.ct,function()
        {
         var action;
         Lazy.Force(sub1).Dispose();
         action=function()
         {
          return c.k.call(null,{
           $:2,
           $0:new Error("OperationCanceledException")
          });
         };
         return Concurrency.scheduler().Fork(action);
        });
       };
       creg1=Lazy.Create(creg);
       sub2=Lazy.Force(sub1);
       creg2=Lazy.Force(creg1);
       return null;
      };
      return Concurrency.checkCancel(r);
     },
     Bind:function(r,f)
     {
      var r1;
      r1=function(c)
      {
       return r({
        k:function(_arg1)
        {
         var _,x,action,action1;
         if(_arg1.$==0)
          {
           x=_arg1.$0;
           action=function()
           {
            var _1,e;
            try
            {
             _1=(f(x))(c);
            }
            catch(e)
            {
             _1=c.k.call(null,{
              $:1,
              $0:e
             });
            }
            return _1;
           };
           _=Concurrency.scheduler().Fork(action);
          }
         else
          {
           action1=function()
           {
            return c.k.call(null,_arg1);
           };
           _=Concurrency.scheduler().Fork(action1);
          }
         return _;
        },
        ct:c.ct
       });
      };
      return Concurrency.checkCancel(r1);
     },
     Catch:function(r)
     {
      var r1;
      r1=function(c)
      {
       var _,e1;
       try
       {
        _=r({
         k:function(_arg1)
         {
          var _1,x,e;
          if(_arg1.$==0)
           {
            x=_arg1.$0;
            _1=c.k.call(null,{
             $:0,
             $0:{
              $:0,
              $0:x
             }
            });
           }
          else
           {
            if(_arg1.$==1)
             {
              e=_arg1.$0;
              _1=c.k.call(null,{
               $:0,
               $0:{
                $:1,
                $0:e
               }
              });
             }
            else
             {
              _1=c.k.call(null,_arg1);
             }
           }
          return _1;
         },
         ct:c.ct
        });
       }
       catch(e1)
       {
        _=c.k.call(null,{
         $:0,
         $0:{
          $:1,
          $0:e1
         }
        });
       }
       return _;
      };
      return Concurrency.checkCancel(r1);
     },
     Combine:function(a,b)
     {
      return Concurrency.Bind(a,function()
      {
       return b;
      });
     },
     Delay:function(mk)
     {
      var r;
      r=function(c)
      {
       var _,e;
       try
       {
        _=(mk(null))(c);
       }
       catch(e)
       {
        _=c.k.call(null,{
         $:1,
         $0:e
        });
       }
       return _;
      };
      return Concurrency.checkCancel(r);
     },
     For:function(s,b)
     {
      var ie;
      ie=Enumerator.Get(s);
      return Concurrency.While(function()
      {
       return ie.MoveNext();
      },Concurrency.Delay(function()
      {
       return b(ie.get_Current());
      }));
     },
     FromContinuations:function(subscribe)
     {
      var r;
      r=function(c)
      {
       var continued,once;
       continued={
        contents:false
       };
       once=function(cont)
       {
        var _;
        if(continued.contents)
         {
          _=Operators.FailWith("A continuation provided by Async.FromContinuations was invoked multiple times");
         }
        else
         {
          continued.contents=true;
          _=Concurrency.scheduler().Fork(cont);
         }
        return _;
       };
       return subscribe([function(a)
       {
        return once(function()
        {
         return c.k.call(null,{
          $:0,
          $0:a
         });
        });
       },function(e)
       {
        return once(function()
        {
         return c.k.call(null,{
          $:1,
          $0:e
         });
        });
       },function(e)
       {
        return once(function()
        {
         return c.k.call(null,{
          $:2,
          $0:e
         });
        });
       }]);
      };
      return Concurrency.checkCancel(r);
     },
     GetCT:Runtime.Field(function()
     {
      var r;
      r=function(c)
      {
       return c.k.call(null,{
        $:0,
        $0:c.ct
       });
      };
      return Concurrency.checkCancel(r);
     }),
     Ignore:function(r)
     {
      return Concurrency.Bind(r,function()
      {
       return Concurrency.Return(null);
      });
     },
     OnCancel:function(action)
     {
      var r;
      r=function(c)
      {
       return c.k.call(null,{
        $:0,
        $0:Concurrency.Register(c.ct,action)
       });
      };
      return Concurrency.checkCancel(r);
     },
     Parallel:function(cs)
     {
      var cs1,_,r;
      cs1=Arrays.ofSeq(cs);
      if(IntrinsicFunctionProxy.GetLength(cs1)===0)
       {
        _=Concurrency.Return([]);
       }
      else
       {
        r=function(c)
        {
         var n,o,a,accept;
         n=cs1.length;
         o={
          contents:n
         };
         a=Arrays.create(n,undefined);
         accept=function(i)
         {
          return function(x)
          {
           var matchValue,_1,_2,x1,res,_3,x2,n1,res1;
           matchValue=[o.contents,x];
           if(matchValue[0]===0)
            {
             _1=null;
            }
           else
            {
             if(matchValue[0]===1)
              {
               if(matchValue[1].$==0)
                {
                 x1=matchValue[1].$0;
                 IntrinsicFunctionProxy.SetArray(a,i,x1);
                 o.contents=0;
                 _2=c.k.call(null,{
                  $:0,
                  $0:a
                 });
                }
               else
                {
                 matchValue[0];
                 res=matchValue[1];
                 o.contents=0;
                 _2=c.k.call(null,res);
                }
               _1=_2;
              }
             else
              {
               if(matchValue[1].$==0)
                {
                 x2=matchValue[1].$0;
                 n1=matchValue[0];
                 IntrinsicFunctionProxy.SetArray(a,i,x2);
                 _3=void(o.contents=n1-1);
                }
               else
                {
                 matchValue[0];
                 res1=matchValue[1];
                 o.contents=0;
                 _3=c.k.call(null,res1);
                }
               _1=_3;
              }
            }
           return _1;
          };
         };
         return Arrays.iteri(function(i)
         {
          return function(run)
          {
           var action;
           action=function()
           {
            return run({
             k:accept(i),
             ct:c.ct
            });
           };
           return Concurrency.scheduler().Fork(action);
          };
         },cs1);
        };
        _=Concurrency.checkCancel(r);
       }
      return _;
     },
     Register:function(ct,callback)
     {
      var i;
      i=ct.r.push(callback)-1;
      return Pervasives.NewFromList(List.ofArray([["Dispose",function()
      {
       return IntrinsicFunctionProxy.SetArray(ct.r,i,function()
       {
       });
      }]]));
     },
     Return:function(x)
     {
      var r;
      r=function(c)
      {
       return c.k.call(null,{
        $:0,
        $0:x
       });
      };
      return Concurrency.checkCancel(r);
     },
     Scheduler:Runtime.Class({
      Fork:function(action)
      {
       var _,value,_this=this;
       this.robin.push(action);
       if(this.idle)
        {
         this.idle=false;
         value=setTimeout(function()
         {
          return _this.tick();
         },0);
         _=void value;
        }
       else
        {
         _=null;
        }
       return _;
      },
      tick:function()
      {
       var t,loop,matchValue,_,_1,value,_this=this;
       t=Date.now();
       loop=true;
       while(loop)
        {
         matchValue=this.robin.length;
         if(matchValue===0)
          {
           this.idle=true;
           _=loop=false;
          }
         else
          {
           (this.robin.shift())(null);
           if(Date.now()-t>40)
            {
             value=setTimeout(function()
             {
              return _this.tick();
             },0);
             _1=loop=false;
            }
           else
            {
             _1=null;
            }
           _=_1;
          }
        }
       return;
      }
     },{
      New:function()
      {
       var r;
       r=Runtime.New(this,{});
       r.idle=true;
       r.robin=[];
       return r;
      }
     }),
     Sleep:function(ms)
     {
      var r;
      r=function(c)
      {
       var pending,pending1,creg,creg1,pending2,creg2;
       pending=function()
       {
        return setTimeout(function()
        {
         var action;
         Lazy.Force(creg1).Dispose();
         action=function()
         {
          return c.k.call(null,{
           $:0,
           $0:null
          });
         };
         return Concurrency.scheduler().Fork(action);
        },ms);
       };
       pending1=Lazy.Create(pending);
       creg=function()
       {
        return Concurrency.Register(c.ct,function()
        {
         var action;
         clearTimeout(Lazy.Force(pending1));
         action=function()
         {
          return c.k.call(null,{
           $:2,
           $0:new Error("OperationCanceledException")
          });
         };
         return Concurrency.scheduler().Fork(action);
        });
       };
       creg1=Lazy.Create(creg);
       pending2=Lazy.Force(pending1);
       creg2=Lazy.Force(creg1);
       return null;
      };
      return Concurrency.checkCancel(r);
     },
     Start:function(c,ctOpt)
     {
      return Concurrency.StartWithContinuations(c,function()
      {
      },function(exn)
      {
       var ps;
       ps=["WebSharper: Uncaught asynchronous exception",exn];
       return console?console.log.apply(console,ps):undefined;
      },function()
      {
      },ctOpt);
     },
     StartChild:function(r)
     {
      var r1;
      r1=function(c)
      {
       var cached,queue,action,r2,r21;
       cached={
        contents:{
         $:0
        }
       };
       queue=[];
       action=function()
       {
        return r({
         k:function(res)
         {
          cached.contents={
           $:1,
           $0:res
          };
          while(queue.length>0)
           {
            (queue.shift())(res);
           }
          return;
         },
         ct:c.ct
        });
       };
       Concurrency.scheduler().Fork(action);
       r2=function(c2)
       {
        var matchValue,_,x;
        matchValue=cached.contents;
        if(matchValue.$==0)
         {
          _=queue.push(c2.k);
         }
        else
         {
          x=matchValue.$0;
          _=c2.k.call(null,x);
         }
        return _;
       };
       r21=Concurrency.checkCancel(r2);
       return c.k.call(null,{
        $:0,
        $0:r21
       });
      };
      return Concurrency.checkCancel(r1);
     },
     StartWithContinuations:function(c,s,f,cc,ctOpt)
     {
      var ct,action;
      ct=Operators.DefaultArg(ctOpt,Concurrency.defCTS().contents);
      action=function()
      {
       return c({
        k:function(_arg1)
        {
         var _,e,e1,x;
         if(_arg1.$==1)
          {
           e=_arg1.$0;
           _=f(e);
          }
         else
          {
           if(_arg1.$==2)
            {
             e1=_arg1.$0;
             _=cc(e1);
            }
           else
            {
             x=_arg1.$0;
             _=s(x);
            }
          }
         return _;
        },
        ct:ct
       });
      };
      return Concurrency.scheduler().Fork(action);
     },
     TryCancelled:function(run,comp)
     {
      var r;
      r=function(c)
      {
       return run({
        k:function(_arg1)
        {
         var _,e;
         if(_arg1.$==2)
          {
           e=_arg1.$0;
           comp(e);
           _=c.k.call(null,_arg1);
          }
         else
          {
           _=c.k.call(null,_arg1);
          }
         return _;
        },
        ct:c.ct
       });
      };
      return Concurrency.checkCancel(r);
     },
     TryFinally:function(run,f)
     {
      var r;
      r=function(c)
      {
       return run({
        k:function(r1)
        {
         var _,e;
         try
         {
          f(null);
          _=c.k.call(null,r1);
         }
         catch(e)
         {
          _=c.k.call(null,{
           $:1,
           $0:e
          });
         }
         return _;
        },
        ct:c.ct
       });
      };
      return Concurrency.checkCancel(r);
     },
     TryWith:function(r,f)
     {
      var r1;
      r1=function(c)
      {
       return r({
        k:function(_arg1)
        {
         var _,x,e,_1,e1;
         if(_arg1.$==0)
          {
           x=_arg1.$0;
           _=c.k.call(null,{
            $:0,
            $0:x
           });
          }
         else
          {
           if(_arg1.$==1)
            {
             e=_arg1.$0;
             try
             {
              _1=(f(e))(c);
             }
             catch(e1)
             {
              _1=c.k.call(null,_arg1);
             }
             _=_1;
            }
           else
            {
             _=c.k.call(null,_arg1);
            }
          }
         return _;
        },
        ct:c.ct
       });
      };
      return Concurrency.checkCancel(r1);
     },
     Using:function(x,f)
     {
      return Concurrency.TryFinally(f(x),function()
      {
       return x.Dispose();
      });
     },
     While:function(g,c)
     {
      return g(null)?Concurrency.Bind(c,function()
      {
       return Concurrency.While(g,c);
      }):Concurrency.Return(null);
     },
     checkCancel:function(r)
     {
      return function(c)
      {
       return c.ct.c?c.k.call(null,{
        $:2,
        $0:new Error("OperationCanceledException")
       }):r(c);
      };
     },
     defCTS:Runtime.Field(function()
     {
      return{
       contents:CancellationTokenSource.New()
      };
     }),
     scheduler:Runtime.Field(function()
     {
      return Scheduler.New();
     })
    },
    Control:{
     createEvent:function(add,remove,create)
     {
      return Pervasives.NewFromList(List.ofArray([["AddHandler",add],["RemoveHandler",remove],["Subscribe",function(r)
      {
       var h;
       h=create(function()
       {
        return function(args)
        {
         return r.OnNext.call(null,args);
        };
       });
       add(h);
       return Pervasives.NewFromList(List.ofArray([["Dispose",function()
       {
        return remove(h);
       }]]));
      }]]));
     }
    },
    DateTimeHelpers:{
     AddMonths:function(d,months)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear(),e.getMonth()+months,e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())).getTime();
     },
     AddYears:function(d,years)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear()+years,e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())).getTime();
     },
     DatePortion:function(d)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear(),e.getMonth(),e.getDate())).getTime();
     },
     TimePortion:function(d)
     {
      var e;
      e=new Date(d);
      return(((24*0+e.getHours())*60+e.getMinutes())*60+e.getSeconds())*1000+e.getMilliseconds();
     }
    },
    Enumerable:{
     Of:function(getEnumerator)
     {
      return{
       GetEnumerator:getEnumerator
      };
     }
    },
    Enumerator:{
     Get:function(x)
     {
      var _,next,_2,next1;
      if(x instanceof Global.Array)
       {
        next=function(e)
        {
         var i,_1,v,v1;
         i=e.s;
         if(i<IntrinsicFunctionProxy.GetLength(x))
          {
           v=IntrinsicFunctionProxy.GetArray(x,i);
           e.c=v;
           v1=i+1;
           e.s=v1;
           _1=true;
          }
         else
          {
           _1=false;
          }
         return _1;
        };
        _=T.New(0,null,next);
       }
      else
       {
        if(Unchecked.Equals(typeof x,"string"))
         {
          next1=function(e)
          {
           var i,_1,v,v1;
           i=e.s;
           if(i<x.length)
            {
             v=x.charCodeAt(i);
             e.c=v;
             v1=i+1;
             e.s=v1;
             _1=true;
            }
           else
            {
             _1=false;
            }
           return _1;
          };
          _2=T.New(0,null,next1);
         }
        else
         {
          _2=x.GetEnumerator();
         }
        _=_2;
       }
      return _;
     },
     T:Runtime.Class({
      MoveNext:function()
      {
       return this.n.call(null,this);
      },
      get_Current:function()
      {
       return this.c;
      }
     },{
      New:function(s,c,n)
      {
       var r;
       r=Runtime.New(this,{});
       r.s=s;
       r.c=c;
       r.n=n;
       return r;
      }
     })
    },
    ExtraTopLevelOperatorsProxy:{
     array2D:function(rows)
     {
      var mapping,source1,x;
      mapping=function(source)
      {
       return Arrays.ofSeq(source);
      };
      source1=Seq.map(mapping,rows);
      x=Arrays.ofSeq(source1);
      x.dims=2;
      return x;
     }
    },
    Html:{
     Client:{
      Activator:{
       Activate:Runtime.Field(function()
       {
        var _,meta;
        if(Activator.hasDocument())
         {
          meta=document.getElementById("websharper-data");
          _=meta?jQuery(document).ready(function()
          {
           var text,obj,x,action;
           text=meta.getAttribute("content");
           obj=Json.Activate(JSON.parse(text));
           x=JS.GetFields(obj);
           action=Runtime.Tupled(function(tupledArg)
           {
            var k,v,p,old;
            k=tupledArg[0];
            v=tupledArg[1];
            p=v.get_Body();
            old=document.getElementById(k);
            return p.ReplaceInDom(old);
           });
           return Arrays.iter(action,x);
          }):null;
         }
        else
         {
          _=null;
         }
        return _;
       }),
       hasDocument:function()
       {
        var $0=this,$this=this;
        return typeof Global.document!=="undefined";
       }
      },
      HtmlContentExtensions:{
       "IControlBody.SingleNode.Static":function(node)
       {
        return SingleNode.New(node);
       },
       SingleNode:Runtime.Class({
        ReplaceInDom:function(old)
        {
         var value;
         value=this.node.parentNode.replaceChild(this.node,old);
         return;
        }
       },{
        New:function(node)
        {
         var r;
         r=Runtime.New(this,{});
         r.node=node;
         return r;
        }
       })
      }
     }
    },
    IntrinsicFunctionProxy:{
     Array2DZeroCreate:function(n,m)
     {
      var arr;
      arr=Arrays.init(n,function()
      {
       return Array(m);
      });
      arr.dims=2;
      return arr;
     },
     BoundsCheck:function(arr,n)
     {
      return(n<0?true:n>=IntrinsicFunctionProxy.GetLength(arr))?Operators.Raise(new Error("IndexOutOfRangeException")):null;
     },
     BoundsCheck2D:function(arr,n1,n2)
     {
      return(((n1<0?true:n2<0)?true:n1>=arr.length)?true:n2>=(arr.length?arr[0].length:0))?Operators.Raise(new Error("IndexOutOfRangeException")):null;
     },
     GetArray:function(arr,n)
     {
      IntrinsicFunctionProxy.BoundsCheck(arr,n);
      return arr[n];
     },
     GetArray2D:function(arr,n1,n2)
     {
      IntrinsicFunctionProxy.BoundsCheck2D(arr,n1,n2);
      return arr[n1][n2];
     },
     GetArray2DSub:function(src,src1,src2,len1,len2)
     {
      var len11,len21,dst,i,j;
      len11=len1<0?0:len1;
      len21=len2<0?0:len2;
      dst=IntrinsicFunctionProxy.Array2DZeroCreate(len11,len21);
      for(i=0;i<=len11-1;i++){
       for(j=0;j<=len21-1;j++){
        IntrinsicFunctionProxy.SetArray2D(dst,i,j,IntrinsicFunctionProxy.GetArray2D(src,src1+i,src2+j));
       }
      }
      return dst;
     },
     GetArraySub:function(arr,start,len)
     {
      var dst,i;
      dst=Array(len);
      for(i=0;i<=len-1;i++){
       IntrinsicFunctionProxy.SetArray(dst,i,IntrinsicFunctionProxy.GetArray(arr,start+1));
      }
      return dst;
     },
     GetLength:function(arr)
     {
      var matchValue;
      matchValue=arr.dims;
      return matchValue===2?arr.length*arr.length:arr.length;
     },
     SetArray:function(arr,n,x)
     {
      IntrinsicFunctionProxy.BoundsCheck(arr,n);
      arr[n]=x;
      return;
     },
     SetArray2D:function(arr,n1,n2,x)
     {
      IntrinsicFunctionProxy.BoundsCheck2D(arr,n1,n2);
      arr[n1][n2]=x;
      return;
     },
     SetArray2DSub:function(dst,src1,src2,len1,len2,src)
     {
      var i,j;
      for(i=0;i<=len1-1;i++){
       for(j=0;j<=len2-1;j++){
        IntrinsicFunctionProxy.SetArray2D(dst,src1+i,src2+j,IntrinsicFunctionProxy.GetArray2D(src,i,j));
       }
      }
      return;
     },
     SetArraySub:function(arr,start,len,src)
     {
      var i;
      for(i=0;i<=len-1;i++){
       IntrinsicFunctionProxy.SetArray(arr,start+i,IntrinsicFunctionProxy.GetArray(src,i));
      }
      return;
     }
    },
    JavaScript:{
     JS:{
      Delete:function($x,$field)
      {
       var $0=this,$this=this;
       return delete $x[$field];
      },
      ForEach:function($x,$iter)
      {
       var $0=this,$this=this;
       for(var k in $x){
        if($iter(k))
         break;
       }
      },
      GetFieldNames:function($o)
      {
       var $0=this,$this=this;
       var r=[];
       for(var k in $o)r.push(k);
       return r;
      },
      GetFieldValues:function($o)
      {
       var $0=this,$this=this;
       var r=[];
       for(var k in $o)r.push($o[k]);
       return r;
      },
      GetFields:function($o)
      {
       var $0=this,$this=this;
       var r=[];
       for(var k in $o)r.push([k,$o[k]]);
       return r;
      },
      Log:function($x)
      {
       var $0=this,$this=this;
       if(Global.console)
        Global.console.log($x);
      },
      LogMore:function($args)
      {
       var $0=this,$this=this;
       if(Global.console)
        Global.console.log.apply(Global.console,$args);
      }
     },
     Pervasives:{
      NewFromList:function(fields)
      {
       var r,enumerator,forLoopVar,v,k;
       r={};
       enumerator=Enumerator.Get(fields);
       while(enumerator.MoveNext())
        {
         forLoopVar=enumerator.get_Current();
         v=forLoopVar[1];
         k=forLoopVar[0];
         r[k]=v;
        }
       return r;
      }
     }
    },
    Json:{
     Activate:function(json)
     {
      var types,i,decode;
      types=json.$TYPES;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(types)-1;i++){
       IntrinsicFunctionProxy.SetArray(types,i,Json.lookup(IntrinsicFunctionProxy.GetArray(types,i)));
      }
      decode=function(x)
      {
       var _,matchValue,_1,_2,o,ti;
       if(Unchecked.Equals(x,null))
        {
         _=x;
        }
       else
        {
         matchValue=typeof x;
         if(matchValue==="object")
          {
           if(x instanceof Global.Array)
            {
             _2=Json.shallowMap(decode,x);
            }
           else
            {
             o=Json.shallowMap(decode,x.$V);
             ti=x.$T;
             _2=Unchecked.Equals(typeof ti,"undefined")?o:Json.restore(IntrinsicFunctionProxy.GetArray(types,ti),o);
            }
           _1=_2;
          }
         else
          {
           _1=x;
          }
         _=_1;
        }
       return _;
      };
      return decode(json.$DATA);
     },
     lookup:function(x)
     {
      var k,r,i,n,rn,_;
      k=IntrinsicFunctionProxy.GetLength(x);
      r=Global;
      i=0;
      while(i<k)
       {
        n=IntrinsicFunctionProxy.GetArray(x,i);
        rn=r[n];
        if(!Unchecked.Equals(typeof rn,undefined))
         {
          r=rn;
          _=i=i+1;
         }
        else
         {
          _=Operators.FailWith("Invalid server reply. Failed to find type: "+n);
         }
       }
      return r;
     },
     restore:function(ty,obj)
     {
      var r;
      r=new ty();
      JS.ForEach(obj,function(k)
      {
       r[k]=obj[k];
       return false;
      });
      return r;
     },
     shallowMap:function(f,x)
     {
      var _,matchValue,_1,r;
      if(x instanceof Global.Array)
       {
        _=Arrays.map(f,x);
       }
      else
       {
        matchValue=typeof x;
        if(matchValue==="object")
         {
          r={};
          JS.ForEach(x,function(y)
          {
           r[y]=f(x[y]);
           return false;
          });
          _1=r;
         }
        else
         {
          _1=x;
         }
        _=_1;
       }
      return _;
     }
    },
    Lazy:{
     Create:function(f)
     {
      var x,get;
      x={
       value:undefined,
       created:false,
       eval:f
      };
      get=function()
      {
       var _;
       if(x.created)
        {
         _=x.value;
        }
       else
        {
         x.created=true;
         x.value=f(null);
         _=x.value;
        }
       return _;
      };
      x.eval=get;
      return x;
     },
     CreateFromValue:function(v)
     {
      return{
       value:v,
       created:true,
       eval:function()
       {
        return v;
       },
       eval:function()
       {
        return v;
       }
      };
     },
     Force:function(x)
     {
      return x.eval.call(null,null);
     }
    },
    List:{
     T:Runtime.Class({
      GetEnumerator:function()
      {
       var next;
       next=function(e)
       {
        var matchValue,_,xs,x;
        matchValue=e.s;
        if(matchValue.$==0)
         {
          _=false;
         }
        else
         {
          xs=matchValue.$1;
          x=matchValue.$0;
          e.c=x;
          e.s=xs;
          _=true;
         }
        return _;
       };
       return T.New(this,null,next);
      },
      get_Item:function(x)
      {
       return Seq.nth(x,this);
      },
      get_Length:function()
      {
       return Seq.length(this);
      }
     },{
      Construct:function(head,tail)
      {
       return Runtime.New(T1,{
        $:1,
        $0:head,
        $1:tail
       });
      },
      get_Nil:function()
      {
       return Runtime.New(T1,{
        $:0
       });
      }
     }),
     append:function(x,y)
     {
      return List.ofSeq(Seq.append(x,y));
     },
     choose:function(f,l)
     {
      return List.ofSeq(Seq.choose(f,l));
     },
     collect:function(f,l)
     {
      return List.ofSeq(Seq.collect(f,l));
     },
     concat:function(s)
     {
      return List.ofSeq(Seq.concat(s));
     },
     exists2:function(p,l1,l2)
     {
      return Arrays.exists2(p,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     filter:function(p,l)
     {
      return List.ofSeq(Seq.filter(p,l));
     },
     fold2:function(f,s,l1,l2)
     {
      return Arrays.fold2(f,s,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     foldBack:function(f,l,s)
     {
      return Arrays.foldBack(f,Arrays.ofSeq(l),s);
     },
     foldBack2:function(f,l1,l2,s)
     {
      return Arrays.foldBack2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2),s);
     },
     forall2:function(p,l1,l2)
     {
      return Arrays.forall2(p,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     head:function(l)
     {
      var _,h;
      if(l.$==1)
       {
        h=l.$0;
        _=h;
       }
      else
       {
        _=Operators.FailWith("The input list was empty.");
       }
      return _;
     },
     init:function(s,f)
     {
      return List.ofArray(Arrays.init(s,f));
     },
     iter2:function(f,l1,l2)
     {
      return Arrays.iter2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     iteri2:function(f,l1,l2)
     {
      return Arrays.iteri2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     map:function(f,l)
     {
      return List.ofSeq(Seq.map(f,l));
     },
     map2:function(f,l1,l2)
     {
      return List.ofArray(Arrays.map2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     map3:function(f,l1,l2,l3)
     {
      var array;
      array=Arrays.map2(function(func)
      {
       return function(arg1)
       {
        return func(arg1);
       };
      },Arrays.map2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)),Arrays.ofSeq(l3));
      return List.ofArray(array);
     },
     mapi:function(f,l)
     {
      return List.ofSeq(Seq.mapi(f,l));
     },
     mapi2:function(f,l1,l2)
     {
      return List.ofArray(Arrays.mapi2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     max:function(l)
     {
      return Seq.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Max(e1,e2);
       };
      },l);
     },
     maxBy:function(f,l)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===1?x:y;
       };
      },l);
     },
     min:function(l)
     {
      return Seq.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Min(e1,e2);
       };
      },l);
     },
     minBy:function(f,l)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===-1?x:y;
       };
      },l);
     },
     ofArray:function(arr)
     {
      var r,i;
      r=Runtime.New(T1,{
       $:0
      });
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       r=Runtime.New(T1,{
        $:1,
        $0:IntrinsicFunctionProxy.GetArray(arr,IntrinsicFunctionProxy.GetLength(arr)-i-1),
        $1:r
       });
      }
      return r;
     },
     ofSeq:function(s)
     {
      var r,e,x;
      r=[];
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        r.unshift(e.get_Current());
       }
      x=r.slice(0);
      x.reverse();
      return List.ofArray(x);
     },
     partition:function(p,l)
     {
      var patternInput,b,a;
      patternInput=Arrays.partition(p,Arrays.ofSeq(l));
      b=patternInput[1];
      a=patternInput[0];
      return[List.ofArray(a),List.ofArray(b)];
     },
     permute:function(f,l)
     {
      return List.ofArray(Arrays.permute(f,Arrays.ofSeq(l)));
     },
     reduceBack:function(f,l)
     {
      return Arrays.reduceBack(f,Arrays.ofSeq(l));
     },
     replicate:function(size,value)
     {
      return List.ofArray(Arrays.create(size,value));
     },
     rev:function(l)
     {
      var a;
      a=Arrays.ofSeq(l);
      a.reverse();
      return List.ofArray(a);
     },
     scan:function(f,s,l)
     {
      return List.ofSeq(Seq.scan(f,s,l));
     },
     scanBack:function(f,l,s)
     {
      return List.ofArray(Arrays.scanBack(f,Arrays.ofSeq(l),s));
     },
     sort:function(l)
     {
      var a;
      a=Arrays.ofSeq(l);
      Arrays.sortInPlace(a);
      return List.ofArray(a);
     },
     sortBy:function(f,l)
     {
      return List.sortWith(function(x)
      {
       return function(y)
       {
        return Operators.Compare(f(x),f(y));
       };
      },l);
     },
     sortWith:function(f,l)
     {
      var a;
      a=Arrays.ofSeq(l);
      Arrays.sortInPlaceWith(f,a);
      return List.ofArray(a);
     },
     tail:function(l)
     {
      var _,t;
      if(l.$==1)
       {
        t=l.$1;
        _=t;
       }
      else
       {
        _=Operators.FailWith("The input list was empty.");
       }
      return _;
     },
     unzip:function(l)
     {
      var x,y,enumerator,forLoopVar,b,a;
      x=[];
      y=[];
      enumerator=Enumerator.Get(l);
      while(enumerator.MoveNext())
       {
        forLoopVar=enumerator.get_Current();
        b=forLoopVar[1];
        a=forLoopVar[0];
        x.push(a);
        y.push(b);
       }
      return[List.ofArray(x.slice(0)),List.ofArray(y.slice(0))];
     },
     unzip3:function(l)
     {
      var x,y,z,enumerator,forLoopVar,c,b,a;
      x=[];
      y=[];
      z=[];
      enumerator=Enumerator.Get(l);
      while(enumerator.MoveNext())
       {
        forLoopVar=enumerator.get_Current();
        c=forLoopVar[2];
        b=forLoopVar[1];
        a=forLoopVar[0];
        x.push(a);
        y.push(b);
        z.push(c);
       }
      return[List.ofArray(x.slice(0)),List.ofArray(y.slice(0)),List.ofArray(z.slice(0))];
     },
     zip:function(l1,l2)
     {
      return List.ofArray(Arrays.zip(Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     zip3:function(l1,l2,l3)
     {
      return List.ofArray(Arrays.zip3(Arrays.ofSeq(l1),Arrays.ofSeq(l2),Arrays.ofSeq(l3)));
     }
    },
    OperatorIntrinsics:{
     GetArraySlice:function(source,start,finish)
     {
      var matchValue,_,_1,f,_2,s,f1,s1;
      matchValue=[start,finish];
      if(matchValue[0].$==0)
       {
        if(matchValue[1].$==1)
         {
          f=matchValue[1].$0;
          _1=source.slice(0,f+1);
         }
        else
         {
          _1=[];
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==0)
         {
          s=matchValue[0].$0;
          _2=source.slice(s);
         }
        else
         {
          f1=matchValue[1].$0;
          s1=matchValue[0].$0;
          _2=source.slice(s1,f1+1);
         }
        _=_2;
       }
      return _;
     },
     GetArraySlice2D:function(arr,start1,finish1,start2,finish2)
     {
      var start11,_,n,start21,_1,n1,finish11,_2,n2,finish21,_3,n3,len1,len2;
      if(start1.$==1)
       {
        n=start1.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start11=_;
      if(start2.$==1)
       {
        n1=start2.$0;
        _1=n1;
       }
      else
       {
        _1=0;
       }
      start21=_1;
      if(finish1.$==1)
       {
        n2=finish1.$0;
        _2=n2;
       }
      else
       {
        _2=arr.length-1;
       }
      finish11=_2;
      if(finish2.$==1)
       {
        n3=finish2.$0;
        _3=n3;
       }
      else
       {
        _3=(arr.length?arr[0].length:0)-1;
       }
      finish21=_3;
      len1=finish11-start11+1;
      len2=finish21-start21+1;
      return IntrinsicFunctionProxy.GetArray2DSub(arr,start11,start21,len1,len2);
     },
     GetArraySlice2DFixed1:function(arr,fixed1,start2,finish2)
     {
      var start21,_,n,finish21,_1,n1,len2,dst,j;
      if(start2.$==1)
       {
        n=start2.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start21=_;
      if(finish2.$==1)
       {
        n1=finish2.$0;
        _1=n1;
       }
      else
       {
        _1=(arr.length?arr[0].length:0)-1;
       }
      finish21=_1;
      len2=finish21-start21+1;
      dst=Array(len2);
      for(j=0;j<=len2-1;j++){
       IntrinsicFunctionProxy.SetArray(dst,j,IntrinsicFunctionProxy.GetArray2D(arr,fixed1,start21+j));
      }
      return dst;
     },
     GetArraySlice2DFixed2:function(arr,start1,finish1,fixed2)
     {
      var start11,_,n,finish11,_1,n1,len1,dst,i;
      if(start1.$==1)
       {
        n=start1.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start11=_;
      if(finish1.$==1)
       {
        n1=finish1.$0;
        _1=n1;
       }
      else
       {
        _1=arr.length-1;
       }
      finish11=_1;
      len1=finish11-start11+1;
      dst=Array(len1);
      for(i=0;i<=len1-1;i++){
       IntrinsicFunctionProxy.SetArray(dst,i,IntrinsicFunctionProxy.GetArray2D(arr,start11+i,fixed2));
      }
      return dst;
     },
     GetStringSlice:function(source,start,finish)
     {
      var matchValue,_,_1,f,_2,s,f1,s1;
      matchValue=[start,finish];
      if(matchValue[0].$==0)
       {
        if(matchValue[1].$==1)
         {
          f=matchValue[1].$0;
          _1=source.slice(0,f+1);
         }
        else
         {
          _1="";
         }
        _=_1;
       }
      else
       {
        if(matchValue[1].$==0)
         {
          s=matchValue[0].$0;
          _2=source.slice(s);
         }
        else
         {
          f1=matchValue[1].$0;
          s1=matchValue[0].$0;
          _2=source.slice(s1,f1+1);
         }
        _=_2;
       }
      return _;
     },
     SetArraySlice:function(dst,start,finish,src)
     {
      var start1,_,n,finish1,_1,n1;
      if(start.$==1)
       {
        n=start.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start1=_;
      if(finish.$==1)
       {
        n1=finish.$0;
        _1=n1;
       }
      else
       {
        _1=IntrinsicFunctionProxy.GetLength(dst)-1;
       }
      finish1=_1;
      return IntrinsicFunctionProxy.SetArraySub(dst,start1,finish1-start1+1,src);
     },
     SetArraySlice2D:function(dst,start1,finish1,start2,finish2,src)
     {
      var start11,_,n,start21,_1,n1,finish11,_2,n2,finish21,_3,n3;
      if(start1.$==1)
       {
        n=start1.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start11=_;
      if(start2.$==1)
       {
        n1=start2.$0;
        _1=n1;
       }
      else
       {
        _1=0;
       }
      start21=_1;
      if(finish1.$==1)
       {
        n2=finish1.$0;
        _2=n2;
       }
      else
       {
        _2=dst.length-1;
       }
      finish11=_2;
      if(finish2.$==1)
       {
        n3=finish2.$0;
        _3=n3;
       }
      else
       {
        _3=(dst.length?dst[0].length:0)-1;
       }
      finish21=_3;
      return IntrinsicFunctionProxy.SetArray2DSub(dst,start11,start21,finish11-start11+1,finish21-start21+1,src);
     },
     SetArraySlice2DFixed1:function(dst,fixed1,start2,finish2,src)
     {
      var start21,_,n,finish21,_1,n1,len2,j;
      if(start2.$==1)
       {
        n=start2.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start21=_;
      if(finish2.$==1)
       {
        n1=finish2.$0;
        _1=n1;
       }
      else
       {
        _1=(dst.length?dst[0].length:0)-1;
       }
      finish21=_1;
      len2=finish21-start21+1;
      for(j=0;j<=len2-1;j++){
       IntrinsicFunctionProxy.SetArray2D(dst,fixed1,start21+j,IntrinsicFunctionProxy.GetArray(src,j));
      }
      return;
     },
     SetArraySlice2DFixed2:function(dst,start1,finish1,fixed2,src)
     {
      var start11,_,n,finish11,_1,n1,len1,i;
      if(start1.$==1)
       {
        n=start1.$0;
        _=n;
       }
      else
       {
        _=0;
       }
      start11=_;
      if(finish1.$==1)
       {
        n1=finish1.$0;
        _1=n1;
       }
      else
       {
        _1=dst.length-1;
       }
      finish11=_1;
      len1=finish11-start11+1;
      for(i=0;i<=len1-1;i++){
       IntrinsicFunctionProxy.SetArray2D(dst,start11+i,fixed2,IntrinsicFunctionProxy.GetArray(src,i));
      }
      return;
     }
    },
    Operators:{
     Compare:function(a,b)
     {
      return Unchecked.Compare(a,b);
     },
     Decrement:function(x)
     {
      x.contents=x.contents-1;
     },
     DefaultArg:function(x,d)
     {
      var _,x1;
      if(x.$==0)
       {
        _=d;
       }
      else
       {
        x1=x.$0;
        _=x1;
       }
      return _;
     },
     FailWith:function(msg)
     {
      return Operators.Raise(new Error(msg));
     },
     Increment:function(x)
     {
      x.contents=x.contents+1;
     },
     KeyValue:function(kvp)
     {
      return[kvp.K,kvp.V];
     },
     Max:function(a,b)
     {
      return Unchecked.Compare(a,b)===1?a:b;
     },
     Min:function(a,b)
     {
      return Unchecked.Compare(a,b)===-1?a:b;
     },
     Pown:function(a,n)
     {
      var p;
      p=function(n1)
      {
       var _,_1,b;
       if(n1===1)
        {
         _=a;
        }
       else
        {
         if(n1%2===0)
          {
           b=p(n1/2>>0);
           _1=b*b;
          }
         else
          {
           _1=a*p(n1-1);
          }
         _=_1;
        }
       return _;
      };
      return p(n);
     },
     Raise:function($e)
     {
      var $0=this,$this=this;
      throw $e;
     },
     Sign:function(x)
     {
      return x===0?0:x<0?-1:1;
     },
     Truncate:function(x)
     {
      return x<0?Math.ceil(x):Math.floor(x);
     },
     Using:function(t,f)
     {
      var _;
      try
      {
       _=f(t);
      }
      finally
      {
       t.Dispose();
      }
      return _;
     },
     range:function(min,max)
     {
      return Seq.init(1+max-min,function(x)
      {
       return x+min;
      });
     },
     step:function(min,step,max)
     {
      var s,predicate,source,x;
      s=Operators.Sign(step);
      predicate=function(k)
      {
       return s*(max-k)>=0;
      };
      source=Seq.initInfinite(function(k)
      {
       return min+k*step;
      });
      x=Seq.takeWhile(predicate,source);
      return x;
     }
    },
    Option:{
     bind:function(f,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _={
         $:0
        };
       }
      else
       {
        x1=x.$0;
        _=f(x1);
       }
      return _;
     },
     exists:function(p,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=false;
       }
      else
       {
        x1=x.$0;
        _=p(x1);
       }
      return _;
     },
     fold:function(f,s,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=s;
       }
      else
       {
        x1=x.$0;
        _=(f(s))(x1);
       }
      return _;
     },
     foldBack:function(f,x,s)
     {
      var _,x1;
      if(x.$==0)
       {
        _=s;
       }
      else
       {
        x1=x.$0;
        _=(f(x1))(s);
       }
      return _;
     },
     forall:function(p,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=true;
       }
      else
       {
        x1=x.$0;
        _=p(x1);
       }
      return _;
     },
     iter:function(p,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=null;
       }
      else
       {
        x1=x.$0;
        _=p(x1);
       }
      return _;
     },
     map:function(f,x)
     {
      var _,x1;
      if(x.$==0)
       {
        _={
         $:0
        };
       }
      else
       {
        x1=x.$0;
        _={
         $:1,
         $0:f(x1)
        };
       }
      return _;
     },
     toArray:function(x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=[];
       }
      else
       {
        x1=x.$0;
        _=[x1];
       }
      return _;
     },
     toList:function(x)
     {
      var _,x1;
      if(x.$==0)
       {
        _=Runtime.New(T1,{
         $:0
        });
       }
      else
       {
        x1=x.$0;
        _=List.ofArray([x1]);
       }
      return _;
     }
    },
    PrintfHelpers:{
     padNumLeft:function(s,l)
     {
      var f,_,_this,i;
      f=IntrinsicFunctionProxy.GetArray(s,0);
      if((f===" "?true:f==="+")?true:f==="-")
       {
        _this=s.substr(1);
        i=l-1;
        _=f+Strings.PadLeftWith(_this,i,48);
       }
      else
       {
        _=Strings.PadLeftWith(s,l,48);
       }
      return _;
     },
     plusForPos:function(n,s)
     {
      return 0<=n?"+"+s:s;
     },
     plusForPos0:function(n,s)
     {
      return 0<=n?"+"+s:s;
     },
     prettyPrint:function(o)
     {
      var printObject,t,_1,_2,_3,mapping1,strings1;
      printObject=function(o1)
      {
       var s,_,x,mapping,strings;
       s=Global.String(o1);
       if(s==="[object Object]")
        {
         x=JS.GetFields(o1);
         mapping=Runtime.Tupled(function(tupledArg)
         {
          var k,v;
          k=tupledArg[0];
          v=tupledArg[1];
          return k+" = "+PrintfHelpers.prettyPrint(v);
         });
         strings=Arrays.map(mapping,x);
         _="{"+Strings.concat("; ",strings)+"}";
        }
       else
        {
         _=s;
        }
       return _;
      };
      t=typeof o;
      if(t=="string")
       {
        _1="\""+o+"\"";
       }
      else
       {
        if(t=="object")
         {
          if(o instanceof Global.Array)
           {
            mapping1=function(o1)
            {
             return PrintfHelpers.prettyPrint(o1);
            };
            strings1=Arrays.map(mapping1,o);
            _3="[|"+Strings.concat("; ",strings1)+"|]";
           }
          else
           {
            _3=printObject(o);
           }
          _2=_3;
         }
        else
         {
          _2=Global.String(o);
         }
        _1=_2;
       }
      return _1;
     },
     printArray:function(p,o)
     {
      var strings;
      strings=Arrays.map(p,o);
      return"[|"+Strings.concat("; ",strings)+"|]";
     },
     printArray2D:function(p,o)
     {
      var strings;
      strings=Seq.delay(function()
      {
       var l2;
       l2=o.length?o[0].length:0;
       return Seq.map(function(i)
       {
        var strings1;
        strings1=Seq.delay(function()
        {
         return Seq.map(function(j)
         {
          return p(IntrinsicFunctionProxy.GetArray2D(o,i,j));
         },Operators.range(0,l2-1));
        });
        return Strings.concat("; ",strings1);
       },Operators.range(0,o.length-1));
      });
      return"[["+Strings.concat("][",strings)+"]]";
     },
     printList:function(p,o)
     {
      var strings;
      strings=Seq.map(p,o);
      return"["+Strings.concat("; ",strings)+"]";
     },
     spaceForPos:function(n,s)
     {
      return 0<=n?" "+s:s;
     },
     toSafe:function(s)
     {
      return s==null?"":s;
     }
    },
    Queue:{
     Clear:function(a)
     {
      return a.splice(0,IntrinsicFunctionProxy.GetLength(a));
     },
     Contains:function(a,el)
     {
      return Seq.exists(function(y)
      {
       return Unchecked.Equals(el,y);
      },a);
     },
     CopyTo:function(a,array,index)
     {
      return Arrays.blit(a,0,array,index,IntrinsicFunctionProxy.GetLength(a));
     }
    },
    Remoting:{
     AjaxProvider:Runtime.Field(function()
     {
      return XhrProvider.New();
     }),
     Async:function(m,data)
     {
      var headers,payload,f;
      headers=Remoting.makeHeaders(m);
      payload=Remoting.makePayload(data);
      f=function()
      {
       var x,f1;
       x=AsyncProxy.get_CancellationToken();
       f1=function(_arg1)
       {
        var callback,x2;
        callback=Runtime.Tupled(function(tupledArg)
        {
         var ok,err,cc,waiting,callback1,reg,ok1,err1,arg00;
         ok=tupledArg[0];
         err=tupledArg[1];
         cc=tupledArg[2];
         waiting={
          contents:true
         };
         callback1=function()
         {
          var _;
          if(waiting.contents)
           {
            waiting.contents=false;
            _=cc(new Error("OperationCanceledException"));
           }
          else
           {
            _=null;
           }
          return _;
         };
         reg=Concurrency.Register(_arg1,function()
         {
          return callback1();
         });
         ok1=function(x1)
         {
          var _;
          if(waiting.contents)
           {
            waiting.contents=false;
            reg.Dispose();
            _=ok(Json.Activate(JSON.parse(x1)));
           }
          else
           {
            _=null;
           }
          return _;
         };
         err1=function(e)
         {
          var _;
          if(waiting.contents)
           {
            waiting.contents=false;
            reg.Dispose();
            _=err(e);
           }
          else
           {
            _=null;
           }
          return _;
         };
         arg00=Remoting.EndPoint();
         return Remoting.AjaxProvider().Async(arg00,headers,payload,ok1,err1);
        });
        x2=Concurrency.FromContinuations(callback);
        return x2;
       };
       return Concurrency.Bind(x,f1);
      };
      return Concurrency.Delay(f);
     },
     Call:function(m,data)
     {
      var arg00,arg10,arg20,data1;
      arg00=Remoting.EndPoint();
      arg10=Remoting.makeHeaders(m);
      arg20=Remoting.makePayload(data);
      data1=Remoting.AjaxProvider().Sync(arg00,arg10,arg20);
      return Json.Activate(JSON.parse(data1));
     },
     EndPoint:Runtime.Field(function()
     {
      return"?";
     }),
     Send:function(m,data)
     {
      var computation,computation1,t;
      computation=Remoting.Async(m,data);
      computation1=Concurrency.Ignore(computation);
      t={
       $:0
      };
      return Concurrency.Start(computation1,t);
     },
     XhrProvider:Runtime.Class({
      Async:function(url,headers,data,ok,err)
      {
       return Remoting.ajax(true,url,headers,data,ok,err);
      },
      Sync:function(url,headers,data)
      {
       var res;
       res={
        contents:undefined
       };
       Remoting.ajax(false,url,headers,data,function(x)
       {
        res.contents=x;
       },function(e)
       {
        return Operators.Raise(e);
       });
       return res.contents;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     ajax:function($async,$url,$headers,$data,$ok,$err)
     {
      var $0=this,$this=this;
      var xhr=new Global.XMLHttpRequest();
      xhr.open("POST",$url,$async);
      for(var h in $headers){
       xhr.setRequestHeader(h,$headers[h]);
      }
      function k()
      {
       if(xhr.status==200)
        {
         $ok(xhr.responseText);
        }
       else
        {
         var msg="Response status is not 200: ";
         $err(new Global.Error(msg+xhr.status));
        }
      }
      if("onload"in xhr)
       {
        xhr.onload=xhr.onerror=xhr.onabort=k;
       }
      else
       {
        xhr.onreadystatechange=function()
        {
         if(xhr.readyState==4)
          {
           k();
          }
        };
       }
      xhr.send($data);
     },
     makeHeaders:function(m)
     {
      var headers;
      headers={};
      headers["content-type"]="application/json";
      headers["x-websharper-rpc"]=m;
      return headers;
     },
     makePayload:function(data)
     {
      return JSON.stringify(data);
     }
    },
    Seq:{
     append:function(s1,s2)
     {
      return Enumerable.Of(function()
      {
       var e1,next;
       e1=Enumerator.Get(s1);
       next=function(x)
       {
        var _,v,_1,e2,_2,v1;
        if(x.s.MoveNext())
         {
          v=x.s.get_Current();
          x.c=v;
          _=true;
         }
        else
         {
          if(x.s===e1)
           {
            e2=Enumerator.Get(s2);
            x.s=e2;
            if(e2.MoveNext())
             {
              v1=e2.get_Current();
              x.c=v1;
              _2=true;
             }
            else
             {
              _2=false;
             }
            _1=_2;
           }
          else
           {
            _1=false;
           }
          _=_1;
         }
        return _;
       };
       return T.New(e1,null,next);
      });
     },
     average:function(s)
     {
      var patternInput,sum,count;
      patternInput=Seq.fold(Runtime.Tupled(function(tupledArg)
      {
       var n,s1;
       n=tupledArg[0];
       s1=tupledArg[1];
       return function(x)
       {
        return[n+1,s1+x];
       };
      }),[0,0],s);
      sum=patternInput[1];
      count=patternInput[0];
      return sum/count;
     },
     averageBy:function(f,s)
     {
      var patternInput,sum,count;
      patternInput=Seq.fold(Runtime.Tupled(function(tupledArg)
      {
       var n,s1;
       n=tupledArg[0];
       s1=tupledArg[1];
       return function(x)
       {
        return[n+1,s1+f(x)];
       };
      }),[0,0],s);
      sum=patternInput[1];
      count=patternInput[0];
      return sum/count;
     },
     cache:function(s)
     {
      var cache,_enum,getEnumerator;
      cache=[];
      _enum=Enumerator.Get(s);
      getEnumerator=function()
      {
       var next;
       next=function(e)
       {
        var _,v,v1,_1,v2,v3;
        if(e.s+1<cache.length)
         {
          v=e.s+1;
          e.s=v;
          v1=cache[e.s];
          e.c=v1;
          _=true;
         }
        else
         {
          if(_enum.MoveNext())
           {
            v2=e.s+1;
            e.s=v2;
            v3=_enum.get_Current();
            e.c=v3;
            cache.push(e.get_Current());
            _1=true;
           }
          else
           {
            _1=false;
           }
          _=_1;
         }
        return _;
       };
       return T.New(0,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     choose:function(f,s)
     {
      var mapping;
      mapping=function(x)
      {
       var matchValue,_,v;
       matchValue=f(x);
       if(matchValue.$==0)
        {
         _=Runtime.New(T1,{
          $:0
         });
        }
       else
        {
         v=matchValue.$0;
         _=List.ofArray([v]);
        }
       return _;
      };
      return Seq.collect(mapping,s);
     },
     collect:function(f,s)
     {
      return Seq.concat(Seq.map(f,s));
     },
     compareWith:function(f,s1,s2)
     {
      var e1,e2,r,loop,matchValue;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      r=0;
      loop=true;
      while(loop?r===0:false)
       {
        matchValue=[e1.MoveNext(),e2.MoveNext()];
        matchValue[0]?matchValue[1]?r=(f(e1.get_Current()))(e2.get_Current()):r=1:matchValue[1]?r=-1:loop=false;
       }
      return r;
     },
     concat:function(ss)
     {
      return Enumerable.Of(function()
      {
       var outerE,next;
       outerE=Enumerator.Get(ss);
       next=function(st)
       {
        var matchValue,_,_1,v,_2,v1;
        matchValue=st.s;
        if(Unchecked.Equals(matchValue,null))
         {
          if(outerE.MoveNext())
           {
            v=Enumerator.Get(outerE.get_Current());
            st.s=v;
            _1=next(st);
           }
          else
           {
            _1=false;
           }
          _=_1;
         }
        else
         {
          if(matchValue.MoveNext())
           {
            v1=matchValue.get_Current();
            st.c=v1;
            _2=true;
           }
          else
           {
            st.s=null;
            _2=next(st);
           }
          _=_2;
         }
        return _;
       };
       return T.New(null,null,next);
      });
     },
     countBy:function(f,s)
     {
      var generator;
      generator=function()
      {
       var d,e,keys,k,h,_,mapping,array,x;
       d={};
       e=Enumerator.Get(s);
       keys=[];
       while(e.MoveNext())
        {
         k=f(e.get_Current());
         h=Unchecked.Hash(k);
         if(d.hasOwnProperty(h))
          {
           _=void(d[h]=d[h]+1);
          }
         else
          {
           keys.push(k);
           _=void(d[h]=1);
          }
        }
       mapping=function(k1)
       {
        return[k1,d[Unchecked.Hash(k1)]];
       };
       array=keys.slice(0);
       x=Arrays.map(mapping,array);
       return x;
      };
      return Seq.delay(generator);
     },
     delay:function(f)
     {
      return Enumerable.Of(function()
      {
       return Enumerator.Get(f(null));
      });
     },
     distinct:function(s)
     {
      return Seq.distinctBy(function(x)
      {
       return x;
      },s);
     },
     distinctBy:function(f,s)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var _enum,seen,next;
       _enum=Enumerator.Get(s);
       seen={};
       next=function(e)
       {
        var _,cur,h,check,has,_1,v;
        if(_enum.MoveNext())
         {
          cur=_enum.get_Current();
          h=function(c)
          {
           var x;
           x=f(c);
           return Unchecked.Hash(x);
          };
          check=function(c)
          {
           return seen.hasOwnProperty(h(c));
          };
          has=check(cur);
          while(has?_enum.MoveNext():false)
           {
            cur=_enum.get_Current();
            has=check(cur);
           }
          if(has)
           {
            _1=false;
           }
          else
           {
            seen[h(cur)]=null;
            v=cur;
            e.c=v;
            _1=true;
           }
          _=_1;
         }
        else
         {
          _=false;
         }
        return _;
       };
       return T.New(null,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     empty:function()
     {
      return[];
     },
     enumFinally:function(s,f)
     {
      return Enumerable.Of(function()
      {
       var e,_,e1,next;
       try
       {
        _=Enumerator.Get(s);
       }
       catch(e1)
       {
        f(null);
        _=Operators.Raise(e1);
       }
       e=_;
       next=function(x)
       {
        var _1,_2,v,e2;
        try
        {
         if(e.MoveNext())
          {
           v=e.get_Current();
           x.c=v;
           _2=true;
          }
         else
          {
           f(null);
           _2=false;
          }
         _1=_2;
        }
        catch(e2)
        {
         f(null);
         _1=Operators.Raise(e2);
        }
        return _1;
       };
       return T.New(null,null,next);
      });
     },
     enumUsing:function(x,f)
     {
      return f(x);
     },
     enumWhile:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var next,state;
       next=function(en)
       {
        var matchValue,_,e,_1,v,v1,_2,v2;
        matchValue=en.s;
        if(matchValue.$==1)
         {
          e=matchValue.$0;
          if(e.MoveNext())
           {
            v=e.get_Current();
            en.c=v;
            _1=true;
           }
          else
           {
            v1={
             $:0
            };
            en.s=v1;
            _1=next(en);
           }
          _=_1;
         }
        else
         {
          if(f(null))
           {
            v2={
             $:1,
             $0:Enumerator.Get(s)
            };
            en.s=v2;
            _2=next(en);
           }
          else
           {
            _2=false;
           }
          _=_2;
         }
        return _;
       };
       state={
        $:0
       };
       return T.New(state,null,next);
      });
     },
     exists:function(p,s)
     {
      var e,r;
      e=Enumerator.Get(s);
      r=false;
      while(!r?e.MoveNext():false)
       {
        r=p(e.get_Current());
       }
      return r;
     },
     exists2:function(p,s1,s2)
     {
      var e1,e2,r;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      r=false;
      while((!r?e1.MoveNext():false)?e2.MoveNext():false)
       {
        r=(p(e1.get_Current()))(e2.get_Current());
       }
      return r;
     },
     filter:function(f,s)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var _enum,next;
       _enum=Enumerator.Get(s);
       next=function(e)
       {
        var loop,c,res,_,v;
        loop=_enum.MoveNext();
        c=_enum.get_Current();
        res=false;
        while(loop)
         {
          if(f(c))
           {
            v=c;
            e.c=v;
            res=true;
            _=loop=false;
           }
          else
           {
            _=_enum.MoveNext()?c=_enum.get_Current():loop=false;
           }
         }
        return res;
       };
       return T.New(null,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     find:function(p,s)
     {
      var matchValue,_,x;
      matchValue=Seq.tryFind(p,s);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     findIndex:function(p,s)
     {
      var matchValue,_,x;
      matchValue=Seq.tryFindIndex(p,s);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     fold:function(f,x,s)
     {
      var r,e;
      r=x;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        r=(f(r))(e.get_Current());
       }
      return r;
     },
     forall:function(p,s)
     {
      return!Seq.exists(function(x)
      {
       return!p(x);
      },s);
     },
     forall2:function(p,s1,s2)
     {
      return!Seq.exists2(function(x)
      {
       return function(y)
       {
        return!(p(x))(y);
       };
      },s1,s2);
     },
     groupBy:function(f,s)
     {
      return Seq.delay(function()
      {
       var d,d1,keys,e,c,k,h;
       d={};
       d1={};
       keys=[];
       e=Enumerator.Get(s);
       while(e.MoveNext())
        {
         c=e.get_Current();
         k=f(c);
         h=Unchecked.Hash(k);
         !d.hasOwnProperty(h)?keys.push(k):null;
         d1[h]=k;
         d.hasOwnProperty(h)?d[h].push(c):void(d[h]=[c]);
        }
       return Arrays.map(function(k1)
       {
        return[k1,d[Unchecked.Hash(k1)]];
       },keys);
      });
     },
     head:function(s)
     {
      var e;
      e=Enumerator.Get(s);
      return e.MoveNext()?e.get_Current():Seq.insufficient();
     },
     init:function(n,f)
     {
      return Seq.take(n,Seq.initInfinite(f));
     },
     initInfinite:function(f)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var next;
       next=function(e)
       {
        var v,v1;
        v=f(e.s);
        e.c=v;
        v1=e.s+1;
        e.s=v1;
        return true;
       };
       return T.New(0,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     insufficient:function()
     {
      return Operators.FailWith("The input sequence has an insufficient number of elements.");
     },
     isEmpty:function(s)
     {
      var e;
      e=Enumerator.Get(s);
      return!e.MoveNext();
     },
     iter:function(p,s)
     {
      return Seq.iteri(function()
      {
       return function(x)
       {
        return p(x);
       };
      },s);
     },
     iter2:function(p,s1,s2)
     {
      var e1,e2;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      while(e1.MoveNext()?e2.MoveNext():false)
       {
        (p(e1.get_Current()))(e2.get_Current());
       }
      return;
     },
     iteri:function(p,s)
     {
      var i,e;
      i=0;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        (p(i))(e.get_Current());
        i=i+1;
       }
      return;
     },
     length:function(s)
     {
      var i,e;
      i=0;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        i=i+1;
       }
      return i;
     },
     map:function(f,s)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var en,next;
       en=Enumerator.Get(s);
       next=function(e)
       {
        var _,v;
        if(en.MoveNext())
         {
          v=f(en.get_Current());
          e.c=v;
          _=true;
         }
        else
         {
          _=false;
         }
        return _;
       };
       return T.New(null,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     mapi:function(f,s)
     {
      return Seq.mapi2(f,Seq.initInfinite(function(x)
      {
       return x;
      }),s);
     },
     mapi2:function(f,s1,s2)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var e1,e2,next;
       e1=Enumerator.Get(s1);
       e2=Enumerator.Get(s2);
       next=function(e)
       {
        var _,v;
        if(e1.MoveNext()?e2.MoveNext():false)
         {
          v=(f(e1.get_Current()))(e2.get_Current());
          e.c=v;
          _=true;
         }
        else
         {
          _=false;
         }
        return _;
       };
       return T.New(null,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     max:function(s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(x,y)>=0?x:y;
       };
      },s);
     },
     maxBy:function(f,s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))>=0?x:y;
       };
      },s);
     },
     min:function(s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(x,y)<=0?x:y;
       };
      },s);
     },
     minBy:function(f,s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))<=0?x:y;
       };
      },s);
     },
     nth:function(index,s)
     {
      var pos,e;
      index<0?Operators.FailWith("negative index requested"):null;
      pos=-1;
      e=Enumerator.Get(s);
      while(pos<index)
       {
        !e.MoveNext()?Seq.insufficient():null;
        pos=pos+1;
       }
      return e.get_Current();
     },
     pairwise:function(s)
     {
      var mapping,source;
      mapping=function(x)
      {
       return[IntrinsicFunctionProxy.GetArray(x,0),IntrinsicFunctionProxy.GetArray(x,1)];
      };
      source=Seq.windowed(2,s);
      return Seq.map(mapping,source);
     },
     pick:function(p,s)
     {
      var matchValue,_,x;
      matchValue=Seq.tryPick(p,s);
      if(matchValue.$==0)
       {
        _=Operators.FailWith("KeyNotFoundException");
       }
      else
       {
        x=matchValue.$0;
        _=x;
       }
      return _;
     },
     readOnly:function(s)
     {
      return Enumerable.Of(function()
      {
       return Enumerator.Get(s);
      });
     },
     reduce:function(f,source)
     {
      var e,r;
      e=Enumerator.Get(source);
      !e.MoveNext()?Operators.FailWith("The input sequence was empty"):null;
      r=e.get_Current();
      while(e.MoveNext())
       {
        r=(f(r))(e.get_Current());
       }
      return r;
     },
     scan:function(f,x,s)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var en,next;
       en=Enumerator.Get(s);
       next=function(e)
       {
        var _,_1,v;
        if(e.s)
         {
          if(en.MoveNext())
           {
            v=(f(e.get_Current()))(en.get_Current());
            e.c=v;
            _1=true;
           }
          else
           {
            _1=false;
           }
          _=_1;
         }
        else
         {
          e.c=x;
          e.s=true;
          _=true;
         }
        return _;
       };
       return T.New(false,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     skip:function(n,s)
     {
      return Enumerable.Of(function()
      {
       var e,i;
       e=Enumerator.Get(s);
       for(i=1;i<=n;i++){
        !e.MoveNext()?Seq.insufficient():null;
       }
       return e;
      });
     },
     skipWhile:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var e,empty,_,_this,next;
       e=Enumerator.Get(s);
       empty=true;
       while(e.MoveNext()?f(e.get_Current()):false)
        {
         empty=false;
        }
       if(empty)
        {
         _this=Seq.empty();
         _=Enumerator.Get(_this);
        }
       else
        {
         next=function(x)
         {
          var _1,v,r,v1;
          if(x.s)
           {
            x.s=false;
            v=e.get_Current();
            x.c=v;
            _1=true;
           }
          else
           {
            r=e.MoveNext();
            v1=e.get_Current();
            x.c=v1;
            _1=r;
           }
          return _1;
         };
         _=T.New(true,null,next);
        }
       return _;
      });
     },
     sort:function(s)
     {
      return Seq.sortBy(function(x)
      {
       return x;
      },s);
     },
     sortBy:function(f,s)
     {
      return Seq.delay(function()
      {
       var array;
       array=Arrays.ofSeq(s);
       Arrays.sortInPlaceBy(f,array);
       return array;
      });
     },
     sum:function(s)
     {
      return Seq.fold(function(s1)
      {
       return function(x)
       {
        return s1+x;
       };
      },0,s);
     },
     sumBy:function(f,s)
     {
      return Seq.fold(function(s1)
      {
       return function(x)
       {
        return s1+f(x);
       };
      },0,s);
     },
     take:function(n,s)
     {
      return Enumerable.Of(function()
      {
       var e,next;
       e=Enumerator.Get(s);
       next=function(_enum)
       {
        var _,_1,v,v1;
        if(_enum.s>=n)
         {
          _=false;
         }
        else
         {
          if(e.MoveNext())
           {
            v=_enum.s+1;
            _enum.s=v;
            v1=e.get_Current();
            _enum.c=v1;
            _1=true;
           }
          else
           {
            e.Dispose();
            _enum.s=n;
            _1=false;
           }
          _=_1;
         }
        return _;
       };
       return T.New(0,null,next);
      });
     },
     takeWhile:function(f,s)
     {
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        return Seq.enumWhile(function()
        {
         return e.MoveNext()?f(e.get_Current()):false;
        },Seq.delay(function()
        {
         return[e.get_Current()];
        }));
       });
      });
     },
     toArray:function(s)
     {
      var q,enumerator,e;
      q=[];
      enumerator=Enumerator.Get(s);
      while(enumerator.MoveNext())
       {
        e=enumerator.get_Current();
        q.push(e);
       }
      return q.slice(0);
     },
     toList:function(s)
     {
      return List.ofSeq(s);
     },
     truncate:function(n,s)
     {
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        var i;
        i={
         contents:0
        };
        return Seq.enumWhile(function()
        {
         return e.MoveNext()?i.contents<n:false;
        },Seq.delay(function()
        {
         Operators.Increment(i);
         return[e.get_Current()];
        }));
       });
      });
     },
     tryFind:function(ok,s)
     {
      var e,r,x;
      e=Enumerator.Get(s);
      r={
       $:0
      };
      while(r.$==0?e.MoveNext():false)
       {
        x=e.get_Current();
        ok(x)?r={
         $:1,
         $0:x
        }:null;
       }
      return r;
     },
     tryFindIndex:function(ok,s)
     {
      var e,loop,i,x;
      e=Enumerator.Get(s);
      loop=true;
      i=0;
      while(loop?e.MoveNext():false)
       {
        x=e.get_Current();
        ok(x)?loop=false:i=i+1;
       }
      return loop?{
       $:0
      }:{
       $:1,
       $0:i
      };
     },
     tryPick:function(f,s)
     {
      var e,r;
      e=Enumerator.Get(s);
      r={
       $:0
      };
      while(Unchecked.Equals(r,{
       $:0
      })?e.MoveNext():false)
       {
        r=f(e.get_Current());
       }
      return r;
     },
     unfold:function(f,s)
     {
      var getEnumerator;
      getEnumerator=function()
      {
       var next;
       next=function(e)
       {
        var matchValue,_,t,s1;
        matchValue=f(e.s);
        if(matchValue.$==0)
         {
          _=false;
         }
        else
         {
          t=matchValue.$0[0];
          s1=matchValue.$0[1];
          e.c=t;
          e.s=s1;
          _=true;
         }
        return _;
       };
       return T.New(s,null,next);
      };
      return Enumerable.Of(getEnumerator);
     },
     windowed:function(windowSize,s)
     {
      windowSize<=0?Operators.FailWith("The input must be non-negative."):null;
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        var q;
        q=[];
        return Seq.append(Seq.enumWhile(function()
        {
         return q.length<windowSize?e.MoveNext():false;
        },Seq.delay(function()
        {
         q.push(e.get_Current());
         return Seq.empty();
        })),Seq.delay(function()
        {
         return q.length===windowSize?Seq.append([q.slice(0)],Seq.delay(function()
         {
          return Seq.enumWhile(function()
          {
           return e.MoveNext();
          },Seq.delay(function()
          {
           q.shift();
           q.push(e.get_Current());
           return[q.slice(0)];
          }));
         })):Seq.empty();
        }));
       });
      });
     },
     zip:function(s1,s2)
     {
      return Seq.mapi2(function(x)
      {
       return function(y)
       {
        return[x,y];
       };
      },s1,s2);
     },
     zip3:function(s1,s2,s3)
     {
      return Seq.mapi2(function(x)
      {
       return Runtime.Tupled(function(tupledArg)
       {
        var y,z;
        y=tupledArg[0];
        z=tupledArg[1];
        return[x,y,z];
       });
      },s1,Seq.zip(s2,s3));
     }
    },
    Stack:{
     Clear:function(stack)
     {
      return stack.splice(0,IntrinsicFunctionProxy.GetLength(stack));
     },
     Contains:function(stack,el)
     {
      return Seq.exists(function(y)
      {
       return Unchecked.Equals(el,y);
      },stack);
     },
     CopyTo:function(stack,array,index)
     {
      return Arrays.blit(array,0,array,index,IntrinsicFunctionProxy.GetLength(stack));
     }
    },
    Strings:{
     Compare:function(x,y)
     {
      return Operators.Compare(x,y);
     },
     CopyTo:function(s,o,d,off,ct)
     {
      return Arrays.blit(Strings.ToCharArray(s),o,d,off,ct);
     },
     EndsWith:function($x,$s)
     {
      var $0=this,$this=this;
      return $x.substring($x.length-$s.length)==$s;
     },
     IndexOf:function($s,$c,$i)
     {
      var $0=this,$this=this;
      return $s.indexOf(Global.String.fromCharCode($c),$i);
     },
     Insert:function($x,$index,$s)
     {
      var $0=this,$this=this;
      return $x.substring(0,$index-1)+$s+$x.substring($index);
     },
     IsNullOrEmpty:function($x)
     {
      var $0=this,$this=this;
      return $x==null||$x=="";
     },
     Join:function($sep,$values)
     {
      var $0=this,$this=this;
      return $values.join($sep);
     },
     LastIndexOf:function($s,$c,$i)
     {
      var $0=this,$this=this;
      return $s.lastIndexOf(Global.String.fromCharCode($c),$i);
     },
     PadLeft:function(s,n)
     {
      return Strings.PadLeftWith(s,n,32);
     },
     PadLeftWith:function($s,$n,$c)
     {
      var $0=this,$this=this;
      return Global.Array($n-$s.length+1).join(Global.String.fromCharCode($c))+$s;
     },
     PadRight:function(s,n)
     {
      return Strings.PadRightWith(s,n,32);
     },
     PadRightWith:function($s,$n,$c)
     {
      var $0=this,$this=this;
      return $s+Global.Array($n-$s.length+1).join(Global.String.fromCharCode($c));
     },
     RegexEscape:function($s)
     {
      var $0=this,$this=this;
      return $s.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");
     },
     Remove:function($x,$ix,$ct)
     {
      var $0=this,$this=this;
      return $x.substring(0,$ix)+$x.substring($ix+$ct);
     },
     Replace:function(subject,search,replace)
     {
      var replaceLoop;
      replaceLoop=function(subj)
      {
       var index,_,replaced,nextStartIndex,ct;
       index=subj.indexOf(search);
       if(index!==-1)
        {
         replaced=Strings.ReplaceOnce(subj,search,replace);
         nextStartIndex=index+replace.length;
         ct=index+replace.length;
         _=Strings.Substring(replaced,0,ct)+replaceLoop(replaced.substring(nextStartIndex));
        }
       else
        {
         _=subj;
        }
       return _;
      };
      return replaceLoop(subject);
     },
     ReplaceChar:function(s,oldC,newC)
     {
      return Strings.Replace(s,String.fromCharCode(oldC),String.fromCharCode(newC));
     },
     ReplaceOnce:function($string,$search,$replace)
     {
      var $0=this,$this=this;
      return $string.replace($search,$replace);
     },
     Split:function(s,pat,opts)
     {
      var res;
      res=Strings.SplitWith(s,pat);
      return opts===1?Arrays.filter(function(x)
      {
       return x!=="";
      },res):res;
     },
     SplitChars:function(s,sep,opts)
     {
      var re;
      re="["+Strings.RegexEscape(String.fromCharCode.apply(undefined,sep))+"]";
      return Strings.Split(s,new RegExp(re),opts);
     },
     SplitStrings:function(s,sep,opts)
     {
      var re;
      re=Strings.concat("|",Arrays.map(function(s1)
      {
       return Strings.RegexEscape(s1);
      },sep));
      return Strings.Split(s,new RegExp(re),opts);
     },
     SplitWith:function($str,$pat)
     {
      var $0=this,$this=this;
      return $str.split($pat);
     },
     StartsWith:function($t,$s)
     {
      var $0=this,$this=this;
      return $t.substring(0,$s.length)==$s;
     },
     Substring:function($s,$ix,$ct)
     {
      var $0=this,$this=this;
      return $s.substr($ix,$ct);
     },
     ToCharArray:function(s)
     {
      return Arrays.init(s.length,function(x)
      {
       return s.charCodeAt(x);
      });
     },
     ToCharArrayRange:function(s,startIndex,length)
     {
      return Arrays.init(length,function(i)
      {
       return s.charCodeAt(startIndex+i);
      });
     },
     Trim:function($s)
     {
      var $0=this,$this=this;
      return $s.replace(/^\s+/,"").replace(/\s+$/,"");
     },
     collect:function(f,s)
     {
      return Arrays.init(s.length,function(i)
      {
       return f(s.charCodeAt(i));
      }).join("");
     },
     concat:function(separator,strings)
     {
      return Seq.toArray(strings).join(separator);
     },
     exists:function(f,s)
     {
      return Seq.exists(f,Strings.protect(s));
     },
     forall:function(f,s)
     {
      return Seq.forall(f,Strings.protect(s));
     },
     init:function(count,f)
     {
      return Arrays.init(count,f).join("");
     },
     iter:function(f,s)
     {
      return Seq.iter(f,Strings.protect(s));
     },
     iteri:function(f,s)
     {
      return Seq.iteri(f,Strings.protect(s));
     },
     length:function(s)
     {
      return Strings.protect(s).length;
     },
     map:function(f,s)
     {
      return Strings.collect(function(x)
      {
       return String.fromCharCode(f(x));
      },Strings.protect(s));
     },
     mapi:function(f,s)
     {
      return Seq.toArray(Seq.mapi(function(i)
      {
       return function(x)
       {
        return String.fromCharCode((f(i))(x));
       };
      },s)).join("");
     },
     protect:function(s)
     {
      return s===null?"":s;
     },
     replicate:function(count,s)
     {
      return Strings.init(count,function()
      {
       return s;
      });
     }
    },
    Unchecked:{
     Compare:function(a,b)
     {
      var _,matchValue,_1,matchValue1;
      if(a===b)
       {
        _=0;
       }
      else
       {
        matchValue=typeof a;
        if(matchValue==="undefined")
         {
          matchValue1=typeof b;
          _1=matchValue1==="undefined"?0:-1;
         }
        else
         {
          _1=matchValue==="function"?Operators.FailWith("Cannot compare function values."):matchValue==="boolean"?a<b?-1:1:matchValue==="number"?a<b?-1:1:matchValue==="string"?a<b?-1:1:a===null?-1:b===null?1:"CompareTo"in a?a.CompareTo(b):(a instanceof Array?b instanceof Array:false)?Unchecked.compareArrays(a,b):(a instanceof Date?b instanceof Date:false)?Unchecked.compareDates(a,b):Unchecked.compareArrays(JS.GetFields(a),JS.GetFields(b));
         }
        _=_1;
       }
      return _;
     },
     Equals:function(a,b)
     {
      var _,matchValue;
      if(a===b)
       {
        _=true;
       }
      else
       {
        matchValue=typeof a;
        _=matchValue==="object"?a===null?false:b===null?false:"Equals"in a?a.Equals(b):(a instanceof Array?b instanceof Array:false)?Unchecked.arrayEquals(a,b):(a instanceof Date?b instanceof Date:false)?Unchecked.dateEquals(a,b):Unchecked.arrayEquals(JS.GetFields(a),JS.GetFields(b)):false;
       }
      return _;
     },
     Hash:function(o)
     {
      var matchValue;
      matchValue=typeof o;
      return matchValue==="function"?0:matchValue==="boolean"?o?1:0:matchValue==="number"?o:matchValue==="string"?Unchecked.hashString(o):matchValue==="object"?o==null?0:o instanceof Array?Unchecked.hashArray(o):Unchecked.hashObject(o):0;
     },
     arrayEquals:function(a,b)
     {
      var _,eq,i;
      if(IntrinsicFunctionProxy.GetLength(a)===IntrinsicFunctionProxy.GetLength(b))
       {
        eq=true;
        i=0;
        while(eq?i<IntrinsicFunctionProxy.GetLength(a):false)
         {
          !Unchecked.Equals(IntrinsicFunctionProxy.GetArray(a,i),IntrinsicFunctionProxy.GetArray(b,i))?eq=false:null;
          i=i+1;
         }
        _=eq;
       }
      else
       {
        _=false;
       }
      return _;
     },
     compareArrays:function(a,b)
     {
      var _,_1,cmp,i;
      if(IntrinsicFunctionProxy.GetLength(a)<IntrinsicFunctionProxy.GetLength(b))
       {
        _=-1;
       }
      else
       {
        if(IntrinsicFunctionProxy.GetLength(a)>IntrinsicFunctionProxy.GetLength(b))
         {
          _1=1;
         }
        else
         {
          cmp=0;
          i=0;
          while(cmp===0?i<IntrinsicFunctionProxy.GetLength(a):false)
           {
            cmp=Unchecked.Compare(IntrinsicFunctionProxy.GetArray(a,i),IntrinsicFunctionProxy.GetArray(b,i));
            i=i+1;
           }
          _1=cmp;
         }
        _=_1;
       }
      return _;
     },
     compareDates:function(a,b)
     {
      return Operators.Compare(a.getTime(),b.getTime());
     },
     dateEquals:function(a,b)
     {
      return a.getTime()===b.getTime();
     },
     hashArray:function(o)
     {
      var h,i;
      h=-34948909;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(o)-1;i++){
       h=Unchecked.hashMix(h,Unchecked.Hash(IntrinsicFunctionProxy.GetArray(o,i)));
      }
      return h;
     },
     hashMix:function(x,y)
     {
      return(x<<5)+x+y;
     },
     hashObject:function(o)
     {
      var _,op_PlusPlus,h;
      if("GetHashCode"in o)
       {
        _=o.GetHashCode();
       }
      else
       {
        op_PlusPlus=function(x,y)
        {
         return Unchecked.hashMix(x,y);
        };
        h={
         contents:0
        };
        JS.ForEach(o,function(key)
        {
         h.contents=op_PlusPlus(op_PlusPlus(h.contents,Unchecked.hashString(key)),Unchecked.Hash(o[key]));
         return false;
        });
        _=h.contents;
       }
      return _;
     },
     hashString:function(s)
     {
      var _,hash,i;
      if(s===null)
       {
        _=0;
       }
      else
       {
        hash=5381;
        for(i=0;i<=s.length-1;i++){
         hash=Unchecked.hashMix(hash,s.charCodeAt(i)<<0);
        }
        _=hash;
       }
      return _;
     }
    },
    Util:{
     addListener:function(event,h)
     {
      event.Subscribe(Util.observer(h));
     },
     observer:function(h)
     {
      return Pervasives.NewFromList(List.ofArray([["OnCompleted",function()
      {
      }],["OnError",function()
      {
      }],["OnNext",h]]));
     },
     subscribeTo:function(event,h)
     {
      return event.Subscribe(Util.observer(h));
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Operators=Runtime.Safe(WebSharper.Operators);
  Number=Runtime.Safe(Global.Number);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Array=Runtime.Safe(Global.Array);
  Seq=Runtime.Safe(WebSharper.Seq);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  Arrays2D=Runtime.Safe(WebSharper.Arrays2D);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  AggregateException=Runtime.Safe(WebSharper.AggregateException);
  Option=Runtime.Safe(WebSharper.Option);
  clearTimeout=Runtime.Safe(Global.clearTimeout);
  setTimeout=Runtime.Safe(Global.setTimeout);
  CancellationTokenSource=Runtime.Safe(WebSharper.CancellationTokenSource);
  Char=Runtime.Safe(WebSharper.Char);
  Util=Runtime.Safe(WebSharper.Util);
  Lazy=Runtime.Safe(WebSharper.Lazy);
  Error=Runtime.Safe(Global.Error);
  Pervasives=Runtime.Safe(WebSharper.Pervasives);
  List=Runtime.Safe(WebSharper.List);
  Date=Runtime.Safe(Global.Date);
  console=Runtime.Safe(Global.console);
  Scheduler=Runtime.Safe(Concurrency.Scheduler);
  T=Runtime.Safe(Enumerator.T);
  Html=Runtime.Safe(WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Activator=Runtime.Safe(Client.Activator);
  document=Runtime.Safe(Global.document);
  jQuery=Runtime.Safe(Global.jQuery);
  Json=Runtime.Safe(WebSharper.Json);
  JSON=Runtime.Safe(Global.JSON);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  JS=Runtime.Safe(JavaScript.JS);
  HtmlContentExtensions=Runtime.Safe(Client.HtmlContentExtensions);
  SingleNode=Runtime.Safe(HtmlContentExtensions.SingleNode);
  T1=Runtime.Safe(List.T);
  Math=Runtime.Safe(Global.Math);
  Strings=Runtime.Safe(WebSharper.Strings);
  PrintfHelpers=Runtime.Safe(WebSharper.PrintfHelpers);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  XhrProvider=Runtime.Safe(Remoting.XhrProvider);
  AsyncProxy=Runtime.Safe(WebSharper.AsyncProxy);
  Enumerable=Runtime.Safe(WebSharper.Enumerable);
  String=Runtime.Safe(Global.String);
  return RegExp=Runtime.Safe(Global.RegExp);
 });
 Runtime.OnLoad(function()
 {
  Remoting.EndPoint();
  Remoting.AjaxProvider();
  Activator.Activate();
  Concurrency.scheduler();
  Concurrency.defCTS();
  Concurrency.GetCT();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,IntrinsicFunctionProxy,ok,Unchecked,console,Testing,Pervasives,TestBuilder,test,Random,Arrays,Math,NaN1,Infinity1,List,String,Seq;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Testing:{
     Assert:{
      For:function(times,gen,attempt)
      {
       var _this,i,i1;
       _this=gen.Base;
       for(i=0;i<=IntrinsicFunctionProxy.GetLength(_this)-1;i++){
        attempt(IntrinsicFunctionProxy.GetArray(gen.Base,i));
       }
       for(i1=1;i1<=times;i1++){
        attempt(gen.Next.call(null,null));
       }
       return;
      },
      Raises:function(f)
      {
       var _,matchValue;
       try
       {
        f(null);
        _=ok(false,"Assert raises exception test failed.");
       }
       catch(matchValue)
       {
        _=ok(true,"Pass.");
       }
       return _;
      }
     },
     Pervasives:{
      Is:function(a,b)
      {
       var _,ps;
       if(!Unchecked.Equals(a,b))
        {
         ps=["Equality test failed.",a,b];
         console?console.log.apply(console,ps):undefined;
         _=ok(false,"Equality test failed.");
        }
       else
        {
         _=ok(true,"Pass.");
        }
       return _;
      },
      Isnt:function(a,b)
      {
       var _,ps;
       if(Unchecked.Equals(a,b))
        {
         ps=["Inequality test failed.",a,b];
         console?console.log.apply(console,ps):undefined;
         _=ok(false,"Inequality test failed.");
        }
       else
        {
         _=ok(true,"Pass.");
        }
       return _;
      },
      Test:function(name)
      {
       return TestBuilder.New(name);
      },
      TestBuilder:Runtime.Class({
       Delay:function(f)
       {
        return test(this.name,f);
       },
       Zero:function()
       {
        return null;
       }
      },{
       New:function(name)
       {
        var r;
        r=Runtime.New(this,{});
        r.name=name;
        return r;
       }
      })
     },
     Random:{
      ArrayOf:function(generator)
      {
       return{
        Base:[[]],
        Next:function()
        {
         var len;
         len=Random.Natural().Next.call(null,null)%100;
         return Arrays.init(len,function()
         {
          return generator.Next.call(null,null);
         });
        }
       };
      },
      Boolean:Runtime.Field(function()
      {
       return{
        Base:[true,false],
        Next:function()
        {
         return Random.StandardUniform().Next.call(null,null)>0.5;
        }
       };
      }),
      Const:function(x)
      {
       return{
        Base:[x],
        Next:function()
        {
         return x;
        }
       };
      },
      Exponential:function(lambda)
      {
       return{
        Base:[],
        Next:function()
        {
         var p;
         p=Random.StandardUniform().Next.call(null,null);
         return-Math.log(1-p)/lambda;
        }
       };
      },
      Float:Runtime.Field(function()
      {
       return{
        Base:[0],
        Next:function()
        {
         var sign;
         sign=Random.Boolean().Next.call(null,null)?1:-1;
         return sign*Random.Exponential(0.1).Next.call(null,null);
        }
       };
      }),
      FloatExhaustive:Runtime.Field(function()
      {
       return{
        Base:[0,NaN1,Infinity1,-Infinity1],
        Next:function()
        {
         return Random.Float().Next.call(null,null);
        }
       };
      }),
      FloatWithin:function(low,hi)
      {
       return{
        Base:[low,hi],
        Next:function()
        {
         return low+(hi-low)*Math.random();
        }
       };
      },
      Implies:function(a,b)
      {
       return!a?true:b;
      },
      Imply:function(a,b)
      {
       return Random.Implies(a,b);
      },
      Int:Runtime.Field(function()
      {
       return{
        Base:[0,1,-1],
        Next:function()
        {
         return Math.round(Random.Float().Next.call(null,null));
        }
       };
      }),
      ListOf:function(generator)
      {
       var f,gen;
       f=function(array)
       {
        return List.ofArray(array);
       };
       gen=Random.ArrayOf(generator);
       return Random.Map(f,gen);
      },
      Map:function(f,gen)
      {
       var f1;
       f1=gen.Next;
       return{
        Base:Arrays.map(f,gen.Base),
        Next:function(x)
        {
         return f(f1(x));
        }
       };
      },
      Mix:function(a,b)
      {
       var left;
       left={
        contents:false
       };
       return{
        Base:a.Base.concat(b.Base),
        Next:function()
        {
         left.contents=!left.contents;
         return left.contents?a.Next.call(null,null):b.Next.call(null,null);
        }
       };
      },
      Natural:Runtime.Field(function()
      {
       var g;
       g=Random.Int().Next;
       return{
        Base:[0,1],
        Next:function(x)
        {
         var value;
         value=g(x);
         return Math.abs(value);
        }
       };
      }),
      OneOf:function(seeds)
      {
       var index;
       index=Random.Within(1,IntrinsicFunctionProxy.GetLength(seeds));
       return{
        Base:seeds,
        Next:function()
        {
         return IntrinsicFunctionProxy.GetArray(seeds,index.Next.call(null,null)-1);
        }
       };
      },
      OptionOf:function(generator)
      {
       return Random.Mix(Random.Const({
        $:0
       }),Random.Map(function(arg0)
       {
        return{
         $:1,
         $0:arg0
        };
       },generator));
      },
      StandardUniform:Runtime.Field(function()
      {
       return{
        Base:[],
        Next:function()
        {
         return Math.random();
        }
       };
      }),
      String:Runtime.Field(function()
      {
       return{
        Base:[""],
        Next:function()
        {
         var len,cs;
         len=Random.Natural().Next.call(null,null)%100;
         cs=Arrays.init(len,function()
         {
          return Random.Int().Next.call(null,null)%256;
         });
         return String.fromCharCode.apply(undefined,cs);
        }
       };
      }),
      StringExhaustive:Runtime.Field(function()
      {
       return{
        Base:[null,""],
        Next:Random.String().Next
       };
      }),
      Tuple2Of:function(a,b)
      {
       return{
        Base:Seq.toArray(Seq.delay(function()
        {
         return Seq.collect(function(x)
         {
          return Seq.map(function(y)
          {
           return[x,y];
          },b.Base);
         },a.Base);
        })),
        Next:function()
        {
         return[a.Next.call(null,null),b.Next.call(null,null)];
        }
       };
      },
      Tuple3Of:function(a,b,c)
      {
       return{
        Base:Seq.toArray(Seq.delay(function()
        {
         return Seq.collect(function(x)
         {
          return Seq.collect(function(y)
          {
           return Seq.map(function(z)
           {
            return[x,y,z];
           },c.Base);
          },b.Base);
         },a.Base);
        })),
        Next:function()
        {
         return[a.Next.call(null,null),b.Next.call(null,null),c.Next.call(null,null)];
        }
       };
      },
      Within:function(low,hi)
      {
       return{
        Base:[low,hi],
        Next:function()
        {
         return Random.Natural().Next.call(null,null)%(hi-low)+low;
        }
       };
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  ok=Runtime.Safe(Global.ok);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  console=Runtime.Safe(Global.console);
  Testing=Runtime.Safe(WebSharper.Testing);
  Pervasives=Runtime.Safe(Testing.Pervasives);
  TestBuilder=Runtime.Safe(Pervasives.TestBuilder);
  test=Runtime.Safe(Global.test);
  Random=Runtime.Safe(Testing.Random);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Math=Runtime.Safe(Global.Math);
  NaN1=Runtime.Safe(Global.NaN);
  Infinity1=Runtime.Safe(Global.Infinity);
  List=Runtime.Safe(WebSharper.List);
  String=Runtime.Safe(Global.String);
  return Seq=Runtime.Safe(WebSharper.Seq);
 });
 Runtime.OnLoad(function()
 {
  Random.StringExhaustive();
  Random.String();
  Random.StandardUniform();
  Random.Natural();
  Random.Int();
  Random.FloatExhaustive();
  Random.Float();
  Random.Boolean();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Html,Client,Attribute,Pagelet,Default,Implementation,HTML5,Element,Enumerator,Math,document,jQuery,Events,JQueryEventSupport,AttributeBuilder,DeprecatedTagBuilder,Html5AttributeBuilder,JQueryHtmlProvider,Html5TagBuilder,TagBuilder,Text,HTML51,EventsPervasives;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Html:{
     Client:{
      Attribute:Runtime.Class({
       get_Body:function()
       {
        var attr;
        attr=this.HtmlProvider.CreateAttribute(this.Name);
        attr.value=this.Value;
        return attr;
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,Pagelet.New());
        r.HtmlProvider=HtmlProvider;
        return r;
       },
       New1:function(htmlProvider,name,value)
       {
        var a;
        a=Attribute.New(htmlProvider);
        a.Name=name;
        a.Value=value;
        return a;
       }
      }),
      AttributeBuilder:Runtime.Class({
       Class:function(x)
       {
        return this.NewAttr("class",x);
       },
       NewAttr:function(name,value)
       {
        var a;
        a=Attribute.New1(this.HtmlProvider,name,value);
        return a;
       },
       get_CheckBox:function()
       {
        return this.NewAttr("type","checkbox");
       },
       get_Hidden:function()
       {
        return this.NewAttr("type","hidden");
       },
       get_Password:function()
       {
        return this.NewAttr("type","password");
       },
       get_Radio:function()
       {
        return this.NewAttr("type","radio");
       },
       get_Reset:function()
       {
        return this.NewAttr("type","reset");
       },
       get_Submit:function()
       {
        return this.NewAttr("type","submit");
       },
       get_TextField:function()
       {
        return this.NewAttr("type","textfield");
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      Default:{
       A:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("a",x);
       },
       Action:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("action",x);
       },
       Align:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("align",x);
       },
       Alt:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("alt",x);
       },
       Attr:Runtime.Field(function()
       {
        return Implementation.Attr();
       }),
       B:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("b",x);
       },
       Body:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("body",x);
       },
       Br:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("br",x);
       },
       Button:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("button",x);
       },
       Code:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("code",x);
       },
       Deprecated:Runtime.Field(function()
       {
        return Implementation.DeprecatedHtml();
       }),
       Div:function(x)
       {
        return Default.Tags().Div(x);
       },
       Em:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("em",x);
       },
       Form:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("form",x);
       },
       H1:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("h1",x);
       },
       H2:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("h2",x);
       },
       H3:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("h3",x);
       },
       H4:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("h4",x);
       },
       HRef:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("href",x);
       },
       HTML5:{
        Attr:Runtime.Field(function()
        {
         return HTML5.Attr();
        }),
        Tags:Runtime.Field(function()
        {
         return HTML5.Tags();
        })
       },
       Head:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("head",x);
       },
       Height:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("height",x);
       },
       Hr:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("hr",x);
       },
       I:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("i",x);
       },
       IFrame:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("iframe",x);
       },
       Id:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("id",x);
       },
       Img:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("img",x);
       },
       Input:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("input",x);
       },
       LI:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("li",x);
       },
       Name:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("name",x);
       },
       NewAttr:function(x)
       {
        return function(arg10)
        {
         return Default.Attr().NewAttr(x,arg10);
        };
       },
       OL:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("ol",x);
       },
       OnLoad:function(init)
       {
        return Implementation.HtmlProvider().OnDocumentReady(init);
       },
       P:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("p",x);
       },
       Pre:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("pre",x);
       },
       RowSpan:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("rowspan",x);
       },
       Script:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("script",x);
       },
       Select:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("select",x);
       },
       Selected:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("selected",x);
       },
       Span:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("span",x);
       },
       Src:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("src",x);
       },
       TBody:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("tbody",x);
       },
       TD:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("td",x);
       },
       TFoot:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("tfoot",x);
       },
       TH:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("th",x);
       },
       THead:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("thead",x);
       },
       TR:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("tr",x);
       },
       Table:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("table",x);
       },
       Tags:Runtime.Field(function()
       {
        return Implementation.Tags();
       }),
       Text:function(x)
       {
        return Default.Tags().text(x);
       },
       TextArea:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("textarea",x);
       },
       UL:function(x)
       {
        var _this;
        _this=Default.Tags();
        return _this.NewTag("ul",x);
       },
       VAlign:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("valign",x);
       },
       Width:function(x)
       {
        var _this;
        _this=Default.Attr();
        return _this.NewAttr("width",x);
       }
      },
      DeprecatedAttributeBuilder:Runtime.Class({
       NewAttr:function(name,value)
       {
        var a;
        a=Attribute.New1(this.HtmlProvider,name,value);
        return a;
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      DeprecatedTagBuilder:Runtime.Class({
       NewTag:function(name,children)
       {
        var el,enumerator,pl;
        el=Element.New1(this.HtmlProvider,name);
        enumerator=Enumerator.Get(children);
        while(enumerator.MoveNext())
         {
          pl=enumerator.get_Current();
          el.AppendI(pl);
         }
        return el;
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      Element:Runtime.Class({
       AppendI:function(pl)
       {
        var body,_,objectArg,arg00,objectArg1,arg001,arg10,_1,r;
        body=pl.get_Body();
        if(body.nodeType===2)
         {
          objectArg=this["HtmlProvider@33"];
          arg00=this.get_Body();
          _=objectArg.AppendAttribute(arg00,body);
         }
        else
         {
          objectArg1=this["HtmlProvider@33"];
          arg001=this.get_Body();
          arg10=pl.get_Body();
          _=objectArg1.AppendNode(arg001,arg10);
         }
        if(this.IsRendered)
         {
          _1=pl.Render();
         }
        else
         {
          r=this.RenderInternal;
          _1=void(this.RenderInternal=function()
          {
           r(null);
           return pl.Render();
          });
         }
        return _1;
       },
       AppendN:function(node)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.AppendNode(arg00,node);
       },
       OnLoad:function(f)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.OnLoad(arg00,f);
       },
       Render:function()
       {
        var _;
        if(!this.IsRendered)
         {
          this.RenderInternal.call(null,null);
          _=void(this.IsRendered=true);
         }
        else
         {
          _=null;
         }
        return _;
       },
       get_Body:function()
       {
        return this.Dom;
       },
       get_Html:function()
       {
        return this["HtmlProvider@33"].GetHtml(this.get_Body());
       },
       get_HtmlProvider:function()
       {
        return this["HtmlProvider@33"];
       },
       get_Id:function()
       {
        var objectArg,arg00,id,_,newId,objectArg1,arg001;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        id=objectArg.GetProperty(arg00,"id");
        if(id===undefined?true:id==="")
         {
          newId="id"+Math.round(Math.random()*100000000);
          objectArg1=this["HtmlProvider@33"];
          arg001=this.get_Body();
          objectArg1.SetProperty(arg001,"id",newId);
          _=newId;
         }
        else
         {
          _=id;
         }
        return _;
       },
       get_Item:function(name)
       {
        var objectArg,arg00,objectArg1,arg001;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        objectArg.GetAttribute(arg00,name);
        objectArg1=this["HtmlProvider@33"];
        arg001=this.get_Body();
        return objectArg1.GetAttribute(arg001,name);
       },
       get_Text:function()
       {
        return this["HtmlProvider@33"].GetText(this.get_Body());
       },
       get_Value:function()
       {
        return this["HtmlProvider@33"].GetValue(this.get_Body());
       },
       set_Html:function(x)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.SetHtml(arg00,x);
       },
       set_Item:function(name,value)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.SetAttribute(arg00,name,value);
       },
       set_Text:function(x)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.SetText(arg00,x);
       },
       set_Value:function(x)
       {
        var objectArg,arg00;
        objectArg=this["HtmlProvider@33"];
        arg00=this.get_Body();
        return objectArg.SetValue(arg00,x);
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,Pagelet.New());
        r["HtmlProvider@33"]=HtmlProvider;
        return r;
       },
       New1:function(html,name)
       {
        var el,dom;
        el=Element.New(html);
        dom=document.createElement(name);
        el.RenderInternal=function()
        {
        };
        el.Dom=dom;
        el.IsRendered=false;
        return el;
       }
      }),
      Events:{
       JQueryEventSupport:Runtime.Class({
        OnBlur:function(f,el)
        {
         return jQuery(el.get_Body()).bind("blur",function()
         {
          return f(el);
         });
        },
        OnChange:function(f,el)
        {
         return jQuery(el.get_Body()).bind("change",function()
         {
          return f(el);
         });
        },
        OnClick:function(f,el)
        {
         return this.OnMouse("click",f,el);
        },
        OnDoubleClick:function(f,el)
        {
         return this.OnMouse("dblclick",f,el);
        },
        OnError:function(f,el)
        {
         return jQuery(el.get_Body()).bind("error",function()
         {
          return f(el);
         });
        },
        OnFocus:function(f,el)
        {
         return jQuery(el.get_Body()).bind("focus",function()
         {
          return f(el);
         });
        },
        OnKeyDown:function(f,el)
        {
         var h;
         h=function(ev)
         {
          return(f(el))({
           KeyCode:ev.keyCode
          });
         };
         return jQuery(el.get_Body()).bind("keydown",h);
        },
        OnKeyPress:function(f,el)
        {
         return jQuery(el.get_Body()).keypress(function(arg)
         {
          return(f(el))({
           CharacterCode:arg.which
          });
         });
        },
        OnKeyUp:function(f,el)
        {
         var h;
         h=function(ev)
         {
          return(f(el))({
           KeyCode:ev.keyCode
          });
         };
         return jQuery(el.get_Body()).bind("keyup",h);
        },
        OnLoad:function(f,el)
        {
         return jQuery(el.get_Body()).bind("load",function()
         {
          return f(el);
         });
        },
        OnMouse:function(name,f,el)
        {
         var h;
         h=function(ev)
         {
          return(f(el))({
           X:ev.pageX,
           Y:ev.pageY
          });
         };
         return jQuery(el.get_Body()).bind(name,h);
        },
        OnMouseDown:function(f,el)
        {
         return this.OnMouse("mousedown",f,el);
        },
        OnMouseEnter:function(f,el)
        {
         return this.OnMouse("mouseenter",f,el);
        },
        OnMouseLeave:function(f,el)
        {
         return this.OnMouse("mouseleave",f,el);
        },
        OnMouseMove:function(f,el)
        {
         return this.OnMouse("mousemove",f,el);
        },
        OnMouseOut:function(f,el)
        {
         return this.OnMouse("mouseout",f,el);
        },
        OnMouseUp:function(f,el)
        {
         return this.OnMouse("mouseup",f,el);
        },
        OnResize:function(f,el)
        {
         return jQuery(el.get_Body()).bind("resize",function()
         {
          return f(el);
         });
        },
        OnScroll:function(f,el)
        {
         return jQuery(el.get_Body()).bind("scroll",function()
         {
          return f(el);
         });
        },
        OnSelect:function(f,el)
        {
         return jQuery(el.get_Body()).bind("select",function()
         {
          return f(el);
         });
        },
        OnSubmit:function(f,el)
        {
         return jQuery(el.get_Body()).bind("submit",function()
         {
          return f(el);
         });
        },
        OnUnLoad:function(f,el)
        {
         return jQuery(el.get_Body()).bind("unload",function()
         {
          return f(el);
         });
        }
       },{
        New:function()
        {
         return Runtime.New(this,{});
        }
       })
      },
      EventsPervasives:{
       Events:Runtime.Field(function()
       {
        return JQueryEventSupport.New();
       })
      },
      Html5AttributeBuilder:Runtime.Class({
       NewAttr:function(name,value)
       {
        var a;
        a=Attribute.New1(this.HtmlProvider,name,value);
        return a;
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      Html5TagBuilder:Runtime.Class({
       NewTag:function(name,children)
       {
        var el,enumerator,pl;
        el=Element.New1(this.HtmlProvider,name);
        enumerator=Enumerator.Get(children);
        while(enumerator.MoveNext())
         {
          pl=enumerator.get_Current();
          el.AppendI(pl);
         }
        return el;
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      Implementation:{
       Attr:Runtime.Field(function()
       {
        return AttributeBuilder.New(Implementation.HtmlProvider());
       }),
       DeprecatedHtml:Runtime.Field(function()
       {
        return DeprecatedTagBuilder.New(Implementation.HtmlProvider());
       }),
       HTML5:{
        Attr:Runtime.Field(function()
        {
         return Html5AttributeBuilder.New(HTML5.Html5Provider());
        }),
        Html5Provider:Runtime.Field(function()
        {
         return JQueryHtmlProvider.New();
        }),
        Tags:Runtime.Field(function()
        {
         return Html5TagBuilder.New(HTML5.Html5Provider());
        })
       },
       HtmlProvider:Runtime.Field(function()
       {
        return JQueryHtmlProvider.New();
       }),
       JQueryHtmlProvider:Runtime.Class({
        AddClass:function(node,cls)
        {
         return jQuery(node).addClass(cls);
        },
        AppendAttribute:function(node,attr)
        {
         var arg10,arg20;
         arg10=attr.nodeName;
         arg20=attr.value;
         return this.SetAttribute(node,arg10,arg20);
        },
        AppendNode:function(node,el)
        {
         return jQuery(node).append(jQuery(el));
        },
        Clear:function(node)
        {
         return jQuery(node).contents().detach();
        },
        CreateAttribute:function(str)
        {
         return document.createAttribute(str);
        },
        CreateElement:function(name)
        {
         return document.createElement(name);
        },
        CreateTextNode:function(str)
        {
         return document.createTextNode(str);
        },
        GetAttribute:function(node,name)
        {
         return jQuery(node).attr(name);
        },
        GetHtml:function(node)
        {
         return jQuery(node).html();
        },
        GetProperty:function(node,name)
        {
         var x;
         x=jQuery(node).attr(name);
         return x;
        },
        GetText:function(node)
        {
         return node.textContent;
        },
        GetValue:function(node)
        {
         var x;
         x=jQuery(node).val();
         return x;
        },
        HasAttribute:function(node,name)
        {
         return jQuery(node).attr(name)!=null;
        },
        OnDocumentReady:function(f)
        {
         return jQuery(document).ready(f);
        },
        OnLoad:function(node,f)
        {
         return jQuery(node).ready(f);
        },
        Remove:function(node)
        {
         return jQuery(node).remove();
        },
        RemoveAttribute:function(node,name)
        {
         return jQuery(node).removeAttr(name);
        },
        RemoveClass:function(node,cls)
        {
         return jQuery(node).removeClass(cls);
        },
        SetAttribute:function(node,name,value)
        {
         return jQuery(node).attr(name,value);
        },
        SetCss:function(node,name,prop)
        {
         return jQuery(node).css(name,prop);
        },
        SetHtml:function(node,text)
        {
         return jQuery(node).html(text);
        },
        SetProperty:function(node,name,value)
        {
         var x;
         x=jQuery(node).prop(name,value);
         return x;
        },
        SetStyle:function(node,style)
        {
         return jQuery(node).attr("style",style);
        },
        SetText:function(node,text)
        {
         node.textContent=text;
        },
        SetValue:function(node,value)
        {
         return jQuery(node).val(value);
        }
       },{
        New:function()
        {
         return Runtime.New(this,{});
        }
       }),
       Tags:Runtime.Field(function()
       {
        return TagBuilder.New(Implementation.HtmlProvider());
       })
      },
      Operators:{
       OnAfterRender:function(f,w)
       {
        var r;
        r=w.Render;
        w.Render=function()
        {
         r.apply(w);
         return f(w);
        };
        return;
       },
       OnBeforeRender:function(f,w)
       {
        var r;
        r=w.Render;
        w.Render=function()
        {
         f(w);
         return r.apply(w);
        };
        return;
       },
       add:function(el,inner)
       {
        var enumerator,pl;
        enumerator=Enumerator.Get(inner);
        while(enumerator.MoveNext())
         {
          pl=enumerator.get_Current();
          el.AppendI(pl);
         }
        return el;
       }
      },
      Pagelet:Runtime.Class({
       AppendTo:function(targetId)
       {
        var target,value;
        target=document.getElementById(targetId);
        value=target.appendChild(this.get_Body());
        return this.Render();
       },
       Render:function()
       {
        return null;
       },
       ReplaceInDom:function(node)
       {
        var value;
        value=node.parentNode.replaceChild(this.get_Body(),node);
        return this.Render();
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      }),
      TagBuilder:Runtime.Class({
       Div:function(x)
       {
        return this.NewTag("div",x);
       },
       NewTag:function(name,children)
       {
        var el,enumerator,pl;
        el=Element.New1(this.HtmlProvider,name);
        enumerator=Enumerator.Get(children);
        while(enumerator.MoveNext())
         {
          pl=enumerator.get_Current();
          el.AppendI(pl);
         }
        return el;
       },
       text:function(data)
       {
        return Text.New(data);
       }
      },{
       New:function(HtmlProvider)
       {
        var r;
        r=Runtime.New(this,{});
        r.HtmlProvider=HtmlProvider;
        return r;
       }
      }),
      Text:Runtime.Class({
       get_Body:function()
       {
        return document.createTextNode(this.text);
       }
      },{
       New:function(text)
       {
        var r;
        r=Runtime.New(this,Pagelet.New());
        r.text=text;
        return r;
       }
      })
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attribute=Runtime.Safe(Client.Attribute);
  Pagelet=Runtime.Safe(Client.Pagelet);
  Default=Runtime.Safe(Client.Default);
  Implementation=Runtime.Safe(Client.Implementation);
  HTML5=Runtime.Safe(Implementation.HTML5);
  Element=Runtime.Safe(Client.Element);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  Math=Runtime.Safe(Global.Math);
  document=Runtime.Safe(Global.document);
  jQuery=Runtime.Safe(Global.jQuery);
  Events=Runtime.Safe(Client.Events);
  JQueryEventSupport=Runtime.Safe(Events.JQueryEventSupport);
  AttributeBuilder=Runtime.Safe(Client.AttributeBuilder);
  DeprecatedTagBuilder=Runtime.Safe(Client.DeprecatedTagBuilder);
  Html5AttributeBuilder=Runtime.Safe(Client.Html5AttributeBuilder);
  JQueryHtmlProvider=Runtime.Safe(Implementation.JQueryHtmlProvider);
  Html5TagBuilder=Runtime.Safe(Client.Html5TagBuilder);
  TagBuilder=Runtime.Safe(Client.TagBuilder);
  Text=Runtime.Safe(Client.Text);
  HTML51=Runtime.Safe(Default.HTML5);
  return EventsPervasives=Runtime.Safe(Client.EventsPervasives);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Attribute,Pagelet);
  Runtime.Inherit(Element,Pagelet);
  Runtime.Inherit(Text,Pagelet);
  Implementation.Tags();
  Implementation.HtmlProvider();
  HTML5.Tags();
  HTML5.Html5Provider();
  HTML5.Attr();
  Implementation.DeprecatedHtml();
  Implementation.Attr();
  EventsPervasives.Events();
  Default.Tags();
  HTML51.Tags();
  HTML51.Attr();
  Default.Deprecated();
  Default.Attr();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Unchecked,Seq,Option,Control,Disposable,IntrinsicFunctionProxy,FSharpEvent,Util,Event,Event1,Collections,ResizeArray,ResizeArrayProxy,EventModule,HotStream,HotStream1,Operators,Error,Concurrency,setTimeout,clearTimeout,LinkedList,ListProxy,MailboxProcessor,Observable,Observer,Observable1,List,T,Observer1;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Control:{
     Disposable:{
      Of:function(dispose)
      {
       return{
        Dispose:dispose
       };
      }
     },
     Event:{
      Event:Runtime.Class({
       AddHandler:function(h)
       {
        return this.Handlers.Add(h);
       },
       RemoveHandler:function(h)
       {
        var predicate,objectArg,action,source,option;
        predicate=function(y)
        {
         return Unchecked.Equals(h,y);
        };
        objectArg=this.Handlers;
        action=function(arg00)
        {
         return objectArg.RemoveAt(arg00);
        };
        source=this.Handlers;
        option=Seq.tryFindIndex(predicate,source);
        return Option.iter(action,option);
       },
       Subscribe:function(observer)
       {
        var h,_this=this;
        h=function(x)
        {
         return observer.OnNext(x);
        };
        this.AddHandler(h);
        return Disposable.Of(function()
        {
         return _this.RemoveHandler(h);
        });
       },
       Trigger:function(x)
       {
        var arr,idx,h;
        arr=this.Handlers.ToArray();
        for(idx=0;idx<=arr.length-1;idx++){
         h=IntrinsicFunctionProxy.GetArray(arr,idx);
         h(x);
        }
        return;
       }
      })
     },
     EventModule:{
      Choose:function(c,e)
      {
       var r;
       r=FSharpEvent.New();
       Util.addListener(e,function(x)
       {
        var matchValue,_,y;
        matchValue=c(x);
        if(matchValue.$==0)
         {
          _=null;
         }
        else
         {
          y=matchValue.$0;
          _=r.event.Trigger(y);
         }
        return _;
       });
       return r.event;
      },
      Filter:function(ok,e)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:ResizeArrayProxy.New1()
       });
       Util.addListener(e,function(x)
       {
        return ok(x)?r.Trigger(x):null;
       });
       return r;
      },
      Map:function(f,e)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:ResizeArrayProxy.New1()
       });
       Util.addListener(e,function(x)
       {
        return r.Trigger(f(x));
       });
       return r;
      },
      Merge:function(e1,e2)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:ResizeArrayProxy.New1()
       });
       Util.addListener(e1,function(arg00)
       {
        return r.Trigger(arg00);
       });
       Util.addListener(e2,function(arg00)
       {
        return r.Trigger(arg00);
       });
       return r;
      },
      Pairwise:function(e)
      {
       var buf,ev;
       buf={
        contents:{
         $:0
        }
       };
       ev=Runtime.New(Event1,{
        Handlers:ResizeArrayProxy.New1()
       });
       Util.addListener(e,function(x)
       {
        var matchValue,_,old;
        matchValue=buf.contents;
        if(matchValue.$==1)
         {
          old=matchValue.$0;
          buf.contents={
           $:1,
           $0:x
          };
          _=ev.Trigger([old,x]);
         }
        else
         {
          _=void(buf.contents={
           $:1,
           $0:x
          });
         }
        return _;
       });
       return ev;
      },
      Partition:function(f,e)
      {
       return[EventModule.Filter(f,e),EventModule.Filter(function(x)
       {
        var value;
        value=f(x);
        return!value;
       },e)];
      },
      Scan:function(fold,seed,e)
      {
       var state,f;
       state={
        contents:seed
       };
       f=function(value)
       {
        state.contents=(fold(state.contents))(value);
        return state.contents;
       };
       return EventModule.Map(f,e);
      },
      Split:function(f,e)
      {
       var chooser,chooser1;
       chooser=function(x)
       {
        var matchValue,_,x1;
        matchValue=f(x);
        if(matchValue.$==0)
         {
          x1=matchValue.$0;
          _={
           $:1,
           $0:x1
          };
         }
        else
         {
          _={
           $:0
          };
         }
        return _;
       };
       chooser1=function(x)
       {
        var matchValue,_,x1;
        matchValue=f(x);
        if(matchValue.$==1)
         {
          x1=matchValue.$0;
          _={
           $:1,
           $0:x1
          };
         }
        else
         {
          _={
           $:0
          };
         }
        return _;
       };
       return[EventModule.Choose(chooser,e),EventModule.Choose(chooser1,e)];
      }
     },
     FSharpEvent:Runtime.Class({},{
      New:function()
      {
       var r;
       r=Runtime.New(this,{});
       r.event=Runtime.New(Event1,{
        Handlers:ResizeArrayProxy.New1()
       });
       return r;
      }
     }),
     HotStream:{
      HotStream:Runtime.Class({
       Subscribe:function(o)
       {
        var disp,_this;
        this.Latest.contents.$==1?o.OnNext(this.Latest.contents.$0):null;
        _this=this.Event;
        disp=Util.subscribeTo(_this.event,function(v)
        {
         return o.OnNext(v);
        });
        return disp;
       },
       Trigger:function(v)
       {
        var _this;
        this.Latest.contents={
         $:1,
         $0:v
        };
        _this=this.Event;
        return _this.event.Trigger(v);
       }
      },{
       New:function()
       {
        return Runtime.New(HotStream1,{
         Latest:{
          contents:{
           $:0
          }
         },
         Event:FSharpEvent.New()
        });
       }
      })
     },
     MailboxProcessor:Runtime.Class({
      PostAndAsyncReply:function(msgf,timeout)
      {
       var f,_this=this;
       f=function()
       {
        var x,f1;
        x=_this.PostAndTryAsyncReply(msgf,timeout);
        f1=function(_arg4)
        {
         var x1,_,x2;
         if(_arg4.$==1)
          {
           x2=_arg4.$0;
           _=x2;
          }
         else
          {
           _=Operators.Raise(new Error("TimeoutException"));
          }
         x1=_;
         return Concurrency.Return(x1);
        };
        return Concurrency.Bind(x,f1);
       };
       return Concurrency.Delay(f);
      },
      PostAndTryAsyncReply:function(msgf,timeout)
      {
       var timeout1,arg00,_this=this;
       timeout1=Operators.DefaultArg(timeout,this.get_DefaultTimeout());
       arg00=Runtime.Tupled(function(tupledArg)
       {
        var ok,_arg3,_arg4,_,arg001,value,waiting,arg002,value1,value2;
        ok=tupledArg[0];
        _arg3=tupledArg[1];
        _arg4=tupledArg[2];
        if(timeout1<0)
         {
          arg001=msgf(function(x)
          {
           return ok({
            $:1,
            $0:x
           });
          });
          value=_this.mailbox.AddLast(arg001);
          _=_this.resume();
         }
        else
         {
          waiting={
           contents:true
          };
          arg002=msgf(function(res)
          {
           var _1;
           if(waiting.contents)
            {
             waiting.contents=false;
             _1=ok({
              $:1,
              $0:res
             });
            }
           else
            {
             _1=null;
            }
           return _1;
          });
          value1=_this.mailbox.AddLast(arg002);
          _this.resume();
          value2=setTimeout(function()
          {
           var _1;
           if(waiting.contents)
            {
             waiting.contents=false;
             _1=ok({
              $:0
             });
            }
           else
            {
             _1=null;
            }
           return _1;
          },timeout1);
          _=void value2;
         }
        return _;
       });
       return Concurrency.FromContinuations(arg00);
      },
      Receive:function(timeout)
      {
       var f,_this=this;
       f=function()
       {
        var x,f1;
        x=_this.TryReceive(timeout);
        f1=function(_arg3)
        {
         var x1,_,x2;
         if(_arg3.$==1)
          {
           x2=_arg3.$0;
           _=x2;
          }
         else
          {
           _=Operators.Raise(new Error("TimeoutException"));
          }
         x1=_;
         return Concurrency.Return(x1);
        };
        return Concurrency.Bind(x,f1);
       };
       return Concurrency.Delay(f);
      },
      Scan:function(scanner,timeout)
      {
       var f,_this=this;
       f=function()
       {
        var x,f1;
        x=_this.TryScan(scanner,timeout);
        f1=function(_arg8)
        {
         var x1,_,x2;
         if(_arg8.$==1)
          {
           x2=_arg8.$0;
           _=x2;
          }
         else
          {
           _=Operators.Raise(new Error("TimeoutException"));
          }
         x1=_;
         return Concurrency.Return(x1);
        };
        return Concurrency.Bind(x,f1);
       };
       return Concurrency.Delay(f);
      },
      Start:function()
      {
       var _,f,_this=this,a1;
       if(this.started)
        {
         _=Operators.FailWith("The MailboxProcessor has already been started.");
        }
       else
        {
         this.started=true;
         f=function()
         {
          var f1,a,f3;
          f1=function()
          {
           var x,f2;
           x=_this.initial.call(null,_this);
           f2=function()
           {
            return Concurrency.Return(null);
           };
           return Concurrency.Bind(x,f2);
          };
          a=Concurrency.Delay(f1);
          f3=function(_arg2)
          {
           var _this1;
           _this1=_this.errorEvent;
           _this1.event.Trigger(_arg2);
           return Concurrency.Return(null);
          };
          return Concurrency.TryWith(a,f3);
         };
         a1=Concurrency.Delay(f);
         _=_this.startAsync(a1);
        }
       return _;
      },
      TryReceive:function(timeout)
      {
       var timeout1,arg00,_this=this;
       timeout1=Operators.DefaultArg(timeout,this.get_DefaultTimeout());
       arg00=Runtime.Tupled(function(tupledArg)
       {
        var ok,_arg1,_arg2,_,_1,f,arg01,waiting,pending,f1,arg02,arg03;
        ok=tupledArg[0];
        _arg1=tupledArg[1];
        _arg2=tupledArg[2];
        if(Unchecked.Equals(_this.mailbox.get_First(),null))
         {
          if(timeout1<0)
           {
            f=function()
            {
             var arg0;
             arg0=_this.dequeue();
             ok({
              $:1,
              $0:arg0
             });
             return Concurrency.Return(null);
            };
            arg01=Concurrency.Delay(f);
            _1=void(_this.savedCont={
             $:1,
             $0:arg01
            });
           }
          else
           {
            waiting={
             contents:true
            };
            pending=setTimeout(function()
            {
             var _2;
             if(waiting.contents)
              {
               waiting.contents=false;
               _this.savedCont={
                $:0
               };
               _2=ok({
                $:0
               });
              }
             else
              {
               _2=null;
              }
             return _2;
            },timeout1);
            f1=function()
            {
             var _2,arg0;
             if(waiting.contents)
              {
               waiting.contents=false;
               clearTimeout(pending);
               arg0=_this.dequeue();
               ok({
                $:1,
                $0:arg0
               });
               _2=Concurrency.Return(null);
              }
             else
              {
               _2=Concurrency.Return(null);
              }
             return _2;
            };
            arg02=Concurrency.Delay(f1);
            _1=void(_this.savedCont={
             $:1,
             $0:arg02
            });
           }
          _=_1;
         }
        else
         {
          arg03=_this.dequeue();
          _=ok({
           $:1,
           $0:arg03
          });
         }
        return _;
       });
       return Concurrency.FromContinuations(arg00);
      },
      TryScan:function(scanner,timeout)
      {
       var timeout1,f,_this=this;
       timeout1=Operators.DefaultArg(timeout,this.get_DefaultTimeout());
       f=function()
       {
        var scanInbox,matchValue1,_1,found1,f1,arg00,x1;
        scanInbox=function()
        {
         var m,found,matchValue,_;
         m=_this.mailbox.get_First();
         found={
          $:0
         };
         while(!Unchecked.Equals(m,null))
          {
           matchValue=scanner(m.v);
           if(matchValue.$==0)
            {
             _=m=m.n;
            }
           else
            {
             _this.mailbox.Remove(m);
             m=null;
             _=found=matchValue;
            }
          }
         return found;
        };
        matchValue1=scanInbox(null);
        if(matchValue1.$==1)
         {
          found1=matchValue1.$0;
          f1=function(_arg5)
          {
           var x;
           x={
            $:1,
            $0:_arg5
           };
           return Concurrency.Return(x);
          };
          _1=Concurrency.Bind(found1,f1);
         }
        else
         {
          arg00=Runtime.Tupled(function(tupledArg)
          {
           var ok,_arg5,_arg6,_,scanNext,waiting,pending,scanNext1;
           ok=tupledArg[0];
           _arg5=tupledArg[1];
           _arg6=tupledArg[2];
           if(timeout1<0)
            {
             scanNext=function()
             {
              var f2,arg0;
              f2=function()
              {
               var matchValue,_2,c,f3;
               matchValue=scanner(_this.mailbox.get_First().v);
               if(matchValue.$==1)
                {
                 c=matchValue.$0;
                 _this.mailbox.RemoveFirst();
                 f3=function(_arg61)
                 {
                  ok({
                   $:1,
                   $0:_arg61
                  });
                  return Concurrency.Return(null);
                 };
                 _2=Concurrency.Bind(c,f3);
                }
               else
                {
                 scanNext(null);
                 _2=Concurrency.Return(null);
                }
               return _2;
              };
              arg0=Concurrency.Delay(f2);
              _this.savedCont={
               $:1,
               $0:arg0
              };
              return;
             };
             _=scanNext(null);
            }
           else
            {
             waiting={
              contents:true
             };
             pending=setTimeout(function()
             {
              var _2;
              if(waiting.contents)
               {
                waiting.contents=false;
                _this.savedCont={
                 $:0
                };
                _2=ok({
                 $:0
                });
               }
              else
               {
                _2=null;
               }
              return _2;
             },timeout1);
             scanNext1=function()
             {
              var f2,arg0;
              f2=function()
              {
               var matchValue,_2,c,f3;
               matchValue=scanner(_this.mailbox.get_First().v);
               if(matchValue.$==1)
                {
                 c=matchValue.$0;
                 _this.mailbox.RemoveFirst();
                 f3=function(_arg7)
                 {
                  var _3;
                  if(waiting.contents)
                   {
                    waiting.contents=false;
                    clearTimeout(pending);
                    ok({
                     $:1,
                     $0:_arg7
                    });
                    _3=Concurrency.Return(null);
                   }
                  else
                   {
                    _3=Concurrency.Return(null);
                   }
                  return _3;
                 };
                 _2=Concurrency.Bind(c,f3);
                }
               else
                {
                 scanNext1(null);
                 _2=Concurrency.Return(null);
                }
               return _2;
              };
              arg0=Concurrency.Delay(f2);
              _this.savedCont={
               $:1,
               $0:arg0
              };
              return;
             };
             _=scanNext1(null);
            }
           return _;
          });
          x1=Concurrency.FromContinuations(arg00);
          _1=x1;
         }
        return _1;
       };
       return Concurrency.Delay(f);
      },
      dequeue:function()
      {
       var f;
       f=this.mailbox.get_First().v;
       this.mailbox.RemoveFirst();
       return f;
      },
      get_CurrentQueueLength:function()
      {
       return this.mailbox.get_Count();
      },
      get_DefaultTimeout:function()
      {
       return this["DefaultTimeout@"];
      },
      get_Error:function()
      {
       var _this;
       _this=this.errorEvent;
       return _this.event;
      },
      resume:function()
      {
       var matchValue,_,c;
       matchValue=this.savedCont;
       if(matchValue.$==1)
        {
         c=matchValue.$0;
         this.savedCont={
          $:0
         };
         _=this.startAsync(c);
        }
       else
        {
         _=null;
        }
       return _;
      },
      set_DefaultTimeout:function(v)
      {
       this["DefaultTimeout@"]=v;
       return;
      },
      startAsync:function(a)
      {
       var t;
       t=this.token;
       return Concurrency.Start(a,t);
      }
     },{
      New:function(initial,token)
      {
       var r,matchValue,_,ct,callback,value;
       r=Runtime.New(this,{});
       r.initial=initial;
       r.token=token;
       r.started=false;
       r.errorEvent=FSharpEvent.New();
       r.mailbox=ListProxy.New();
       r.savedCont={
        $:0
       };
       matchValue=r.token;
       if(matchValue.$==0)
        {
         _=null;
        }
       else
        {
         ct=matchValue.$0;
         callback=function()
         {
          return r.resume();
         };
         value=Concurrency.Register(ct,function()
         {
          return callback();
         });
         _=void value;
        }
       r["DefaultTimeout@"]=-1;
       return r;
      },
      Start:function(initial,token)
      {
       var mb;
       mb=MailboxProcessor.New(initial,token);
       mb.Start();
       return mb;
      }
     }),
     Observable:{
      Aggregate:function(io,seed,fold)
      {
       var f;
       f=function(o1)
       {
        var state,on,arg001;
        state={
         contents:seed
        };
        on=function(v)
        {
         return Observable.Protect(function()
         {
          return(fold(state.contents))(v);
         },function(s)
         {
          state.contents=s;
          return o1.OnNext(s);
         },function(arg00)
         {
          return o1.OnError(arg00);
         });
        };
        arg001=Observer.New(on,function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        });
        return io.Subscribe(arg001);
       };
       return Observable.New(f);
      },
      Choose:function(f,io)
      {
       var f1;
       f1=function(o1)
       {
        var on,arg001;
        on=function(v)
        {
         var action;
         action=function(arg00)
         {
          return o1.OnNext(arg00);
         };
         return Observable.Protect(function()
         {
          return f(v);
         },function(option)
         {
          return Option.iter(action,option);
         },function(arg00)
         {
          return o1.OnError(arg00);
         });
        };
        arg001=Observer.New(on,function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        });
        return io.Subscribe(arg001);
       };
       return Observable.New(f1);
      },
      CombineLatest:function(io1,io2,f)
      {
       var f1;
       f1=function(o)
       {
        var lv1,lv2,update,onNext,o1,onNext1,o2,d1,d2;
        lv1={
         contents:{
          $:0
         }
        };
        lv2={
         contents:{
          $:0
         }
        };
        update=function()
        {
         var matchValue,_,_1,v1,v2;
         matchValue=[lv1.contents,lv2.contents];
         if(matchValue[0].$==1)
          {
           if(matchValue[1].$==1)
            {
             v1=matchValue[0].$0;
             v2=matchValue[1].$0;
             _1=Observable.Protect(function()
             {
              return(f(v1))(v2);
             },function(arg00)
             {
              return o.OnNext(arg00);
             },function(arg00)
             {
              return o.OnError(arg00);
             });
            }
           else
            {
             _1=null;
            }
           _=_1;
          }
         else
          {
           _=null;
          }
         return _;
        };
        onNext=function(x)
        {
         lv1.contents={
          $:1,
          $0:x
         };
         return update(null);
        };
        o1=Observer.New(onNext,function()
        {
        },function()
        {
        });
        onNext1=function(y)
        {
         lv2.contents={
          $:1,
          $0:y
         };
         return update(null);
        };
        o2=Observer.New(onNext1,function()
        {
        },function()
        {
        });
        d1=io1.Subscribe(o1);
        d2=io2.Subscribe(o2);
        return Disposable.Of(function()
        {
         d1.Dispose();
         return d2.Dispose();
        });
       };
       return Observable.New(f1);
      },
      Concat:function(io1,io2)
      {
       var f;
       f=function(o)
       {
        var innerDisp,outerDisp,dispose;
        innerDisp={
         contents:{
          $:0
         }
        };
        outerDisp=io1.Subscribe(Observer.New(function(arg00)
        {
         return o.OnNext(arg00);
        },function()
        {
        },function()
        {
         var arg0;
         arg0=io2.Subscribe(o);
         innerDisp.contents={
          $:1,
          $0:arg0
         };
        }));
        dispose=function()
        {
         innerDisp.contents.$==1?innerDisp.contents.$0.Dispose():null;
         return outerDisp.Dispose();
        };
        return Disposable.Of(dispose);
       };
       return Observable.New(f);
      },
      Drop:function(count,io)
      {
       var f;
       f=function(o1)
       {
        var index,on,arg00;
        index={
         contents:0
        };
        on=function(v)
        {
         Operators.Increment(index);
         return index.contents>count?o1.OnNext(v):null;
        };
        arg00=Observer.New(on,function(arg001)
        {
         return o1.OnError(arg001);
        },function()
        {
         return o1.OnCompleted();
        });
        return io.Subscribe(arg00);
       };
       return Observable.New(f);
      },
      Filter:function(f,io)
      {
       var f1;
       f1=function(o1)
       {
        var on,arg001;
        on=function(v)
        {
         var action;
         action=function(arg00)
         {
          return o1.OnNext(arg00);
         };
         return Observable.Protect(function()
         {
          return f(v)?{
           $:1,
           $0:v
          }:{
           $:0
          };
         },function(option)
         {
          return Option.iter(action,option);
         },function(arg00)
         {
          return o1.OnError(arg00);
         });
        };
        arg001=Observer.New(on,function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        });
        return io.Subscribe(arg001);
       };
       return Observable.New(f1);
      },
      Map:function(f,io)
      {
       var f1;
       f1=function(o1)
       {
        var on,arg001;
        on=function(v)
        {
         return Observable.Protect(function()
         {
          return f(v);
         },function(arg00)
         {
          return o1.OnNext(arg00);
         },function(arg00)
         {
          return o1.OnError(arg00);
         });
        };
        arg001=Observer.New(on,function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        });
        return io.Subscribe(arg001);
       };
       return Observable.New(f1);
      },
      Merge:function(io1,io2)
      {
       var f;
       f=function(o)
       {
        var completed1,completed2,arg00,disp1,arg002,disp2;
        completed1={
         contents:false
        };
        completed2={
         contents:false
        };
        arg00=Observer.New(function(arg001)
        {
         return o.OnNext(arg001);
        },function()
        {
        },function()
        {
         completed1.contents=true;
         return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
        });
        disp1=io1.Subscribe(arg00);
        arg002=Observer.New(function(arg001)
        {
         return o.OnNext(arg001);
        },function()
        {
        },function()
        {
         completed2.contents=true;
         return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
        });
        disp2=io2.Subscribe(arg002);
        return Disposable.Of(function()
        {
         disp1.Dispose();
         return disp2.Dispose();
        });
       };
       return Observable.New(f);
      },
      Never:function()
      {
       return Observable.New(function()
       {
        return Disposable.Of(function()
        {
        });
       });
      },
      New:function(f)
      {
       return Runtime.New(Observable1,{
        Subscribe1:f
       });
      },
      Observable:Runtime.Class({
       Subscribe:function(observer)
       {
        return this.Subscribe1.call(null,observer);
       }
      }),
      Of:function(f)
      {
       return Observable.New(function(o)
       {
        return Disposable.Of(f(function(x)
        {
         return o.OnNext(x);
        }));
       });
      },
      Protect:function(f,succeed,fail)
      {
       var matchValue,_,e,_1,e1,x;
       try
       {
        _={
         $:0,
         $0:f(null)
        };
       }
       catch(e)
       {
        _={
         $:1,
         $0:e
        };
       }
       matchValue=_;
       if(matchValue.$==1)
        {
         e1=matchValue.$0;
         _1=fail(e1);
        }
       else
        {
         x=matchValue.$0;
         _1=succeed(x);
        }
       return _1;
      },
      Range:function(start,count)
      {
       var f;
       f=function(o)
       {
        var i;
        for(i=start;i<=start+count;i++){
         o.OnNext(i);
        }
        return Disposable.Of(function()
        {
        });
       };
       return Observable.New(f);
      },
      Return:function(x)
      {
       var f;
       f=function(o)
       {
        o.OnNext(x);
        o.OnCompleted();
        return Disposable.Of(function()
        {
        });
       };
       return Observable.New(f);
      },
      SelectMany:function(io)
      {
       return Observable.New(function(o)
       {
        var disp,d;
        disp={
         contents:function()
         {
         }
        };
        d=Util.subscribeTo(io,function(o1)
        {
         var d1;
         d1=Util.subscribeTo(o1,function(v)
         {
          return o.OnNext(v);
         });
         disp.contents=function()
         {
          disp.contents.call(null,null);
          return d1.Dispose();
         };
         return;
        });
        return Disposable.Of(function()
        {
         disp.contents.call(null,null);
         return d.Dispose();
        });
       });
      },
      Sequence:function(ios)
      {
       var sequence;
       sequence=function(ios1)
       {
        var _,xs,x,rest;
        if(ios1.$==1)
         {
          xs=ios1.$1;
          x=ios1.$0;
          rest=sequence(xs);
          _=Observable.CombineLatest(x,rest,function(x1)
          {
           return function(y)
           {
            return Runtime.New(T,{
             $:1,
             $0:x1,
             $1:y
            });
           };
          });
         }
        else
         {
          _=Observable.Return(Runtime.New(T,{
           $:0
          }));
         }
        return _;
       };
       return sequence(List.ofSeq(ios));
      },
      Switch:function(io)
      {
       return Observable.New(function(o)
       {
        var index,disp,disp1;
        index={
         contents:0
        };
        disp={
         contents:{
          $:0
         }
        };
        disp1=Util.subscribeTo(io,function(o1)
        {
         var currentIndex,arg0,d;
         Operators.Increment(index);
         disp.contents.$==1?disp.contents.$0.Dispose():null;
         currentIndex=index.contents;
         arg0=Util.subscribeTo(o1,function(v)
         {
          return currentIndex===index.contents?o.OnNext(v):null;
         });
         d={
          $:1,
          $0:arg0
         };
         disp.contents=d;
         return;
        });
        return disp1;
       });
      }
     },
     ObservableModule:{
      Pairwise:function(e)
      {
       var f;
       f=function(o1)
       {
        var last,on,arg00;
        last={
         contents:{
          $:0
         }
        };
        on=function(v)
        {
         var matchValue,_,l;
         matchValue=last.contents;
         if(matchValue.$==1)
          {
           l=matchValue.$0;
           _=o1.OnNext([l,v]);
          }
         else
          {
           _=null;
          }
         last.contents={
          $:1,
          $0:v
         };
         return;
        };
        arg00=Observer.New(on,function(arg001)
        {
         return o1.OnError(arg001);
        },function()
        {
         return o1.OnCompleted();
        });
        return e.Subscribe(arg00);
       };
       return Observable.New(f);
      },
      Partition:function(f,e)
      {
       var ok;
       ok=function(x)
       {
        var value;
        value=f(x);
        return!value;
       };
       return[Observable.Filter(f,e),Observable.Filter(ok,e)];
      },
      Scan:function(fold,seed,e)
      {
       var f;
       f=function(o1)
       {
        var state,on,arg001;
        state={
         contents:seed
        };
        on=function(v)
        {
         return Observable.Protect(function()
         {
          return(fold(state.contents))(v);
         },function(s)
         {
          state.contents=s;
          return o1.OnNext(s);
         },function(arg00)
         {
          return o1.OnError(arg00);
         });
        };
        arg001=Observer.New(on,function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        });
        return e.Subscribe(arg001);
       };
       return Observable.New(f);
      },
      Split:function(f,e)
      {
       var chooser,left,chooser1,right;
       chooser=function(x)
       {
        var matchValue,_,x1;
        matchValue=f(x);
        if(matchValue.$==0)
         {
          x1=matchValue.$0;
          _={
           $:1,
           $0:x1
          };
         }
        else
         {
          _={
           $:0
          };
         }
        return _;
       };
       left=Observable.Choose(chooser,e);
       chooser1=function(x)
       {
        var matchValue,_,x1;
        matchValue=f(x);
        if(matchValue.$==1)
         {
          x1=matchValue.$0;
          _={
           $:1,
           $0:x1
          };
         }
        else
         {
          _={
           $:0
          };
         }
        return _;
       };
       right=Observable.Choose(chooser1,e);
       return[left,right];
      }
     },
     Observer:{
      New:function(f,e,c)
      {
       return Runtime.New(Observer1,{
        onNext:f,
        onError:e,
        onCompleted:c
       });
      },
      Observer:Runtime.Class({
       OnCompleted:function()
       {
        return this.onCompleted.call(null,null);
       },
       OnError:function(e)
       {
        return this.onError.call(null,e);
       },
       OnNext:function(x)
       {
        return this.onNext.call(null,x);
       }
      }),
      Of:function(f)
      {
       return Runtime.New(Observer1,{
        onNext:function(x)
        {
         return f(x);
        },
        onError:function(x)
        {
         return Operators.Raise(x);
        },
        onCompleted:function()
        {
         return null;
        }
       });
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Seq=Runtime.Safe(WebSharper.Seq);
  Option=Runtime.Safe(WebSharper.Option);
  Control=Runtime.Safe(WebSharper.Control);
  Disposable=Runtime.Safe(Control.Disposable);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  Util=Runtime.Safe(WebSharper.Util);
  Event=Runtime.Safe(Control.Event);
  Event1=Runtime.Safe(Event.Event);
  Collections=Runtime.Safe(WebSharper.Collections);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
  EventModule=Runtime.Safe(Control.EventModule);
  HotStream=Runtime.Safe(Control.HotStream);
  HotStream1=Runtime.Safe(HotStream.HotStream);
  Operators=Runtime.Safe(WebSharper.Operators);
  Error=Runtime.Safe(Global.Error);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  setTimeout=Runtime.Safe(Global.setTimeout);
  clearTimeout=Runtime.Safe(Global.clearTimeout);
  LinkedList=Runtime.Safe(Collections.LinkedList);
  ListProxy=Runtime.Safe(LinkedList.ListProxy);
  MailboxProcessor=Runtime.Safe(Control.MailboxProcessor);
  Observable=Runtime.Safe(Control.Observable);
  Observer=Runtime.Safe(Control.Observer);
  Observable1=Runtime.Safe(Observable.Observable);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  return Observer1=Runtime.Safe(Observer.Observer);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Collections,BalancedTree,Operators,IntrinsicFunctionProxy,Seq,List,T,Arrays,JavaScript,JS,Enumerator,DictionaryUtil,Dictionary,Unchecked,FSharpMap,Pair,Option,MapUtil,FSharpSet,SetModule,SetUtil,Array,HashSet,HashSetUtil,HashSet1,LinkedList,EnumeratorProxy,ListProxy,ResizeArray,ResizeArrayProxy;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Collections:{
     BalancedTree:{
      Add:function(x,t)
      {
       return BalancedTree.Put(function()
       {
        return function(x1)
        {
         return x1;
        };
       },x,t);
      },
      Branch:function(node,left,right)
      {
       return{
        Node:node,
        Left:left,
        Right:right,
        Height:1+Operators.Max(left==null?0:left.Height,right==null?0:right.Height),
        Count:1+(left==null?0:left.Count)+(right==null?0:right.Count)
       };
      },
      Build:function(data,min,max)
      {
       var sz,_,center,left,right;
       sz=max-min+1;
       if(sz<=0)
        {
         _=null;
        }
       else
        {
         center=(min+max)/2>>0;
         left=BalancedTree.Build(data,min,center-1);
         right=BalancedTree.Build(data,center+1,max);
         _=BalancedTree.Branch(IntrinsicFunctionProxy.GetArray(data,center),left,right);
        }
       return _;
      },
      Contains:function(v,t)
      {
       return!((BalancedTree.Lookup(v,t))[0]==null);
      },
      Enumerate:function(flip,t)
      {
       var gen;
       gen=Runtime.Tupled(function(tupledArg)
       {
        var t1,spine,_,_1,t2,spine1,other;
        t1=tupledArg[0];
        spine=tupledArg[1];
        if(t1==null)
         {
          if(spine.$==1)
           {
            t2=spine.$0[0];
            spine1=spine.$1;
            other=spine.$0[1];
            _1={
             $:1,
             $0:[t2,[other,spine1]]
            };
           }
          else
           {
            _1={
             $:0
            };
           }
          _=_1;
         }
        else
         {
          _=flip?gen([t1.Right,Runtime.New(T,{
           $:1,
           $0:[t1.Node,t1.Left],
           $1:spine
          })]):gen([t1.Left,Runtime.New(T,{
           $:1,
           $0:[t1.Node,t1.Right],
           $1:spine
          })]);
         }
        return _;
       });
       return Seq.unfold(gen,[t,Runtime.New(T,{
        $:0
       })]);
      },
      Lookup:function(k,t)
      {
       var spine,t1,loop,_,matchValue,_1;
       spine=[];
       t1=t;
       loop=true;
       while(loop)
        {
         if(t1==null)
          {
           _=loop=false;
          }
         else
          {
           matchValue=Operators.Compare(k,t1.Node);
           if(matchValue===0)
            {
             _1=loop=false;
            }
           else
            {
             if(matchValue===1)
              {
               spine.unshift([true,t1.Node,t1.Left]);
               _1=t1=t1.Right;
              }
             else
              {
               spine.unshift([false,t1.Node,t1.Right]);
               _1=t1=t1.Left;
              }
            }
           _=_1;
          }
        }
       return[t1,spine];
      },
      OfSeq:function(data)
      {
       var data1;
       data1=Arrays.sort(Seq.toArray(Seq.distinct(data)));
       return BalancedTree.Build(data1,0,data1.length-1);
      },
      Put:function(combine,k,t)
      {
       var patternInput,t1,spine;
       patternInput=BalancedTree.Lookup(k,t);
       t1=patternInput[0];
       spine=patternInput[1];
       return t1==null?BalancedTree.Rebuild(spine,BalancedTree.Branch(k,null,null)):BalancedTree.Rebuild(spine,BalancedTree.Branch((combine(t1.Node))(k),t1.Left,t1.Right));
      },
      Rebuild:function(spine,t)
      {
       var h,t1,i,matchValue,_,x1,l,_1,_2,m,x2,r,_3,_4,m1;
       h=function(x)
       {
        return x==null?0:x.Height;
       };
       t1=t;
       for(i=0;i<=IntrinsicFunctionProxy.GetLength(spine)-1;i++){
        matchValue=IntrinsicFunctionProxy.GetArray(spine,i);
        if(matchValue[0])
         {
          x1=matchValue[1];
          l=matchValue[2];
          if(h(t1)>h(l)+1)
           {
            if(h(t1.Left)===h(t1.Right)+1)
             {
              m=t1.Left;
              _2=BalancedTree.Branch(m.Node,BalancedTree.Branch(x1,l,m.Left),BalancedTree.Branch(t1.Node,m.Right,t1.Right));
             }
            else
             {
              _2=BalancedTree.Branch(t1.Node,BalancedTree.Branch(x1,l,t1.Left),t1.Right);
             }
            _1=_2;
           }
          else
           {
            _1=BalancedTree.Branch(x1,l,t1);
           }
          _=_1;
         }
        else
         {
          x2=matchValue[1];
          r=matchValue[2];
          if(h(t1)>h(r)+1)
           {
            if(h(t1.Right)===h(t1.Left)+1)
             {
              m1=t1.Right;
              _4=BalancedTree.Branch(m1.Node,BalancedTree.Branch(t1.Node,t1.Left,m1.Left),BalancedTree.Branch(x2,m1.Right,r));
             }
            else
             {
              _4=BalancedTree.Branch(t1.Node,t1.Left,BalancedTree.Branch(x2,t1.Right,r));
             }
            _3=_4;
           }
          else
           {
            _3=BalancedTree.Branch(x2,t1,r);
           }
          _=_3;
         }
        t1=_;
       }
       return t1;
      },
      Remove:function(k,src)
      {
       var patternInput,t,spine,_,_1,_2,source,t1,t2,data,t3;
       patternInput=BalancedTree.Lookup(k,src);
       t=patternInput[0];
       spine=patternInput[1];
       if(t==null)
        {
         _=src;
        }
       else
        {
         if(t.Right==null)
          {
           _1=BalancedTree.Rebuild(spine,t.Left);
          }
         else
          {
           if(t.Left==null)
            {
             _2=BalancedTree.Rebuild(spine,t.Right);
            }
           else
            {
             t1=t.Left;
             t2=t.Right;
             source=Seq.append(BalancedTree.Enumerate(false,t1),BalancedTree.Enumerate(false,t2));
             data=Seq.toArray(source);
             t3=BalancedTree.Build(data,0,data.length-1);
             _2=BalancedTree.Rebuild(spine,t3);
            }
           _1=_2;
          }
         _=_1;
        }
       return _;
      },
      TryFind:function(v,t)
      {
       var x;
       x=(BalancedTree.Lookup(v,t))[0];
       return x==null?{
        $:0
       }:{
        $:1,
        $0:x.Node
       };
      }
     },
     Dictionary:Runtime.Class({
      Add:function(k,v)
      {
       var h,_;
       h=this.hash.call(null,k);
       if(this.data.hasOwnProperty(h))
        {
         _=Operators.FailWith("An item with the same key has already been added.");
        }
       else
        {
         this.data[h]={
          K:k,
          V:v
         };
         _=void(this.count=this.count+1);
        }
       return _;
      },
      Clear:function()
      {
       this.data={};
       this.count=0;
       return;
      },
      ContainsKey:function(k)
      {
       return this.data.hasOwnProperty(this.hash.call(null,k));
      },
      GetEnumerator:function()
      {
       var s;
       s=JS.GetFieldValues(this.data);
       return Enumerator.Get(s);
      },
      Remove:function(k)
      {
       var h,_;
       h=this.hash.call(null,k);
       if(this.data.hasOwnProperty(h))
        {
         JS.Delete(this.data,h);
         this.count=this.count-1;
         _=true;
        }
       else
        {
         _=false;
        }
       return _;
      },
      get_Item:function(k)
      {
       var k1,_,x;
       k1=this.hash.call(null,k);
       if(this.data.hasOwnProperty(k1))
        {
         x=this.data[k1];
         _=x.V;
        }
       else
        {
         _=DictionaryUtil.notPresent();
        }
       return _;
      },
      set_Item:function(k,v)
      {
       var h;
       h=this.hash.call(null,k);
       !this.data.hasOwnProperty(h)?void(this.count=this.count+1):null;
       this.data[h]={
        K:k,
        V:v
       };
       return;
      }
     },{
      New:function(dictionary,comparer)
      {
       return Runtime.New(this,Dictionary.New11(dictionary,function(x)
       {
        return function(y)
        {
         return comparer.Equals(x,y);
        };
       },function(x)
       {
        return comparer.GetHashCode(x);
       }));
      },
      New1:function(dictionary)
      {
       return Runtime.New(this,Dictionary.New11(dictionary,function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },function(obj)
       {
        return Unchecked.Hash(obj);
       }));
      },
      New11:function(init,equals,hash)
      {
       var r,enumerator,x,x1;
       r=Runtime.New(this,{});
       r.hash=hash;
       r.count=0;
       r.data={};
       enumerator=Enumerator.Get(init);
       while(enumerator.MoveNext())
        {
         x=enumerator.get_Current();
         x1=x.K;
         r.data[r.hash.call(null,x1)]=x.V;
        }
       return r;
      },
      New12:function(comparer)
      {
       return Runtime.New(this,Dictionary.New11([],function(x)
       {
        return function(y)
        {
         return comparer.Equals(x,y);
        };
       },function(x)
       {
        return comparer.GetHashCode(x);
       }));
      },
      New2:function()
      {
       return Runtime.New(this,Dictionary.New11([],function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },function(obj)
       {
        return Unchecked.Hash(obj);
       }));
      },
      New3:function()
      {
       return Runtime.New(this,Dictionary.New2());
      },
      New4:function(capacity,comparer)
      {
       return Runtime.New(this,Dictionary.New12(comparer));
      }
     }),
     DictionaryUtil:{
      notPresent:function()
      {
       return Operators.FailWith("The given key was not present in the dictionary.");
      }
     },
     FSharpMap:Runtime.Class({
      Add:function(k,v)
      {
       var x,x1;
       x=this.tree;
       x1=Runtime.New(Pair,{
        Key:k,
        Value:v
       });
       return FSharpMap.New1(BalancedTree.Add(x1,x));
      },
      CompareTo:function(other)
      {
       return Seq.compareWith(function(x)
       {
        return function(y)
        {
         return Operators.Compare(x,y);
        };
       },this,other);
      },
      ContainsKey:function(k)
      {
       var x,v;
       x=this.tree;
       v=Runtime.New(Pair,{
        Key:k,
        Value:undefined
       });
       return BalancedTree.Contains(v,x);
      },
      Equals:function(other)
      {
       return this.get_Count()===other.get_Count()?Seq.forall2(function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },this,other):false;
      },
      GetEnumerator:function()
      {
       var t,mapping,source,s;
       t=this.tree;
       mapping=function(kv)
       {
        return{
         K:kv.Key,
         V:kv.Value
        };
       };
       source=BalancedTree.Enumerate(false,t);
       s=Seq.map(mapping,source);
       return Enumerator.Get(s);
      },
      GetHashCode:function()
      {
       var x;
       x=Seq.toArray(this);
       return Unchecked.Hash(x);
      },
      Remove:function(k)
      {
       var x,k1;
       x=this.tree;
       k1=Runtime.New(Pair,{
        Key:k,
        Value:undefined
       });
       return FSharpMap.New1(BalancedTree.Remove(k1,x));
      },
      TryFind:function(k)
      {
       var x,v,mapping,option;
       x=this.tree;
       v=Runtime.New(Pair,{
        Key:k,
        Value:undefined
       });
       mapping=function(kv)
       {
        return kv.Value;
       };
       option=BalancedTree.TryFind(v,x);
       return Option.map(mapping,option);
      },
      get_Count:function()
      {
       var tree;
       tree=this.tree;
       return tree==null?0:tree.Count;
      },
      get_IsEmpty:function()
      {
       return this.tree==null;
      },
      get_Item:function(k)
      {
       var matchValue,_,v;
       matchValue=this.TryFind(k);
       if(matchValue.$==0)
        {
         _=Operators.FailWith("The given key was not present in the dictionary.");
        }
       else
        {
         v=matchValue.$0;
         _=v;
        }
       return _;
      },
      get_Tree:function()
      {
       return this.tree;
      }
     },{
      New:function(s)
      {
       return Runtime.New(this,FSharpMap.New1(MapUtil.fromSeq(s)));
      },
      New1:function(tree)
      {
       var r;
       r=Runtime.New(this,{});
       r.tree=tree;
       return r;
      }
     }),
     FSharpSet:Runtime.Class({
      Add:function(x)
      {
       return FSharpSet.New1(BalancedTree.Add(x,this.tree));
      },
      CompareTo:function(other)
      {
       return Seq.compareWith(function(e1)
       {
        return function(e2)
        {
         return Operators.Compare(e1,e2);
        };
       },this,other);
      },
      Contains:function(v)
      {
       return BalancedTree.Contains(v,this.tree);
      },
      Equals:function(other)
      {
       return this.get_Count()===other.get_Count()?Seq.forall2(function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },this,other):false;
      },
      GetEnumerator:function()
      {
       var t,_this;
       t=this.tree;
       _this=BalancedTree.Enumerate(false,t);
       return Enumerator.Get(_this);
      },
      GetHashCode:function()
      {
       var _this;
       _this=Seq.toArray(this);
       return-1741749453+Unchecked.Hash(_this);
      },
      IsProperSubsetOf:function(s)
      {
       return this.IsSubsetOf(s)?this.get_Count()<s.get_Count():false;
      },
      IsProperSupersetOf:function(s)
      {
       return this.IsSupersetOf(s)?this.get_Count()>s.get_Count():false;
      },
      IsSubsetOf:function(s)
      {
       return Seq.forall(function(arg00)
       {
        return s.Contains(arg00);
       },this);
      },
      IsSupersetOf:function(s)
      {
       var _this=this;
       return Seq.forall(function(arg00)
       {
        return _this.Contains(arg00);
       },s);
      },
      Remove:function(v)
      {
       return FSharpSet.New1(BalancedTree.Remove(v,this.tree));
      },
      add:function(x)
      {
       var a,t;
       a=Seq.append(this,x);
       t=BalancedTree.OfSeq(a);
       return FSharpSet.New1(t);
      },
      get_Count:function()
      {
       var tree;
       tree=this.tree;
       return tree==null?0:tree.Count;
      },
      get_IsEmpty:function()
      {
       return this.tree==null;
      },
      get_MaximumElement:function()
      {
       var t;
       t=this.tree;
       return Seq.head(BalancedTree.Enumerate(true,t));
      },
      get_MinimumElement:function()
      {
       var t;
       t=this.tree;
       return Seq.head(BalancedTree.Enumerate(false,t));
      },
      get_Tree:function()
      {
       return this.tree;
      },
      sub:function(x)
      {
       return SetModule.Filter(function(x1)
       {
        return!x.Contains(x1);
       },this);
      }
     },{
      New:function(s)
      {
       return Runtime.New(this,FSharpSet.New1(SetUtil.ofSeq(s)));
      },
      New1:function(tree)
      {
       var r;
       r=Runtime.New(this,{});
       r.tree=tree;
       return r;
      }
     }),
     HashSet:{
      HashSet:Runtime.Class({
       Add:function(item)
       {
        return this.add(item);
       },
       Clear:function()
       {
        this.data=Array.prototype.constructor.apply(undefined,[].concat([]));
        this.count=0;
        return;
       },
       Contains:function(item)
       {
        var arr;
        arr=this.data[this.hash.call(null,item)];
        return arr==null?false:this.arrContains(item,arr);
       },
       CopyTo:function(arr)
       {
        var i,all,i1;
        i=0;
        all=HashSetUtil.concat(this.data);
        for(i1=0;i1<=all.length-1;i1++){
         IntrinsicFunctionProxy.SetArray(arr,i1,all[i1]);
        }
        return;
       },
       ExceptWith:function(xs)
       {
        var enumerator,item,value;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          item=enumerator.get_Current();
          value=this.Remove(item);
         }
        return;
       },
       GetEnumerator:function()
       {
        var _this;
        _this=HashSetUtil.concat(this.data);
        return Enumerator.Get(_this);
       },
       IntersectWith:function(xs)
       {
        var other,all,i,item,value,_,value1;
        other=HashSet1.New3(xs,this.equals,this.hash);
        all=HashSetUtil.concat(this.data);
        for(i=0;i<=all.length-1;i++){
         item=all[i];
         value=other.Contains(item);
         if(!value)
          {
           value1=this.Remove(item);
           _=void value1;
          }
         else
          {
           _=null;
          }
        }
        return;
       },
       IsProperSubsetOf:function(xs)
       {
        var other;
        other=Arrays.ofSeq(xs);
        return this.count<IntrinsicFunctionProxy.GetLength(other)?this.IsSubsetOf(other):false;
       },
       IsProperSupersetOf:function(xs)
       {
        var other;
        other=Arrays.ofSeq(xs);
        return this.count>IntrinsicFunctionProxy.GetLength(other)?this.IsSupersetOf(other):false;
       },
       IsSubsetOf:function(xs)
       {
        var other,predicate,array;
        other=HashSet1.New3(xs,this.equals,this.hash);
        predicate=function(arg00)
        {
         return other.Contains(arg00);
        };
        array=HashSetUtil.concat(this.data);
        return Seq.forall(predicate,array);
       },
       IsSupersetOf:function(xs)
       {
        var predicate,x=this;
        predicate=function(arg00)
        {
         return x.Contains(arg00);
        };
        return Seq.forall(predicate,xs);
       },
       Overlaps:function(xs)
       {
        var predicate,x=this;
        predicate=function(arg00)
        {
         return x.Contains(arg00);
        };
        return Seq.exists(predicate,xs);
       },
       Remove:function(item)
       {
        var h,arr,_,_1;
        h=this.hash.call(null,item);
        arr=this.data[h];
        if(arr==null)
         {
          _=false;
         }
        else
         {
          if(this.arrRemove(item,arr))
           {
            this.count=this.count-1;
            _1=true;
           }
          else
           {
            _1=false;
           }
          _=_1;
         }
        return _;
       },
       RemoveWhere:function(cond)
       {
        var all,i,item,_,value;
        all=HashSetUtil.concat(this.data);
        for(i=0;i<=all.length-1;i++){
         item=all[i];
         if(cond(item))
          {
           value=this.Remove(item);
           _=void value;
          }
         else
          {
           _=null;
          }
        }
        return;
       },
       SetEquals:function(xs)
       {
        var other;
        other=HashSet1.New3(xs,this.equals,this.hash);
        return this.get_Count()===other.get_Count()?this.IsSupersetOf(other):false;
       },
       SymmetricExceptWith:function(xs)
       {
        var enumerator,item,_,value,value1;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          item=enumerator.get_Current();
          if(this.Contains(item))
           {
            value=this.Remove(item);
            _=void value;
           }
          else
           {
            value1=this.Add(item);
            _=void value1;
           }
         }
        return;
       },
       UnionWith:function(xs)
       {
        var enumerator,item,value;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          item=enumerator.get_Current();
          value=this.Add(item);
         }
        return;
       },
       add:function(item)
       {
        var h,arr,_,_1,ps,value;
        h=this.hash.call(null,item);
        arr=this.data[h];
        if(arr==null)
         {
          this.data[h]=[item];
          this.count=this.count+1;
          _=true;
         }
        else
         {
          if(this.arrContains(item,arr))
           {
            _1=false;
           }
          else
           {
            ps=[item];
            value=arr.push.apply(arr,[].concat(ps));
            this.count=this.count+1;
            _1=true;
           }
          _=_1;
         }
        return _;
       },
       arrContains:function(item,arr)
       {
        var c,i,l;
        c=true;
        i=0;
        l=arr.length;
        while(c?i<l:false)
         {
          (this.equals.call(null,arr[i]))(item)?c=false:i=i+1;
         }
        return!c;
       },
       arrRemove:function(item,arr)
       {
        var c,i,l,_,start,ps,value;
        c=true;
        i=0;
        l=arr.length;
        while(c?i<l:false)
         {
          if((this.equals.call(null,arr[i]))(item))
           {
            start=i;
            ps=[];
            value=arr.splice.apply(arr,[start,1].concat(ps));
            _=c=false;
           }
          else
           {
            _=i=i+1;
           }
         }
        return!c;
       },
       get_Count:function()
       {
        return this.count;
       }
      },{
       New:function(comparer)
       {
        return Runtime.New(this,HashSet1.New3(Seq.empty(),function(x)
        {
         return function(y)
         {
          return comparer.Equals(x,y);
         };
        },function(x)
        {
         return comparer.GetHashCode(x);
        }));
       },
       New1:function(init,comparer)
       {
        return Runtime.New(this,HashSet1.New3(init,function(x)
        {
         return function(y)
         {
          return comparer.Equals(x,y);
         };
        },function(x)
        {
         return comparer.GetHashCode(x);
        }));
       },
       New11:function(init)
       {
        return Runtime.New(this,HashSet1.New3(init,function(x)
        {
         return function(y)
         {
          return Unchecked.Equals(x,y);
         };
        },function(obj)
        {
         return Unchecked.Hash(obj);
        }));
       },
       New2:function()
       {
        return Runtime.New(this,HashSet1.New3(Seq.empty(),function(x)
        {
         return function(y)
         {
          return Unchecked.Equals(x,y);
         };
        },function(obj)
        {
         return Unchecked.Hash(obj);
        }));
       },
       New3:function(init,equals,hash)
       {
        var r,enumerator,x,value;
        r=Runtime.New(this,{});
        r.equals=equals;
        r.hash=hash;
        r.data=Array.prototype.constructor.apply(undefined,[].concat([]));
        r.count=0;
        enumerator=Enumerator.Get(init);
        while(enumerator.MoveNext())
         {
          x=enumerator.get_Current();
          value=r.add(x);
         }
        return r;
       }
      }),
      HashSetUtil:{
       concat:function($o)
       {
        var $0=this,$this=this;
        var r=[];
        for(var k in $o){
         r.push.apply(r,$o[k]);
        }
        ;
        return r;
       }
      }
     },
     LinkedList:{
      EnumeratorProxy:Runtime.Class({
       Dispose:function()
       {
        return null;
       },
       MoveNext:function()
       {
        this.c=this.c.n;
        return!Unchecked.Equals(this.c,null);
       },
       get_Current:function()
       {
        return this.c.v;
       }
      },{
       New:function(l)
       {
        var r;
        r=Runtime.New(this,{});
        r.c=l;
        return r;
       }
      }),
      ListProxy:Runtime.Class({
       AddAfter:function(after,value)
       {
        var before,node,_;
        before=after.n;
        node={
         p:after,
         n:before,
         v:value
        };
        Unchecked.Equals(after.n,null)?void(this.p=node):null;
        after.n=node;
        if(!Unchecked.Equals(before,null))
         {
          before.p=node;
          _=node;
         }
        else
         {
          _=null;
         }
        this.c=this.c+1;
        return node;
       },
       AddBefore:function(before,value)
       {
        var after,node,_;
        after=before.p;
        node={
         p:after,
         n:before,
         v:value
        };
        Unchecked.Equals(before.p,null)?void(this.n=node):null;
        before.p=node;
        if(!Unchecked.Equals(after,null))
         {
          after.n=node;
          _=node;
         }
        else
         {
          _=null;
         }
        this.c=this.c+1;
        return node;
       },
       AddFirst:function(value)
       {
        var _,node;
        if(this.c===0)
         {
          node={
           p:null,
           n:null,
           v:value
          };
          this.n=node;
          this.p=this.n;
          this.c=1;
          _=node;
         }
        else
         {
          _=this.AddBefore(this.n,value);
         }
        return _;
       },
       AddLast:function(value)
       {
        var _,node;
        if(this.c===0)
         {
          node={
           p:null,
           n:null,
           v:value
          };
          this.n=node;
          this.p=this.n;
          this.c=1;
          _=node;
         }
        else
         {
          _=this.AddAfter(this.p,value);
         }
        return _;
       },
       Clear:function()
       {
        this.c=0;
        this.n=null;
        this.p=null;
        return;
       },
       Contains:function(value)
       {
        var found,node;
        found=false;
        node=this.n;
        while(!Unchecked.Equals(node,null)?!found:false)
         {
          node.v==value?found=true:node=node.n;
         }
        return found;
       },
       Find:function(value)
       {
        var node,notFound;
        node=this.n;
        notFound=true;
        while(notFound?!Unchecked.Equals(node,null):false)
         {
          node.v==value?notFound=false:node=node.n;
         }
        return notFound?null:node;
       },
       FindLast:function(value)
       {
        var node,notFound;
        node=this.p;
        notFound=true;
        while(notFound?!Unchecked.Equals(node,null):false)
         {
          node.v==value?notFound=false:node=node.p;
         }
        return notFound?null:node;
       },
       GetEnumerator:function()
       {
        return EnumeratorProxy.New(this);
       },
       Remove:function(node)
       {
        var before,after,_,_1;
        before=node.p;
        after=node.n;
        if(Unchecked.Equals(before,null))
         {
          _=void(this.n=after);
         }
        else
         {
          before.n=after;
          _=after;
         }
        if(Unchecked.Equals(after,null))
         {
          _1=void(this.p=before);
         }
        else
         {
          after.p=before;
          _1=before;
         }
        this.c=this.c-1;
        return;
       },
       Remove1:function(value)
       {
        var node,_;
        node=this.Find(value);
        if(Unchecked.Equals(node,null))
         {
          _=false;
         }
        else
         {
          this.Remove(node);
          _=true;
         }
        return _;
       },
       RemoveFirst:function()
       {
        return this.Remove(this.n);
       },
       RemoveLast:function()
       {
        return this.Remove(this.p);
       },
       get_Count:function()
       {
        return this.c;
       },
       get_First:function()
       {
        return this.n;
       },
       get_Last:function()
       {
        return this.p;
       }
      },{
       New:function()
       {
        return Runtime.New(this,ListProxy.New1(Seq.empty()));
       },
       New1:function(coll)
       {
        var r,ie,_,node;
        r=Runtime.New(this,{});
        r.c=0;
        r.n=null;
        r.p=null;
        ie=Enumerator.Get(coll);
        if(ie.MoveNext())
         {
          r.n={
           p:null,
           n:null,
           v:ie.get_Current()
          };
          r.p=r.n;
          _=void(r.c=1);
         }
        else
         {
          _=null;
         }
        while(ie.MoveNext())
         {
          node={
           p:r.p,
           n:null,
           v:ie.get_Current()
          };
          r.p.n=node;
          r.p=node;
          r.c=r.c+1;
         }
        return r;
       }
      })
     },
     MapModule:{
      Exists:function(f,m)
      {
       var predicate;
       predicate=function(kv)
       {
        return(f(kv.K))(kv.V);
       };
       return Seq.exists(predicate,m);
      },
      Filter:function(f,m)
      {
       var t,predicate,source,source1,x,x1;
       t=m.get_Tree();
       predicate=function(kv)
       {
        return(f(kv.Key))(kv.Value);
       };
       source=BalancedTree.Enumerate(false,t);
       source1=Seq.filter(predicate,source);
       x=Seq.toArray(source1);
       x1=BalancedTree.Build(x,0,x.length-1);
       return FSharpMap.New1(x1);
      },
      FindKey:function(f,m)
      {
       var chooser;
       chooser=function(kv)
       {
        return(f(kv.K))(kv.V)?{
         $:1,
         $0:kv.K
        }:{
         $:0
        };
       };
       return Seq.pick(chooser,m);
      },
      Fold:function(f,s,m)
      {
       var t,folder,source;
       t=m.get_Tree();
       folder=function(s1)
       {
        return function(kv)
        {
         return((f(s1))(kv.Key))(kv.Value);
        };
       };
       source=BalancedTree.Enumerate(false,t);
       return Seq.fold(folder,s,source);
      },
      FoldBack:function(f,m,s)
      {
       var t,folder,source;
       t=m.get_Tree();
       folder=function(s1)
       {
        return function(kv)
        {
         return((f(kv.Key))(kv.Value))(s1);
        };
       };
       source=BalancedTree.Enumerate(true,t);
       return Seq.fold(folder,s,source);
      },
      ForAll:function(f,m)
      {
       var predicate;
       predicate=function(kv)
       {
        return(f(kv.K))(kv.V);
       };
       return Seq.forall(predicate,m);
      },
      Iterate:function(f,m)
      {
       var action;
       action=function(kv)
       {
        return(f(kv.K))(kv.V);
       };
       return Seq.iter(action,m);
      },
      Map:function(f,m)
      {
       var t,mapping,source,data,x;
       t=m.get_Tree();
       mapping=function(kv)
       {
        return Runtime.New(Pair,{
         Key:kv.Key,
         Value:(f(kv.Key))(kv.Value)
        });
       };
       source=BalancedTree.Enumerate(false,t);
       data=Seq.map(mapping,source);
       x=BalancedTree.OfSeq(data);
       return FSharpMap.New1(x);
      },
      OfArray:function(a)
      {
       var mapping,data,t;
       mapping=Runtime.Tupled(function(tupledArg)
       {
        var k,v;
        k=tupledArg[0];
        v=tupledArg[1];
        return Runtime.New(Pair,{
         Key:k,
         Value:v
        });
       });
       data=Seq.map(mapping,a);
       t=BalancedTree.OfSeq(data);
       return FSharpMap.New1(t);
      },
      Partition:function(f,m)
      {
       var predicate,array,t,patternInput,y,x,t1,t2;
       predicate=function(kv)
       {
        return(f(kv.Key))(kv.Value);
       };
       t=m.get_Tree();
       array=Seq.toArray(BalancedTree.Enumerate(false,t));
       patternInput=Arrays.partition(predicate,array);
       y=patternInput[1];
       x=patternInput[0];
       t1=BalancedTree.Build(x,0,x.length-1);
       t2=BalancedTree.Build(y,0,y.length-1);
       return[FSharpMap.New1(t1),FSharpMap.New1(t2)];
      },
      Pick:function(f,m)
      {
       var chooser;
       chooser=function(kv)
       {
        return(f(kv.K))(kv.V);
       };
       return Seq.pick(chooser,m);
      },
      ToSeq:function(m)
      {
       var t,mapping,source;
       t=m.get_Tree();
       mapping=function(kv)
       {
        return[kv.Key,kv.Value];
       };
       source=BalancedTree.Enumerate(false,t);
       return Seq.map(mapping,source);
      },
      TryFind:function(k,m)
      {
       return m.TryFind(k);
      },
      TryFindKey:function(f,m)
      {
       var chooser;
       chooser=function(kv)
       {
        return(f(kv.K))(kv.V)?{
         $:1,
         $0:kv.K
        }:{
         $:0
        };
       };
       return Seq.tryPick(chooser,m);
      },
      TryPick:function(f,m)
      {
       var chooser;
       chooser=function(kv)
       {
        return(f(kv.K))(kv.V);
       };
       return Seq.tryPick(chooser,m);
      }
     },
     MapUtil:{
      fromSeq:function(s)
      {
       var a;
       a=Seq.toArray(Seq.delay(function()
       {
        return Seq.collect(Runtime.Tupled(function(matchValue)
        {
         var v,k;
         v=matchValue[1];
         k=matchValue[0];
         return[Runtime.New(Pair,{
          Key:k,
          Value:v
         })];
        }),Seq.distinctBy(Runtime.Tupled(function(tuple)
        {
         return tuple[0];
        }),s));
       }));
       Arrays.sortInPlace(a);
       return BalancedTree.Build(a,0,a.length-1);
      }
     },
     Pair:Runtime.Class({
      CompareTo:function(other)
      {
       return Operators.Compare(this.Key,other.Key);
      },
      Equals:function(other)
      {
       return Unchecked.Equals(this.Key,other.Key);
      },
      GetHashCode:function()
      {
       var x;
       x=this.Key;
       return Unchecked.Hash(x);
      }
     }),
     ResizeArray:{
      ResizeArrayProxy:Runtime.Class({
       Add:function(x)
       {
        return this.arr.push(x);
       },
       AddRange:function(x)
       {
        var _this=this;
        return Seq.iter(function(arg00)
        {
         return _this.Add(arg00);
        },x);
       },
       Clear:function()
       {
        var value,_this;
        _this=this.arr;
        value=ResizeArray.splice(this.arr,0,IntrinsicFunctionProxy.GetLength(_this),[]);
        return;
       },
       CopyTo:function(arr)
       {
        return this.CopyTo1(arr,0);
       },
       CopyTo1:function(arr,offset)
       {
        return this.CopyTo2(0,arr,offset,this.get_Count());
       },
       CopyTo2:function(index,target,offset,count)
       {
        return Arrays.blit(this.arr,index,target,offset,count);
       },
       GetEnumerator:function()
       {
        var _this;
        _this=this.arr;
        return Enumerator.Get(_this);
       },
       GetRange:function(index,count)
       {
        return ResizeArrayProxy.New(Arrays.sub(this.arr,index,count));
       },
       Insert:function(index,items)
       {
        var value;
        value=ResizeArray.splice(this.arr,index,0,[items]);
        return;
       },
       InsertRange:function(index,items)
       {
        var value;
        value=ResizeArray.splice(this.arr,index,0,Seq.toArray(items));
        return;
       },
       RemoveAt:function(x)
       {
        var value;
        value=ResizeArray.splice(this.arr,x,1,[]);
        return;
       },
       RemoveRange:function(index,count)
       {
        var value;
        value=ResizeArray.splice(this.arr,index,count,[]);
        return;
       },
       Reverse:function()
       {
        return this.arr.reverse();
       },
       Reverse1:function(index,count)
       {
        return Arrays.reverse(this.arr,index,count);
       },
       ToArray:function()
       {
        return this.arr.slice();
       },
       get_Count:function()
       {
        var _this;
        _this=this.arr;
        return IntrinsicFunctionProxy.GetLength(_this);
       },
       get_Item:function(x)
       {
        return IntrinsicFunctionProxy.GetArray(this.arr,x);
       },
       set_Item:function(x,v)
       {
        return IntrinsicFunctionProxy.SetArray(this.arr,x,v);
       }
      },{
       New:function(arr)
       {
        var r;
        r=Runtime.New(this,{});
        r.arr=arr;
        return r;
       },
       New1:function()
       {
        return Runtime.New(this,ResizeArrayProxy.New([]));
       },
       New11:function(el)
       {
        return Runtime.New(this,ResizeArrayProxy.New(Seq.toArray(el)));
       },
       New2:function()
       {
        return Runtime.New(this,ResizeArrayProxy.New([]));
       }
      }),
      splice:function($arr,$index,$howMany,$items)
      {
       var $0=this,$this=this;
       return Global.Array.prototype.splice.apply($arr,[$index,$howMany].concat($items));
      }
     },
     SetModule:{
      Filter:function(f,s)
      {
       var data,t;
       data=Seq.toArray(Seq.filter(f,s));
       t=BalancedTree.Build(data,0,data.length-1);
       return FSharpSet.New1(t);
      },
      FoldBack:function(f,a,s)
      {
       var t;
       t=a.get_Tree();
       return Seq.fold(function(s1)
       {
        return function(x)
        {
         return(f(x))(s1);
        };
       },s,BalancedTree.Enumerate(true,t));
      },
      Partition:function(f,a)
      {
       var patternInput,y,x,t,t1;
       patternInput=Arrays.partition(f,Seq.toArray(a));
       y=patternInput[1];
       x=patternInput[0];
       t=BalancedTree.OfSeq(x);
       t1=BalancedTree.OfSeq(y);
       return[FSharpSet.New1(t),FSharpSet.New1(t1)];
      }
     },
     SetUtil:{
      ofSeq:function(s)
      {
       var a;
       a=Seq.toArray(s);
       Arrays.sortInPlace(a);
       return BalancedTree.Build(a,0,a.length-1);
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Collections=Runtime.Safe(WebSharper.Collections);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  Operators=Runtime.Safe(WebSharper.Operators);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Seq=Runtime.Safe(WebSharper.Seq);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  JS=Runtime.Safe(JavaScript.JS);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  DictionaryUtil=Runtime.Safe(Collections.DictionaryUtil);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  FSharpMap=Runtime.Safe(Collections.FSharpMap);
  Pair=Runtime.Safe(Collections.Pair);
  Option=Runtime.Safe(WebSharper.Option);
  MapUtil=Runtime.Safe(Collections.MapUtil);
  FSharpSet=Runtime.Safe(Collections.FSharpSet);
  SetModule=Runtime.Safe(Collections.SetModule);
  SetUtil=Runtime.Safe(Collections.SetUtil);
  Array=Runtime.Safe(Global.Array);
  HashSet=Runtime.Safe(Collections.HashSet);
  HashSetUtil=Runtime.Safe(HashSet.HashSetUtil);
  HashSet1=Runtime.Safe(HashSet.HashSet);
  LinkedList=Runtime.Safe(Collections.LinkedList);
  EnumeratorProxy=Runtime.Safe(LinkedList.EnumeratorProxy);
  ListProxy=Runtime.Safe(LinkedList.ListProxy);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  return ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Reactive,Disposable,HotStream,WebSharper,Control,FSharpEvent,Observer,Observable,Util,Collections,Dictionary,Operators,Seq,Reactive1,Reactive2,List,T;
 Runtime.Define(Global,{
  IntelliFactory:{
   Reactive:{
    Disposable:Runtime.Class({
     Dispose:function()
     {
      return this.Dispose1.call(null,null);
     }
    },{
     New:function(d)
     {
      return Runtime.New(Disposable,{
       Dispose1:d
      });
     }
    }),
    HotStream:Runtime.Class({
     Subscribe:function(o)
     {
      var _this;
      this.Latest.contents.$==1?o.OnNext(this.Latest.contents.$0):null;
      _this=this.Event;
      return _this.event.Subscribe(o);
     },
     Trigger:function(v)
     {
      var _this;
      this.Latest.contents={
       $:1,
       $0:v
      };
      _this=this.Event;
      return _this.event.Trigger(v);
     }
    },{
     New:function(x)
     {
      var value;
      value={
       $:1,
       $0:x
      };
      return Runtime.New(HotStream,{
       Latest:{
        contents:value
       },
       Event:FSharpEvent.New()
      });
     },
     New1:function()
     {
      return Runtime.New(HotStream,{
       Latest:{
        contents:{
         $:0
        }
       },
       Event:FSharpEvent.New()
      });
     }
    }),
    Observable:Runtime.Class({
     Subscribe:function(o)
     {
      return this.OnSubscribe.call(null,o);
     },
     SubscribeWith:function(onNext,onComplete)
     {
      return this.OnSubscribe.call(null,Observer.New(onNext,onComplete));
     }
    },{
     New:function(f)
     {
      return Runtime.New(Observable,{
       OnSubscribe:f
      });
     }
    }),
    Observer:Runtime.Class({
     OnCompleted:function()
     {
      return this.OnCompleted1.call(null,null);
     },
     OnError:function()
     {
      return null;
     },
     OnNext:function(t)
     {
      return this.OnNext1.call(null,t);
     }
    },{
     New:function(onNext,onComplete)
     {
      return Runtime.New(Observer,{
       OnNext1:onNext,
       OnCompleted1:onComplete
      });
     }
    }),
    Reactive:{
     Aggregate:function(io,seed,acc)
     {
      return Observable.New(function(o)
      {
       var state;
       state={
        contents:seed
       };
       return Util.subscribeTo(io,function(value)
       {
        state.contents=(acc(state.contents))(value);
        return o.OnNext(state.contents);
       });
      });
     },
     Choose:function(io,f)
     {
      var arg00;
      arg00=function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        var matchValue,_,v1;
        matchValue=f(v);
        if(matchValue.$==0)
         {
          _=null;
         }
        else
         {
          v1=matchValue.$0;
          _=o1.OnNext(v1);
         }
        return _;
       });
      };
      return Observable.New(arg00);
     },
     CollectLatest:function(outer)
     {
      return Observable.New(function(o)
      {
       var dict,index;
       dict=Dictionary.New2();
       index={
        contents:0
       };
       return Util.subscribeTo(outer,function(inner)
       {
        var currentIndex,value;
        Operators.Increment(index);
        currentIndex=index.contents;
        value=Util.subscribeTo(inner,function(value1)
        {
         var arg00;
         dict.set_Item(currentIndex,value1);
         arg00=Seq.delay(function()
         {
          return Seq.map(function(pair)
          {
           return pair.V;
          },dict);
         });
         return o.OnNext(arg00);
        });
        return;
       });
      });
     },
     CombineLatest:function(io1,io2,f)
     {
      var arg00;
      arg00=function(o)
      {
       var lv1,lv2,update,onNext,arg10,o1,onNext1,arg101,o2,d1,d2;
       lv1={
        contents:{
         $:0
        }
       };
       lv2={
        contents:{
         $:0
        }
       };
       update=function()
       {
        var matchValue,_,_1,v1,v2;
        matchValue=[lv1.contents,lv2.contents];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            v1=matchValue[0].$0;
            v2=matchValue[1].$0;
            _1=o.OnNext((f(v1))(v2));
           }
          else
           {
            _1=null;
           }
          _=_1;
         }
        else
         {
          _=null;
         }
        return _;
       };
       onNext=function(x)
       {
        lv1.contents={
         $:1,
         $0:x
        };
        return update(null);
       };
       arg10=function()
       {
       };
       o1=Observer.New(onNext,arg10);
       onNext1=function(y)
       {
        lv2.contents={
         $:1,
         $0:y
        };
        return update(null);
       };
       arg101=function()
       {
       };
       o2=Observer.New(onNext1,arg101);
       d1=io1.Subscribe(o1);
       d2=io2.Subscribe(o2);
       return Disposable.New(function()
       {
        d1.Dispose();
        return d2.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Concat:function(io1,io2)
     {
      var arg00;
      arg00=function(o)
      {
       var innerDisp,arg001,arg10,arg003,outerDisp;
       innerDisp={
        contents:{
         $:0
        }
       };
       arg001=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg10=function()
       {
        innerDisp.contents={
         $:1,
         $0:io2.Subscribe(o)
        };
       };
       arg003=Observer.New(arg001,arg10);
       outerDisp=io1.Subscribe(arg003);
       return Disposable.New(function()
       {
        innerDisp.contents.$==1?innerDisp.contents.$0.Dispose():null;
        return outerDisp.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Default:Runtime.Field(function()
     {
      return Reactive2.New();
     }),
     Drop:function(io,count)
     {
      var arg00;
      arg00=function(o1)
      {
       var index;
       index={
        contents:0
       };
       return Util.subscribeTo(io,function(v)
       {
        Operators.Increment(index);
        return index.contents>count?o1.OnNext(v):null;
       });
      };
      return Observable.New(arg00);
     },
     Heat:function(io)
     {
      var s;
      s=HotStream.New1();
      Util.subscribeTo(io,function(arg00)
      {
       return s.Trigger(arg00);
      });
      return s;
     },
     Merge:function(io1,io2)
     {
      var arg00;
      arg00=function(o)
      {
       var completed1,completed2,arg001,arg10,arg003,disp1,arg004,arg101,arg005,disp2;
       completed1={
        contents:false
       };
       completed2={
        contents:false
       };
       arg001=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg10=function()
       {
        completed1.contents=true;
        return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
       };
       arg003=Observer.New(arg001,arg10);
       disp1=io1.Subscribe(arg003);
       arg004=function(arg002)
       {
        return o.OnNext(arg002);
       };
       arg101=function()
       {
        completed2.contents=true;
        return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
       };
       arg005=Observer.New(arg004,arg101);
       disp2=io2.Subscribe(arg005);
       return Disposable.New(function()
       {
        disp1.Dispose();
        return disp2.Dispose();
       });
      };
      return Observable.New(arg00);
     },
     Never:function()
     {
      return Observable.New(function()
      {
       return Disposable.New(function()
       {
       });
      });
     },
     Range:function(start,count)
     {
      var arg00;
      arg00=function(o)
      {
       var i;
       for(i=start;i<=start+count;i++){
        o.OnNext(i);
       }
       return Disposable.New(function()
       {
       });
      };
      return Observable.New(arg00);
     },
     Reactive:Runtime.Class({
      Aggregate:function(io,s,a)
      {
       return Reactive1.Aggregate(io,s,a);
      },
      Choose:function(io,f)
      {
       return Reactive1.Choose(io,f);
      },
      CollectLatest:function(io)
      {
       return Reactive1.CollectLatest(io);
      },
      CombineLatest:function(io1,io2,f)
      {
       return Reactive1.CombineLatest(io1,io2,f);
      },
      Concat:function(io1,io2)
      {
       return Reactive1.Concat(io1,io2);
      },
      Drop:function(io,count)
      {
       return Reactive1.Drop(io,count);
      },
      Heat:function(io)
      {
       return Reactive1.Heat(io);
      },
      Merge:function(io1,io2)
      {
       return Reactive1.Merge(io1,io2);
      },
      Never:function()
      {
       return Reactive1.Never();
      },
      Return:function(x)
      {
       return Reactive1.Return(x);
      },
      Select:function(io,f)
      {
       return Reactive1.Select(io,f);
      },
      SelectMany:function(io)
      {
       return Reactive1.SelectMany(io);
      },
      Sequence:function(ios)
      {
       return Reactive1.Sequence(ios);
      },
      Switch:function(io)
      {
       return Reactive1.Switch(io);
      },
      Where:function(io,f)
      {
       return Reactive1.Where(io,f);
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Return:function(x)
     {
      var f;
      f=function(o)
      {
       o.OnNext(x);
       o.OnCompleted();
       return Disposable.New(function()
       {
       });
      };
      return Observable.New(f);
     },
     Select:function(io,f)
     {
      return Observable.New(function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return o1.OnNext(f(v));
       });
      });
     },
     SelectMany:function(io)
     {
      return Observable.New(function(o)
      {
       var disp,d;
       disp={
        contents:function()
        {
        }
       };
       d=Util.subscribeTo(io,function(o1)
       {
        var d1;
        d1=Util.subscribeTo(o1,function(arg00)
        {
         return o.OnNext(arg00);
        });
        disp.contents=function()
        {
         disp.contents.call(null,null);
         return d1.Dispose();
        };
        return;
       });
       return Disposable.New(function()
       {
        disp.contents.call(null,null);
        return d.Dispose();
       });
      });
     },
     Sequence:function(ios)
     {
      var sequence;
      sequence=function(ios1)
      {
       var _,xs,x,rest;
       if(ios1.$==1)
        {
         xs=ios1.$1;
         x=ios1.$0;
         rest=sequence(xs);
         _=Reactive1.CombineLatest(x,rest,function(x1)
         {
          return function(y)
          {
           return Runtime.New(T,{
            $:1,
            $0:x1,
            $1:y
           });
          };
         });
        }
       else
        {
         _=Reactive1.Return(Runtime.New(T,{
          $:0
         }));
        }
       return _;
      };
      return Reactive1.Select(sequence(List.ofSeq(ios)),function(source)
      {
       return source;
      });
     },
     Switch:function(io)
     {
      return Observable.New(function(o)
      {
       var index,disp,disp1;
       index={
        contents:0
       };
       disp={
        contents:{
         $:0
        }
       };
       disp1=Util.subscribeTo(io,function(o1)
       {
        var currentIndex,arg0,d;
        Operators.Increment(index);
        disp.contents.$==1?disp.contents.$0.Dispose():null;
        currentIndex=index.contents;
        arg0=Util.subscribeTo(o1,function(v)
        {
         return currentIndex===index.contents?o.OnNext(v):null;
        });
        d={
         $:1,
         $0:arg0
        };
        disp.contents=d;
        return;
       });
       return disp1;
      });
     },
     Where:function(io,f)
     {
      var arg00;
      arg00=function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return f(v)?o1.OnNext(v):null;
       });
      };
      return Observable.New(arg00);
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Reactive=Runtime.Safe(Global.IntelliFactory.Reactive);
  Disposable=Runtime.Safe(Reactive.Disposable);
  HotStream=Runtime.Safe(Reactive.HotStream);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Control=Runtime.Safe(WebSharper.Control);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  Observer=Runtime.Safe(Reactive.Observer);
  Observable=Runtime.Safe(Reactive.Observable);
  Util=Runtime.Safe(WebSharper.Util);
  Collections=Runtime.Safe(WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Operators=Runtime.Safe(WebSharper.Operators);
  Seq=Runtime.Safe(WebSharper.Seq);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Reactive2=Runtime.Safe(Reactive1.Reactive);
  List=Runtime.Safe(WebSharper.List);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
  Reactive1.Default();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Base,Formlet,Form,Tree,Edit,Result,WebSharper,List,T,LayoutUtils,Tree1,Util,Seq,Enumerator,Unchecked;
 Runtime.Define(Global,{
  IntelliFactory:{
   Formlets:{
    Base:{
     D:Runtime.Class({
      Dispose:function()
      {
       return null;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Form:Runtime.Class({
      Dispose:function()
      {
       return this.Dispose1.call(null,null);
      }
     }),
     Formlet:Runtime.Class({
      Build:function()
      {
       return this.Build1.call(null,null);
      },
      MapResult:function(f)
      {
       var _this=this;
       return Runtime.New(Formlet,{
        Layout:this.Layout,
        Build1:function()
        {
         var form,objectArg,arg00,arg10,state;
         form=_this.Build1.call(null,null);
         objectArg=_this.Utils.Reactive;
         arg00=form.State;
         arg10=function(x)
         {
          return f(x);
         };
         objectArg.Select(arg00,arg10);
         state=form.State;
         return Runtime.New(Form,{
          Body:form.Body,
          Dispose1:form.Dispose1,
          Notify:form.Notify,
          State:state
         });
        },
        Utils:_this.Utils
       });
      },
      get_Layout:function()
      {
       return this.Layout;
      }
     }),
     FormletBuilder:Runtime.Class({
      Bind:function(x,f)
      {
       var objectArg;
       objectArg=this.F;
       return objectArg.Bind(x,f);
      },
      Delay:function(f)
      {
       return this.F.Delay(f);
      },
      Return:function(x)
      {
       return this.F.Return(x);
      },
      ReturnFrom:function(f)
      {
       return f;
      }
     },{
      New:function(F)
      {
       var r;
       r=Runtime.New(this,{});
       r.F=F;
       return r;
      }
     }),
     FormletProvider:Runtime.Class({
      AppendLayout:function(layout,formlet)
      {
       var arg10;
       arg10=this.ApplyLayout(formlet);
       return this.WithLayout(layout,arg10);
      },
      Apply:function(f,x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var f1,x1,objectArg,arg001,arg10,left,objectArg1,arg002,arg101,right,objectArg2,body,objectArg3,arg003,arg102,arg20,state;
        f1=_this.BuildForm(f);
        x1=_this.BuildForm(x);
        objectArg=_this.U.Reactive;
        arg001=f1.Body;
        arg10=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        left=objectArg.Select(arg001,arg10);
        objectArg1=_this.U.Reactive;
        arg002=x1.Body;
        arg101=function(arg0)
        {
         return Runtime.New(Edit,{
          $:2,
          $0:arg0
         });
        };
        right=objectArg1.Select(arg002,arg101);
        objectArg2=_this.U.Reactive;
        body=objectArg2.Merge(left,right);
        objectArg3=_this.U.Reactive;
        arg003=x1.State;
        arg102=f1.State;
        arg20=function(r)
        {
         return function(f2)
         {
          return Result.Apply(f2,r);
         };
        };
        state=objectArg3.CombineLatest(arg003,arg102,arg20);
        return Runtime.New(Form,{
         Body:body,
         Dispose1:function()
         {
          x1.Dispose1.call(null,null);
          return f1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          x1.Notify.call(null,o);
          return f1.Notify.call(null,o);
         },
         State:state
        });
       };
       return _this.New(arg00);
      },
      ApplyLayout:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form,matchValue,body,_,body1;
        form=formlet.Build();
        matchValue=formlet.get_Layout().Apply.call(null,form.Body);
        if(matchValue.$==0)
         {
          _=form.Body;
         }
        else
         {
          matchValue.$0[1];
          body1=matchValue.$0[0];
          _=_this.U.Reactive.Return(Tree.Set(body1));
         }
        body=_;
        return Runtime.New(Form,{
         Body:body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       return _this.New(arg00);
      },
      Bind:function(formlet,f)
      {
       var arg00;
       arg00=this.Map(f,formlet);
       return this.Join(arg00);
      },
      BindWith:function(hF,formlet,f)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var formlet1,form,objectArg,arg001,arg10,left,objectArg1,arg002,arg101,right,matchValue,combB,_,_1,bLeft,bRight,objectArg2,value,arg003;
        formlet1=_this.Bind(formlet,f);
        form=formlet1.Build();
        objectArg=_this.U.Reactive;
        arg001=form.Body;
        arg10=function(edit)
        {
         return edit.$==1?true:false;
        };
        left=_this.U.DefaultLayout.Apply.call(null,objectArg.Where(arg001,arg10));
        objectArg1=_this.U.Reactive;
        arg002=form.Body;
        arg101=function(edit)
        {
         return edit.$==2?true:false;
        };
        right=_this.U.DefaultLayout.Apply.call(null,objectArg1.Where(arg002,arg101));
        matchValue=[left,right];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            bLeft=matchValue[0].$0[0];
            bRight=matchValue[1].$0[0];
            objectArg2=_this.U.Reactive;
            value=(hF(bLeft))(bRight);
            arg003=Tree.Set(value);
            _1=objectArg2.Return(arg003);
           }
          else
           {
            _1=_this.U.Reactive.Never();
           }
          _=_1;
         }
        else
         {
          _=_this.U.Reactive.Never();
         }
        combB=_;
        return Runtime.New(Form,{
         Body:combB,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       return _this.New(arg00);
      },
      BuildForm:function(formlet)
      {
       var form,matchValue,_,d,body;
       form=formlet.Build();
       matchValue=formlet.get_Layout().Apply.call(null,form.Body);
       if(matchValue.$==1)
        {
         d=matchValue.$0[1];
         body=matchValue.$0[0];
         _=Runtime.New(Form,{
          Body:this.U.Reactive.Return(Tree.Set(body)),
          Dispose1:function()
          {
           form.Dispose1.call(null,null);
           return d.Dispose();
          },
          Notify:form.Notify,
          State:form.State
         });
        }
       else
        {
         _=form;
        }
       return _;
      },
      Delay:function(f)
      {
       var Build,_this=this;
       Build=function()
       {
        return _this.BuildForm(f(null));
       };
       return Runtime.New(Formlet,{
        Layout:_this.L.Delay(function()
        {
         return f(null).get_Layout();
        }),
        Build1:Build,
        Utils:_this.U
       });
      },
      Deletable:function(formlet)
      {
       var arg10,_this=this;
       arg10=function(value)
       {
        var _,value1;
        if(value.$==1)
         {
          value1=value.$0;
          _=_this.Return({
           $:1,
           $0:value1
          });
         }
        else
         {
          _=_this.ReturnEmpty({
           $:0
          });
         }
        return _;
       };
       return _this.Replace(formlet,arg10);
      },
      Empty:function()
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       };
       return _this.New(arg00);
      },
      EmptyForm:function()
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function()
        {
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Never()
       });
      },
      Fail:function(fs)
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function(x)
        {
         return x;
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:fs
        }))
       });
      },
      FailWith:function(fs)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return _this.Fail(fs);
       };
       return _this.New(arg00);
      },
      FlipBody:function(formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,body;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.Body;
        arg10=function(edit)
        {
         return Tree.FlipEdit(edit);
        };
        body=objectArg.Select(arg001,arg10);
        return Runtime.New(Form,{
         Body:body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      FromState:function(state)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:state
        });
       };
       return _this.New(arg00);
      },
      InitWith:function(value,formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=_this.U.Reactive.Return(Runtime.New(Result,{
         $:0,
         $0:value
        }));
        arg10=form.State;
        state=objectArg.Concat(arg001,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      InitWithFailure:function(formlet)
      {
       var arg00,_this=this,x,arg002;
       arg00=function()
       {
        var form,objectArg,arg001,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=_this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        arg10=form.State;
        state=objectArg.Concat(arg001,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg002=formlet.get_Layout();
       return _this.WithLayout(arg002,x);
      },
      Join:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form1,objectArg,arg001,arg10,objectArg1,arg002,formStream,objectArg2,arg101,value,objectArg4,arg003,arg103,right,objectArg5,objectArg6,arg004,arg104,arg005,body,state,objectArg7,arg105,notify,dispose;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        arg001=form1.State;
        arg10=function(res)
        {
         var _,fs,innerF;
         if(res.$==1)
          {
           fs=res.$0;
           _=_this.Fail(fs);
          }
         else
          {
           innerF=res.$0;
           _=_this.BuildForm(innerF);
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg002=objectArg.Select(arg001,arg10);
        formStream=objectArg1.Heat(arg002);
        objectArg2=_this.U.Reactive;
        arg101=function(f)
        {
         var _delete,objectArg3,arg102;
         _delete=_this.U.Reactive.Return(Tree.Delete());
         objectArg3=_this.U.Reactive;
         arg102=f.Body;
         return objectArg3.Concat(_delete,arg102);
        };
        value=objectArg2.Select(formStream,arg101);
        objectArg4=_this.U.Reactive;
        arg003=_this.U.Reactive.Switch(value);
        arg103=function(arg0)
        {
         return Runtime.New(Edit,{
          $:2,
          $0:arg0
         });
        };
        right=objectArg4.Select(arg003,arg103);
        objectArg5=_this.U.Reactive;
        objectArg6=_this.U.Reactive;
        arg004=form1.Body;
        arg104=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        arg005=objectArg6.Select(arg004,arg104);
        body=objectArg5.Merge(arg005,right);
        objectArg7=_this.U.Reactive;
        arg105=function(f)
        {
         return f.State;
        };
        state=_this.U.Reactive.Switch(objectArg7.Select(formStream,arg105));
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      LiftResult:function(formlet)
      {
       var arg00;
       arg00=function(arg0)
       {
        return Runtime.New(Result,{
         $:0,
         $0:arg0
        });
       };
       return this.MapResult(arg00,formlet);
      },
      Map:function(f,formlet)
      {
       var arg00;
       arg00=function(arg10)
       {
        return Result.Map(f,arg10);
       };
       return this.MapResult(arg00,formlet);
      },
      MapBody:function(f,formlet)
      {
       var layout,_this=this;
       layout={
        Apply:function(o)
        {
         var matchValue,_,matchValue1,_1,d,body,d1,body1;
         matchValue=formlet.get_Layout().Apply.call(null,o);
         if(matchValue.$==0)
          {
           matchValue1=_this.U.DefaultLayout.Apply.call(null,o);
           if(matchValue1.$==0)
            {
             _1={
              $:0
             };
            }
           else
            {
             d=matchValue1.$0[1];
             body=matchValue1.$0[0];
             _1={
              $:1,
              $0:[f(body),d]
             };
            }
           _=_1;
          }
         else
          {
           d1=matchValue.$0[1];
           body1=matchValue.$0[0];
           _={
            $:1,
            $0:[f(body1),d1]
           };
          }
         return _;
        }
       };
       return _this.WithLayout(layout,formlet);
      },
      MapResult:function(f,formlet)
      {
       var Build,_this=this;
       Build=function()
       {
        var form,objectArg,arg00,arg10,state;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg00=form.State;
        arg10=function(x)
        {
         return f(x);
        };
        state=objectArg.Select(arg00,arg10);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state
        });
       };
       return Runtime.New(Formlet,{
        Layout:formlet.get_Layout(),
        Build1:Build,
        Utils:_this.U
       });
      },
      Never:function()
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       };
       return _this.New(arg00);
      },
      New:function(build)
      {
       return Runtime.New(Formlet,{
        Layout:this.L.Default(),
        Build1:build,
        Utils:this.U
       });
      },
      Replace:function(formlet,f)
      {
       var arg00,arg001;
       arg00=function(value)
       {
        return f(value);
       };
       arg001=this.Map(arg00,formlet);
       return this.Switch(arg001);
      },
      ReplaceFirstWithFailure:function(formlet)
      {
       var arg00,_this=this,x,arg003;
       arg00=function()
       {
        var form,objectArg,arg001,state,objectArg1,arg002,state1;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.State;
        state=objectArg.Drop(arg001,1);
        objectArg1=_this.U.Reactive;
        arg002=_this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        state1=objectArg1.Concat(arg002,state);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:state1
        });
       };
       x=_this.New(arg00);
       arg003=formlet.get_Layout();
       return _this.WithLayout(arg003,x);
      },
      Return:function(x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       };
       return _this.New(arg00);
      },
      ReturnEmpty:function(x)
      {
       var arg00,_this=this;
       arg00=function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       };
       return _this.New(arg00);
      },
      SelectMany:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var form1,objectArg,arg001,arg10,objectArg1,arg002,formStream,objectArg2,arg003,arg101,left,tag,incrTag,objectArg3,arg102,allBodies,right,objectArg5,body,objectArg6,arg103,stateStream,objectArg7,arg005,arg104,state,notify,dispose;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        arg001=form1.State;
        arg10=function(res)
        {
         var _,innerF,arg0;
         if(res.$==1)
          {
           res.$0;
           _={
            $:0
           };
          }
         else
          {
           innerF=res.$0;
           arg0=_this.BuildForm(innerF);
           _={
            $:1,
            $0:arg0
           };
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg002=objectArg.Choose(arg001,arg10);
        formStream=objectArg1.Heat(arg002);
        objectArg2=_this.U.Reactive;
        arg003=form1.Body;
        arg101=function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        };
        left=objectArg2.Select(arg003,arg101);
        tag={
         contents:function(arg0)
         {
          return Runtime.New(Edit,{
           $:1,
           $0:arg0
          });
         }
        };
        incrTag=function()
        {
         var f;
         f=tag.contents;
         tag.contents=function(x)
         {
          var arg0;
          arg0=f(x);
          return Runtime.New(Edit,{
           $:2,
           $0:arg0
          });
         };
         return;
        };
        objectArg3=_this.U.Reactive;
        arg102=function(f)
        {
         var tagLocal,objectArg4,arg004;
         incrTag(null);
         tagLocal=tag.contents;
         objectArg4=_this.U.Reactive;
         arg004=f.Body;
         return objectArg4.Select(arg004,tagLocal);
        };
        allBodies=objectArg3.Select(formStream,arg102);
        right=_this.U.Reactive.SelectMany(allBodies);
        objectArg5=_this.U.Reactive;
        body=objectArg5.Merge(left,right);
        objectArg6=_this.U.Reactive;
        arg103=function(f)
        {
         return f.State;
        };
        stateStream=objectArg6.Select(formStream,arg103);
        objectArg7=_this.U.Reactive;
        arg005=_this.U.Reactive.CollectLatest(stateStream);
        arg104=function(arg004)
        {
         return Result.Sequence(arg004);
        };
        state=objectArg7.Select(arg005,arg104);
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      Sequence:function(fs)
      {
       var fs1,_,fs2,f,fComp,fRest,arg00;
       fs1=List.ofSeq(fs);
       if(fs1.$==1)
        {
         fs2=fs1.$1;
         f=fs1.$0;
         fComp=this.Return(function(v)
         {
          return function(vs)
          {
           return Runtime.New(T,{
            $:1,
            $0:v,
            $1:vs
           });
          };
         });
         fRest=this.Sequence(fs2);
         arg00=this.Apply(fComp,f);
         _=this.Apply(arg00,fRest);
        }
       else
        {
         _=this.Return(Runtime.New(T,{
          $:0
         }));
        }
       return _;
      },
      Switch:function(formlet)
      {
       var arg00,_this=this;
       arg00=function()
       {
        var arg001,formlet1,form1,objectArg,arg002,arg10,objectArg1,arg003,formStream,objectArg2,arg004,arg101,objectArg3,arg102,body,state,objectArg4,arg103,notify,dispose;
        arg001=_this.WithLayoutOrDefault(formlet);
        formlet1=_this.ApplyLayout(arg001);
        form1=_this.BuildForm(formlet1);
        objectArg=_this.U.Reactive;
        arg002=form1.State;
        arg10=function(res)
        {
         var _,innerF,arg0;
         if(res.$==1)
          {
           res.$0;
           _={
            $:0
           };
          }
         else
          {
           innerF=res.$0;
           arg0=_this.BuildForm(innerF);
           _={
            $:1,
            $0:arg0
           };
          }
         return _;
        };
        objectArg1=_this.U.Reactive;
        arg003=objectArg.Choose(arg002,arg10);
        formStream=objectArg1.Heat(arg003);
        objectArg2=_this.U.Reactive;
        arg004=form1.Body;
        objectArg3=_this.U.Reactive;
        arg102=function(f)
        {
         return f.Body;
        };
        arg101=_this.U.Reactive.Switch(objectArg3.Select(formStream,arg102));
        body=objectArg2.Concat(arg004,arg101);
        objectArg4=_this.U.Reactive;
        arg103=function(f)
        {
         return f.State;
        };
        state=_this.U.Reactive.Switch(objectArg4.Select(formStream,arg103));
        notify=function(o)
        {
         return form1.Notify.call(null,o);
        };
        dispose=function()
        {
         return form1.Dispose1.call(null,null);
        };
        return Runtime.New(Form,{
         Body:body,
         Dispose1:dispose,
         Notify:notify,
         State:state
        });
       };
       return _this.New(arg00);
      },
      WithCancelation:function(formlet,cancelFormlet)
      {
       var compose,f1,f2,f3,f,arg00,arg10;
       compose=function(r1)
       {
        return function(r2)
        {
         var matchValue,_,_1,fs,s;
         matchValue=[r1,r2];
         if(matchValue[1].$==0)
          {
           _=Runtime.New(Result,{
            $:0,
            $0:{
             $:0
            }
           });
          }
         else
          {
           if(matchValue[0].$==1)
            {
             fs=matchValue[0].$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:fs
             });
            }
           else
            {
             s=matchValue[0].$0;
             _1=Runtime.New(Result,{
              $:0,
              $0:{
               $:1,
               $0:s
              }
             });
            }
           _=_1;
          }
         return _;
        };
       };
       f1=this.Return(compose);
       f2=this.LiftResult(formlet);
       f3=this.LiftResult(cancelFormlet);
       f=this.Apply(f1,f2);
       arg00=function(arg001)
       {
        return Result.Join(arg001);
       };
       arg10=this.Apply(f,f3);
       return this.MapResult(arg00,arg10);
      },
      WithLayout:function(layout,formlet)
      {
       return Runtime.New(Formlet,{
        Layout:layout,
        Build1:function()
        {
         return formlet.Build();
        },
        Utils:this.U
       });
      },
      WithLayoutOrDefault:function(formlet)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return this.MapBody(arg00,formlet);
      },
      WithNotification:function(notify,formlet)
      {
       var arg00,_this=this,x,arg001;
       arg00=function()
       {
        var form,Notify;
        form=_this.BuildForm(formlet);
        Notify=function(obj)
        {
         form.Notify.call(null,obj);
         return notify(obj);
        };
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:Notify,
         State:form.State
        });
       };
       x=_this.New(arg00);
       arg001=formlet.get_Layout();
       return _this.WithLayout(arg001,x);
      },
      WithNotificationChannel:function(formlet)
      {
       var arg00,_this=this,x,arg003;
       arg00=function()
       {
        var form,objectArg,arg001,arg002,arg10,state,Notify;
        form=formlet.Build();
        objectArg=_this.U.Reactive;
        arg001=form.State;
        arg002=function(v)
        {
         return[v,form.Notify];
        };
        arg10=function(arg101)
        {
         return Result.Map(arg002,arg101);
        };
        state=objectArg.Select(arg001,arg10);
        Notify=form.Notify;
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:Notify,
         State:state
        });
       };
       x=_this.New(arg00);
       arg003=formlet.get_Layout();
       return _this.WithLayout(arg003,x);
      }
     },{
      New:function(U)
      {
       var r;
       r=Runtime.New(this,{});
       r.U=U;
       r.L=LayoutUtils.New({
        Reactive:r.U.Reactive
       });
       return r;
      }
     }),
     LayoutUtils:Runtime.Class({
      Default:function()
      {
       return{
        Apply:function()
        {
         return{
          $:0
         };
        }
       };
      },
      Delay:function(f)
      {
       return{
        Apply:function(x)
        {
         return f(null).Apply.call(null,x);
        }
       };
      },
      New:function(container)
      {
       return{
        Apply:function(event)
        {
         var panel,tree,disp;
         panel=container(null);
         tree={
          contents:Runtime.New(Tree1,{
           $:0
          })
         };
         disp=Util.subscribeTo(event,function(edit)
         {
          var deletedTree,patternInput,off,action;
          deletedTree=Tree.ReplacedTree(edit,tree.contents);
          tree.contents=Tree.Apply(edit,tree.contents);
          patternInput=Tree.Range(edit,tree.contents);
          off=patternInput[0];
          panel.Remove.call(null,deletedTree.get_Sequence());
          action=function(i)
          {
           return function(e)
           {
            return(panel.Insert.call(null,off+i))(e);
           };
          };
          return Seq.iteri(action,edit);
         });
         return{
          $:1,
          $0:[panel.Body,disp]
         };
        }
       };
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Result:Runtime.Class({},{
      Apply:function(f,r)
      {
       var matchValue,_,_1,fs1,fs2,fs,_2,fs3,f1,v;
       matchValue=[f,r];
       if(matchValue[0].$==1)
        {
         if(matchValue[1].$==1)
          {
           fs1=matchValue[0].$0;
           fs2=matchValue[1].$0;
           _1=Runtime.New(Result,{
            $:1,
            $0:List.append(fs1,fs2)
           });
          }
         else
          {
           fs=matchValue[0].$0;
           _1=Runtime.New(Result,{
            $:1,
            $0:fs
           });
          }
         _=_1;
        }
       else
        {
         if(matchValue[1].$==1)
          {
           matchValue[0].$0;
           fs3=matchValue[1].$0;
           _2=Runtime.New(Result,{
            $:1,
            $0:fs3
           });
          }
         else
          {
           f1=matchValue[0].$0;
           v=matchValue[1].$0;
           _2=Runtime.New(Result,{
            $:0,
            $0:f1(v)
           });
          }
         _=_2;
        }
       return _;
      },
      Join:function(res)
      {
       var _,fs,s;
       if(res.$==1)
        {
         fs=res.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:fs
         });
        }
       else
        {
         s=res.$0;
         _=s;
        }
       return _;
      },
      Map:function(f,res)
      {
       var _,fs,v;
       if(res.$==1)
        {
         fs=res.$0;
         _=Runtime.New(Result,{
          $:1,
          $0:fs
         });
        }
       else
        {
         v=res.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:f(v)
         });
        }
       return _;
      },
      OfOption:function(o)
      {
       var _,v;
       if(o.$==0)
        {
         _=Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         });
        }
       else
        {
         v=o.$0;
         _=Runtime.New(Result,{
          $:0,
          $0:v
         });
        }
       return _;
      },
      Sequence:function(rs)
      {
       var merge;
       merge=function(rs1)
       {
        return function(r)
        {
         var _,fs1,_1,fs2,vs,_2,fs,v,b;
         if(rs1.$==1)
          {
           fs1=rs1.$0;
           if(r.$==1)
            {
             fs2=r.$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:List.append(fs1,fs2)
             });
            }
           else
            {
             r.$0;
             _1=Runtime.New(Result,{
              $:1,
              $0:fs1
             });
            }
           _=_1;
          }
         else
          {
           vs=rs1.$0;
           if(r.$==1)
            {
             fs=r.$0;
             _2=Runtime.New(Result,{
              $:1,
              $0:fs
             });
            }
           else
            {
             v=r.$0;
             b=List.ofArray([v]);
             _2=Runtime.New(Result,{
              $:0,
              $0:List.append(vs,b)
             });
            }
           _=_2;
          }
         return _;
        };
       };
       return Seq.fold(merge,Runtime.New(Result,{
        $:0,
        $0:Runtime.New(T,{
         $:0
        })
       }),rs);
      }
     }),
     Tree:{
      Apply:function(edit,input)
      {
       var apply;
       apply=function(edit1,input1)
       {
        var _,edit2,_1,r,l,edit3,_2,r1,l1,output;
        if(edit1.$==1)
         {
          edit2=edit1.$0;
          if(input1.$==2)
           {
            r=input1.$1;
            l=input1.$0;
            _1=Runtime.New(Tree1,{
             $:2,
             $0:apply(edit2,l),
             $1:r
            });
           }
          else
           {
            _1=apply(Runtime.New(Edit,{
             $:1,
             $0:edit2
            }),Runtime.New(Tree1,{
             $:2,
             $0:Runtime.New(Tree1,{
              $:0
             }),
             $1:input1
            }));
           }
          _=_1;
         }
        else
         {
          if(edit1.$==2)
           {
            edit3=edit1.$0;
            if(input1.$==2)
             {
              r1=input1.$1;
              l1=input1.$0;
              _2=Runtime.New(Tree1,{
               $:2,
               $0:l1,
               $1:apply(edit3,r1)
              });
             }
            else
             {
              _2=apply(Runtime.New(Edit,{
               $:2,
               $0:edit3
              }),Runtime.New(Tree1,{
               $:2,
               $0:input1,
               $1:Runtime.New(Tree1,{
                $:0
               })
              }));
             }
            _=_2;
           }
          else
           {
            output=edit1.$0;
            _=output;
           }
         }
        return _;
       };
       return apply(edit,input);
      },
      Count:function(t)
      {
       var loop,_,_1,b,a,_2,_3,tree,k,_4,ts,t1,_5;
       loop=[];
       _=Runtime.New(T,{
        $:0
       });
       loop[3]=t;
       loop[2]=_;
       loop[1]=0;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[3].$==2)
          {
           b=loop[3].$1;
           a=loop[3].$0;
           _2=Runtime.New(T,{
            $:1,
            $0:b,
            $1:loop[2]
           });
           _3=loop[1];
           loop[3]=a;
           loop[2]=_2;
           loop[1]=_3;
           _1=void(loop[0]=1);
          }
         else
          {
           tree=loop[3];
           k=tree.$==0?0:1;
           if(loop[2].$==1)
            {
             ts=loop[2].$1;
             t1=loop[2].$0;
             _5=loop[1]+k;
             loop[3]=t1;
             loop[2]=ts;
             loop[1]=_5;
             _4=void(loop[0]=1);
            }
           else
            {
             loop[0]=0;
             _4=void(loop[1]=loop[1]+k);
            }
           _1=_4;
          }
        }
       return loop[1];
      },
      DeepFlipEdit:function(edit)
      {
       var _,e,e1,t;
       if(edit.$==1)
        {
         e=edit.$0;
         _=Runtime.New(Edit,{
          $:2,
          $0:Tree.DeepFlipEdit(e)
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           _=Runtime.New(Edit,{
            $:1,
            $0:Tree.DeepFlipEdit(e1)
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:t
           });
          }
        }
       return _;
      },
      Delete:function()
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:0
        })
       });
      },
      Edit:Runtime.Class({
       GetEnumerator:function()
       {
        var _this;
        _this=this.get_Sequence();
        return Enumerator.Get(_this);
       },
       GetEnumerator1:function()
       {
        var _this;
        _this=this.get_Sequence();
        return Enumerator.Get(_this);
       },
       get_Sequence:function()
       {
        var _,edit,edit1,tree;
        if(this.$==1)
         {
          edit=this.$0;
          _=edit.get_Sequence();
         }
        else
         {
          if(this.$==2)
           {
            edit1=this.$0;
            _=edit1.get_Sequence();
           }
          else
           {
            tree=this.$0;
            _=tree.get_Sequence();
           }
         }
        return _;
       }
      }),
      FlipEdit:function(edit)
      {
       var _,e,e1,t;
       if(edit.$==1)
        {
         e=edit.$0;
         _=Runtime.New(Edit,{
          $:2,
          $0:e
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           _=Runtime.New(Edit,{
            $:1,
            $0:e1
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:t
           });
          }
        }
       return _;
      },
      FromSequence:function(vs)
      {
       var folder,state1;
       folder=function(state)
       {
        return function(v)
        {
         return Runtime.New(Tree1,{
          $:2,
          $0:state,
          $1:Runtime.New(Tree1,{
           $:1,
           $0:v
          })
         });
        };
       };
       state1=Runtime.New(Tree1,{
        $:0
       });
       return Seq.fold(folder,state1,vs);
      },
      Range:function(edit,input)
      {
       var loop,_,edit1,_1,l,_2,_3,edit2,_4,r,l1,tree,_5,_6;
       loop=[];
       loop[3]=0;
       loop[2]=input;
       loop[1]=edit;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[1].$==1)
          {
           edit1=loop[1].$0;
           if(loop[2].$==2)
            {
             loop[2].$1;
             l=loop[2].$0;
             loop[3]=loop[3];
             loop[2]=l;
             loop[1]=edit1;
             _1=void(loop[0]=1);
            }
           else
            {
             _2=loop[3];
             _3=Runtime.New(Tree1,{
              $:0
             });
             loop[3]=_2;
             loop[2]=_3;
             loop[1]=edit1;
             _1=void(loop[0]=1);
            }
           _=_1;
          }
         else
          {
           if(loop[1].$==2)
            {
             edit2=loop[1].$0;
             if(loop[2].$==2)
              {
               r=loop[2].$1;
               l1=loop[2].$0;
               loop[3]=loop[3]+Tree.Count(l1);
               loop[2]=r;
               loop[1]=edit2;
               _4=void(loop[0]=1);
              }
             else
              {
               tree=loop[2];
               _5=loop[3]+Tree.Count(tree);
               _6=Runtime.New(Tree1,{
                $:0
               });
               loop[3]=_5;
               loop[2]=_6;
               loop[1]=edit2;
               _4=void(loop[0]=1);
              }
             _=_4;
            }
           else
            {
             loop[1].$0;
             loop[0]=0;
             _=void(loop[1]=[loop[3],Tree.Count(loop[2])]);
            }
          }
        }
       return loop[1];
      },
      ReplacedTree:function(edit,input)
      {
       var _,edit1,_1,l,edit2,_2,r;
       if(edit.$==1)
        {
         edit1=edit.$0;
         if(input.$==2)
          {
           input.$1;
           l=input.$0;
           _1=Tree.ReplacedTree(edit1,l);
          }
         else
          {
           _1=Tree.ReplacedTree(Runtime.New(Edit,{
            $:1,
            $0:edit1
           }),Runtime.New(Tree1,{
            $:2,
            $0:Runtime.New(Tree1,{
             $:0
            }),
            $1:input
           }));
          }
         _=_1;
        }
       else
        {
         if(edit.$==2)
          {
           edit2=edit.$0;
           if(input.$==2)
            {
             r=input.$1;
             input.$0;
             _2=Tree.ReplacedTree(edit2,r);
            }
           else
            {
             _2=Tree.ReplacedTree(Runtime.New(Edit,{
              $:2,
              $0:edit2
             }),Runtime.New(Tree1,{
              $:2,
              $0:input,
              $1:Runtime.New(Tree1,{
               $:0
              })
             }));
            }
           _=_2;
          }
         else
          {
           edit.$0;
           _=input;
          }
        }
       return _;
      },
      Set:function(value)
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:1,
         $0:value
        })
       });
      },
      ShowEdit:function(edit)
      {
       var showE;
       showE=function(edit1)
       {
        var _,l,r;
        if(edit1.$==1)
         {
          l=edit1.$0;
          _="Left > "+showE(l);
         }
        else
         {
          if(edit1.$==2)
           {
            r=edit1.$0;
            _="Right > "+showE(r);
           }
          else
           {
            _="Replace";
           }
         }
        return _;
       };
       return showE(edit);
      },
      Transform:function(f,edit)
      {
       var _,e,arg0,e1,arg01,t;
       if(edit.$==1)
        {
         e=edit.$0;
         arg0=Tree.Transform(f,e);
         _=Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        }
       else
        {
         if(edit.$==2)
          {
           e1=edit.$0;
           arg01=Tree.Transform(f,e1);
           _=Runtime.New(Edit,{
            $:2,
            $0:arg01
           });
          }
         else
          {
           t=edit.$0;
           _=Runtime.New(Edit,{
            $:0,
            $0:f(t)
           });
          }
        }
       return _;
      },
      Tree:Runtime.Class({
       GetEnumerator:function()
       {
        var _this;
        _this=this.get_Sequence();
        return Enumerator.Get(_this);
       },
       GetEnumerator1:function()
       {
        var _this;
        _this=this.get_Sequence();
        return Enumerator.Get(_this);
       },
       Map:function(f)
       {
        var _,t,right,left;
        if(this.$==1)
         {
          t=this.$0;
          _=Runtime.New(Tree1,{
           $:1,
           $0:f(t)
          });
         }
        else
         {
          if(this.$==2)
           {
            right=this.$1;
            left=this.$0;
            _=Runtime.New(Tree1,{
             $:2,
             $0:left.Map(f),
             $1:right.Map(f)
            });
           }
          else
           {
            _=Runtime.New(Tree1,{
             $:0
            });
           }
         }
        return _;
       },
       get_Sequence:function()
       {
        var _,x,y,x1;
        if(this.$==1)
         {
          x=this.$0;
          _=[x];
         }
        else
         {
          if(this.$==2)
           {
            y=this.$1;
            x1=this.$0;
            _=Seq.append(x1.get_Sequence(),y.get_Sequence());
           }
          else
           {
            _=Seq.empty();
           }
         }
        return _;
       }
      })
     },
     Validator:Runtime.Class({
      Is:function(f,m,flet)
      {
       return this.Validate(f,m,flet);
      },
      IsEmail:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$",msg,arg20);
       };
      },
      IsEqual:function(value,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Equals(i,value);
       };
       return this.Validate(arg00,msg,flet);
      },
      IsFloat:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$",msg,arg20);
       };
      },
      IsGreaterThan:function(min,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Compare(i,min)===1;
       };
       return this.Validate(arg00,msg,flet);
      },
      IsInt:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^-?\\d+$",msg,arg20);
       };
      },
      IsLessThan:function(max,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return Unchecked.Compare(i,max)===-1;
       };
       return this.Validate(arg00,msg,flet);
      },
      IsNotEmpty:function(msg,flet)
      {
       var arg00;
       arg00=function(s)
       {
        return s!=="";
       };
       return this.Validate(arg00,msg,flet);
      },
      IsNotEqual:function(value,msg,flet)
      {
       var arg00;
       arg00=function(i)
       {
        return!Unchecked.Equals(i,value);
       };
       return this.Validate(arg00,msg,flet);
      },
      IsRegexMatch:function(regex,msg,flet)
      {
       var arg00,_this=this;
       arg00=function(x)
       {
        var objectArg;
        objectArg=_this.VP;
        return objectArg.Matches(regex,x);
       };
       return _this.Validate(arg00,msg,flet);
      },
      IsTrue:function(msg,flet)
      {
       var arg00;
       arg00=function(x)
       {
        return x;
       };
       return this.Validate(arg00,msg,flet);
      },
      Validate:function(f,msg,flet)
      {
       var value;
       value=flet.MapResult(function(res)
       {
        var _,fs,v;
        if(res.$==1)
         {
          fs=res.$0;
          _=Runtime.New(Result,{
           $:1,
           $0:fs
          });
         }
        else
         {
          v=res.$0;
          _=f(v)?Runtime.New(Result,{
           $:0,
           $0:v
          }):Runtime.New(Result,{
           $:1,
           $0:List.ofArray([msg])
          });
         }
        return _;
       });
       return value;
      }
     },{
      New:function(VP)
      {
       var r;
       r=Runtime.New(this,{});
       r.VP=VP;
       return r;
      }
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Formlets=Runtime.Safe(Global.IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets.Base);
  Formlet=Runtime.Safe(Base.Formlet);
  Form=Runtime.Safe(Base.Form);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Result=Runtime.Safe(Base.Result);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Tree1=Runtime.Safe(Tree.Tree);
  Util=Runtime.Safe(WebSharper.Util);
  Seq=Runtime.Safe(WebSharper.Seq);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  return Unchecked=Runtime.Safe(WebSharper.Unchecked);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Formlets,Body,Html,Client,Default,List,Controls,Reactive,HotStream,Formlets1,Base,Result,T,Operators,jQuery,EventsPervasives,Data,Formlet,Operators1,CssConstants,Math,Seq,Utils,Tree,Edit,Form,Arrays,IntrinsicFunctionProxy,FormletProvider,Formlet1,Pagelet,Util,LayoutProvider,LayoutUtils,Reactive1,Validator,ValidatorProvidor,RegExp,Collections,Dictionary,ElementStore,Enhance,FormButtonConfiguration,FormContainerConfiguration,Padding,ManyConfiguration,ValidationFrameConfiguration,ValidationIconConfiguration,JSON,FormletBuilder,Layout,FormRowConfiguration,LabelConfiguration,Padding1,Enumerator;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Formlets:{
     Body:Runtime.Class({},{
      New:function(el,l)
      {
       return Runtime.New(Body,{
        Element:el,
        Label:l
       });
      }
     }),
     Controls:{
      Button:function(label)
      {
       var genElem;
       genElem=function()
       {
        return Default.Button(List.ofArray([Default.Text(label)]));
       };
       return Controls.ElementButton(genElem);
      },
      Checkbox:function(def)
      {
       return Controls.CheckboxControl(false,def);
      },
      CheckboxControl:function(readOnly,def)
      {
       var f;
       f=function()
       {
        var state,readOnlyAtts,_,_this,x,_this1,arg00,body,_2,objectArg,arg002,objectArg1,arg003,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:0,
         $0:def
        }));
        if(readOnly)
         {
          _this=Default.Attr();
          _=List.ofArray([_this.NewAttr("disabled","disabled")]);
         }
        else
         {
          _=Runtime.New(T,{
           $:0
          });
         }
        readOnlyAtts=_;
        _this1=Default.Attr();
        x=Operators.add(Default.Input(List.ofArray([_this1.NewAttr("type","checkbox"),Default.Attr().Class("inputCheckbox")])),readOnlyAtts);
        arg00=function(cb)
        {
         return function()
         {
          var _1,arg0,arg001;
          if(!readOnly)
           {
            arg0=jQuery(cb.get_Body()).prop("checked");
            arg001=Runtime.New(Result,{
             $:0,
             $0:arg0
            });
            _1=state.Trigger(arg001);
           }
          else
           {
            _1=null;
           }
          return _1;
         };
        };
        EventsPervasives.Events().OnClick(arg00,x);
        body=x;
        if(def)
         {
          objectArg=body["HtmlProvider@33"];
          arg002=body.get_Body();
          _2=objectArg.SetAttribute(arg002,"defaultChecked","true");
         }
        else
         {
          objectArg1=body["HtmlProvider@33"];
          arg003=body.get_Body();
          _2=objectArg1.RemoveAttribute(arg003,"checked");
         }
        reset=function()
        {
         var _1,objectArg2,arg001,objectArg3,arg004,objectArg4,arg005;
         if(def)
          {
           objectArg2=body["HtmlProvider@33"];
           arg001=body.get_Body();
           _1=objectArg2.SetProperty(arg001,"checked",true);
          }
         else
          {
           objectArg3=body["HtmlProvider@33"];
           arg004=body.get_Body();
           objectArg3.RemoveAttribute(arg004,"checked");
           objectArg4=body["HtmlProvider@33"];
           arg005=body.get_Body();
           _1=objectArg4.SetProperty(arg005,"checked",false);
          }
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:def
         }));
        };
        reset(null);
        return[body,reset,state];
       };
       return Data.MkFormlet(f);
      },
      CheckboxGroup:function(values)
      {
       return Controls.CheckboxGroupControl(false,values);
      },
      CheckboxGroupControl:function(readOnly,values)
      {
       var mapping,fs,x2,chooser,f1;
       mapping=Runtime.Tupled(function(tupledArg)
       {
        var l,v,b,x,arg0,label,f,formlet;
        l=tupledArg[0];
        v=tupledArg[1];
        b=tupledArg[2];
        x=Controls.CheckboxControl(readOnly,b);
        arg0=function()
        {
         var x1,_this;
         x1=List.ofArray([Default.Text(l)]);
         _this=Default.Tags();
         return _this.NewTag("label",x1);
        };
        label={
         $:1,
         $0:arg0
        };
        f=function(b1)
        {
         return[b1,v];
        };
        formlet=Formlet.WithLabel(label,x);
        return Formlet.Map(f,formlet);
       });
       fs=List.map(mapping,values);
       x2=Formlet.Sequence(fs);
       chooser=Runtime.Tupled(function(tupledArg)
       {
        var b,v;
        b=tupledArg[0];
        v=tupledArg[1];
        return b?{
         $:1,
         $0:v
        }:{
         $:0
        };
       });
       f1=function(list)
       {
        return List.choose(chooser,list);
       };
       return Formlet.Map(f1,x2);
      },
      ElementButton:function(genElem)
      {
       var f;
       f=function()
       {
        var state,count,x,arg00,body,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        count={
         contents:0
        };
        x=genElem(null);
        arg00=function()
        {
         return function()
         {
          state.Trigger(Runtime.New(Result,{
           $:0,
           $0:count.contents
          }));
          return Operators1.Increment(count);
         };
        };
        EventsPervasives.Events().OnClick(arg00,x);
        body=x;
        reset=function()
        {
         count.contents=0;
         return state.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
        };
        return[body,reset,state];
       };
       return Data.MkFormlet(f);
      },
      Input:function(value)
      {
       return Controls.InputField(false,"text",CssConstants.InputTextClass(),value);
      },
      InputControl:function(value,f)
      {
       var f1;
       f1=function()
       {
        var state,body,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:0,
         $0:value
        }));
        body=f(state);
        body.set_Value(value);
        reset=function()
        {
         body.set_Value(value);
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:value
         }));
        };
        return[body,reset,state];
       };
       return Data.MkFormlet(f1);
      },
      InputField:function(readOnly,typ,cls,value)
      {
       return Controls.InputControl(value,function(state)
       {
        var ro,_,_this,a,_this1,x,input,f;
        if(readOnly)
         {
          _this=Default.Attr();
          _=List.ofArray([_this.NewAttr("readonly","readonly")]);
         }
        else
         {
          _=Runtime.New(T,{
           $:0
          });
         }
        ro=_;
        _this1=Default.Attr();
        a=List.ofArray([_this1.NewAttr("type",typ),Default.Attr().Class(cls)]);
        x=List.append(a,ro);
        input=Default.Input(x);
        f=function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:input.get_Value()
         })):null;
        };
        Controls.OnTextChange(f,input);
        return input;
       });
      },
      OnTextChange:function(f,control)
      {
       var value,up,arg00,arg001;
       value={
        contents:control.get_Value()
       };
       up=function()
       {
        var _;
        if(control.get_Value()!==value.contents)
         {
          value.contents=control.get_Value();
          _=f(null);
         }
        else
         {
          _=null;
         }
        return _;
       };
       arg00=function()
       {
        return up(null);
       };
       EventsPervasives.Events().OnChange(arg00,control);
       arg001=function()
       {
        return function()
        {
         return up(null);
        };
       };
       EventsPervasives.Events().OnKeyUp(arg001,control);
       control.Dom.oninput=up;
       return;
      },
      Password:function(value)
      {
       return Controls.InputField(false,"password","inputPassword",value);
      },
      RadioButtonGroup:function(def,values)
      {
       return Controls.RadioButtonGroupControl(false,def,values);
      },
      RadioButtonGroupControl:function(readOnly,def,values)
      {
       var f;
       f=function()
       {
        var groupId,x,_,defIx,mapping,x1,chooser,d,f1,state,mapping1,rbLbVls,resetRB,reset,mapping2,vs,arg0,arg003,body;
        groupId="id"+Math.round(Math.random()*100000000);
        if(def.$==0)
         {
          _={
           $:0
          };
         }
        else
         {
          defIx=def.$0;
          mapping=function(ix)
          {
           return Runtime.Tupled(function(tupledArg)
           {
            var value;
            tupledArg[0];
            value=tupledArg[1];
            return[ix,value];
           });
          };
          x1=List.mapi(mapping,values);
          chooser=Runtime.Tupled(function(tupledArg)
          {
           var ix,value,_1,defIx1;
           ix=tupledArg[0];
           value=tupledArg[1];
           if(def.$==0)
            {
             _1={
              $:0
             };
            }
           else
            {
             defIx1=def.$0;
             _1=defIx1===ix?{
              $:1,
              $0:Runtime.New(Result,{
               $:0,
               $0:value
              })
             }:{
              $:0
             };
            }
           return _1;
          });
          _=Seq.tryPick(chooser,x1);
         }
        x=_;
        d=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        f1=function(arg00)
        {
         return HotStream.New(arg00);
        };
        state=Utils.Maybe(d,f1,x);
        mapping1=Runtime.Tupled(function(tupledArg)
        {
         var label,value,inp,_this,_this1,_1,_this2;
         label=tupledArg[0];
         value=tupledArg[1];
         _this=Default.Attr();
         _this1=Default.Attr();
         if(readOnly)
          {
           _this2=Default.Attr();
           _1=List.ofArray([_this2.NewAttr("disabled","disabled")]);
          }
         else
          {
           _1=Runtime.New(T,{
            $:0
           });
          }
         inp=Operators.add(Default.Input(List.ofArray([Default.Attr().Class("inputRadio"),_this.NewAttr("type","radio"),_this1.NewAttr("name",groupId)])),_1);
         return[inp,label,value];
        });
        rbLbVls=List.map(mapping1,values);
        resetRB=function(rb,value,ix)
        {
         var _1,objectArg,arg00,defIx1,_2,objectArg1,arg001,objectArg2,arg002;
         if(def.$==0)
          {
           objectArg=rb["HtmlProvider@33"];
           arg00=rb.get_Body();
           objectArg.RemoveAttribute(arg00,"checked");
           _1=state.Trigger(Runtime.New(Result,{
            $:1,
            $0:Runtime.New(T,{
             $:0
            })
           }));
          }
         else
          {
           defIx1=def.$0;
           if(defIx1===ix)
            {
             objectArg1=rb["HtmlProvider@33"];
             arg001=rb.get_Body();
             objectArg1.SetProperty(arg001,"checked",true);
             _2=state.Trigger(Runtime.New(Result,{
              $:0,
              $0:value
             }));
            }
           else
            {
             objectArg2=rb["HtmlProvider@33"];
             arg002=rb.get_Body();
             _2=objectArg2.SetProperty(arg002,"checked",false);
            }
           _1=_2;
          }
         return _1;
        };
        reset=function()
        {
         var action;
         action=function(ix)
         {
          return Runtime.Tupled(function(tupledArg)
          {
           var rb,value;
           rb=tupledArg[0];
           tupledArg[1];
           value=tupledArg[2];
           return resetRB(rb,value,ix);
          });
         };
         return Seq.iteri(action,rbLbVls);
        };
        mapping2=function(ix)
        {
         return Runtime.Tupled(function(tupledArg)
         {
          var rb,label,value,arg00,Label;
          rb=tupledArg[0];
          label=tupledArg[1];
          value=tupledArg[2];
          resetRB(rb,value,ix);
          arg00=function()
          {
           return function()
           {
            return!readOnly?state.Trigger(Runtime.New(Result,{
             $:0,
             $0:value
            })):null;
           };
          };
          EventsPervasives.Events().OnClick(arg00,rb);
          Label={
           $:1,
           $0:function()
           {
            var x2,_this;
            x2=List.ofArray([Default.Text(label)]);
            _this=Default.Tags();
            return _this.NewTag("label",x2);
           }
          };
          return Runtime.New(Body,{
           Element:rb,
           Label:Label
          });
         });
        };
        vs=List.mapi(mapping2,rbLbVls);
        arg0=Tree.FromSequence(vs);
        arg003=Runtime.New(Edit,{
         $:0,
         $0:arg0
        });
        body=Data.RX().Return(arg003);
        return Runtime.New(Form,{
         Body:body,
         Dispose1:function()
         {
         },
         Notify:function()
         {
          return reset(null);
         },
         State:state
        });
       };
       return Formlet.New(f);
      },
      ReadOnlyCheckbox:function(def)
      {
       return Controls.CheckboxControl(true,def);
      },
      ReadOnlyInput:function(value)
      {
       return Controls.InputField(true,"text",CssConstants.InputTextClass(),value);
      },
      ReadOnlyRadioButtonGroup:function(def,values)
      {
       return Controls.RadioButtonGroupControl(true,def,values);
      },
      ReadOnlySelect:function(def,vls)
      {
       return Controls.SelectControl(true,def,vls);
      },
      ReadOnlyTextArea:function(value)
      {
       return Controls.TextAreaControl(true,value);
      },
      Select:function(def,vls)
      {
       return Controls.SelectControl(false,def,vls);
      },
      SelectControl:function(readOnly,def,vls)
      {
       var f;
       f=function()
       {
        var mapping,list,aVls,sIx,mapping1,x2,select,body,_,_this2,sValue,state,reset,arg001;
        mapping=Runtime.Tupled(function(tuple)
        {
         return tuple[1];
        });
        list=List.map(mapping,vls);
        aVls=Arrays.ofSeq(list);
        sIx=(def>=0?def<vls.get_Length():false)?def:0;
        mapping1=function(i)
        {
         return Runtime.Tupled(function(tupledArg)
         {
          var nm,_this,x,_this1,x1;
          nm=tupledArg[0];
          tupledArg[1];
          _this=Default.Tags();
          _this1=Default.Attr();
          x1=Global.String(i);
          x=List.ofArray([Default.Text(nm),_this1.NewAttr("value",x1)]);
          return _this.NewTag("option",x);
         });
        };
        x2=List.mapi(mapping1,vls);
        select=Default.Select(x2);
        if(readOnly)
         {
          _this2=Default.Attr();
          _=Operators.add(select,List.ofArray([_this2.NewAttr("disabled","disabled")]));
         }
        else
         {
          _=select;
         }
        body=_;
        sValue=Runtime.New(Result,{
         $:0,
         $0:IntrinsicFunctionProxy.GetArray(aVls,sIx)
        });
        state=HotStream.New(sValue);
        reset=function()
        {
         var value,objectArg,arg00;
         value=Global.String(sIx);
         objectArg=body["HtmlProvider@33"];
         arg00=body.get_Body();
         objectArg.SetProperty(arg00,"value",value);
         return state.Trigger(sValue);
        };
        reset(null);
        arg001=function()
        {
         var _1,value,arg0,arg00;
         if(!readOnly)
          {
           value=body.get_Value();
           arg0=IntrinsicFunctionProxy.GetArray(aVls,value<<0);
           arg00=Runtime.New(Result,{
            $:0,
            $0:arg0
           });
           _1=state.Trigger(arg00);
          }
         else
          {
           _1=null;
          }
         return _1;
        };
        EventsPervasives.Events().OnChange(arg001,body);
        reset(null);
        return[body,reset,state];
       };
       return Data.MkFormlet(f);
      },
      TextArea:function(value)
      {
       return Controls.TextAreaControl(false,value);
      },
      TextAreaControl:function(readOnly,value)
      {
       return Controls.InputControl(value,function(state)
       {
        var x,_,_this,input,f;
        if(readOnly)
         {
          _this=Default.Attr();
          _=List.ofArray([_this.NewAttr("readonly","readonly")]);
         }
        else
         {
          _=Runtime.New(T,{
           $:0
          });
         }
        x=_;
        input=Default.TextArea(x);
        f=function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:input.get_Value()
         })):null;
        };
        Controls.OnTextChange(f,input);
        return input;
       });
      }
     },
     CssConstants:{
      InputTextClass:Runtime.Field(function()
      {
       return"inputText";
      })
     },
     Data:{
      $:function(f,x)
      {
       var objectArg,x1;
       objectArg=Data.BaseFormlet();
       x1=objectArg.Apply(f,x);
       return Data.OfIFormlet(x1);
      },
      BaseFormlet:function()
      {
       return FormletProvider.New(Data.UtilsProvider());
      },
      DefaultLayout:Runtime.Field(function()
      {
       return Data.Layout().get_Vertical();
      }),
      Formlet:Runtime.Class({
       Build:function()
       {
        return this.buildInternal.call(null,null);
       },
       MapResult:function(f)
       {
        var x,_this=this;
        x=Formlet1.New(function()
        {
         var form,objectArg,arg00,arg10;
         form=_this.buildInternal.call(null,null);
         objectArg=_this.utils.Reactive;
         arg00=form.State;
         arg10=function(x1)
         {
          return f(x1);
         };
         return Runtime.New(Form,{
          Body:form.Body,
          Dispose1:form.Dispose1,
          Notify:form.Notify,
          State:objectArg.Select(arg00,arg10)
         });
        },_this.layoutInternal,_this.formletBase,_this.utils);
        return x;
       },
       Render:function()
       {
        return this.Run(function()
        {
        }).Render();
       },
       Run:function(f)
       {
        var matchValue,_,formlet,form,value,matchValue1,el,_1,patternInput,body,body1,el1;
        matchValue=this.get_ElementInternal();
        if(matchValue.$==0)
         {
          formlet=this.formletBase.ApplyLayout(this);
          form=formlet.Build();
          value=Util.subscribeTo(form.State,function(res)
          {
           var value1;
           value1=Result.Map(f,res);
           return;
          });
          matchValue1=formlet.get_Layout().Apply.call(null,form.Body);
          if(matchValue1.$==0)
           {
            patternInput=Data.DefaultLayout().Apply.call(null,form.Body).$0;
            body=patternInput[0];
            _1=body.Element;
           }
          else
           {
            body1=matchValue1.$0[0];
            _1=body1.Element;
           }
          el=_1;
          this.set_ElementInternal({
           $:1,
           $0:el
          });
          _=el;
         }
        else
         {
          el1=matchValue.$0;
          _=el1;
         }
        return _;
       },
       get_Body:function()
       {
        return this.Run(function()
        {
        }).get_Body();
       },
       get_ElementInternal:function()
       {
        return this["ElementInternal@"];
       },
       get_Layout:function()
       {
        return this.layoutInternal;
       },
       set_ElementInternal:function(v)
       {
        this["ElementInternal@"]=v;
        return;
       }
      },{
       New:function(buildInternal,layoutInternal,formletBase,utils)
       {
        var r;
        r=Runtime.New(this,Pagelet.New());
        r.buildInternal=buildInternal;
        r.layoutInternal=layoutInternal;
        r.formletBase=formletBase;
        r.utils=utils;
        r["ElementInternal@"]={
         $:0
        };
        return r;
       }
      }),
      Layout:Runtime.Field(function()
      {
       return LayoutProvider.New(LayoutUtils.New({
        Reactive:Reactive1.Default()
       }));
      }),
      MkFormlet:function(f)
      {
       var objectArg,arg00,formlet;
       objectArg=Data.BaseFormlet();
       arg00=function()
       {
        var patternInput,state,reset,body,Notify,value,arg001;
        patternInput=f(null);
        state=patternInput[2];
        reset=patternInput[1];
        body=patternInput[0];
        Notify=function()
        {
         return reset(null);
        };
        value=Data.NewBody(body,{
         $:0
        });
        arg001=Tree.Set(value);
        return Runtime.New(Form,{
         Body:Data.RX().Return(arg001),
         Dispose1:function()
         {
          return null;
         },
         Notify:Notify,
         State:state
        });
       };
       formlet=objectArg.New(arg00);
       return Data.OfIFormlet(formlet);
      },
      NewBody:function(arg00,arg10)
      {
       return Body.New(arg00,arg10);
      },
      OfIFormlet:function(formlet)
      {
       var f2;
       f2=Formlet1.New(function()
       {
        return formlet.Build();
       },formlet.get_Layout(),Data.BaseFormlet(),Data.UtilsProvider());
       return Data.PropagateRenderFrom(formlet,f2);
      },
      PropagateRenderFrom:function(f1,f2)
      {
       f1.hasOwnProperty("Render")?void(f2.Render=f1.Render):null;
       return f2;
      },
      RX:Runtime.Field(function()
      {
       return Reactive1.Default();
      }),
      UtilsProvider:function()
      {
       return{
        Reactive:Data.RX(),
        DefaultLayout:Data.DefaultLayout()
       };
      },
      Validator:Runtime.Field(function()
      {
       return Validator.New(ValidatorProvidor.New());
      }),
      ValidatorProvidor:Runtime.Class({
       Matches:function(regex,text)
       {
        return text.match(new RegExp(regex));
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      })
     },
     ElementStore:Runtime.Class({
      Init:function()
      {
       this.store=Dictionary.New2();
       return;
      },
      RegisterElement:function(key,f)
      {
       var value;
       value=this.store.ContainsKey(key);
       return!value?this.store.set_Item(key,f):null;
      },
      Remove:function(key)
      {
       var _,value;
       if(this.store.ContainsKey(key))
        {
         (this.store.get_Item(key))(null);
         value=this.store.Remove(key);
         _=void value;
        }
       else
        {
         _=null;
        }
       return _;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      },
      NewElementStore:function()
      {
       var store;
       store=ElementStore.New();
       store.Init();
       return store;
      }
     }),
     Enhance:{
      Cancel:function(formlet,isCancel)
      {
       return Formlet.Replace(formlet,function(value)
       {
        return isCancel(value)?Formlet.Empty():Formlet.Return(value);
       });
      },
      CustomMany:function(config,formlet)
      {
       var formlet1,addButton,f,formlet2,c,x,l,x1,delF,manyF,resetS,formlet6,resetF,reset,_builder_,formlet7;
       formlet1=Controls.ElementButton(function()
       {
        return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(config.AddIconClass)])),List.ofArray([Default.Div(Runtime.New(T,{
         $:0
        }))]));
       });
       addButton=Formlet.InitWith(1,formlet1);
       f=function()
       {
       };
       formlet2=Controls.ElementButton(function()
       {
        return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(config.RemoveIconClass)])),List.ofArray([Default.Div(Runtime.New(T,{
         $:0
        }))]));
       });
       c=Formlet.Map(f,formlet2);
       x=Formlet.WithCancelation(formlet,c);
       l=Data.Layout().get_Horizontal();
       x1=Formlet.WithLayout(l,x);
       delF=Enhance.Deletable(x1);
       manyF=function()
       {
        var f1,formlet3,formlet4,formlet5;
        f1=function(source)
        {
         return List.ofSeq(source);
        };
        formlet3=Enhance.Many_(addButton,function()
        {
         return delF;
        });
        formlet4=Formlet.Map(f1,formlet3);
        formlet5=Formlet.WithLayoutOrDefault(formlet4);
        return Formlet.ApplyLayout(formlet5);
       };
       resetS=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:null
       }));
       formlet6=Data.BaseFormlet().FromState(resetS);
       resetF=Data.OfIFormlet(formlet6);
       reset=function()
       {
        return resetS.Trigger(Runtime.New(Result,{
         $:0,
         $0:null
        }));
       };
       _builder_=Formlet.Do();
       formlet7=_builder_.Delay(function()
       {
        return _builder_.Bind(resetF,function()
        {
         return _builder_.ReturnFrom(manyF(null));
        });
       });
       return Formlet.WithNotification(reset,formlet7);
      },
      Deletable:function(formlet)
      {
       return Enhance.Replace(formlet,function(value)
       {
        var _,value1;
        if(value.$==1)
         {
          value1=value.$0;
          _=Formlet.Return({
           $:1,
           $0:value1
          });
         }
        else
         {
          _=Formlet.ReturnEmpty({
           $:0
          });
         }
        return _;
       });
      },
      FormButtonConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(FormButtonConfiguration,{
         Label:{
          $:0
         },
         Style:{
          $:0
         },
         Class:{
          $:0
         }
        });
       }
      }),
      FormContainerConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        var Description;
        Description={
         $:0
        };
        return Runtime.New(FormContainerConfiguration,{
         Header:{
          $:0
         },
         Padding:Padding.get_Default(),
         Description:Description,
         BackgroundColor:{
          $:0
         },
         BorderColor:{
          $:0
         },
         CssClass:{
          $:0
         },
         Style:{
          $:0
         }
        });
       }
      }),
      InputButton:function(conf,enabled)
      {
       var f;
       f=function()
       {
        var state,count,label,x1,_this,_this1,arg00,submit,submit1,_,objectArg,arg001,matchValue,_1,style,objectArg1,arg002,matchValue1,_2,cls,objectArg2,arg003,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        count={
         contents:0
        };
        label=Utils.Maybe("Submit",function(x)
        {
         return x;
        },conf.Label);
        _this=Default.Attr();
        _this1=Default.Attr();
        x1=Operators.add(Default.Input(List.ofArray([_this.NewAttr("type","button")])),List.ofArray([Default.Attr().Class("submitButton"),_this1.NewAttr("value",label)]));
        arg00=function()
        {
         return function()
         {
          Operators1.Increment(count);
          return state.Trigger(Runtime.New(Result,{
           $:0,
           $0:count.contents
          }));
         };
        };
        EventsPervasives.Events().OnClick(arg00,x1);
        submit=x1;
        if(!enabled)
         {
          objectArg=submit["HtmlProvider@33"];
          arg001=submit.get_Body();
          _=objectArg.AddClass(arg001,"disabledButton");
         }
        else
         {
          _=null;
         }
        matchValue=conf.Style;
        if(matchValue.$==1)
         {
          style=matchValue.$0;
          objectArg1=submit["HtmlProvider@33"];
          arg002=submit.get_Body();
          _1=objectArg1.SetStyle(arg002,style);
         }
        else
         {
          _1=null;
         }
        matchValue1=conf.Class;
        if(matchValue1.$==1)
         {
          cls=matchValue1.$0;
          objectArg2=submit["HtmlProvider@33"];
          arg003=submit.get_Body();
          _2=objectArg2.AddClass(arg003,cls);
         }
        else
         {
          _2=null;
         }
        submit1=submit;
        reset=function()
        {
         count.contents=0;
         return state.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
        };
        state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        return[submit1,reset,state];
       };
       return Data.MkFormlet(f);
      },
      Many:function(formlet)
      {
       return Enhance.CustomMany(ManyConfiguration.get_Default(),formlet);
      },
      ManyConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ManyConfiguration,{
         AddIconClass:"addIcon",
         RemoveIconClass:"removeIcon"
        });
       }
      }),
      Many_:function(add,f)
      {
       var f1,chooser,f2,formlet,formlet1,formlet2;
       f1=function(v)
       {
        return f(v);
       };
       chooser=function(x)
       {
        return x;
       };
       f2=function(source)
       {
        return Seq.choose(chooser,source);
       };
       formlet=Formlet.Map(f1,add);
       formlet1=Formlet.SelectMany(formlet);
       formlet2=Formlet.FlipBody(formlet1);
       return Formlet.Map(f2,formlet2);
      },
      Padding:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(Padding,{
         Left:{
          $:0
         },
         Right:{
          $:0
         },
         Top:{
          $:0
         },
         Bottom:{
          $:0
         }
        });
       }
      }),
      Replace:function(formlet,f)
      {
       var f1,x;
       f1=function(res)
       {
        var _,fs,arg0,s;
        if(res.$==1)
         {
          fs=res.$0;
          arg0=Formlet.FailWith(fs);
          _=Runtime.New(Result,{
           $:0,
           $0:arg0
          });
         }
        else
         {
          s=res.$0;
          _=Runtime.New(Result,{
           $:0,
           $0:f(s)
          });
         }
        return _;
       };
       x=Formlet.MapResult(f1,formlet);
       return Formlet.Switch(x);
      },
      ValidationFrameConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ValidationFrameConfiguration,{
         ValidClass:{
          $:1,
          $0:"successFormlet"
         },
         ValidStyle:{
          $:0
         },
         ErrorClass:{
          $:1,
          $0:"errorFormlet"
         },
         ErrorStyle:{
          $:0
         }
        });
       }
      }),
      ValidationIconConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ValidationIconConfiguration,{
         ValidIconClass:"validIcon",
         ErrorIconClass:"errorIcon"
        });
       }
      }),
      WithCssClass:function(css,formlet)
      {
       var f;
       f=function(el)
       {
        var objectArg,arg00;
        objectArg=el["HtmlProvider@33"];
        arg00=el.get_Body();
        objectArg.AddClass(arg00,css);
        return el;
       };
       return Formlet.MapElement(f,formlet);
      },
      WithCustomFormContainer:function(fc,formlet)
      {
       var x,f;
       x=Formlet.ApplyLayout(formlet);
       f=function(formEl)
       {
        var x1,d,f1,description,x2,d1,f2,tb,cell,f3,o,x3,f4,value,f5,value1,f6,value2,f7,value3,f8,value4,action,matchValue,_1,style,objectArg1,arg002,matchValue1,_2,cls,objectArg2,arg003;
        x1=fc.Description;
        d=Runtime.New(T,{
         $:0
        });
        f1=function(descr)
        {
         var _,genEl,text;
         if(descr.$==1)
          {
           genEl=descr.$0;
           _=List.ofArray([genEl(null)]);
          }
         else
          {
           text=descr.$0;
           _=List.ofArray([Default.P(List.ofArray([Default.Tags().text(text)]))]);
          }
         return _;
        };
        description=Utils.Maybe(d,f1,x1);
        x2=fc.Header;
        d1=Utils.InTable(List.ofArray([List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("headerPanel")])),description)]),List.ofArray([formEl])]));
        f2=function(formElem)
        {
         var hdr,_,genElem,text,header;
         if(formElem.$==1)
          {
           genElem=formElem.$0;
           _=genElem(null);
          }
         else
          {
           text=formElem.$0;
           _=Default.H1(List.ofArray([Default.Tags().text(text)]));
          }
         hdr=_;
         header=Operators.add(Default.Div(List.ofArray([Default.Attr().Class("headerPanel")])),Runtime.New(T,{
          $:1,
          $0:hdr,
          $1:description
         }));
         return Utils.InTable(List.ofArray([List.ofArray([header]),List.ofArray([formEl])]));
        };
        tb=Utils.Maybe(d1,f2,x2);
        cell=Operators.add(Default.TD(List.ofArray([Default.Attr().Class("formlet")])),List.ofArray([tb]));
        f3=function(color)
        {
         var arg00,objectArg,arg001;
         arg00="border-color: "+color;
         objectArg=cell["HtmlProvider@33"];
         arg001=cell.get_Body();
         return objectArg.SetStyle(arg001,arg00);
        };
        o=fc.BorderColor;
        Utils.Maybe(null,f3,o);
        f4=function(color)
        {
         return color;
        };
        value=fc.BackgroundColor;
        f5=function(v)
        {
         return Global.String(v)+"px";
        };
        value1=fc.Padding.Left;
        f6=function(v)
        {
         return Global.String(v)+"px";
        };
        value2=fc.Padding.Right;
        f7=function(v)
        {
         return Global.String(v)+"px";
        };
        value3=fc.Padding.Top;
        f8=function(v)
        {
         return Global.String(v)+"px";
        };
        value4=fc.Padding.Bottom;
        x3=List.ofArray([["background-color",Utils.MapOption(f4,value)],["padding-left",Utils.MapOption(f5,value1)],["padding-right",Utils.MapOption(f6,value2)],["padding-top",Utils.MapOption(f7,value3)],["padding-bottom",Utils.MapOption(f8,value4)]]);
        action=Runtime.Tupled(function(tupledArg)
        {
         var name,value5,_,v,objectArg,arg00;
         name=tupledArg[0];
         value5=tupledArg[1];
         if(value5.$==0)
          {
           _=null;
          }
         else
          {
           v=value5.$0;
           objectArg=cell["HtmlProvider@33"];
           arg00=cell.get_Body();
           _=objectArg.SetCss(arg00,name,v);
          }
         return _;
        });
        Seq.iter(action,x3);
        matchValue=fc.Style;
        if(matchValue.$==0)
         {
          _1=null;
         }
        else
         {
          style=matchValue.$0;
          objectArg1=cell["HtmlProvider@33"];
          arg002=cell.get_Body();
          _1=objectArg1.SetStyle(arg002,style);
         }
        matchValue1=fc.CssClass;
        if(matchValue1.$==0)
         {
          _2=null;
         }
        else
         {
          cls=matchValue1.$0;
          objectArg2=cell["HtmlProvider@33"];
          arg003=cell.get_Body();
          _2=objectArg2.AddClass(arg003,cls);
         }
        return Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([cell]))]))]));
       };
       return Formlet.MapElement(f,x);
      },
      WithCustomResetButton:function(buttonConf,formlet)
      {
       var matchValue,buttonConf1,_,reset;
       matchValue=buttonConf.Label;
       if(matchValue.$==0)
        {
         _=Runtime.New(FormButtonConfiguration,{
          Label:{
           $:1,
           $0:"Reset"
          },
          Style:buttonConf.Style,
          Class:buttonConf.Class
         });
        }
       else
        {
         matchValue.$0;
         _=buttonConf;
        }
       buttonConf1=_;
       reset=Enhance.InputButton(buttonConf1,true);
       return Enhance.WithResetFormlet(formlet,reset);
      },
      WithCustomSubmitAndResetButtons:function(submitConf,resetConf,formlet)
      {
       var submitReset;
       submitReset=function(reset)
       {
        return function(result)
        {
         var submit,_,fs,f,formlet1,value,f1,formlet2,_builder_,reset1,x,l;
         if(result.$==1)
          {
           fs=result.$0;
           f=function()
           {
            return Runtime.New(Result,{
             $:1,
             $0:fs
            });
           };
           formlet1=Enhance.InputButton(submitConf,false);
           _=Formlet.MapResult(f,formlet1);
          }
         else
          {
           value=result.$0;
           f1=function()
           {
            return value;
           };
           formlet2=Enhance.InputButton(submitConf,true);
           _=Formlet.Map(f1,formlet2);
          }
         submit=_;
         _builder_=Formlet.Do();
         reset1=_builder_.Delay(function()
         {
          return _builder_.Bind(Formlet.LiftResult(Enhance.InputButton(resetConf,true)),function(_arg1)
          {
           _arg1.$==0?reset(null):null;
           return _builder_.Return(null);
          });
         });
         x=Data.$(Data.$(Formlet.Return(function(v)
         {
          return function()
          {
           return v;
          };
         }),submit),reset1);
         l=Data.Layout().get_Horizontal();
         return Formlet.WithLayout(l,x);
        };
       };
       return Enhance.WithSubmitAndReset(formlet,submitReset);
      },
      WithCustomSubmitButton:function(buttonConf,formlet)
      {
       var matchValue,buttonConf1,_;
       matchValue=buttonConf.Label;
       if(matchValue.$==0)
        {
         _=Runtime.New(FormButtonConfiguration,{
          Label:{
           $:1,
           $0:"Submit"
          },
          Style:buttonConf.Style,
          Class:buttonConf.Class
         });
        }
       else
        {
         matchValue.$0;
         _=buttonConf;
        }
       buttonConf1=_;
       return Enhance.WithSubmitFormlet(formlet,function(res)
       {
        var f,enabled,formlet1;
        f=function()
        {
        };
        enabled=res.$==0?true:false;
        formlet1=Enhance.InputButton(buttonConf1,enabled);
        return Formlet.Map(f,formlet1);
       });
      },
      WithCustomValidationFrame:function(vc,formlet)
      {
       var wrapper;
       wrapper=function(state)
       {
        return function(body)
        {
         var x,f;
         x=Default.Div(List.ofArray([body.Element]));
         f=function(panel)
         {
          var value;
          value=Util.subscribeTo(state,function(res)
          {
           var _,msgs,matchValue,_1,cls,objectArg,arg00,matchValue1,_2,cls1,objectArg1,arg001,matchValue2,_3,style,objectArg2,arg002,objectArg3,arg003,matchValue3,_4,cls2,objectArg4,arg004,matchValue4,_5,cls3,objectArg5,arg005,matchValue5,_6,style1,objectArg6,arg006,objectArg7,arg007;
           if(res.$==1)
            {
             msgs=res.$0;
             matchValue=vc.ValidClass;
             if(matchValue.$==1)
              {
               cls=matchValue.$0;
               objectArg=panel["HtmlProvider@33"];
               arg00=panel.get_Body();
               _1=objectArg.RemoveClass(arg00,cls);
              }
             else
              {
               _1=null;
              }
             matchValue1=vc.ErrorClass;
             if(matchValue1.$==1)
              {
               cls1=matchValue1.$0;
               objectArg1=panel["HtmlProvider@33"];
               arg001=panel.get_Body();
               _2=objectArg1.AddClass(arg001,cls1);
              }
             else
              {
               _2=null;
              }
             matchValue2=vc.ErrorStyle;
             if(matchValue2.$==1)
              {
               style=matchValue2.$0;
               objectArg2=panel["HtmlProvider@33"];
               arg002=panel.get_Body();
               _3=objectArg2.SetStyle(arg002,style);
              }
             else
              {
               objectArg3=panel["HtmlProvider@33"];
               arg003=panel.get_Body();
               _3=objectArg3.SetStyle(arg003,"");
              }
             _=_3;
            }
           else
            {
             matchValue3=vc.ErrorClass;
             if(matchValue3.$==1)
              {
               cls2=matchValue3.$0;
               objectArg4=panel["HtmlProvider@33"];
               arg004=panel.get_Body();
               _4=objectArg4.RemoveClass(arg004,cls2);
              }
             else
              {
               _4=null;
              }
             matchValue4=vc.ValidClass;
             if(matchValue4.$==1)
              {
               cls3=matchValue4.$0;
               objectArg5=panel["HtmlProvider@33"];
               arg005=panel.get_Body();
               _5=objectArg5.AddClass(arg005,cls3);
              }
             else
              {
               _5=null;
              }
             matchValue5=vc.ValidStyle;
             if(matchValue5.$==1)
              {
               style1=matchValue5.$0;
               objectArg6=panel["HtmlProvider@33"];
               arg006=panel.get_Body();
               _6=objectArg6.SetStyle(arg006,style1);
              }
             else
              {
               objectArg7=panel["HtmlProvider@33"];
               arg007=panel.get_Body();
               _6=objectArg7.SetStyle(arg007,"");
              }
             _=_6;
            }
           return _;
          });
          return;
         };
         Operators.OnAfterRender(f,x);
         return x;
        };
       };
       return Enhance.WrapFormlet(wrapper,formlet);
      },
      WithCustomValidationIcon:function(vic,formlet)
      {
       var formlet1,valid,_builder_,f1,formlet2,x1,l;
       formlet1=Formlet.WithLayoutOrDefault(formlet);
       valid=function(res)
       {
        var genElem;
        genElem=function()
        {
         var _,msgs,f,title,_this,_this1;
         if(res.$==1)
          {
           msgs=res.$0;
           f=function(x)
           {
            return function(y)
            {
             return x+" "+y;
            };
           };
           title=Seq.fold(f,"",msgs);
           _this=Default.Attr();
           _=Operators.add(Default.Div(List.ofArray([Default.Attr().Class(vic.ErrorIconClass),_this.NewAttr("title",title)])),List.ofArray([Default.Div(Runtime.New(T,{
            $:0
           }))]));
          }
         else
          {
           _this1=Default.Attr();
           _=Operators.add(Default.Div(List.ofArray([Default.Attr().Class(vic.ValidIconClass),_this1.NewAttr("title","")])),List.ofArray([Default.Div(Runtime.New(T,{
            $:0
           }))]));
          }
         return _;
        };
        return Formlet.OfElement(genElem);
       };
       _builder_=Formlet.Do();
       f1=function(arg00)
       {
        return Result.Join(arg00);
       };
       formlet2=_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet.LiftResult(formlet1),function(_arg1)
        {
         return _builder_.Bind(valid(_arg1),function()
         {
          return _builder_.Return(_arg1);
         });
        });
       });
       x1=Formlet.MapResult(f1,formlet2);
       l=Data.Layout().get_Horizontal();
       return Formlet.WithLayout(l,x1);
      },
      WithErrorFormlet:function(f,formlet)
      {
       var _builder_,f1,formlet1;
       _builder_=Formlet.Do();
       f1=function(arg00)
       {
        return Result.Join(arg00);
       };
       formlet1=_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
        {
         var _,msgs,_builder_1;
         if(_arg1.$==1)
          {
           msgs=_arg1.$0;
           _builder_1=Formlet.Do();
           _=_builder_1.Delay(function()
           {
            return _builder_1.Bind(f(msgs),function()
            {
             return _builder_1.Return(_arg1);
            });
           });
          }
         else
          {
           _arg1.$0;
           _=Formlet.Return(_arg1);
          }
         return _builder_.ReturnFrom(_);
        });
       });
       return Formlet.MapResult(f1,formlet1);
      },
      WithErrorSummary:function(label,formlet)
      {
       var errrFormlet,_builder_,f1,formlet1;
       errrFormlet=function(fs)
       {
        return Formlet.OfElement(function()
        {
         var x,x1,_this,mapping,x2,_this1;
         x1=List.ofArray([Default.Text(label)]);
         _this=Default.Tags();
         mapping=function(f)
         {
          return Default.LI(List.ofArray([Default.Text(f)]));
         };
         x2=List.map(mapping,fs);
         x=List.ofArray([_this.NewTag("legend",x1),Default.UL(x2)]);
         _this1=Default.Tags();
         return _this1.NewTag("fieldset",x);
        });
       };
       _builder_=Formlet.Do();
       f1=function(arg00)
       {
        return Result.Join(arg00);
       };
       formlet1=_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet.LiftResult(formlet),function(_arg1)
        {
         var _,fs,f,formlet2;
         if(_arg1.$==1)
          {
           fs=_arg1.$0;
           f=function()
           {
            return _arg1;
           };
           formlet2=errrFormlet(fs);
           _=Formlet.Map(f,formlet2);
          }
         else
          {
           _arg1.$0;
           _=Formlet.Return(_arg1);
          }
         return _builder_.ReturnFrom(_);
        });
       });
       return Formlet.MapResult(f1,formlet1);
      },
      WithFormContainer:function(formlet)
      {
       return Enhance.WithCustomFormContainer(FormContainerConfiguration.get_Default(),formlet);
      },
      WithJsonPost:function(conf,formlet)
      {
       var matchValue,postUrl,_,url,_this,matchValue1,enc,_1,enc1,_this1,_this2,x,_this3,_this4,x1,hiddenField,_this5,x2,_this6,_this7,submitButton,a,_this8,_this9,formAttrs,x3,f,form1,f1,formlet1;
       matchValue=conf.PostUrl;
       if(matchValue.$==0)
        {
         _=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         url=matchValue.$0;
         _this=Default.Attr();
         _=List.ofArray([_this.NewAttr("action",url)]);
        }
       postUrl=_;
       matchValue1=conf.EncodingType;
       if(matchValue1.$==0)
        {
         _1=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         enc1=matchValue1.$0;
         _this1=Default.Attr();
         _1=List.ofArray([_this1.NewAttr("enctype",enc1)]);
        }
       enc=_1;
       _this2=Default.Tags();
       _this3=Default.Attr();
       _this4=Default.Attr();
       x1=conf.ParameterName;
       x=List.ofArray([_this3.NewAttr("type","hidden"),_this4.NewAttr("name",x1)]);
       hiddenField=_this2.NewTag("input",x);
       _this5=Default.Tags();
       _this6=Default.Attr();
       _this7=Default.Attr();
       x2=List.ofArray([_this6.NewAttr("type","submit"),_this7.NewAttr("value","Submit")]);
       submitButton=_this5.NewTag("input",x2);
       _this8=Default.Attr();
       _this9=Default.Attr();
       a=Runtime.New(T,{
        $:1,
        $0:_this8.NewAttr("method","POST"),
        $1:Runtime.New(T,{
         $:1,
         $0:_this9.NewAttr("style","display:none"),
         $1:postUrl
        })
       });
       formAttrs=List.append(a,enc);
       x3=Operators.add(Default.Form(formAttrs),List.ofArray([hiddenField,submitButton]));
       f=function(form)
       {
        var matchValue2,_2,enc2,_3,value;
        matchValue2=conf.EncodingType;
        if(matchValue2.$==0)
         {
          _2=null;
         }
        else
         {
          enc2=matchValue2.$0;
          if(enc2==="multipart/form-data")
           {
            value=jQuery(form.get_Body()).attr("encoding","multipart/form-data");
            _3=void value;
           }
          else
           {
            _3=null;
           }
          _2=_3;
         }
        return _2;
       };
       Operators.OnAfterRender(f,x3);
       form1=x3;
       f1=function(value)
       {
        var data;
        data=JSON.stringify(value);
        jQuery(hiddenField.get_Body()).val(data);
        return jQuery(submitButton.get_Body()).click();
       };
       formlet1=Formlet.Map(f1,formlet);
       return Default.Div(List.ofArray([form1,formlet1]));
      },
      WithLabel:function(labelGen,formlet)
      {
       return Formlet.WithLabel({
        $:1,
        $0:labelGen
       },formlet);
      },
      WithLabelAbove:function(formlet)
      {
       var f;
       f=function(body)
       {
        var matchValue,label,_,l,el,Label;
        matchValue=body.Label;
        if(matchValue.$==0)
         {
          _=Default.Span(Runtime.New(T,{
           $:0
          }));
         }
        else
         {
          l=matchValue.$0;
          _=l(null);
         }
        label=_;
        el=Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([label]))])),Default.TR(List.ofArray([Default.TD(List.ofArray([body.Element]))]))]))]));
        Label={
         $:0
        };
        return Runtime.New(Body,{
         Element:el,
         Label:Label
        });
       };
       return Formlet.MapBody(f,formlet);
      },
      WithLabelAndInfo:function(label,info,formlet)
      {
       var lblTbl;
       lblTbl=function()
       {
        var x,_this,_this1;
        x=List.ofArray([Default.Text(label)]);
        _this=Default.Tags();
        _this1=Default.Attr();
        return Utils.InTable(List.ofArray([List.ofArray([_this.NewTag("label",x),Default.Span(List.ofArray([_this1.NewAttr("title",info),Default.Attr().Class("infoIcon")]))])]));
       };
       return Enhance.WithLabel(lblTbl,formlet);
      },
      WithLabelConfiguration:function(lc,formlet)
      {
       var x,l;
       x=Formlet.ApplyLayout(formlet);
       l=Data.Layout().LabelLayout(lc);
       return Formlet.WithLayout(l,x);
      },
      WithLabelLeft:function(formlet)
      {
       var f;
       f=function(body)
       {
        var matchValue,label,_,l,el,Label;
        matchValue=body.Label;
        if(matchValue.$==0)
         {
          _=Default.Span(Runtime.New(T,{
           $:0
          }));
         }
        else
         {
          l=matchValue.$0;
          _=l(null);
         }
        label=_;
        el=Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([body.Element])),Default.TD(List.ofArray([label]))]))]))]));
        Label={
         $:0
        };
        return Runtime.New(Body,{
         Element:el,
         Label:Label
        });
       };
       return Formlet.MapBody(f,formlet);
      },
      WithLegend:function(label,formlet)
      {
       var f;
       f=function(body)
       {
        var x,x1,_this,matchValue,_,label1,_this1,element;
        x1=List.ofArray([Default.Tags().text(label)]);
        _this=Default.Tags();
        matchValue=body.Label;
        if(matchValue.$==0)
         {
          _=body.Element;
         }
        else
         {
          label1=matchValue.$0;
          _=Utils.InTable(List.ofArray([List.ofArray([label1(null),body.Element])]));
         }
        x=List.ofArray([_this.NewTag("legend",x1),_]);
        _this1=Default.Tags();
        element=_this1.NewTag("fieldset",x);
        return Runtime.New(Body,{
         Element:element,
         Label:{
          $:0
         }
        });
       };
       return Formlet.MapBody(f,formlet);
      },
      WithResetAction:function(f,formlet)
      {
       var f1,x,l,x1,x2;
       f1=function()
       {
        var form,notify;
        form=formlet.Build();
        notify=function(o)
        {
         return f(null)?form.Notify.call(null,o):null;
        };
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:notify,
         State:form.State
        });
       };
       x=Formlet.New(f1);
       l=formlet.get_Layout();
       x1=Formlet.WithLayout(l,x);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      WithResetButton:function(formlet)
      {
       return Enhance.WithCustomResetButton(FormButtonConfiguration.get_Default(),formlet);
      },
      WithResetFormlet:function(formlet,reset)
      {
       var formlet1,x,x1,x2,formlet2,button,_builder_,f,formlet3,f2,x3;
       formlet1=Formlet.WithLayoutOrDefault(formlet);
       x=Formlet.ApplyLayout(formlet1);
       x1=Formlet.InitWithFailure(x);
       x2=Formlet.LiftResult(x1);
       formlet2=Formlet.WithNotificationChannel(x2);
       button=Formlet.LiftResult(reset);
       _builder_=Formlet.Do();
       f=function(arg00)
       {
        return Result.Join(arg00);
       };
       formlet3=_builder_.Delay(function()
       {
        return _builder_.Bind(formlet2,Runtime.Tupled(function(_arg1)
        {
         var v,notify;
         v=_arg1[0];
         notify=_arg1[1];
         return _builder_.Bind(button,function(_arg2)
         {
          _arg2.$==0?notify(null):null;
          return _builder_.Return(v);
         });
        }));
       });
       f2=Formlet.MapResult(f,formlet3);
       x3=Data.PropagateRenderFrom(formlet2,f2);
       return Data.OfIFormlet(x3);
      },
      WithRowConfiguration:function(rc,formlet)
      {
       var x,l;
       x=Formlet.ApplyLayout(formlet);
       l=Data.Layout().RowLayout(rc);
       return Formlet.WithLayout(l,x);
      },
      WithSubmitAndReset:function(formlet,submReset)
      {
       var _builder_,f2,formlet3;
       _builder_=Formlet.Do();
       f2=_builder_.Delay(function()
       {
        var formlet1,formlet2;
        formlet1=Formlet.InitWithFailure(formlet);
        formlet2=Formlet.LiftResult(formlet1);
        return _builder_.Bind(Formlet.WithNotificationChannel(formlet2),Runtime.Tupled(function(_arg1)
        {
         var res,notify;
         res=_arg1[0];
         notify=_arg1[1];
         return _builder_.ReturnFrom((submReset(function(arg00)
         {
          return notify(arg00);
         }))(res));
        }));
       });
       formlet3=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet3);
      },
      WithSubmitAndResetButtons:function(formlet)
      {
       var inputRecord,submitConf,inputRecord1,resetConf;
       inputRecord=FormButtonConfiguration.get_Default();
       submitConf=Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Submit"
        },
        Style:inputRecord.Style,
        Class:inputRecord.Class
       });
       inputRecord1=FormButtonConfiguration.get_Default();
       resetConf=Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Reset"
        },
        Style:inputRecord1.Style,
        Class:inputRecord1.Class
       });
       return Enhance.WithCustomSubmitAndResetButtons(submitConf,resetConf,formlet);
      },
      WithSubmitButton:function(formlet)
      {
       return Enhance.WithCustomSubmitButton(FormButtonConfiguration.get_Default(),formlet);
      },
      WithSubmitFormlet:function(formlet,submit)
      {
       var _builder_,f,formlet1,f2,x;
       _builder_=Formlet.Do();
       f=function(arg00)
       {
        return Result.Join(arg00);
       };
       formlet1=_builder_.Delay(function()
       {
        var formlet2;
        formlet2=Formlet.InitWithFailure(formlet);
        return _builder_.Bind(Formlet.LiftResult(formlet2),function(_arg1)
        {
         return _builder_.Bind(submit(_arg1),function()
         {
          return _builder_.Return(_arg1);
         });
        });
       });
       f2=Formlet.MapResult(f,formlet1);
       x=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(x);
      },
      WithTextLabel:function(label,formlet)
      {
       return Enhance.WithLabel(function()
       {
        var x,_this;
        x=List.ofArray([Default.Text(label)]);
        _this=Default.Tags();
        return _this.NewTag("label",x);
       },formlet);
      },
      WithValidationFrame:function(formlet)
      {
       return Enhance.WithCustomValidationFrame(ValidationFrameConfiguration.get_Default(),formlet);
      },
      WithValidationIcon:function(formlet)
      {
       return Enhance.WithCustomValidationIcon(ValidationIconConfiguration.get_Default(),formlet);
      },
      WrapFormlet:function(wrapper,formlet)
      {
       var f;
       f=function()
       {
        var formlet1,form,patternInput,body,panel;
        formlet1=Formlet.WithLayoutOrDefault(formlet);
        form=Formlet.BuildForm(formlet1);
        patternInput=formlet1.get_Layout().Apply.call(null,form.Body).$0;
        patternInput[1];
        body=patternInput[0];
        panel=(wrapper(form.State))(body);
        return[panel,function()
        {
         return form.Notify.call(null,null);
        },form.State];
       };
       return Data.MkFormlet(f);
      }
     },
     Formlet:{
      ApplyLayout:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().ApplyLayout(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Bind:function(fl,f)
      {
       var objectArg,arg10,x1,x2;
       objectArg=Data.BaseFormlet();
       arg10=function(x)
       {
        var y;
        y=f(x);
        return y;
       };
       x1=objectArg.Bind(fl,arg10);
       x2=Data.PropagateRenderFrom(fl,x1);
       return Data.OfIFormlet(x2);
      },
      BindWith:function(compose,formlet,f)
      {
       var objectArg,arg20,x1,x2;
       objectArg=Data.BaseFormlet();
       arg20=function(x)
       {
        return f(x);
       };
       x1=objectArg.BindWith(compose,formlet,arg20);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      BuildForm:function(f)
      {
       return Data.BaseFormlet().BuildForm(f);
      },
      BuildFormlet:function(f)
      {
       return Data.MkFormlet(f);
      },
      Choose:function(fs)
      {
       var count,mapping,fs1,x1,f2,x5,arg00,x6,f3;
       count={
        contents:0
       };
       mapping=function(f)
       {
        var f1,formlet,formlet1;
        f1=function(x)
        {
         Operators1.Increment(count);
         return[x,count.contents];
        };
        formlet=Formlet.Map(f1,f);
        formlet1=Formlet.InitWithFailure(formlet);
        return Formlet.LiftResult(formlet1);
       };
       fs1=Seq.map(mapping,fs);
       x1=Formlet.Sequence(fs1);
       f2=function(xs)
       {
        var chooser,x2,projection,x3,x4,chooser1;
        chooser=function(x)
        {
         var _,v;
         if(x.$==0)
          {
           v=x.$0;
           _={
            $:1,
            $0:v
           };
          }
         else
          {
           _={
            $:0
           };
          }
         return _;
        };
        x2=List.choose(chooser,xs);
        projection=Runtime.Tupled(function(tupledArg)
        {
         var ix;
         tupledArg[0];
         ix=tupledArg[1];
         return ix;
        });
        x3=List.sortBy(projection,x2);
        x4=List.rev(x3);
        chooser1=Runtime.Tupled(function(tupledArg)
        {
         var x;
         x=tupledArg[0];
         tupledArg[1];
         return{
          $:1,
          $0:x
         };
        });
        return Seq.tryPick(chooser1,x4);
       };
       x5=Formlet.Map(f2,x1);
       arg00=function(x)
       {
        return x.$==1;
       };
       x6=Data.Validator().Is(arg00,"",x5);
       f3=function(x)
       {
        return x.$0;
       };
       return Formlet.Map(f3,x6);
      },
      Delay:function(f)
      {
       var formlet;
       formlet=Data.BaseFormlet().Delay(function()
       {
        return f(null);
       });
       return Data.OfIFormlet(formlet);
      },
      Deletable:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().Deletable(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Do:Runtime.Field(function()
      {
       return FormletBuilder.New();
      }),
      Empty:function()
      {
       var formlet;
       formlet=Data.BaseFormlet().Empty();
       return Data.OfIFormlet(formlet);
      },
      FailWith:function(fs)
      {
       var formlet;
       formlet=Data.BaseFormlet().FailWith(fs);
       return Data.OfIFormlet(formlet);
      },
      FlipBody:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().FlipBody(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Flowlet:function(formlet)
      {
       var objectArg,arg00,x,x1;
       objectArg=Data.BaseFormlet();
       arg00=Data.Layout().get_Flowlet();
       x=objectArg.WithLayout(arg00,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      Horizontal:function(formlet)
      {
       var objectArg,arg00,x,x1;
       objectArg=Data.BaseFormlet();
       arg00=Data.Layout().get_Horizontal();
       x=objectArg.WithLayout(arg00,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      InitWith:function(value,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.InitWith(value,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      InitWithFailure:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().InitWithFailure(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Join:function(formlet)
      {
       var f,x,objectArg,x1,x2;
       f=function(f1)
       {
        return f1;
       };
       x=Formlet.Map(f,formlet);
       objectArg=Data.BaseFormlet();
       x1=objectArg.Join(x);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      LiftResult:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().LiftResult(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Map:function(f,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.Map(f,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      MapBody:function(f,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.MapBody(f,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      MapElement:function(f,formlet)
      {
       var objectArg,arg00,f2,formlet1;
       objectArg=Data.BaseFormlet();
       arg00=function(b)
       {
        return Runtime.New(Body,{
         Element:f(b.Element),
         Label:b.Label
        });
       };
       f2=objectArg.MapBody(arg00,formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      MapResult:function(f,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.MapResult(f,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      Never:function()
      {
       var formlet;
       formlet=Data.BaseFormlet().Never();
       return Data.OfIFormlet(formlet);
      },
      New:function(f)
      {
       var formlet;
       formlet=Data.BaseFormlet().New(f);
       return Data.OfIFormlet(formlet);
      },
      OfElement:function(genElem)
      {
       var f;
       f=function()
       {
        var elem;
        elem=genElem(null);
        return[elem,function()
        {
        },Data.RX().Return(Runtime.New(Result,{
         $:0,
         $0:null
        }))];
       };
       return Data.MkFormlet(f);
      },
      Render:function(formlet)
      {
       var f2;
       f2=formlet.Run(function()
       {
       });
       return Data.PropagateRenderFrom(formlet,f2);
      },
      Replace:function(formlet,f)
      {
       var objectArg,arg10,x1,x2;
       objectArg=Data.BaseFormlet();
       arg10=function(x)
       {
        return f(x);
       };
       x1=objectArg.Replace(formlet,arg10);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      ReplaceFirstWithFailure:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().ReplaceFirstWithFailure(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      Return:function(x)
      {
       var formlet;
       formlet=Data.BaseFormlet().Return(x);
       return Data.OfIFormlet(formlet);
      },
      ReturnEmpty:function(x)
      {
       var formlet;
       formlet=Data.BaseFormlet().ReturnEmpty(x);
       return Data.OfIFormlet(formlet);
      },
      Run:function(f,formlet)
      {
       return formlet.Run(f);
      },
      SelectMany:function(formlet)
      {
       var f,x,objectArg,x1,x2;
       f=function(f1)
       {
        return f1;
       };
       x=Formlet.Map(f,formlet);
       objectArg=Data.BaseFormlet();
       x1=objectArg.SelectMany(x);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      Sequence:function(fs)
      {
       var mapping,x1,objectArg,x2;
       mapping=function(x)
       {
        return x;
       };
       x1=Seq.map(mapping,fs);
       objectArg=Data.BaseFormlet();
       x2=objectArg.Sequence(x1);
       return Data.OfIFormlet(x2);
      },
      Switch:function(formlet)
      {
       var f,x,objectArg,x1,x2;
       f=function(f1)
       {
        return f1;
       };
       x=Formlet.Map(f,formlet);
       objectArg=Data.BaseFormlet();
       x1=objectArg.Switch(x);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      Vertical:function(formlet)
      {
       var objectArg,arg00,x,x1;
       objectArg=Data.BaseFormlet();
       arg00=Data.Layout().get_Vertical();
       x=objectArg.WithLayout(arg00,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      WithCancelation:function(formlet,c)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.WithCancelation(formlet,c);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      WithLabel:function(label,formlet)
      {
       var objectArg,arg00,f2,formlet1;
       objectArg=Data.BaseFormlet();
       arg00=function(body)
       {
        return Runtime.New(Body,{
         Element:body.Element,
         Label:label
        });
       };
       f2=objectArg.MapBody(arg00,formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      WithLayout:function(l,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.WithLayout(l,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      WithLayoutOrDefault:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().WithLayoutOrDefault(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      },
      WithNotification:function(c,formlet)
      {
       var objectArg,x,x1;
       objectArg=Data.BaseFormlet();
       x=objectArg.WithNotification(c,formlet);
       x1=Data.PropagateRenderFrom(formlet,x);
       return Data.OfIFormlet(x1);
      },
      WithNotificationChannel:function(formlet)
      {
       var f2,formlet1;
       f2=Data.BaseFormlet().WithNotificationChannel(formlet);
       formlet1=Data.PropagateRenderFrom(formlet,f2);
       return Data.OfIFormlet(formlet1);
      }
     },
     FormletBuilder:Runtime.Class({
      Bind:function(formlet,f)
      {
       var objectArg,arg10,x1,x2;
       objectArg=Data.BaseFormlet();
       arg10=function(x)
       {
        var y;
        y=f(x);
        return y;
       };
       x1=objectArg.Bind(formlet,arg10);
       x2=Data.PropagateRenderFrom(formlet,x1);
       return Data.OfIFormlet(x2);
      },
      Delay:function(f)
      {
       var formlet;
       formlet=Data.BaseFormlet().Delay(function(x)
       {
        return f(x);
       });
       return Data.OfIFormlet(formlet);
      },
      Return:function(x)
      {
       var formlet;
       formlet=Data.BaseFormlet().Return(x);
       return Data.OfIFormlet(formlet);
      },
      ReturnFrom:function(f)
      {
       return Data.OfIFormlet(f);
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Layout:{
      FormRowConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(FormRowConfiguration,{
         Padding:{
          $:0
         },
         Color:{
          $:0
         },
         Class:{
          $:0
         },
         Style:{
          $:0
         },
         LabelConfiguration:{
          $:0
         }
        });
       }
      }),
      LabelConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(LabelConfiguration,{
         Align:{
          $:0
         },
         VerticalAlign:{
          $:1
         },
         Placement:{
          $:0
         }
        });
       }
      }),
      Padding:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(Padding1,{
         Left:{
          $:0
         },
         Right:{
          $:0
         },
         Top:{
          $:0
         },
         Bottom:{
          $:0
         }
        });
       }
      })
     },
     LayoutProvider:Runtime.Class({
      ColumnLayout:function(rowConfig)
      {
       var objectArg,arg00,_this=this;
       objectArg=this.LayoutUtils;
       arg00=function()
       {
        var row,container,store,insert,remove;
        row=Default.TR(Runtime.New(T,{
         $:0
        }));
        container=Default.Table(List.ofArray([Default.TBody(List.ofArray([row]))]));
        store=ElementStore.NewElementStore();
        insert=function(rowIx)
        {
         return function(body)
         {
          var elemId,newCol,jqPanel,index,inserted;
          elemId=body.Element.get_Id();
          newCol=Default.TD(List.ofArray([Default.Table(List.ofArray([Default.TBody(List.ofArray([_this.MakeRow(rowConfig,rowIx,body)]))]))]));
          jqPanel=jQuery(row.get_Body());
          index={
           contents:0
          };
          inserted={
           contents:false
          };
          jqPanel.children().each(function()
          {
           var jqCol,_;
           jqCol=jQuery(this);
           if(rowIx===index.contents)
            {
             jQuery(newCol.get_Body()).insertBefore(jqCol);
             newCol.Render();
             _=void(inserted.contents=true);
            }
           else
            {
             _=null;
            }
           return Operators1.Increment(index);
          });
          !inserted.contents?row.AppendI(newCol):null;
          return store.RegisterElement(elemId,function()
          {
           return newCol["HtmlProvider@33"].Remove(newCol.get_Body());
          });
         };
        };
        remove=function(elems)
        {
         var enumerator,b;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:container,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       };
       return objectArg.New(arg00);
      },
      HorizontalAlignElem:function(align,el)
      {
       var _float,_this,x;
       _float=align.$==0?"left":"right";
       _this=Default.Attr();
       x="float:"+_float+";";
       return Operators.add(Default.Div(List.ofArray([_this.NewAttr("style",x)])),List.ofArray([el]));
      },
      LabelLayout:function(lc)
      {
       var inputRecord,LabelConfiguration1;
       inputRecord=FormRowConfiguration.get_Default();
       LabelConfiguration1={
        $:1,
        $0:lc
       };
       return this.RowLayout(Runtime.New(FormRowConfiguration,{
        Padding:inputRecord.Padding,
        Color:inputRecord.Color,
        Class:inputRecord.Class,
        Style:inputRecord.Style,
        LabelConfiguration:LabelConfiguration1
       }));
      },
      MakeLayout:function(lm)
      {
       var objectArg,arg00;
       objectArg=this.LayoutUtils;
       arg00=function()
       {
        var lm1,store,insert,remove;
        lm1=lm(null);
        store=ElementStore.NewElementStore();
        insert=function(ix)
        {
         return function(bd)
         {
          var elemId,newElems;
          elemId=bd.Element.get_Id();
          newElems=(lm1.Insert.call(null,ix))(bd);
          return store.RegisterElement(elemId,function()
          {
           var enumerator,e;
           enumerator=Enumerator.Get(newElems);
           while(enumerator.MoveNext())
            {
             e=enumerator.get_Current();
             e["HtmlProvider@33"].Remove(e.get_Body());
            }
           return;
          });
         };
        };
        remove=function(elems)
        {
         var enumerator,b;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:lm1.Panel,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       };
       return objectArg.New(arg00);
      },
      MakeRow:function(rowConfig,rowIndex,body)
      {
       var x,d,f,padding,f1,o,paddingLeft,f2,o1,paddingTop,f3,o2,paddingRight,f4,o3,paddingBottom,makeCell,elem1,matchValue,cells,_1,labelGen,x5,d1,f6,labelConf,arg00,arg10,label,matchValue1,_2,x6,x7,x8,d2,f7,rowClass,x9,d3,f8,rowColorStyleProp,xa,d4,f9,rowStyleProp,matchValue2,rowStyle,_3,arg002,_this2,b2,b3,xb;
       x=rowConfig.Padding;
       d=Padding1.get_Default();
       f=function(x1)
       {
        return x1;
       };
       padding=Utils.Maybe(d,f,x);
       f1=function(x1)
       {
        return x1;
       };
       o=padding.Left;
       paddingLeft=Utils.Maybe(0,f1,o);
       f2=function(x1)
       {
        return x1;
       };
       o1=padding.Top;
       paddingTop=Utils.Maybe(0,f2,o1);
       f3=function(x1)
       {
        return x1;
       };
       o2=padding.Right;
       paddingRight=Utils.Maybe(0,f3,o2);
       f4=function(x1)
       {
        return x1;
       };
       o3=padding.Bottom;
       paddingBottom=Utils.Maybe(0,f4,o3);
       makeCell=function(l)
       {
        return function(t)
        {
         return function(r)
         {
          return function(b)
          {
           return function(csp)
           {
            return function(valign)
            {
             return function(elem)
             {
              var x1,mapping,reduction,source,paddingStyle,f5,valignStyle,_this,x3,style,colSpan,_,_this1,a,b1,x4;
              x1=List.ofArray([["padding-left: ",l],["padding-top: ",t],["padding-right: ",r],["padding-bottom: ",b]]);
              mapping=Runtime.Tupled(function(tupledArg)
              {
               var k,v;
               k=tupledArg[0];
               v=tupledArg[1];
               return k+Global.String(v)+"px;";
              });
              reduction=function(x2)
              {
               return function(y)
               {
                return x2+y;
               };
              };
              source=List.map(mapping,x1);
              paddingStyle=Seq.reduce(reduction,source);
              f5=function(valign1)
              {
               var value;
               value=valign1.$==1?"middle":valign1.$==2?"bottom":"top";
               return"vertical-align: "+value+";";
              };
              valignStyle=Utils.Maybe("",f5,valign);
              _this=Default.Attr();
              x3=paddingStyle+";"+valignStyle;
              style=_this.NewAttr("style",x3);
              if(csp)
               {
                _this1=Default.Attr();
                _=List.ofArray([_this1.NewAttr("colspan","2")]);
               }
              else
               {
                _=Runtime.New(T,{
                 $:0
                });
               }
              colSpan=_;
              a=Runtime.New(T,{
               $:1,
               $0:style,
               $1:colSpan
              });
              b1=List.ofArray([elem]);
              x4=List.append(a,b1);
              return Default.TD(x4);
             };
            };
           };
          };
         };
        };
       };
       elem1=body.Element;
       matchValue=body.Label;
       if(matchValue.$==1)
        {
         labelGen=matchValue.$0;
         x5=rowConfig.LabelConfiguration;
         d1=LabelConfiguration.get_Default();
         f6=function(x1)
         {
          return x1;
         };
         labelConf=Utils.Maybe(d1,f6,x5);
         arg00=labelConf.Align;
         arg10=labelGen(null);
         label=this.HorizontalAlignElem(arg00,arg10);
         matchValue1=labelConf.Placement;
         if(matchValue1.$==3)
          {
           x6=Utils.InTable(List.ofArray([List.ofArray([elem1]),List.ofArray([label])]));
           _2=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
            $:0
           }))(x6)]);
          }
         else
          {
           if(matchValue1.$==0)
            {
             _2=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
              $:1,
              $0:labelConf.VerticalAlign
             }))(label),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
              $:0
             }))(elem1)]);
            }
           else
            {
             if(matchValue1.$==1)
              {
               _2=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
                $:1,
                $0:labelConf.VerticalAlign
               }))(elem1),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
                $:0
               }))(label)]);
              }
             else
              {
               x7=Utils.InTable(List.ofArray([List.ofArray([label]),List.ofArray([elem1])]));
               _2=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
                $:0
               }))(x7)]);
              }
            }
          }
         _1=_2;
        }
       else
        {
         _1=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
          $:0
         }))(elem1)]);
        }
       cells=_1;
       x8=rowConfig.Class;
       d2=Runtime.New(T,{
        $:0
       });
       f7=function(classGen)
       {
        var arg001;
        arg001=classGen(rowIndex);
        return List.ofArray([Default.Attr().Class(arg001)]);
       };
       rowClass=Utils.Maybe(d2,f7,x8);
       x9=rowConfig.Color;
       d3=Runtime.New(T,{
        $:0
       });
       f8=function(colGen)
       {
        var col;
        col=colGen(rowIndex);
        return List.ofArray(["background-color: "+col]);
       };
       rowColorStyleProp=Utils.Maybe(d3,f8,x9);
       xa=rowConfig.Style;
       d4=Runtime.New(T,{
        $:0
       });
       f9=function(styleGen)
       {
        return List.ofArray([styleGen(rowIndex)]);
       };
       rowStyleProp=Utils.Maybe(d4,f9,xa);
       matchValue2=List.append(rowColorStyleProp,rowStyleProp);
       if(matchValue2.$==0)
        {
         _3=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         arg002=Seq.reduce(function(x1)
         {
          return function(y)
          {
           return x1+";"+y;
          };
         },matchValue2);
         _this2=Default.Attr();
         _3=List.ofArray([_this2.NewAttr("style",arg002)]);
        }
       rowStyle=_3;
       b2=List.append(rowStyle,cells);
       b3=List.append(rowStyle,b2);
       xb=List.append(rowClass,b3);
       return Default.TR(xb);
      },
      RowLayout:function(rowConfig)
      {
       var objectArg,arg00,_this=this;
       objectArg=this.LayoutUtils;
       arg00=function()
       {
        var panel,container,store,insert,remove;
        panel=Default.TBody(Runtime.New(T,{
         $:0
        }));
        container=Default.Table(List.ofArray([panel]));
        store=ElementStore.NewElementStore();
        insert=function(rowIx)
        {
         return function(body)
         {
          var elemId,row,jqPanel,index,inserted;
          elemId=body.Element.get_Id();
          row=_this.MakeRow(rowConfig,rowIx,body);
          jqPanel=jQuery(panel.get_Body());
          index={
           contents:0
          };
          inserted={
           contents:false
          };
          jqPanel.children().each(function()
          {
           var jqRow,_;
           jqRow=jQuery(this);
           if(rowIx===index.contents)
            {
             jQuery(row.get_Body()).insertBefore(jqRow);
             row.Render();
             _=void(inserted.contents=true);
            }
           else
            {
             _=null;
            }
           return Operators1.Increment(index);
          });
          !inserted.contents?panel.AppendI(row):null;
          return store.RegisterElement(elemId,function()
          {
           return row["HtmlProvider@33"].Remove(row.get_Body());
          });
         };
        };
        remove=function(elems)
        {
         var enumerator,b;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           b=enumerator.get_Current();
           store.Remove(b.Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:container,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       };
       return objectArg.New(arg00);
      },
      VerticalAlignedTD:function(valign,elem)
      {
       var valign1,cell,objectArg,arg00;
       valign1=valign.$==1?"middle":valign.$==2?"bottom":"top";
       cell=Default.TD(List.ofArray([elem]));
       objectArg=cell["HtmlProvider@33"];
       arg00=cell.get_Body();
       objectArg.SetCss(arg00,"vertical-align",valign1);
       return cell;
      },
      get_Flowlet:function()
      {
       var lm;
       lm=function()
       {
        var panel,insert;
        panel=Default.Div(Runtime.New(T,{
         $:0
        }));
        insert=function()
        {
         return function(bd)
         {
          var label,nextScreen;
          label=bd.Label.$==1?bd.Label.$0.call(null,null):Default.Span(Runtime.New(T,{
           $:0
          }));
          nextScreen=Utils.InTable(List.ofArray([List.ofArray([label,Default.Div(List.ofArray([bd.Element]))])]));
          panel["HtmlProvider@33"].Clear(panel.get_Body());
          panel.AppendI(nextScreen);
          return List.ofArray([nextScreen]);
         };
        };
        return{
         Insert:insert,
         Panel:panel
        };
       };
       return this.MakeLayout(lm);
      },
      get_Horizontal:function()
      {
       return this.ColumnLayout(FormRowConfiguration.get_Default());
      },
      get_Vertical:function()
      {
       return this.RowLayout(FormRowConfiguration.get_Default());
      }
     },{
      New:function(LayoutUtils1)
      {
       var r;
       r=Runtime.New(this,{});
       r.LayoutUtils=LayoutUtils1;
       return r;
      }
     }),
     Utils:{
      InTable:function(rows)
      {
       var mapping,rs,tb;
       mapping=function(cols)
       {
        var mapping1,xs;
        mapping1=function(c)
        {
         return Default.TD(List.ofArray([c]));
        };
        xs=List.map(mapping1,cols);
        return Default.TR(xs);
       };
       rs=List.map(mapping,rows);
       tb=Default.TBody(rs);
       return Default.Table(List.ofArray([tb]));
      },
      MapOption:function(f,value)
      {
       var _,v;
       if(value.$==1)
        {
         v=value.$0;
         _={
          $:1,
          $0:f(v)
         };
        }
       else
        {
         _={
          $:0
         };
        }
       return _;
      },
      Maybe:function(d,f,o)
      {
       var _,x;
       if(o.$==0)
        {
         _=d;
        }
       else
        {
         x=o.$0;
         _=f(x);
        }
       return _;
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Formlets=Runtime.Safe(WebSharper.Formlets);
  Body=Runtime.Safe(Formlets.Body);
  Html=Runtime.Safe(WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Default=Runtime.Safe(Client.Default);
  List=Runtime.Safe(WebSharper.List);
  Controls=Runtime.Safe(Formlets.Controls);
  Reactive=Runtime.Safe(Global.IntelliFactory.Reactive);
  HotStream=Runtime.Safe(Reactive.HotStream);
  Formlets1=Runtime.Safe(Global.IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets1.Base);
  Result=Runtime.Safe(Base.Result);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(Client.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Data=Runtime.Safe(Formlets.Data);
  Formlet=Runtime.Safe(Formlets.Formlet);
  Operators1=Runtime.Safe(WebSharper.Operators);
  CssConstants=Runtime.Safe(Formlets.CssConstants);
  Math=Runtime.Safe(Global.Math);
  Seq=Runtime.Safe(WebSharper.Seq);
  Utils=Runtime.Safe(Formlets.Utils);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Form=Runtime.Safe(Base.Form);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  FormletProvider=Runtime.Safe(Base.FormletProvider);
  Formlet1=Runtime.Safe(Data.Formlet);
  Pagelet=Runtime.Safe(Client.Pagelet);
  Util=Runtime.Safe(WebSharper.Util);
  LayoutProvider=Runtime.Safe(Formlets.LayoutProvider);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Validator=Runtime.Safe(Base.Validator);
  ValidatorProvidor=Runtime.Safe(Data.ValidatorProvidor);
  RegExp=Runtime.Safe(Global.RegExp);
  Collections=Runtime.Safe(WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  ElementStore=Runtime.Safe(Formlets.ElementStore);
  Enhance=Runtime.Safe(Formlets.Enhance);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  Padding=Runtime.Safe(Enhance.Padding);
  ManyConfiguration=Runtime.Safe(Enhance.ManyConfiguration);
  ValidationFrameConfiguration=Runtime.Safe(Enhance.ValidationFrameConfiguration);
  ValidationIconConfiguration=Runtime.Safe(Enhance.ValidationIconConfiguration);
  JSON=Runtime.Safe(Global.JSON);
  FormletBuilder=Runtime.Safe(Formlets.FormletBuilder);
  Layout=Runtime.Safe(Formlets.Layout);
  FormRowConfiguration=Runtime.Safe(Layout.FormRowConfiguration);
  LabelConfiguration=Runtime.Safe(Layout.LabelConfiguration);
  Padding1=Runtime.Safe(Layout.Padding);
  return Enumerator=Runtime.Safe(WebSharper.Enumerator);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Formlet1,Pagelet);
  Formlet.Do();
  Data.Validator();
  Data.RX();
  Data.Layout();
  Data.DefaultLayout();
  CssConstants.InputTextClass();
  return;
 });
}());

/*! Babylon 2014-06-24 */
var BABYLON;!function(a){var b=function(){function a(a,b,c){"undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=0),this.r=a,this.g=b,this.b=c}return a.prototype.toString=function(){return"{R: "+this.r+" G:"+this.g+" B:"+this.b+"}"},a.prototype.toArray=function(a,b){void 0===b&&(b=0),a[b]=this.r,a[b+1]=this.g,a[b+2]=this.b},a.prototype.asArray=function(){var a=[];return this.toArray(a,0),a},a.prototype.multiply=function(b){return new a(this.r*b.r,this.g*b.g,this.b*b.b)},a.prototype.multiplyToRef=function(a,b){b.r=this.r*a.r,b.g=this.g*a.g,b.b=this.b*a.b},a.prototype.equals=function(a){return a&&this.r===a.r&&this.g===a.g&&this.b===a.b},a.prototype.scale=function(b){return new a(this.r*b,this.g*b,this.b*b)},a.prototype.scaleToRef=function(a,b){b.r=this.r*a,b.g=this.g*a,b.b=this.b*a},a.prototype.add=function(b){return new a(this.r+b.r,this.g+b.g,this.b+b.b)},a.prototype.addToRef=function(a,b){b.r=this.r+a.r,b.g=this.g+a.g,b.b=this.b+a.b},a.prototype.subtract=function(b){return new a(this.r-b.r,this.g-b.g,this.b-b.b)},a.prototype.subtractToRef=function(a,b){b.r=this.r-a.r,b.g=this.g-a.g,b.b=this.b-a.b},a.prototype.clone=function(){return new a(this.r,this.g,this.b)},a.prototype.copyFrom=function(a){this.r=a.r,this.g=a.g,this.b=a.b},a.prototype.copyFromFloats=function(a,b,c){this.r=a,this.g=b,this.b=c},a.FromArray=function(b){return new a(b[0],b[1],b[2])},a.FromInts=function(b,c,d){return new a(b/255,c/255,d/255)},a.Lerp=function(b,c,d){var e=b.r+(c.r-b.r)*d,f=b.g+(c.g-b.g)*d,g=b.b+(c.b-b.b)*d;return new a(e,f,g)},a.Red=function(){return new a(1,0,0)},a.Green=function(){return new a(0,1,0)},a.Blue=function(){return new a(0,0,1)},a.Black=function(){return new a(0,0,0)},a.White=function(){return new a(1,1,1)},a.Purple=function(){return new a(.5,0,.5)},a.Magenta=function(){return new a(1,0,1)},a.Yellow=function(){return new a(1,1,0)},a.Gray=function(){return new a(.5,.5,.5)},a}();a.Color3=b;var c=function(){function b(a,b,c,d){this.r=a,this.g=b,this.b=c,this.a=d}return b.prototype.addInPlace=function(a){this.r+=a.r,this.g+=a.g,this.b+=a.b,this.a+=a.a},b.prototype.asArray=function(){var a=[];return this.toArray(a,0),a},b.prototype.toArray=function(a,b){void 0===b&&(b=0),a[b]=this.r,a[b+1]=this.g,a[b+2]=this.b,a[b+3]=this.a},b.prototype.add=function(a){return new b(this.r+a.r,this.g+a.g,this.b+a.b,this.a+a.a)},b.prototype.subtract=function(a){return new b(this.r-a.r,this.g-a.g,this.b-a.b,this.a-a.a)},b.prototype.subtractToRef=function(a,b){b.r=this.r-a.r,b.g=this.g-a.g,b.b=this.b-a.b,b.a=this.a-a.a},b.prototype.scale=function(a){return new b(this.r*a,this.g*a,this.b*a,this.a*a)},b.prototype.scaleToRef=function(a,b){b.r=this.r*a,b.g=this.g*a,b.b=this.b*a,b.a=this.a*a},b.prototype.toString=function(){return"{R: "+this.r+" G:"+this.g+" B:"+this.b+" A:"+this.a+"}"},b.prototype.clone=function(){return new b(this.r,this.g,this.b,this.a)},b.Lerp=function(c,d,e){var f=new b(0,0,0,0);return a.Color4.LerpToRef(c,d,e,f),f},b.LerpToRef=function(a,b,c,d){d.r=a.r+(b.r-a.r)*c,d.g=a.g+(b.g-a.g)*c,d.b=a.b+(b.b-a.b)*c,d.a=a.a+(b.a-a.a)*c},b.FromArray=function(a,c){return c||(c=0),new b(a[c],a[c+1],a[c+2],a[c+3])},b.FromInts=function(a,c,d,e){return new b(a/255,c/255,d/255,e/255)},b}();a.Color4=c;var d=function(){function a(a,b){this.x=a,this.y=b}return a.prototype.toString=function(){return"{X: "+this.x+" Y:"+this.y+"}"},a.prototype.toArray=function(a,b){void 0===b&&(b=0),a[b]=this.x,a[b+1]=this.y},a.prototype.asArray=function(){var a=[];return this.toArray(a,0),a},a.prototype.copyFrom=function(a){this.x=a.x,this.y=a.y},a.prototype.add=function(b){return new a(this.x+b.x,this.y+b.y)},a.prototype.subtract=function(b){return new a(this.x-b.x,this.y-b.y)},a.prototype.negate=function(){return new a(-this.x,-this.y)},a.prototype.scaleInPlace=function(a){this.x*=a,this.y*=a},a.prototype.scale=function(b){return new a(this.x*b,this.y*b)},a.prototype.equals=function(a){return a&&this.x===a.x&&this.y===a.y},a.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},a.prototype.lengthSquared=function(){return this.x*this.x+this.y*this.y},a.prototype.normalize=function(){var a=this.length();if(0!==a){var b=1/a;this.x*=b,this.y*=b}},a.prototype.clone=function(){return new a(this.x,this.y)},a.Zero=function(){return new a(0,0)},a.CatmullRom=function(b,c,d,e,f){var g=f*f,h=f*g,i=.5*(2*c.x+(-b.x+d.x)*f+(2*b.x-5*c.x+4*d.x-e.x)*g+(-b.x+3*c.x-3*d.x+e.x)*h),j=.5*(2*c.y+(-b.y+d.y)*f+(2*b.y-5*c.y+4*d.y-e.y)*g+(-b.y+3*c.y-3*d.y+e.y)*h);return new a(i,j)},a.Clamp=function(b,c,d){var e=b.x;e=e>d.x?d.x:e,e=e<c.x?c.x:e;var f=b.y;return f=f>d.y?d.y:f,f=f<c.y?c.y:f,new a(e,f)},a.Hermite=function(b,c,d,e,f){var g=f*f,h=f*g,i=2*h-3*g+1,j=-2*h+3*g,k=h-2*g+f,l=h-g,m=b.x*i+d.x*j+c.x*k+e.x*l,n=b.y*i+d.y*j+c.y*k+e.y*l;return new a(m,n)},a.Lerp=function(b,c,d){var e=b.x+(c.x-b.x)*d,f=b.y+(c.y-b.y)*d;return new a(e,f)},a.Dot=function(a,b){return a.x*b.x+a.y*b.y},a.Normalize=function(a){var b=a.clone();return b.normalize(),b},a.Minimize=function(b,c){var d=b.x<c.x?b.x:c.x,e=b.y<c.y?b.y:c.y;return new a(d,e)},a.Maximize=function(b,c){var d=b.x>c.x?b.x:c.x,e=b.y>c.y?b.y:c.y;return new a(d,e)},a.Transform=function(b,c){var d=b.x*c.m[0]+b.y*c.m[4],e=b.x*c.m[1]+b.y*c.m[5];return new a(d,e)},a.Distance=function(b,c){return Math.sqrt(a.DistanceSquared(b,c))},a.DistanceSquared=function(a,b){var c=a.x-b.x,d=a.y-b.y;return c*c+d*d},a}();a.Vector2=d;var e=function(){function b(a,b,c){this.x=a,this.y=b,this.z=c}return b.prototype.toString=function(){return"{X: "+this.x+" Y:"+this.y+" Z:"+this.z+"}"},b.prototype.asArray=function(){var a=[];return this.toArray(a,0),a},b.prototype.toArray=function(a,b){void 0===b&&(b=0),a[b]=this.x,a[b+1]=this.y,a[b+2]=this.z},b.prototype.addInPlace=function(a){this.x+=a.x,this.y+=a.y,this.z+=a.z},b.prototype.add=function(a){return new b(this.x+a.x,this.y+a.y,this.z+a.z)},b.prototype.addToRef=function(a,b){b.x=this.x+a.x,b.y=this.y+a.y,b.z=this.z+a.z},b.prototype.subtractInPlace=function(a){this.x-=a.x,this.y-=a.y,this.z-=a.z},b.prototype.subtract=function(a){return new b(this.x-a.x,this.y-a.y,this.z-a.z)},b.prototype.subtractToRef=function(a,b){b.x=this.x-a.x,b.y=this.y-a.y,b.z=this.z-a.z},b.prototype.subtractFromFloats=function(a,c,d){return new b(this.x-a,this.y-c,this.z-d)},b.prototype.subtractFromFloatsToRef=function(a,b,c,d){d.x=this.x-a,d.y=this.y-b,d.z=this.z-c},b.prototype.negate=function(){return new b(-this.x,-this.y,-this.z)},b.prototype.scaleInPlace=function(a){this.x*=a,this.y*=a,this.z*=a},b.prototype.scale=function(a){return new b(this.x*a,this.y*a,this.z*a)},b.prototype.scaleToRef=function(a,b){b.x=this.x*a,b.y=this.y*a,b.z=this.z*a},b.prototype.equals=function(a){return a&&this.x===a.x&&this.y===a.y&&this.z===a.z},b.prototype.equalsToFloats=function(a,b,c){return this.x===a&&this.y===b&&this.z===c},b.prototype.multiplyInPlace=function(a){this.x*=a.x,this.y*=a.y,this.z*=a.z},b.prototype.multiply=function(a){return new b(this.x*a.x,this.y*a.y,this.z*a.z)},b.prototype.multiplyToRef=function(a,b){b.x=this.x*a.x,b.y=this.y*a.y,b.z=this.z*a.z},b.prototype.multiplyByFloats=function(a,c,d){return new b(this.x*a,this.y*c,this.z*d)},b.prototype.divide=function(a){return new b(this.x/a.x,this.y/a.y,this.z/a.z)},b.prototype.divideToRef=function(a,b){b.x=this.x/a.x,b.y=this.y/a.y,b.z=this.z/a.z},b.prototype.MinimizeInPlace=function(a){a.x<this.x&&(this.x=a.x),a.y<this.y&&(this.y=a.y),a.z<this.z&&(this.z=a.z)},b.prototype.MaximizeInPlace=function(a){a.x>this.x&&(this.x=a.x),a.y>this.y&&(this.y=a.y),a.z>this.z&&(this.z=a.z)},b.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},b.prototype.lengthSquared=function(){return this.x*this.x+this.y*this.y+this.z*this.z},b.prototype.normalize=function(){var a=this.length();if(0!==a){var b=1/a;this.x*=b,this.y*=b,this.z*=b}},b.prototype.clone=function(){return new b(this.x,this.y,this.z)},b.prototype.copyFrom=function(a){this.x=a.x,this.y=a.y,this.z=a.z},b.prototype.copyFromFloats=function(a,b,c){this.x=a,this.y=b,this.z=c},b.FromArray=function(a,c){return c||(c=0),new b(a[c],a[c+1],a[c+2])},b.FromArrayToRef=function(a,b,c){c.x=a[b],c.y=a[b+1],c.z=a[b+2]},b.FromFloatArrayToRef=function(a,b,c){c.x=a[b],c.y=a[b+1],c.z=a[b+2]},b.FromFloatsToRef=function(a,b,c,d){d.x=a,d.y=b,d.z=c},b.Zero=function(){return new b(0,0,0)},b.Up=function(){return new b(0,1,0)},b.TransformCoordinates=function(a,c){var d=b.Zero();return b.TransformCoordinatesToRef(a,c,d),d},b.TransformCoordinatesToRef=function(a,b,c){var d=a.x*b.m[0]+a.y*b.m[4]+a.z*b.m[8]+b.m[12],e=a.x*b.m[1]+a.y*b.m[5]+a.z*b.m[9]+b.m[13],f=a.x*b.m[2]+a.y*b.m[6]+a.z*b.m[10]+b.m[14],g=a.x*b.m[3]+a.y*b.m[7]+a.z*b.m[11]+b.m[15];c.x=d/g,c.y=e/g,c.z=f/g},b.TransformCoordinatesFromFloatsToRef=function(a,b,c,d,e){var f=a*d.m[0]+b*d.m[4]+c*d.m[8]+d.m[12],g=a*d.m[1]+b*d.m[5]+c*d.m[9]+d.m[13],h=a*d.m[2]+b*d.m[6]+c*d.m[10]+d.m[14],i=a*d.m[3]+b*d.m[7]+c*d.m[11]+d.m[15];e.x=f/i,e.y=g/i,e.z=h/i},b.TransformNormal=function(a,c){var d=b.Zero();return b.TransformNormalToRef(a,c,d),d},b.TransformNormalToRef=function(a,b,c){c.x=a.x*b.m[0]+a.y*b.m[4]+a.z*b.m[8],c.y=a.x*b.m[1]+a.y*b.m[5]+a.z*b.m[9],c.z=a.x*b.m[2]+a.y*b.m[6]+a.z*b.m[10]},b.TransformNormalFromFloatsToRef=function(a,b,c,d,e){e.x=a*d.m[0]+b*d.m[4]+c*d.m[8],e.y=a*d.m[1]+b*d.m[5]+c*d.m[9],e.z=a*d.m[2]+b*d.m[6]+c*d.m[10]},b.CatmullRom=function(a,c,d,e,f){var g=f*f,h=f*g,i=.5*(2*c.x+(-a.x+d.x)*f+(2*a.x-5*c.x+4*d.x-e.x)*g+(-a.x+3*c.x-3*d.x+e.x)*h),j=.5*(2*c.y+(-a.y+d.y)*f+(2*a.y-5*c.y+4*d.y-e.y)*g+(-a.y+3*c.y-3*d.y+e.y)*h),k=.5*(2*c.z+(-a.z+d.z)*f+(2*a.z-5*c.z+4*d.z-e.z)*g+(-a.z+3*c.z-3*d.z+e.z)*h);return new b(i,j,k)},b.Clamp=function(a,c,d){var e=a.x;e=e>d.x?d.x:e,e=e<c.x?c.x:e;var f=a.y;f=f>d.y?d.y:f,f=f<c.y?c.y:f;var g=a.z;return g=g>d.z?d.z:g,g=g<c.z?c.z:g,new b(e,f,g)},b.Hermite=function(a,c,d,e,f){var g=f*f,h=f*g,i=2*h-3*g+1,j=-2*h+3*g,k=h-2*g+f,l=h-g,m=a.x*i+d.x*j+c.x*k+e.x*l,n=a.y*i+d.y*j+c.y*k+e.y*l,o=a.z*i+d.z*j+c.z*k+e.z*l;return new b(m,n,o)},b.Lerp=function(a,c,d){var e=a.x+(c.x-a.x)*d,f=a.y+(c.y-a.y)*d,g=a.z+(c.z-a.z)*d;return new b(e,f,g)},b.Dot=function(a,b){return a.x*b.x+a.y*b.y+a.z*b.z},b.Cross=function(a,c){var d=b.Zero();return b.CrossToRef(a,c,d),d},b.CrossToRef=function(a,b,c){c.x=a.y*b.z-a.z*b.y,c.y=a.z*b.x-a.x*b.z,c.z=a.x*b.y-a.y*b.x},b.Normalize=function(a){var c=b.Zero();return b.NormalizeToRef(a,c),c},b.NormalizeToRef=function(a,b){b.copyFrom(a),b.normalize()},b.Project=function(c,d,e,f){var g=f.width,h=f.height,i=f.x,j=f.y,k=a.Matrix.FromValues(g/2,0,0,0,0,-h/2,0,0,0,0,1,0,i+g/2,h/2+j,0,1),l=d.multiply(e).multiply(k);return b.TransformCoordinates(c,l)},b.Unproject=function(b,c,d,e,f,g){var h=e.multiply(f).multiply(g);h.invert(),b.x=b.x/c*2-1,b.y=-(b.y/d*2-1);var i=a.Vector3.TransformCoordinates(b,h),j=b.x*h.m[3]+b.y*h.m[7]+b.z*h.m[11]+h.m[15];return a.Tools.WithinEpsilon(j,1)&&(i=i.scale(1/j)),i},b.Minimize=function(a,b){var c=a.clone();return c.MinimizeInPlace(b),c},b.Maximize=function(a,b){var c=a.clone();return c.MaximizeInPlace(b),c},b.Distance=function(a,c){return Math.sqrt(b.DistanceSquared(a,c))},b.DistanceSquared=function(a,b){var c=a.x-b.x,d=a.y-b.y,e=a.z-b.z;return c*c+d*d+e*e},b.Center=function(a,b){var c=a.add(b);return c.scaleInPlace(.5),c},b}();a.Vector3=e;var f=function(){function a(a,b,c,d){"undefined"==typeof a&&(a=0),"undefined"==typeof b&&(b=0),"undefined"==typeof c&&(c=0),"undefined"==typeof d&&(d=0),this.x=a,this.y=b,this.z=c,this.w=d}return a.prototype.toString=function(){return"{X: "+this.x+" Y:"+this.y+" Z:"+this.z+" W:"+this.w+"}"},a.prototype.asArray=function(){return[this.x,this.y,this.z,this.w]},a.prototype.equals=function(a){return a&&this.x===a.x&&this.y===a.y&&this.z===a.z&&this.w===a.w},a.prototype.clone=function(){return new a(this.x,this.y,this.z,this.w)},a.prototype.copyFrom=function(a){this.x=a.x,this.y=a.y,this.z=a.z,this.w=a.w},a.prototype.add=function(b){return new a(this.x+b.x,this.y+b.y,this.z+b.z,this.w+b.w)},a.prototype.subtract=function(b){return new a(this.x-b.x,this.y-b.y,this.z-b.z,this.w-b.w)},a.prototype.scale=function(b){return new a(this.x*b,this.y*b,this.z*b,this.w*b)},a.prototype.multiply=function(b){var c=new a(0,0,0,1);return this.multiplyToRef(b,c),c},a.prototype.multiplyToRef=function(a,b){b.x=this.x*a.w+this.y*a.z-this.z*a.y+this.w*a.x,b.y=-this.x*a.z+this.y*a.w+this.z*a.x+this.w*a.y,b.z=this.x*a.y-this.y*a.x+this.z*a.w+this.w*a.z,b.w=-this.x*a.x-this.y*a.y-this.z*a.z+this.w*a.w},a.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},a.prototype.normalize=function(){var a=1/this.length();this.x*=a,this.y*=a,this.z*=a,this.w*=a},a.prototype.toEulerAngles=function(){var a=this.x,b=this.y,c=this.z,d=this.w,f=a*a,g=b*b,h=c*c,i=Math.atan2(2*(b*d-a*c),1-2*(g+h)),j=Math.asin(2*(a*b+c*d)),k=Math.atan2(2*(a*d-b*c),1-2*(f+h)),l=a*b+c*d;return l>.499?(i=2*Math.atan2(a,d),k=0):-.499>l&&(i=-2*Math.atan2(a,d),k=0),new e(j,i,k)},a.prototype.toRotationMatrix=function(a){var b=this.x*this.x,c=this.y*this.y,d=this.z*this.z,e=this.x*this.y,f=this.z*this.w,g=this.z*this.x,h=this.y*this.w,i=this.y*this.z,j=this.x*this.w;a.m[0]=1-2*(c+d),a.m[1]=2*(e+f),a.m[2]=2*(g-h),a.m[3]=0,a.m[4]=2*(e-f),a.m[5]=1-2*(d+b),a.m[6]=2*(i+j),a.m[7]=0,a.m[8]=2*(g+h),a.m[9]=2*(i-j),a.m[10]=1-2*(c+b),a.m[11]=0,a.m[12]=0,a.m[13]=0,a.m[14]=0,a.m[15]=1},a.RotationAxis=function(b,c){var d=new a,e=Math.sin(c/2);return d.w=Math.cos(c/2),d.x=b.x*e,d.y=b.y*e,d.z=b.z*e,d},a.FromArray=function(b,c){return c||(c=0),new a(b[c],b[c+1],b[c+2],b[c+3])},a.RotationYawPitchRoll=function(b,c,d){var e=new a;return a.RotationYawPitchRollToRef(b,c,d,e),e},a.RotationYawPitchRollToRef=function(a,b,c,d){var e=.5*c,f=.5*b,g=.5*a,h=Math.sin(e),i=Math.cos(e),j=Math.sin(f),k=Math.cos(f),l=Math.sin(g),m=Math.cos(g);d.x=m*j*i+l*k*h,d.y=l*k*i-m*j*h,d.z=m*k*h-l*j*i,d.w=m*k*i+l*j*h},a.Slerp=function(b,c,d){var e,f,g=d,h=b.x*c.x+b.y*c.y+b.z*c.z+b.w*c.w,i=!1;if(0>h&&(i=!0,h=-h),h>.999999)f=1-g,e=i?-g:g;else{var j=Math.acos(h),k=1/Math.sin(j);f=Math.sin((1-g)*j)*k,e=i?-Math.sin(g*j)*k:Math.sin(g*j)*k}return new a(f*b.x+e*c.x,f*b.y+e*c.y,f*b.z+e*c.z,f*b.w+e*c.w)},a}();a.Quaternion=f;var g=function(){function a(){this.m=new Float32Array(16)}return a.prototype.isIdentity=function(){return 1!=this.m[0]||1!=this.m[5]||1!=this.m[10]||1!=this.m[15]?!1:0!=this.m[1]||0!=this.m[2]||0!=this.m[3]||0!=this.m[4]||0!=this.m[6]||0!=this.m[7]||0!=this.m[8]||0!=this.m[9]||0!=this.m[11]||0!=this.m[12]||0!=this.m[13]||0!=this.m[14]?!1:!0},a.prototype.determinant=function(){var a=this.m[10]*this.m[15]-this.m[11]*this.m[14],b=this.m[9]*this.m[15]-this.m[11]*this.m[13],c=this.m[9]*this.m[14]-this.m[10]*this.m[13],d=this.m[8]*this.m[15]-this.m[11]*this.m[12],e=this.m[8]*this.m[14]-this.m[10]*this.m[12],f=this.m[8]*this.m[13]-this.m[9]*this.m[12];return this.m[0]*(this.m[5]*a-this.m[6]*b+this.m[7]*c)-this.m[1]*(this.m[4]*a-this.m[6]*d+this.m[7]*e)+this.m[2]*(this.m[4]*b-this.m[5]*d+this.m[7]*f)-this.m[3]*(this.m[4]*c-this.m[5]*e+this.m[6]*f)},a.prototype.toArray=function(){return this.m},a.prototype.asArray=function(){return this.toArray()},a.prototype.invert=function(){this.invertToRef(this)},a.prototype.invertToRef=function(a){var b=this.m[0],c=this.m[1],d=this.m[2],e=this.m[3],f=this.m[4],g=this.m[5],h=this.m[6],i=this.m[7],j=this.m[8],k=this.m[9],l=this.m[10],m=this.m[11],n=this.m[12],o=this.m[13],p=this.m[14],q=this.m[15],r=l*q-m*p,s=k*q-m*o,t=k*p-l*o,u=j*q-m*n,v=j*p-l*n,w=j*o-k*n,x=g*r-h*s+i*t,y=-(f*r-h*u+i*v),z=f*s-g*u+i*w,A=-(f*t-g*v+h*w),B=1/(b*x+c*y+d*z+e*A),C=h*q-i*p,D=g*q-i*o,E=g*p-h*o,F=f*q-i*n,G=f*p-h*n,H=f*o-g*n,I=h*m-i*l,J=g*m-i*k,K=g*l-h*k,L=f*m-i*j,M=f*l-h*j,N=f*k-g*j;a.m[0]=x*B,a.m[4]=y*B,a.m[8]=z*B,a.m[12]=A*B,a.m[1]=-(c*r-d*s+e*t)*B,a.m[5]=(b*r-d*u+e*v)*B,a.m[9]=-(b*s-c*u+e*w)*B,a.m[13]=(b*t-c*v+d*w)*B,a.m[2]=(c*C-d*D+e*E)*B,a.m[6]=-(b*C-d*F+e*G)*B,a.m[10]=(b*D-c*F+e*H)*B,a.m[14]=-(b*E-c*G+d*H)*B,a.m[3]=-(c*I-d*J+e*K)*B,a.m[7]=(b*I-d*L+e*M)*B,a.m[11]=-(b*J-c*L+e*N)*B,a.m[15]=(b*K-c*M+d*N)*B},a.prototype.setTranslation=function(a){this.m[12]=a.x,this.m[13]=a.y,this.m[14]=a.z},a.prototype.multiply=function(b){var c=new a;return this.multiplyToRef(b,c),c},a.prototype.copyFrom=function(a){for(var b=0;16>b;b++)this.m[b]=a.m[b]},a.prototype.copyToArray=function(a,b){"undefined"==typeof b&&(b=0);for(var c=0;16>c;c++)a[b+c]=this.m[c]},a.prototype.multiplyToRef=function(a,b){this.multiplyToArray(a,b.m,0)},a.prototype.multiplyToArray=function(a,b,c){var d=this.m[0],e=this.m[1],f=this.m[2],g=this.m[3],h=this.m[4],i=this.m[5],j=this.m[6],k=this.m[7],l=this.m[8],m=this.m[9],n=this.m[10],o=this.m[11],p=this.m[12],q=this.m[13],r=this.m[14],s=this.m[15],t=a.m[0],u=a.m[1],v=a.m[2],w=a.m[3],x=a.m[4],y=a.m[5],z=a.m[6],A=a.m[7],B=a.m[8],C=a.m[9],D=a.m[10],E=a.m[11],F=a.m[12],G=a.m[13],H=a.m[14],I=a.m[15];b[c]=d*t+e*x+f*B+g*F,b[c+1]=d*u+e*y+f*C+g*G,b[c+2]=d*v+e*z+f*D+g*H,b[c+3]=d*w+e*A+f*E+g*I,b[c+4]=h*t+i*x+j*B+k*F,b[c+5]=h*u+i*y+j*C+k*G,b[c+6]=h*v+i*z+j*D+k*H,b[c+7]=h*w+i*A+j*E+k*I,b[c+8]=l*t+m*x+n*B+o*F,b[c+9]=l*u+m*y+n*C+o*G,b[c+10]=l*v+m*z+n*D+o*H,b[c+11]=l*w+m*A+n*E+o*I,b[c+12]=p*t+q*x+r*B+s*F,b[c+13]=p*u+q*y+r*C+s*G,b[c+14]=p*v+q*z+r*D+s*H,b[c+15]=p*w+q*A+r*E+s*I},a.prototype.equals=function(a){return a&&this.m[0]===a.m[0]&&this.m[1]===a.m[1]&&this.m[2]===a.m[2]&&this.m[3]===a.m[3]&&this.m[4]===a.m[4]&&this.m[5]===a.m[5]&&this.m[6]===a.m[6]&&this.m[7]===a.m[7]&&this.m[8]===a.m[8]&&this.m[9]===a.m[9]&&this.m[10]===a.m[10]&&this.m[11]===a.m[11]&&this.m[12]===a.m[12]&&this.m[13]===a.m[13]&&this.m[14]===a.m[14]&&this.m[15]===a.m[15]},a.prototype.clone=function(){return a.FromValues(this.m[0],this.m[1],this.m[2],this.m[3],this.m[4],this.m[5],this.m[6],this.m[7],this.m[8],this.m[9],this.m[10],this.m[11],this.m[12],this.m[13],this.m[14],this.m[15])},a.FromArray=function(b,c){var d=new a;return c||(c=0),a.FromArrayToRef(b,c,d),d},a.FromArrayToRef=function(a,b,c){for(var d=0;16>d;d++)c.m[d]=a[d+b]},a.FromValuesToRef=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){q.m[0]=a,q.m[1]=b,q.m[2]=c,q.m[3]=d,q.m[4]=e,q.m[5]=f,q.m[6]=g,q.m[7]=h,q.m[8]=i,q.m[9]=j,q.m[10]=k,q.m[11]=l,q.m[12]=m,q.m[13]=n,q.m[14]=o,q.m[15]=p},a.FromValues=function(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=new a;return r.m[0]=b,r.m[1]=c,r.m[2]=d,r.m[3]=e,r.m[4]=f,r.m[5]=g,r.m[6]=h,r.m[7]=i,r.m[8]=j,r.m[9]=k,r.m[10]=l,r.m[11]=m,r.m[12]=n,r.m[13]=o,r.m[14]=p,r.m[15]=q,r},a.Identity=function(){return a.FromValues(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},a.IdentityToRef=function(b){a.FromValuesToRef(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,b)},a.Zero=function(){return a.FromValues(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)},a.RotationX=function(b){var c=new a;return a.RotationXToRef(b,c),c},a.RotationXToRef=function(a,b){var c=Math.sin(a),d=Math.cos(a);b.m[0]=1,b.m[15]=1,b.m[5]=d,b.m[10]=d,b.m[9]=-c,b.m[6]=c,b.m[1]=0,b.m[2]=0,b.m[3]=0,b.m[4]=0,b.m[7]=0,b.m[8]=0,b.m[11]=0,b.m[12]=0,b.m[13]=0,b.m[14]=0},a.RotationY=function(b){var c=new a;return a.RotationYToRef(b,c),c},a.RotationYToRef=function(a,b){var c=Math.sin(a),d=Math.cos(a);b.m[5]=1,b.m[15]=1,b.m[0]=d,b.m[2]=-c,b.m[8]=c,b.m[10]=d,b.m[1]=0,b.m[3]=0,b.m[4]=0,b.m[6]=0,b.m[7]=0,b.m[9]=0,b.m[11]=0,b.m[12]=0,b.m[13]=0,b.m[14]=0},a.RotationZ=function(b){var c=new a;return a.RotationZToRef(b,c),c},a.RotationZToRef=function(a,b){var c=Math.sin(a),d=Math.cos(a);b.m[10]=1,b.m[15]=1,b.m[0]=d,b.m[1]=c,b.m[4]=-c,b.m[5]=d,b.m[2]=0,b.m[3]=0,b.m[6]=0,b.m[7]=0,b.m[8]=0,b.m[9]=0,b.m[11]=0,b.m[12]=0,b.m[13]=0,b.m[14]=0},a.RotationAxis=function(b,c){var d=Math.sin(-c),e=Math.cos(-c),f=1-e;b.normalize();var g=a.Zero();return g.m[0]=b.x*b.x*f+e,g.m[1]=b.x*b.y*f-b.z*d,g.m[2]=b.x*b.z*f+b.y*d,g.m[3]=0,g.m[4]=b.y*b.x*f+b.z*d,g.m[5]=b.y*b.y*f+e,g.m[6]=b.y*b.z*f-b.x*d,g.m[7]=0,g.m[8]=b.z*b.x*f-b.y*d,g.m[9]=b.z*b.y*f+b.x*d,g.m[10]=b.z*b.z*f+e,g.m[11]=0,g.m[15]=1,g},a.RotationYawPitchRoll=function(b,c,d){var e=new a;return a.RotationYawPitchRollToRef(b,c,d,e),e},a.RotationYawPitchRollToRef=function(a,b,c,d){f.RotationYawPitchRollToRef(a,b,c,this._tempQuaternion),this._tempQuaternion.toRotationMatrix(d)},a.Scaling=function(b,c,d){var e=a.Zero();return a.ScalingToRef(b,c,d,e),e},a.ScalingToRef=function(a,b,c,d){d.m[0]=a,d.m[1]=0,d.m[2]=0,d.m[3]=0,d.m[4]=0,d.m[5]=b,d.m[6]=0,d.m[7]=0,d.m[8]=0,d.m[9]=0,d.m[10]=c,d.m[11]=0,d.m[12]=0,d.m[13]=0,d.m[14]=0,d.m[15]=1},a.Translation=function(b,c,d){var e=a.Identity();return a.TranslationToRef(b,c,d,e),e},a.TranslationToRef=function(b,c,d,e){a.FromValuesToRef(1,0,0,0,0,1,0,0,0,0,1,0,b,c,d,1,e)},a.LookAtLH=function(b,c,d){var e=a.Zero();return a.LookAtLHToRef(b,c,d,e),e},a.LookAtLHToRef=function(b,c,d,f){c.subtractToRef(b,this._zAxis),this._zAxis.normalize(),e.CrossToRef(d,this._zAxis,this._xAxis),this._xAxis.normalize(),e.CrossToRef(this._zAxis,this._xAxis,this._yAxis),this._yAxis.normalize();var g=-e.Dot(this._xAxis,b),h=-e.Dot(this._yAxis,b),i=-e.Dot(this._zAxis,b);return a.FromValuesToRef(this._xAxis.x,this._yAxis.x,this._zAxis.x,0,this._xAxis.y,this._yAxis.y,this._zAxis.y,0,this._xAxis.z,this._yAxis.z,this._zAxis.z,0,g,h,i,1,f)},a.OrthoLH=function(b,c,d,e){var f=2/b,g=2/c,h=1/(e-d),i=d/(d-e);return a.FromValues(f,0,0,0,0,g,0,0,0,0,h,0,0,0,i,1)},a.OrthoOffCenterLH=function(b,c,d,e,f,g){var h=a.Zero();return a.OrthoOffCenterLHToRef(b,c,d,e,f,g,h),h},a.OrthoOffCenterLHToRef=function(a,b,c,d,e,f,g){g.m[0]=2/(b-a),g.m[1]=g.m[2]=g.m[3]=0,g.m[5]=2/(d-c),g.m[4]=g.m[6]=g.m[7]=0,g.m[10]=-1/(e-f),g.m[8]=g.m[9]=g.m[11]=0,g.m[12]=(a+b)/(a-b),g.m[13]=(d+c)/(c-d),g.m[14]=e/(e-f),g.m[15]=1},a.PerspectiveLH=function(b,c,d,e){var f=a.Zero();return f.m[0]=2*d/b,f.m[1]=f.m[2]=f.m[3]=0,f.m[5]=2*d/c,f.m[4]=f.m[6]=f.m[7]=0,f.m[10]=-e/(d-e),f.m[8]=f.m[9]=0,f.m[11]=1,f.m[12]=f.m[13]=f.m[15]=0,f.m[14]=d*e/(d-e),f},a.PerspectiveFovLH=function(b,c,d,e){var f=a.Zero();return a.PerspectiveFovLHToRef(b,c,d,e,f),f},a.PerspectiveFovLHToRef=function(a,b,c,d,e){var f=1/Math.tan(.5*a);e.m[0]=f/b,e.m[1]=e.m[2]=e.m[3]=0,e.m[5]=f,e.m[4]=e.m[6]=e.m[7]=0,e.m[8]=e.m[9]=0,e.m[10]=-d/(c-d),e.m[11]=1,e.m[12]=e.m[13]=e.m[15]=0,e.m[14]=c*d/(c-d)},a.GetFinalMatrix=function(b,c,d,e,f,g){var h=b.width,i=b.height,j=b.x,k=b.y,l=a.FromValues(h/2,0,0,0,0,-i/2,0,0,0,0,g-f,0,j+h/2,i/2+k,f,1);return c.multiply(d).multiply(e).multiply(l)},a.Transpose=function(b){var c=new a;return c.m[0]=b.m[0],c.m[1]=b.m[4],c.m[2]=b.m[8],c.m[3]=b.m[12],c.m[4]=b.m[1],c.m[5]=b.m[5],c.m[6]=b.m[9],c.m[7]=b.m[13],c.m[8]=b.m[2],c.m[9]=b.m[6],c.m[10]=b.m[10],c.m[11]=b.m[14],c.m[12]=b.m[3],c.m[13]=b.m[7],c.m[14]=b.m[11],c.m[15]=b.m[15],c},a.Reflection=function(b){var c=new a;return a.ReflectionToRef(b,c),c},a.ReflectionToRef=function(a,b){a.normalize();var c=a.normal.x,d=a.normal.y,e=a.normal.z,f=-2*c,g=-2*d,h=-2*e;b.m[0]=f*c+1,b.m[1]=g*c,b.m[2]=h*c,b.m[3]=0,b.m[4]=f*d,b.m[5]=g*d+1,b.m[6]=h*d,b.m[7]=0,b.m[8]=f*e,b.m[9]=g*e,b.m[10]=h*e+1,b.m[11]=0,b.m[12]=f*a.d,b.m[13]=g*a.d,b.m[14]=h*a.d,b.m[15]=1},a._tempQuaternion=new f,a._xAxis=e.Zero(),a._yAxis=e.Zero(),a._zAxis=e.Zero(),a}();a.Matrix=g;var h=function(){function b(a,b,c,d){this.normal=new e(a,b,c),this.d=d}return b.prototype.asArray=function(){return[this.normal.x,this.normal.y,this.normal.z,this.d]},b.prototype.clone=function(){return new b(this.normal.x,this.normal.y,this.normal.z,this.d)},b.prototype.normalize=function(){var a=Math.sqrt(this.normal.x*this.normal.x+this.normal.y*this.normal.y+this.normal.z*this.normal.z),b=0;0!=a&&(b=1/a),this.normal.x*=b,this.normal.y*=b,this.normal.z*=b,this.d*=b},b.prototype.transform=function(b){var c=a.Matrix.Transpose(b),d=this.normal.x,e=this.normal.y,f=this.normal.z,g=this.d,h=d*c.m[0]+e*c.m[1]+f*c.m[2]+g*c.m[3],i=d*c.m[4]+e*c.m[5]+f*c.m[6]+g*c.m[7],j=d*c.m[8]+e*c.m[9]+f*c.m[10]+g*c.m[11],k=d*c.m[12]+e*c.m[13]+f*c.m[14]+g*c.m[15];return new a.Plane(h,i,j,k)},b.prototype.dotCoordinate=function(a){return this.normal.x*a.x+this.normal.y*a.y+this.normal.z*a.z+this.d},b.prototype.copyFromPoints=function(a,b,c){var d,e=b.x-a.x,f=b.y-a.y,g=b.z-a.z,h=c.x-a.x,i=c.y-a.y,j=c.z-a.z,k=f*j-g*i,l=g*h-e*j,m=e*i-f*h,n=Math.sqrt(k*k+l*l+m*m);d=0!=n?1/n:0,this.normal.x=k*d,this.normal.y=l*d,this.normal.z=m*d,this.d=-(this.normal.x*a.x+this.normal.y*a.y+this.normal.z*a.z)},b.prototype.isFrontFacingTo=function(a,b){var c=e.Dot(this.normal,a);return b>=c},b.prototype.signedDistanceTo=function(a){return e.Dot(a,this.normal)+this.d},b.FromArray=function(b){return new a.Plane(b[0],b[1],b[2],b[3])},b.FromPoints=function(b,c,d){var e=new a.Plane(0,0,0,0);return e.copyFromPoints(b,c,d),e},b.FromPositionAndNormal=function(b,c){var d=new a.Plane(0,0,0,0);return c.normalize(),d.normal=c,d.d=-(c.x*b.x+c.y*b.y+c.z*b.z),d},b.SignedDistanceToPlaneFromPositionAndNormal=function(a,b,c){var d=-(b.x*a.x+b.y*a.y+b.z*a.z);return e.Dot(c,b)+d},b}();a.Plane=h;var i=function(){function a(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d}return a.prototype.toGlobal=function(b){var c=b.getRenderWidth(),d=b.getRenderHeight();return new a(this.x*c,this.y*d,this.width*c,this.height*d)},a}();a.Viewport=i;var j=function(){function a(){}return a.GetPlanes=function(b){for(var c=[],d=0;6>d;d++)c.push(new h(0,0,0,0));return a.GetPlanesToRef(b,c),c},a.GetPlanesToRef=function(a,b){b[0].normal.x=a.m[3]+a.m[2],b[0].normal.y=a.m[7]+a.m[6],b[0].normal.z=a.m[10]+a.m[10],b[0].d=a.m[15]+a.m[14],b[0].normalize(),b[1].normal.x=a.m[3]-a.m[2],b[1].normal.y=a.m[7]-a.m[6],b[1].normal.z=a.m[11]-a.m[10],b[1].d=a.m[15]-a.m[14],b[1].normalize(),b[2].normal.x=a.m[3]+a.m[0],b[2].normal.y=a.m[7]+a.m[4],b[2].normal.z=a.m[11]+a.m[8],b[2].d=a.m[15]+a.m[12],b[2].normalize(),b[3].normal.x=a.m[3]-a.m[0],b[3].normal.y=a.m[7]-a.m[4],b[3].normal.z=a.m[11]-a.m[8],b[3].d=a.m[15]-a.m[12],b[3].normalize(),b[4].normal.x=a.m[3]-a.m[1],b[4].normal.y=a.m[7]-a.m[5],b[4].normal.z=a.m[11]-a.m[9],b[4].d=a.m[15]-a.m[13],b[4].normalize(),b[5].normal.x=a.m[3]+a.m[1],b[5].normal.y=a.m[7]+a.m[5],b[5].normal.z=a.m[11]+a.m[9],b[5].d=a.m[15]+a.m[13],b[5].normalize()},a}();a.Frustum=j;var k=function(){function b(a,b){this.origin=a,this.direction=b}return b.prototype.intersectsBoxMinMax=function(a,b){var c=0,d=Number.MAX_VALUE;if(Math.abs(this.direction.x)<1e-7){if(this.origin.x<a.x||this.origin.x>b.x)return!1}else{var e=1/this.direction.x,f=(a.x-this.origin.x)*e,g=(b.x-this.origin.x)*e;if(f>g){var h=f;f=g,g=h}if(c=Math.max(f,c),d=Math.min(g,d),c>d)return!1}if(Math.abs(this.direction.y)<1e-7){if(this.origin.y<a.y||this.origin.y>b.y)return!1}else if(e=1/this.direction.y,f=(a.y-this.origin.y)*e,g=(b.y-this.origin.y)*e,f>g&&(h=f,f=g,g=h),c=Math.max(f,c),d=Math.min(g,d),c>d)return!1;if(Math.abs(this.direction.z)<1e-7){if(this.origin.z<a.z||this.origin.z>b.z)return!1}else if(e=1/this.direction.z,f=(a.z-this.origin.z)*e,g=(b.z-this.origin.z)*e,f>g&&(h=f,f=g,g=h),c=Math.max(f,c),d=Math.min(g,d),c>d)return!1;return!0},b.prototype.intersectsBox=function(a){return this.intersectsBoxMinMax(a.minimum,a.maximum)},b.prototype.intersectsSphere=function(a){var b=a.center.x-this.origin.x,c=a.center.y-this.origin.y,d=a.center.z-this.origin.z,e=b*b+c*c+d*d,f=a.radius*a.radius;if(f>=e)return!0;var g=b*this.direction.x+c*this.direction.y+d*this.direction.z;if(0>g)return!1;var h=e-g*g;return f>=h},b.prototype.intersectsTriangle=function(b,c,d){this._edge1||(this._edge1=a.Vector3.Zero(),this._edge2=a.Vector3.Zero(),this._pvec=a.Vector3.Zero(),this._tvec=a.Vector3.Zero(),this._qvec=a.Vector3.Zero()),c.subtractToRef(b,this._edge1),d.subtractToRef(b,this._edge2),a.Vector3.CrossToRef(this.direction,this._edge2,this._pvec);var f=e.Dot(this._edge1,this._pvec);if(0===f)return null;var g=1/f;this.origin.subtractToRef(b,this._tvec);var h=e.Dot(this._tvec,this._pvec)*g;if(0>h||h>1)return null;e.CrossToRef(this._tvec,this._edge1,this._qvec);var i=e.Dot(this.direction,this._qvec)*g;return 0>i||h+i>1?null:new a.IntersectionInfo(h,i,e.Dot(this._edge2,this._qvec)*g)},b.CreateNew=function(c,d,e,f,g,h,i){var j=a.Vector3.Unproject(new a.Vector3(c,d,0),e,f,g,h,i),k=a.Vector3.Unproject(new a.Vector3(c,d,1),e,f,g,h,i),l=k.subtract(j);return l.normalize(),new b(j,l)},b.Transform=function(c,d){var e=a.Vector3.TransformCoordinates(c.origin,d),f=a.Vector3.TransformNormal(c.direction,d);return new b(e,f)},b}();a.Ray=k,function(a){a[a.LOCAL=0]="LOCAL",a[a.WORLD=1]="WORLD"}(a.Space||(a.Space={}));var l=(a.Space,function(){function b(){}return b.X=new a.Vector3(1,0,0),b.Y=new a.Vector3(0,1,0),b.Z=new a.Vector3(0,0,1),b}());a.Axis=l}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b,c=60,d=[],e=60,f=0,g=function(b,c){return b?b instanceof a.Mesh?null:b instanceof a.SubMesh?b.clone(c):b.clone?b.clone():null:null},h=function(){function h(){}return h.GetFilename=function(a){var b=a.lastIndexOf("/");return 0>b?a:a.substring(b+1)},h.GetDOMTextContent=function(a){for(var b="",c=a.firstChild;c;)3==c.nodeType&&(b+=c.textContent),c=c.nextSibling;return b},h.ToDegrees=function(a){return 180*a/Math.PI},h.ToRadians=function(a){return a*Math.PI/180},h.ExtractMinAndMaxIndexed=function(b,c,d,e){for(var f=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),g=new a.Vector3(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),h=d;d+e>h;h++){var i=new a.Vector3(b[3*c[h]],b[3*c[h]+1],b[3*c[h]+2]);f=a.Vector3.Minimize(i,f),g=a.Vector3.Maximize(i,g)}return{minimum:f,maximum:g}},h.ExtractMinAndMax=function(b,c,d){for(var e=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),f=new a.Vector3(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),g=c;c+d>g;g++){var h=new a.Vector3(b[3*g],b[3*g+1],b[3*g+2]);e=a.Vector3.Minimize(h,e),f=a.Vector3.Maximize(h,f)}return{minimum:e,maximum:f}},h.MakeArray=function(a,b){return b===!0||void 0!==a&&null!=a?Array.isArray(a)?a:[a]:void 0},h.GetPointerPrefix=function(){var a="pointer";return navigator.pointerEnabled||(a="mouse"),a},h.QueueNewFrame=function(a){window.requestAnimationFrame?window.requestAnimationFrame(a):window.msRequestAnimationFrame?window.msRequestAnimationFrame(a):window.webkitRequestAnimationFrame?window.webkitRequestAnimationFrame(a):window.mozRequestAnimationFrame?window.mozRequestAnimationFrame(a):window.oRequestAnimationFrame?window.oRequestAnimationFrame(a):window.setTimeout(a,16)},h.RequestFullscreen=function(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen&&a.mozRequestFullScreen()},h.ExitFullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msCancelFullScreen&&document.msCancelFullScreen()},h.CleanUrl=function(a){return a=a.replace(/#/gm,"%23")},h.LoadImage=function(b,c,d,e){b=h.CleanUrl(b);var f=new Image;f.crossOrigin="anonymous",f.onload=function(){c(f)},f.onerror=function(a){d(f,a)};var g=function(){f.src=b},i=function(){e.loadImageFromDB(b,f)};if(e&&e.enableTexturesOffline&&a.Database.isUASupportingBlobStorage)e.openAsync(i,g);else if(-1===b.indexOf("file:"))g();else try{var j,k=b.substring(5);try{j=URL.createObjectURL(a.FilesInput.FilesTextures[k],{oneTimeOnly:!0})}catch(l){j=URL.createObjectURL(a.FilesInput.FilesTextures[k])}f.src=j}catch(m){h.Log("Error while trying to load texture: "+k),f.src=null}return f},h.LoadFile=function(b,c,d,e,f){b=h.CleanUrl(b);var g=function(){var a=new XMLHttpRequest,e=h.BaseUrl+b;a.open("GET",e,!0),f&&(a.responseType="arraybuffer"),a.onprogress=d,a.onreadystatechange=function(){if(4==a.readyState){if(200!=a.status)throw new Error("Error status: "+a.status+" - Unable to load "+e);c(f?a.response:a.responseText)}},a.send(null)},i=function(){e.loadSceneFromDB(b,c,d,g)};if(-1!==b.indexOf("file:")){var j=b.substring(5);a.Tools.ReadFile(a.FilesInput.FilesToLoad[j],c,d,!0)}else e&&-1!==b.indexOf(".babylon")&&e.enableSceneOffline?e.openAsync(i,g):g()},h.ReadFile=function(a,b,c,d){var e=new FileReader;e.onload=function(a){b(a.target.result)},e.onprogress=c,d?e.readAsArrayBuffer(a):e.readAsText(a)},h.CheckExtends=function(a,b,c){a.x<b.x&&(b.x=a.x),a.y<b.y&&(b.y=a.y),a.z<b.z&&(b.z=a.z),a.x>c.x&&(c.x=a.x),a.y>c.y&&(c.y=a.y),a.z>c.z&&(c.z=a.z)
},h.WithinEpsilon=function(a,b){var c=a-b;return c>=-1.401298e-45&&1.401298e-45>=c},h.DeepCopy=function(a,b,c,d){for(var e in a)if(("_"!==e[0]||d&&-1!==d.indexOf(e))&&(!c||-1===c.indexOf(e))){var f=a[e],h=typeof f;if("function"!=h)if("object"==h)if(f instanceof Array){if(b[e]=[],f.length>0)if("object"==typeof f[0])for(var i=0;i<f.length;i++){var j=g(f[i],b);-1===b[e].indexOf(j)&&b[e].push(j)}else b[e]=f.slice(0)}else b[e]=g(f,b);else b[e]=f}},h.IsEmpty=function(a){for(var b in a)return!1;return!0},h.RegisterTopRootEvents=function(a){for(var b=0;b<a.length;b++){var c=a[b];window.addEventListener(c.name,c.handler,!1);try{window.parent&&window.parent.addEventListener(c.name,c.handler,!1)}catch(d){}}},h.UnregisterTopRootEvents=function(a){for(var b=0;b<a.length;b++){var c=a[b];window.removeEventListener(c.name,c.handler);try{window.parent&&window.parent.removeEventListener(c.name,c.handler)}catch(d){}}},h.GetFps=function(){return e},h.GetDeltaTime=function(){return f},h._MeasureFps=function(){d.push((new Date).getTime());var a=d.length;if(a>=2&&(f=d[a-1]-d[a-2]),a>=c){a>c&&(d.splice(0,1),a=d.length);for(var b=0,g=0;a-1>g;g++)b+=d[g+1]-d[g];e=1e3/(b/(a-1))}},h.CreateScreenshot=function(c,d,e){var f,g,i=d.getScene(),j=null;if(i.activeCamera!==d&&(j=i.activeCamera,i.activeCamera=d),e.precision)f=Math.round(c.getRenderWidth()*e.precision),g=Math.round(f/c.getAspectRatio(d)),e={width:f,height:g};else if(e.width&&e.height)f=e.width,g=e.height;else if(e.width&&!e.height)f=e.width,g=Math.round(f/c.getAspectRatio(d)),e={width:f,height:g};else if(e.height&&!e.width)g=e.height,f=Math.round(g*c.getAspectRatio(d)),e={width:f,height:g};else{if(isNaN(e))return void h.Error("Invalid 'size' parameter !");g=e,f=e}var k=new a.RenderTargetTexture("screenShot",e,c.scenes[0],!1,!1);k.renderList=c.scenes[0].meshes,k.onAfterRender=function(){for(var a=4*f,d=g/2,e=c.readPixels(0,0,f,g),h=0;d>h;h++)for(var i=0;a>i;i++){var j=i+h*a,k=g-h-1,l=i+k*a,m=e[j];e[j]=e[l],e[l]=m}b||(b=document.createElement("canvas")),b.width=f,b.height=g;var n=b.getContext("2d"),o=n.createImageData(f,g);o.data.set(e),n.putImageData(o,0,0);var p=b.toDataURL();if("download"in document.createElement("a")){var q=window.document.createElement("a");q.href=p;var r=new Date,s=r.getFullYear()+"/"+r.getMonth()+"/"+r.getDate()+"-"+r.getHours()+":"+r.getMinutes();q.setAttribute("download","screenshot-"+s+".png"),window.document.body.appendChild(q),q.addEventListener("click",function(){q.parentElement.removeChild(q)}),q.click()}else{var t=window.open(""),u=t.document.createElement("img");u.src=p,t.document.body.appendChild(u)}},k.render(!0),k.dispose(),j&&(i.activeCamera=j)},Object.defineProperty(h,"NoneLogLevel",{get:function(){return h._NoneLogLevel},enumerable:!0,configurable:!0}),Object.defineProperty(h,"MessageLogLevel",{get:function(){return h._MessageLogLevel},enumerable:!0,configurable:!0}),Object.defineProperty(h,"WarningLogLevel",{get:function(){return h._WarningLogLevel},enumerable:!0,configurable:!0}),Object.defineProperty(h,"ErrorLogLevel",{get:function(){return h._ErrorLogLevel},enumerable:!0,configurable:!0}),Object.defineProperty(h,"AllLogLevel",{get:function(){return h._MessageLogLevel|h._WarningLogLevel|h._ErrorLogLevel},enumerable:!0,configurable:!0}),h._FormatMessage=function(a){var b=function(a){return 10>a?"0"+a:""+a},c=new Date;return"BJS - ["+b(c.getHours())+":"+b(c.getMinutes())+":"+b(c.getSeconds())+"]: "+a},h._LogDisabled=function(){},h._LogEnabled=function(a){console.log(h._FormatMessage(a))},h._WarnDisabled=function(){},h._WarnEnabled=function(a){console.warn(h._FormatMessage(a))},h._ErrorDisabled=function(){},h._ErrorEnabled=function(a){console.error(h._FormatMessage(a))},Object.defineProperty(h,"LogLevels",{set:function(a){h.Log=(a&h.MessageLogLevel)===h.MessageLogLevel?h._LogEnabled:h._LogDisabled,h.Warn=(a&h.WarningLogLevel)===h.WarningLogLevel?h._WarnEnabled:h._WarnDisabled,h.Error=(a&h.ErrorLogLevel)===h.ErrorLogLevel?h._ErrorEnabled:h._ErrorDisabled},enumerable:!0,configurable:!0}),h.BaseUrl="",h._NoneLogLevel=0,h._MessageLogLevel=1,h._WarningLogLevel=2,h._ErrorLogLevel=4,h.Log=h._LogEnabled,h.Warn=h._WarnEnabled,h.Error=h._ErrorEnabled,h}();a.Tools=h}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(a,b,c,d){var e=a.createShader("vertex"===c?a.VERTEX_SHADER:a.FRAGMENT_SHADER);if(a.shaderSource(e,(d?d+"\n":"")+b),a.compileShader(e),!a.getShaderParameter(e,a.COMPILE_STATUS))throw new Error(a.getShaderInfoLog(e));return e},c=function(b,c,d){var e=d.NEAREST,f=d.NEAREST;return b===a.Texture.BILINEAR_SAMPLINGMODE?(e=d.LINEAR,f=c?d.LINEAR_MIPMAP_NEAREST:d.LINEAR):b===a.Texture.TRILINEAR_SAMPLINGMODE?(e=d.LINEAR,f=c?d.LINEAR_MIPMAP_LINEAR:d.LINEAR):b===a.Texture.NEAREST_SAMPLINGMODE&&(e=d.NEAREST,f=c?d.NEAREST_MIPMAP_LINEAR:d.NEAREST),{min:f,mag:e}},d=function(a,b){var c=1;do c*=2;while(a>c);return c>b&&(c=b),c},e=function(b,e,f,g,h,i,j,k,l,m){"undefined"==typeof m&&(m=a.Texture.TRILINEAR_SAMPLINGMODE);var n=f.getEngine(),o=d(g,n.getCaps().maxTextureSize),p=d(h,n.getCaps().maxTextureSize);e.bindTexture(e.TEXTURE_2D,b),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,void 0===i?1:i?1:0),l(o,p);var q=c(m,!j,e);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,q.mag),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,q.min),j||k||e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,null),n._activeTexturesCache=[],b._baseWidth=g,b._baseHeight=h,b._width=o,b._height=p,b.isReady=!0,f._removePendingData(b)},f=function(b,c,d,e,g,h){var i,j=function(){d.push(i),e._removePendingData(i),c!=h.length-1?f(b,c+1,d,e,g,h):g(d)},k=function(){e._removePendingData(i)};i=a.Tools.LoadImage(b+h[c],j,k,e.database),e._addPendingData(i)},g=function(){function a(){}return a}();a.EngineCapabilities=g;var h=function(){function h(a,b,c){var d=this;this.isFullscreen=!1,this.isPointerLock=!1,this.forceWireframe=!1,this.cullBackFaces=!0,this.renderEvenInBackground=!0,this.scenes=new Array,this._windowIsBackground=!1,this._runningLoop=!1,this._loadedTexturesCache=new Array,this._activeTexturesCache=new Array,this._compiledEffects={},this._depthMask=!1,this._renderingCanvas=a,c=c||{},c.antialias=b;try{this._gl=a.getContext("webgl",c)||a.getContext("experimental-webgl",c)}catch(e){throw new Error("WebGL not supported")}if(!this._gl)throw new Error("WebGL not supported");this._onBlur=function(){d._windowIsBackground=!0},this._onFocus=function(){d._windowIsBackground=!1},window.addEventListener("blur",this._onBlur),window.addEventListener("focus",this._onFocus),this._workingCanvas=document.createElement("canvas"),this._workingContext=this._workingCanvas.getContext("2d"),this._hardwareScalingLevel=1/(window.devicePixelRatio||1),this.resize(),this._caps=new g,this._caps.maxTexturesImageUnits=this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS),this._caps.maxTextureSize=this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE),this._caps.maxCubemapTextureSize=this._gl.getParameter(this._gl.MAX_CUBE_MAP_TEXTURE_SIZE),this._caps.maxRenderTextureSize=this._gl.getParameter(this._gl.MAX_RENDERBUFFER_SIZE),this._caps.standardDerivatives=null!==this._gl.getExtension("OES_standard_derivatives"),this._caps.s3tc=this._gl.getExtension("WEBGL_compressed_texture_s3tc"),this._caps.textureFloat=null!==this._gl.getExtension("OES_texture_float"),this._caps.textureAnisotropicFilterExtension=this._gl.getExtension("EXT_texture_filter_anisotropic")||this._gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||this._gl.getExtension("MOZ_EXT_texture_filter_anisotropic"),this._caps.maxAnisotropy=this._caps.textureAnisotropicFilterExtension?this._gl.getParameter(this._caps.textureAnisotropicFilterExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0,this._caps.instancedArrays=this._gl.getExtension("ANGLE_instanced_arrays"),this.setDepthBuffer(!0),this.setDepthFunctionToLessOrEqual(),this.setDepthWrite(!0),this._onFullscreenChange=function(){void 0!==document.fullscreen?d.isFullscreen=document.fullscreen:void 0!==document.mozFullScreen?d.isFullscreen=document.mozFullScreen:void 0!==document.webkitIsFullScreen?d.isFullscreen=document.webkitIsFullScreen:void 0!==document.msIsFullScreen&&(d.isFullscreen=document.msIsFullScreen),d.isFullscreen&&d._pointerLockRequested&&(a.requestPointerLock=a.requestPointerLock||a.msRequestPointerLock||a.mozRequestPointerLock||a.webkitRequestPointerLock,a.requestPointerLock&&a.requestPointerLock())},document.addEventListener("fullscreenchange",this._onFullscreenChange,!1),document.addEventListener("mozfullscreenchange",this._onFullscreenChange,!1),document.addEventListener("webkitfullscreenchange",this._onFullscreenChange,!1),document.addEventListener("msfullscreenchange",this._onFullscreenChange,!1),this._onPointerLockChange=function(){d.isPointerLock=document.mozPointerLockElement===a||document.webkitPointerLockElement===a||document.msPointerLockElement===a||document.pointerLockElement===a},document.addEventListener("pointerlockchange",this._onPointerLockChange,!1),document.addEventListener("mspointerlockchange",this._onPointerLockChange,!1),document.addEventListener("mozpointerlockchange",this._onPointerLockChange,!1),document.addEventListener("webkitpointerlockchange",this._onPointerLockChange,!1)}return Object.defineProperty(h,"ALPHA_DISABLE",{get:function(){return h._ALPHA_DISABLE},enumerable:!0,configurable:!0}),Object.defineProperty(h,"ALPHA_ADD",{get:function(){return h._ALPHA_ADD},enumerable:!0,configurable:!0}),Object.defineProperty(h,"ALPHA_COMBINE",{get:function(){return h._ALPHA_COMBINE},enumerable:!0,configurable:!0}),Object.defineProperty(h,"DELAYLOADSTATE_NONE",{get:function(){return h._DELAYLOADSTATE_NONE},enumerable:!0,configurable:!0}),Object.defineProperty(h,"DELAYLOADSTATE_LOADED",{get:function(){return h._DELAYLOADSTATE_LOADED},enumerable:!0,configurable:!0}),Object.defineProperty(h,"DELAYLOADSTATE_LOADING",{get:function(){return h._DELAYLOADSTATE_LOADING},enumerable:!0,configurable:!0}),Object.defineProperty(h,"DELAYLOADSTATE_NOTLOADED",{get:function(){return h._DELAYLOADSTATE_NOTLOADED},enumerable:!0,configurable:!0}),h.prototype.getAspectRatio=function(a){var b=a.viewport;return this.getRenderWidth()*b.width/(this.getRenderHeight()*b.height)},h.prototype.getRenderWidth=function(){return this._currentRenderTarget?this._currentRenderTarget._width:this._renderingCanvas.width},h.prototype.getRenderHeight=function(){return this._currentRenderTarget?this._currentRenderTarget._height:this._renderingCanvas.height},h.prototype.getRenderingCanvas=function(){return this._renderingCanvas},h.prototype.setHardwareScalingLevel=function(a){this._hardwareScalingLevel=a,this.resize()},h.prototype.getHardwareScalingLevel=function(){return this._hardwareScalingLevel},h.prototype.getLoadedTexturesCache=function(){return this._loadedTexturesCache},h.prototype.getCaps=function(){return this._caps},h.prototype.setDepthFunctionToGreater=function(){this._gl.depthFunc(this._gl.GREATER)},h.prototype.setDepthFunctionToGreaterOrEqual=function(){this._gl.depthFunc(this._gl.GEQUAL)},h.prototype.setDepthFunctionToLess=function(){this._gl.depthFunc(this._gl.LESS)},h.prototype.setDepthFunctionToLessOrEqual=function(){this._gl.depthFunc(this._gl.LEQUAL)},h.prototype.stopRenderLoop=function(){this._renderFunction=null,this._runningLoop=!1},h.prototype._renderLoop=function(){var b=this,c=!0;!this.renderEvenInBackground&&this._windowIsBackground&&(c=!1),c&&(this.beginFrame(),this._renderFunction&&this._renderFunction(),this.endFrame()),this._runningLoop&&a.Tools.QueueNewFrame(function(){b._renderLoop()})},h.prototype.runRenderLoop=function(b){var c=this;this._runningLoop=!0,this._renderFunction=b,a.Tools.QueueNewFrame(function(){c._renderLoop()})},h.prototype.switchFullscreen=function(b){this.isFullscreen?a.Tools.ExitFullscreen():(this._pointerLockRequested=b,a.Tools.RequestFullscreen(this._renderingCanvas))},h.prototype.clear=function(a,b,c){this._gl.clearColor(a.r,a.g,a.b,void 0!==a.a?a.a:1),this._depthMask&&this._gl.clearDepth(1);var d=0;b&&(d|=this._gl.COLOR_BUFFER_BIT),c&&this._depthMask&&(d|=this._gl.DEPTH_BUFFER_BIT),this._gl.clear(d)},h.prototype.setViewport=function(a,b,c){var d=b||this._renderingCanvas.width,e=c||this._renderingCanvas.height,f=a.x||0,g=a.y||0;this._cachedViewport=a,this._gl.viewport(f*d,g*e,d*a.width,e*a.height)},h.prototype.setDirectViewport=function(a,b,c,d){this._cachedViewport=null,this._gl.viewport(a,b,c,d)},h.prototype.beginFrame=function(){a.Tools._MeasureFps()},h.prototype.endFrame=function(){this.flushFramebuffer()},h.prototype.resize=function(){this._renderingCanvas.width=this._renderingCanvas.clientWidth/this._hardwareScalingLevel,this._renderingCanvas.height=this._renderingCanvas.clientHeight/this._hardwareScalingLevel},h.prototype.bindFramebuffer=function(a){this._currentRenderTarget=a;var b=this._gl;b.bindFramebuffer(b.FRAMEBUFFER,a._framebuffer),this._gl.viewport(0,0,a._width,a._height),this.wipeCaches()},h.prototype.unBindFramebuffer=function(a){if(this._currentRenderTarget=null,a.generateMipMaps){var b=this._gl;b.bindTexture(b.TEXTURE_2D,a),b.generateMipmap(b.TEXTURE_2D),b.bindTexture(b.TEXTURE_2D,null)}this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null)},h.prototype.flushFramebuffer=function(){this._gl.flush()},h.prototype.restoreDefaultFramebuffer=function(){this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this.setViewport(this._cachedViewport),this.wipeCaches()},h.prototype._resetVertexBufferBinding=function(){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,null),this._cachedVertexBuffers=null},h.prototype.createVertexBuffer=function(a){var b=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ARRAY_BUFFER,b),this._gl.bufferData(this._gl.ARRAY_BUFFER,new Float32Array(a),this._gl.STATIC_DRAW),this._resetVertexBufferBinding(),b.references=1,b},h.prototype.createDynamicVertexBuffer=function(a){var b=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ARRAY_BUFFER,b),this._gl.bufferData(this._gl.ARRAY_BUFFER,a,this._gl.DYNAMIC_DRAW),this._resetVertexBufferBinding(),b.references=1,b},h.prototype.updateDynamicVertexBuffer=function(a,b){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,a),b instanceof Float32Array?this._gl.bufferSubData(this._gl.ARRAY_BUFFER,0,b):this._gl.bufferSubData(this._gl.ARRAY_BUFFER,0,new Float32Array(b)),this._resetVertexBufferBinding()},h.prototype._resetIndexBufferBinding=function(){this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,null),this._cachedIndexBuffer=null},h.prototype.createIndexBuffer=function(a){var b=this._gl.createBuffer();return this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,b),this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),this._gl.STATIC_DRAW),this._resetIndexBufferBinding(),b.references=1,b},h.prototype.bindBuffers=function(a,b,c,d,e){if(this._cachedVertexBuffers!==a||this._cachedEffectForVertexBuffers!==e){this._cachedVertexBuffers=a,this._cachedEffectForVertexBuffers=e,this._gl.bindBuffer(this._gl.ARRAY_BUFFER,a);for(var f=0,g=0;g<c.length;g++){var h=e.getAttributeLocation(g);h>=0&&this._gl.vertexAttribPointer(h,c[g],this._gl.FLOAT,!1,d,f),f+=4*c[g]}}this._cachedIndexBuffer!==b&&(this._cachedIndexBuffer=b,this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,b))},h.prototype.bindMultiBuffers=function(a,b,c){if(this._cachedVertexBuffers!==a||this._cachedEffectForVertexBuffers!==c){this._cachedVertexBuffers=a,this._cachedEffectForVertexBuffers=c;for(var d=c.getAttributesNames(),e=0;e<d.length;e++){var f=c.getAttributeLocation(e);if(f>=0){var g=a[d[e]];if(!g)continue;var h=g.getStrideSize();this._gl.bindBuffer(this._gl.ARRAY_BUFFER,g.getBuffer()),this._gl.vertexAttribPointer(f,h,this._gl.FLOAT,!1,4*h,0)}}}this._cachedIndexBuffer!==b&&(this._cachedIndexBuffer=b,this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER,b))},h.prototype._releaseBuffer=function(a){return a.references--,0===a.references?(this._gl.deleteBuffer(a),!0):!1},h.prototype.createInstancesBuffer=function(a){var b=this._gl.createBuffer();return b.capacity=a,this._gl.bindBuffer(this._gl.ARRAY_BUFFER,b),this._gl.bufferData(this._gl.ARRAY_BUFFER,a,this._gl.DYNAMIC_DRAW),b},h.prototype.deleteInstancesBuffer=function(a){this._gl.deleteBuffer(a)},h.prototype.updateAndBindInstancesBuffer=function(a,b,c){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,a),this._gl.bufferSubData(this._gl.ARRAY_BUFFER,0,b);for(var d=0;4>d;d++){var e=c[d];this._gl.enableVertexAttribArray(e),this._gl.vertexAttribPointer(e,4,this._gl.FLOAT,!1,64,16*d),this._caps.instancedArrays.vertexAttribDivisorANGLE(e,1)}},h.prototype.unBindInstancesBuffer=function(a,b){this._gl.bindBuffer(this._gl.ARRAY_BUFFER,a);for(var c=0;4>c;c++){var d=b[c];this._gl.disableVertexAttribArray(d),this._caps.instancedArrays.vertexAttribDivisorANGLE(d,0)}},h.prototype.draw=function(a,b,c,d){return d?void this._caps.instancedArrays.drawElementsInstancedANGLE(a?this._gl.TRIANGLES:this._gl.LINES,c,this._gl.UNSIGNED_SHORT,2*b,d):void this._gl.drawElements(a?this._gl.TRIANGLES:this._gl.LINES,c,this._gl.UNSIGNED_SHORT,2*b)},h.prototype._releaseEffect=function(a){this._compiledEffects[a._key]&&(delete this._compiledEffects[a._key],a.getProgram()&&this._gl.deleteProgram(a.getProgram()))},h.prototype.createEffect=function(b,c,d,e,f,g,h,i){var j=b.vertexElement||b.vertex||b,k=b.fragmentElement||b.fragment||b,l=j+"+"+k+"@"+f;if(this._compiledEffects[l])return this._compiledEffects[l];var m=new a.Effect(b,c,d,e,this,f,g,h,i);return m._key=l,this._compiledEffects[l]=m,m},h.prototype.createShaderProgram=function(a,c,d){var e=b(this._gl,a,"vertex",d),f=b(this._gl,c,"fragment",d),g=this._gl.createProgram();this._gl.attachShader(g,e),this._gl.attachShader(g,f),this._gl.linkProgram(g);var h=this._gl.getProgramParameter(g,this._gl.LINK_STATUS);if(!h){var i=this._gl.getProgramInfoLog(g);if(i)throw new Error(i)}return this._gl.deleteShader(e),this._gl.deleteShader(f),g},h.prototype.getUniforms=function(a,b){for(var c=[],d=0;d<b.length;d++)c.push(this._gl.getUniformLocation(a,b[d]));return c},h.prototype.getAttributes=function(a,b){for(var c=[],d=0;d<b.length;d++)try{c.push(this._gl.getAttribLocation(a,b[d]))}catch(e){c.push(-1)}return c},h.prototype.enableEffect=function(a){if(a&&a.getAttributesCount()&&this._currentEffect!==a){this._vertexAttribArrays=this._vertexAttribArrays||[],this._gl.useProgram(a.getProgram());for(var b in this._vertexAttribArrays)b>this._gl.VERTEX_ATTRIB_ARRAY_ENABLED||!this._vertexAttribArrays[b]||(this._vertexAttribArrays[b]=!1,this._gl.disableVertexAttribArray(b));for(var c=a.getAttributesCount(),d=0;c>d;d++){var e=a.getAttributeLocation(d);e>=0&&(this._vertexAttribArrays[e]=!0,this._gl.enableVertexAttribArray(e))}this._currentEffect=a}},h.prototype.setArray=function(a,b){a&&this._gl.uniform1fv(a,b)},h.prototype.setMatrices=function(a,b){a&&this._gl.uniformMatrix4fv(a,!1,b)},h.prototype.setMatrix=function(a,b){a&&this._gl.uniformMatrix4fv(a,!1,b.toArray())},h.prototype.setFloat=function(a,b){a&&this._gl.uniform1f(a,b)},h.prototype.setFloat2=function(a,b,c){a&&this._gl.uniform2f(a,b,c)},h.prototype.setFloat3=function(a,b,c,d){a&&this._gl.uniform3f(a,b,c,d)},h.prototype.setBool=function(a,b){a&&this._gl.uniform1i(a,b)},h.prototype.setFloat4=function(a,b,c,d,e){a&&this._gl.uniform4f(a,b,c,d,e)},h.prototype.setColor3=function(a,b){a&&this._gl.uniform3f(a,b.r,b.g,b.b)},h.prototype.setColor4=function(a,b,c){a&&this._gl.uniform4f(a,b.r,b.g,b.b,c)},h.prototype.setState=function(a){this._cullingState!==a&&(a?(this._gl.cullFace(this.cullBackFaces?this._gl.BACK:this._gl.FRONT),this._gl.enable(this._gl.CULL_FACE)):this._gl.disable(this._gl.CULL_FACE),this._cullingState=a)},h.prototype.setDepthBuffer=function(a){a?this._gl.enable(this._gl.DEPTH_TEST):this._gl.disable(this._gl.DEPTH_TEST)},h.prototype.setDepthWrite=function(a){this._gl.depthMask(a),this._depthMask=a},h.prototype.setColorWrite=function(a){this._gl.colorMask(a,a,a,a)},h.prototype.setAlphaMode=function(b){switch(b){case a.Engine.ALPHA_DISABLE:this.setDepthWrite(!0),this._gl.disable(this._gl.BLEND);break;case a.Engine.ALPHA_COMBINE:this.setDepthWrite(!1),this._gl.blendFuncSeparate(this._gl.SRC_ALPHA,this._gl.ONE_MINUS_SRC_ALPHA,this._gl.ONE,this._gl.ONE),this._gl.enable(this._gl.BLEND);break;case a.Engine.ALPHA_ADD:this.setDepthWrite(!1),this._gl.blendFuncSeparate(this._gl.ONE,this._gl.ONE,this._gl.ZERO,this._gl.ONE),this._gl.enable(this._gl.BLEND)}},h.prototype.setAlphaTesting=function(a){this._alphaTest=a},h.prototype.getAlphaTesting=function(){return this._alphaTest},h.prototype.wipeCaches=function(){this._activeTexturesCache=[],this._currentEffect=null,this._cullingState=null,this._cachedVertexBuffers=null,this._cachedIndexBuffer=null,this._cachedEffectForVertexBuffers=null},h.prototype.setSamplingMode=function(b,c){var d=this._gl;d.bindTexture(d.TEXTURE_2D,b);var e=d.NEAREST,f=d.NEAREST;c===a.Texture.BILINEAR_SAMPLINGMODE?(e=d.LINEAR,f=d.LINEAR):c===a.Texture.TRILINEAR_SAMPLINGMODE&&(e=d.LINEAR,f=d.LINEAR_MIPMAP_LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,e),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,f),d.bindTexture(d.TEXTURE_2D,null)},h.prototype.createTexture=function(b,c,d,f,g){var h=this;"undefined"==typeof g&&(g=a.Texture.TRILINEAR_SAMPLINGMODE);var i=this._gl.createTexture(),j=b.substr(b.length-4,4).toLowerCase(),k=this.getCaps().s3tc&&".dds"===j,l=".tga"===j;if(f._addPendingData(i),i.url=b,i.noMipmap=c,i.references=1,this._loadedTexturesCache.push(i),l)a.Tools.LoadFile(b,function(b){var j=new Uint8Array(b),k=a.Internals.TGATools.GetTGAHeader(j);e(i,h._gl,f,k.width,k.height,d,c,!1,function(){a.Internals.TGATools.UploadContent(h._gl,j)},g)},null,f.database,!0);else if(k)a.Tools.LoadFile(b,function(b){var j=a.Internals.DDSTools.GetDDSInfo(b),k=(j.isRGB||j.isLuminance||j.mipmapCount>1)&&!c&&j.width>>j.mipmapCount-1==1;e(i,h._gl,f,j.width,j.height,d,!k,j.isFourCC,function(){a.Internals.DDSTools.UploadDDSLevels(h._gl,h.getCaps().s3tc,b,j,k,1)},g)},null,f.database,!0);else{var m=function(a){e(i,h._gl,f,a.width,a.height,d,c,!1,function(b,c){var d=a.width==b&&a.height==c;d||(h._workingCanvas.width=b,h._workingCanvas.height=c,h._workingContext.drawImage(a,0,0,a.width,a.height,0,0,b,c)),h._gl.texImage2D(h._gl.TEXTURE_2D,0,h._gl.RGBA,h._gl.RGBA,h._gl.UNSIGNED_BYTE,d?a:h._workingCanvas)},g)},n=function(){f._removePendingData(i)};a.Tools.LoadImage(b,m,n,f.database)}return i},h.prototype.createDynamicTexture=function(a,b,e,f){var g=this._gl.createTexture();a=d(a,this._caps.maxTextureSize),b=d(b,this._caps.maxTextureSize),this._gl.bindTexture(this._gl.TEXTURE_2D,g);var h=c(f,e,this._gl);return this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MAG_FILTER,h.mag),this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_MIN_FILTER,h.min),this._gl.bindTexture(this._gl.TEXTURE_2D,null),this._activeTexturesCache=[],g._baseWidth=a,g._baseHeight=b,g._width=a,g._height=b,g.isReady=!1,g.generateMipMaps=e,g.references=1,this._loadedTexturesCache.push(g),g},h.prototype.updateDynamicTexture=function(a,b,c){this._gl.bindTexture(this._gl.TEXTURE_2D,a),this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL,c?1:0),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGBA,this._gl.RGBA,this._gl.UNSIGNED_BYTE,b),a.generateMipMaps&&this._gl.generateMipmap(this._gl.TEXTURE_2D),this._gl.bindTexture(this._gl.TEXTURE_2D,null),this._activeTexturesCache=[],a.isReady=!0},h.prototype.updateVideoTexture=function(a,b,c){this._gl.bindTexture(this._gl.TEXTURE_2D,a),this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL,c?0:1),b.videoWidth!==a._width||b.videoHeight!==a._height?(a._workingCanvas||(a._workingCanvas=document.createElement("canvas"),a._workingContext=a._workingCanvas.getContext("2d"),a._workingCanvas.width=a._width,a._workingCanvas.height=a._height),a._workingContext.drawImage(b,0,0,b.videoWidth,b.videoHeight,0,0,a._width,a._height),this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGBA,this._gl.RGBA,this._gl.UNSIGNED_BYTE,a._workingCanvas)):this._gl.texImage2D(this._gl.TEXTURE_2D,0,this._gl.RGBA,this._gl.RGBA,this._gl.UNSIGNED_BYTE,b),a.generateMipMaps&&this._gl.generateMipmap(this._gl.TEXTURE_2D),this._gl.bindTexture(this._gl.TEXTURE_2D,null),this._activeTexturesCache=[],a.isReady=!0},h.prototype.createRenderTargetTexture=function(b,d){var e=!1,f=!0,g=a.Texture.TRILINEAR_SAMPLINGMODE;void 0!==d&&(e=void 0===d.generateMipMaps?d:d.generateMipmaps,f=void 0===d.generateDepthBuffer?!0:d.generateDepthBuffer,void 0!==d.samplingMode&&(g=d.samplingMode));var h=this._gl,i=h.createTexture();h.bindTexture(h.TEXTURE_2D,i);var j=b.width||b,k=b.height||b,l=c(g,e,h);h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,l.mag),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,l.min),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_S,h.CLAMP_TO_EDGE),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_WRAP_T,h.CLAMP_TO_EDGE),h.texImage2D(h.TEXTURE_2D,0,h.RGBA,j,k,0,h.RGBA,h.UNSIGNED_BYTE,null);var m;f&&(m=h.createRenderbuffer(),h.bindRenderbuffer(h.RENDERBUFFER,m),h.renderbufferStorage(h.RENDERBUFFER,h.DEPTH_COMPONENT16,j,k));var n=h.createFramebuffer();return h.bindFramebuffer(h.FRAMEBUFFER,n),h.framebufferTexture2D(h.FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,i,0),f&&h.framebufferRenderbuffer(h.FRAMEBUFFER,h.DEPTH_ATTACHMENT,h.RENDERBUFFER,m),h.bindTexture(h.TEXTURE_2D,null),h.bindRenderbuffer(h.RENDERBUFFER,null),h.bindFramebuffer(h.FRAMEBUFFER,null),i._framebuffer=n,f&&(i._depthBuffer=m),i._width=j,i._height=k,i.isReady=!0,i.generateMipMaps=e,i.references=1,this._activeTexturesCache=[],this._loadedTexturesCache.push(i),i},h.prototype.createCubeTexture=function(b,c,e,g){var h=this,i=this._gl,j=i.createTexture();j.isCube=!0,j.url=b,j.references=1,this._loadedTexturesCache.push(j);var k=b.substr(b.length-4,4).toLowerCase(),l=this.getCaps().s3tc&&".dds"===k;return l?a.Tools.LoadFile(b,function(b){var c=a.Internals.DDSTools.GetDDSInfo(b),d=(c.isRGB||c.isLuminance||c.mipmapCount>1)&&!g;i.bindTexture(i.TEXTURE_CUBE_MAP,j),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,1),a.Internals.DDSTools.UploadDDSLevels(h._gl,h.getCaps().s3tc,b,c,d,6),g||c.isFourCC||1!=c.mipmapCount||i.generateMipmap(i.TEXTURE_CUBE_MAP),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MIN_FILTER,d?i.LINEAR_MIPMAP_LINEAR:i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.bindTexture(i.TEXTURE_CUBE_MAP,null),h._activeTexturesCache=[],j._width=c.width,j._height=c.height,j.isReady=!0}):f(b,0,[],c,function(a){var b=d(a[0].width,h._caps.maxCubemapTextureSize),c=b;h._workingCanvas.width=b,h._workingCanvas.height=c;var e=[i.TEXTURE_CUBE_MAP_POSITIVE_X,i.TEXTURE_CUBE_MAP_POSITIVE_Y,i.TEXTURE_CUBE_MAP_POSITIVE_Z,i.TEXTURE_CUBE_MAP_NEGATIVE_X,i.TEXTURE_CUBE_MAP_NEGATIVE_Y,i.TEXTURE_CUBE_MAP_NEGATIVE_Z];i.bindTexture(i.TEXTURE_CUBE_MAP,j),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,0);for(var f=0;f<e.length;f++)h._workingContext.drawImage(a[f],0,0,a[f].width,a[f].height,0,0,b,c),i.texImage2D(e[f],0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,h._workingCanvas);g||i.generateMipmap(i.TEXTURE_CUBE_MAP),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MIN_FILTER,g?i.LINEAR:i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.bindTexture(i.TEXTURE_CUBE_MAP,null),h._activeTexturesCache=[],j._width=b,j._height=c,j.isReady=!0},e),j},h.prototype._releaseTexture=function(a){var b=this._gl;a._framebuffer&&b.deleteFramebuffer(a._framebuffer),a._depthBuffer&&b.deleteRenderbuffer(a._depthBuffer),b.deleteTexture(a);for(var c=0;c<this._caps.maxTexturesImageUnits;c++)this._gl.activeTexture(this._gl["TEXTURE"+c]),this._gl.bindTexture(this._gl.TEXTURE_2D,null),this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,null),this._activeTexturesCache[c]=null;var d=this._loadedTexturesCache.indexOf(a);-1!==d&&this._loadedTexturesCache.splice(d,1)},h.prototype.bindSamplers=function(a){this._gl.useProgram(a.getProgram());for(var b=a.getSamplers(),c=0;c<b.length;c++){var d=a.getUniform(b[c]);this._gl.uniform1i(d,c)}this._currentEffect=null},h.prototype._bindTexture=function(a,b){this._gl.activeTexture(this._gl["TEXTURE"+a]),this._gl.bindTexture(this._gl.TEXTURE_2D,b),this._activeTexturesCache[a]=null},h.prototype.setTextureFromPostProcess=function(a,b){this._bindTexture(a,b._textures.data[b._currentRenderTextureInd])},h.prototype.setTexture=function(b,c){if(!(0>b)){if(!c||!c.isReady())return void(null!=this._activeTexturesCache[b]&&(this._gl.activeTexture(this._gl["TEXTURE"+b]),this._gl.bindTexture(this._gl.TEXTURE_2D,null),this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,null),this._activeTexturesCache[b]=null));if(c instanceof a.VideoTexture)c.update()&&(this._activeTexturesCache[b]=null);else if(c.delayLoadState==a.Engine.DELAYLOADSTATE_NOTLOADED)return void c.delayLoad();if(this._activeTexturesCache[b]!=c){this._activeTexturesCache[b]=c;var d=c.getInternalTexture();if(this._gl.activeTexture(this._gl["TEXTURE"+b]),d.isCube){if(this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP,d),d._cachedCoordinatesMode!==c.coordinatesMode){d._cachedCoordinatesMode=c.coordinatesMode;var e=c.coordinatesMode!==a.Texture.CUBIC_MODE&&c.coordinatesMode!==a.Texture.SKYBOX_MODE?this._gl.REPEAT:this._gl.CLAMP_TO_EDGE;this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_WRAP_S,e),this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP,this._gl.TEXTURE_WRAP_T,e)}this._setAnisotropicLevel(this._gl.TEXTURE_CUBE_MAP,c)}else{if(this._gl.bindTexture(this._gl.TEXTURE_2D,d),d._cachedWrapU!==c.wrapU)switch(d._cachedWrapU=c.wrapU,c.wrapU){case a.Texture.WRAP_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.REPEAT);break;case a.Texture.CLAMP_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.CLAMP_TO_EDGE);break;case a.Texture.MIRROR_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_S,this._gl.MIRRORED_REPEAT)}if(d._cachedWrapV!==c.wrapV)switch(d._cachedWrapV=c.wrapV,c.wrapV){case a.Texture.WRAP_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.REPEAT);break;case a.Texture.CLAMP_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.CLAMP_TO_EDGE);break;case a.Texture.MIRROR_ADDRESSMODE:this._gl.texParameteri(this._gl.TEXTURE_2D,this._gl.TEXTURE_WRAP_T,this._gl.MIRRORED_REPEAT)}this._setAnisotropicLevel(this._gl.TEXTURE_2D,c)}}}},h.prototype._setAnisotropicLevel=function(a,b){var c=this._caps.textureAnisotropicFilterExtension;c&&b._cachedAnisotropicFilteringLevel!==b.anisotropicFilteringLevel&&(this._gl.texParameterf(a,c.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropicFilteringLevel,this._caps.maxAnisotropy)),b._cachedAnisotropicFilteringLevel=b.anisotropicFilteringLevel)},h.prototype.readPixels=function(a,b,c,d){var e=new Uint8Array(d*c*4);return this._gl.readPixels(0,0,c,d,this._gl.RGBA,this._gl.UNSIGNED_BYTE,e),e},h.prototype.dispose=function(){for(this.stopRenderLoop();this.scenes.length;)this.scenes[0].dispose();for(var a in this._compiledEffects)this._gl.deleteProgram(this._compiledEffects[a]._program);window.removeEventListener("blur",this._onBlur),window.removeEventListener("focus",this._onFocus),document.removeEventListener("fullscreenchange",this._onFullscreenChange),document.removeEventListener("mozfullscreenchange",this._onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this._onFullscreenChange),document.removeEventListener("msfullscreenchange",this._onFullscreenChange),document.removeEventListener("pointerlockchange",this._onPointerLockChange),document.removeEventListener("mspointerlockchange",this._onPointerLockChange),document.removeEventListener("mozpointerlockchange",this._onPointerLockChange),document.removeEventListener("webkitpointerlockchange",this._onPointerLockChange)},h.isSupported=function(){try{var a=document.createElement("canvas"),b=a.getContext("webgl")||a.getContext("experimental-webgl");
return null!=b&&!!window.WebGLRenderingContext}catch(c){return!1}},h._ALPHA_DISABLE=0,h._ALPHA_ADD=1,h._ALPHA_COMBINE=2,h._DELAYLOADSTATE_NONE=0,h._DELAYLOADSTATE_LOADED=1,h._DELAYLOADSTATE_LOADING=2,h._DELAYLOADSTATE_NOTLOADED=4,h.Epsilon=.001,h.CollisionsEpsilon=.001,h.ShadersRepository="Babylon/Shaders/",h}();a.Engine=h}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b){this.state="",this.animations=new Array,this._childrenFlag=-1,this._isEnabled=!0,this._isReady=!0,this._currentRenderId=-1,this.name=a,this.id=a,this._scene=b,this._initCache()}return b.prototype.getScene=function(){return this._scene},b.prototype.getEngine=function(){return this._scene.getEngine()},b.prototype.getWorldMatrix=function(){return a.Matrix.Identity()},b.prototype._initCache=function(){this._cache={},this._cache.parent=void 0},b.prototype.updateCache=function(a){(a||!this.isSynchronized())&&(this._cache.parent=this.parent,this._updateCache())},b.prototype._updateCache=function(){},b.prototype._isSynchronized=function(){return!0},b.prototype.isSynchronizedWithParent=function(){return this.parent?this.parent._currentRenderId<=this._currentRenderId:!0},b.prototype.isSynchronized=function(a){var b=this.hasNewParent();return b=b||!this.isSynchronizedWithParent(),b=b||!this._isSynchronized(),a&&this.updateCache(!0),!b},b.prototype.hasNewParent=function(a){return this._cache.parent===this.parent?!1:(a&&(this._cache.parent=this.parent),!0)},b.prototype.isReady=function(){return this._isReady},b.prototype.isEnabled=function(){return this._isEnabled?this.parent?this.parent.isEnabled():!0:!1},b.prototype.setEnabled=function(a){this._isEnabled=a},b.prototype.isDescendantOf=function(a){return this.parent?this.parent===a?!0:this.parent.isDescendantOf(a):!1},b.prototype._getDescendants=function(a,b){for(var c=0;c<a.length;c++){var d=a[c];d.isDescendantOf(this)&&b.push(d)}},b.prototype.getDescendants=function(){var a=[];return this._getDescendants(this._scene.meshes,a),this._getDescendants(this._scene.lights,a),this._getDescendants(this._scene.cameras,a),a},b.prototype._setReady=function(a){if(a!=this._isReady){if(!a)return void(this._isReady=!1);this._isReady=!0,this.onReady&&this.onReady(this)}},b}();a.Node=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c){this.minimum=b,this.maximum=c,this._tempRadiusVector=a.Vector3.Zero();var d=a.Vector3.Distance(b,c);this.center=a.Vector3.Lerp(b,c,.5),this.radius=.5*d,this.centerWorld=a.Vector3.Zero(),this._update(a.Matrix.Identity())}return b.prototype._update=function(b){a.Vector3.TransformCoordinatesToRef(this.center,b,this.centerWorld),a.Vector3.TransformNormalFromFloatsToRef(1,1,1,b,this._tempRadiusVector),this.radiusWorld=Math.max(Math.abs(this._tempRadiusVector.x),Math.abs(this._tempRadiusVector.y),Math.abs(this._tempRadiusVector.z))*this.radius},b.prototype.isInFrustum=function(a){for(var b=0;6>b;b++)if(a[b].dotCoordinate(this.centerWorld)<=-this.radiusWorld)return!1;return!0},b.prototype.intersectsPoint=function(b){var c=this.centerWorld.x-b.x,d=this.centerWorld.y-b.y,e=this.centerWorld.z-b.z,f=Math.sqrt(c*c+d*d+e*e);return Math.abs(this.radiusWorld-f)<a.Engine.Epsilon?!1:!0},b.Intersects=function(a,b){var c=a.centerWorld.x-b.centerWorld.x,d=a.centerWorld.y-b.centerWorld.y,e=a.centerWorld.z-b.centerWorld.z,f=Math.sqrt(c*c+d*d+e*e);return a.radiusWorld+b.radiusWorld<f?!1:!0},b}();a.BoundingSphere=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c){this.minimum=b,this.maximum=c,this.vectors=new Array,this.vectorsWorld=new Array,this.vectors.push(this.minimum.clone()),this.vectors.push(this.maximum.clone()),this.vectors.push(this.minimum.clone()),this.vectors[2].x=this.maximum.x,this.vectors.push(this.minimum.clone()),this.vectors[3].y=this.maximum.y,this.vectors.push(this.minimum.clone()),this.vectors[4].z=this.maximum.z,this.vectors.push(this.maximum.clone()),this.vectors[5].z=this.minimum.z,this.vectors.push(this.maximum.clone()),this.vectors[6].x=this.minimum.x,this.vectors.push(this.maximum.clone()),this.vectors[7].y=this.minimum.y,this.center=this.maximum.add(this.minimum).scale(.5),this.extends=this.maximum.subtract(this.minimum).scale(.5),this.directions=[a.Vector3.Zero(),a.Vector3.Zero(),a.Vector3.Zero()];for(var d=0;d<this.vectors.length;d++)this.vectorsWorld[d]=a.Vector3.Zero();this.minimumWorld=a.Vector3.Zero(),this.maximumWorld=a.Vector3.Zero(),this._update(a.Matrix.Identity())}return b.prototype.getWorldMatrix=function(){return this._worldMatrix},b.prototype._update=function(b){a.Vector3.FromFloatsToRef(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,this.minimumWorld),a.Vector3.FromFloatsToRef(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,this.maximumWorld);for(var c=0;c<this.vectors.length;c++){var d=this.vectorsWorld[c];a.Vector3.TransformCoordinatesToRef(this.vectors[c],b,d),d.x<this.minimumWorld.x&&(this.minimumWorld.x=d.x),d.y<this.minimumWorld.y&&(this.minimumWorld.y=d.y),d.z<this.minimumWorld.z&&(this.minimumWorld.z=d.z),d.x>this.maximumWorld.x&&(this.maximumWorld.x=d.x),d.y>this.maximumWorld.y&&(this.maximumWorld.y=d.y),d.z>this.maximumWorld.z&&(this.maximumWorld.z=d.z)}this.maximumWorld.addToRef(this.minimumWorld,this.center),this.center.scaleInPlace(.5),a.Vector3.FromFloatArrayToRef(b.m,0,this.directions[0]),a.Vector3.FromFloatArrayToRef(b.m,4,this.directions[1]),a.Vector3.FromFloatArrayToRef(b.m,8,this.directions[2]),this._worldMatrix=b},b.prototype.isInFrustum=function(a){return b.IsInFrustum(this.vectorsWorld,a)},b.prototype.intersectsPoint=function(b){var c=a.Engine.Epsilon;return this.maximumWorld.x-b.x<c||c>b.x-this.minimumWorld.x?!1:this.maximumWorld.y-b.y<c||c>b.y-this.minimumWorld.y?!1:this.maximumWorld.z-b.z<c||c>b.z-this.minimumWorld.z?!1:!0},b.prototype.intersectsSphere=function(a){return b.IntersectsSphere(this.minimumWorld,this.maximumWorld,a.centerWorld,a.radiusWorld)},b.prototype.intersectsMinMax=function(a,b){return this.maximumWorld.x<a.x||this.minimumWorld.x>b.x?!1:this.maximumWorld.y<a.y||this.minimumWorld.y>b.y?!1:this.maximumWorld.z<a.z||this.minimumWorld.z>b.z?!1:!0},b.Intersects=function(a,b){return a.maximumWorld.x<b.minimumWorld.x||a.minimumWorld.x>b.maximumWorld.x?!1:a.maximumWorld.y<b.minimumWorld.y||a.minimumWorld.y>b.maximumWorld.y?!1:a.maximumWorld.z<b.minimumWorld.z||a.minimumWorld.z>b.maximumWorld.z?!1:!0},b.IntersectsSphere=function(b,c,d,e){var f=a.Vector3.Clamp(d,b,c),g=a.Vector3.DistanceSquared(d,f);return e*e>=g},b.IsInFrustum=function(a,b){for(var c=0;6>c;c++){for(var d=8,e=0;8>e&&b[c].dotCoordinate(a[e])<0;e++)--d;if(0==d)return!1}return!0},b}();a.BoundingBox=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(b,c){var d=a.Vector3.Dot(c.center,b),e=Math.abs(a.Vector3.Dot(c.directions[0],b))*c.extends.x,f=Math.abs(a.Vector3.Dot(c.directions[1],b))*c.extends.y,g=Math.abs(a.Vector3.Dot(c.directions[2],b))*c.extends.z,h=e+f+g;return{min:d-h,max:d+h}},c=function(a,b,c,d){return!(a>d||c>b)},d=function(a,d,e){var f=b(a,d),g=b(a,e);return c(f.min,f.max,g.min,g.max)},e=function(){function b(b,c){this.minimum=b,this.maximum=c,this.boundingBox=new a.BoundingBox(b,c),this.boundingSphere=new a.BoundingSphere(b,c)}return b.prototype._update=function(a){this.boundingBox._update(a),this.boundingSphere._update(a)},b.prototype.isInFrustum=function(a){return this.boundingSphere.isInFrustum(a)?this.boundingBox.isInFrustum(a):!1},b.prototype._checkCollision=function(a){return a._canDoCollision(this.boundingSphere.centerWorld,this.boundingSphere.radiusWorld,this.boundingBox.minimumWorld,this.boundingBox.maximumWorld)},b.prototype.intersectsPoint=function(a){return this.boundingSphere.centerWorld&&this.boundingSphere.intersectsPoint(a)&&this.boundingBox.intersectsPoint(a)?!0:!1},b.prototype.intersects=function(b,c){if(!this.boundingSphere.centerWorld||!b.boundingSphere.centerWorld)return!1;if(!a.BoundingSphere.Intersects(this.boundingSphere,b.boundingSphere))return!1;if(!a.BoundingBox.Intersects(this.boundingBox,b.boundingBox))return!1;if(!c)return!0;var e=this.boundingBox,f=b.boundingBox;return d(e.directions[0],e,f)&&d(e.directions[1],e,f)&&d(e.directions[2],e,f)&&d(f.directions[0],e,f)&&d(f.directions[1],e,f)&&d(f.directions[2],e,f)&&d(a.Vector3.Cross(e.directions[0],f.directions[0]),e,f)&&d(a.Vector3.Cross(e.directions[0],f.directions[1]),e,f)&&d(a.Vector3.Cross(e.directions[0],f.directions[2]),e,f)&&d(a.Vector3.Cross(e.directions[1],f.directions[0]),e,f)&&d(a.Vector3.Cross(e.directions[1],f.directions[1]),e,f)&&d(a.Vector3.Cross(e.directions[1],f.directions[2]),e,f)&&d(a.Vector3.Cross(e.directions[2],f.directions[0]),e,f)&&d(a.Vector3.Cross(e.directions[2],f.directions[1]),e,f)&&d(a.Vector3.Cross(e.directions[2],f.directions[2]),e,f)?!0:!1},b}();a.BoundingInfo=e}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d){b.call(this,c,d),this.diffuse=new a.Color3(1,1,1),this.specular=new a.Color3(1,1,1),this.intensity=1,this.range=Number.MAX_VALUE,this.excludedMeshes=new Array,this._excludedMeshesIds=new Array,d.lights.push(this)}return __extends(c,b),c.prototype.getShadowGenerator=function(){return this._shadowGenerator},c.prototype.transferToEffect=function(){},c.prototype._getWorldMatrix=function(){return a.Matrix.Identity()},c.prototype.getWorldMatrix=function(){this._currentRenderId=this.getScene().getRenderId();var b=this._getWorldMatrix();return this.parent&&this.parent.getWorldMatrix?(this._parentedWorldMatrix||(this._parentedWorldMatrix=a.Matrix.Identity()),b.multiplyToRef(this.parent.getWorldMatrix(),this._parentedWorldMatrix),this._parentedWorldMatrix):b},c.prototype.dispose=function(){this._shadowGenerator&&(this._shadowGenerator.dispose(),this._shadowGenerator=null);var a=this.getScene().lights.indexOf(this);this.getScene().lights.splice(a,1)},c}(a.Node);a.Light=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(a,c,d){b.call(this,a,d),this.position=c}return __extends(c,b),c.prototype.transferToEffect=function(b,c){return this.parent&&this.parent.getWorldMatrix?(this._transformedPosition||(this._transformedPosition=a.Vector3.Zero()),a.Vector3.TransformCoordinatesToRef(this.position,this.parent.getWorldMatrix(),this._transformedPosition),void b.setFloat4(c,this._transformedPosition.x,this._transformedPosition.y,this._transformedPosition.z,0)):void b.setFloat4(c,this.position.x,this.position.y,this.position.z,0)},c.prototype.getShadowGenerator=function(){return null},c.prototype._getWorldMatrix=function(){return this._worldMatrix||(this._worldMatrix=a.Matrix.Identity()),a.Matrix.TranslationToRef(this.position.x,this.position.y,this.position.z,this._worldMatrix),this._worldMatrix},c}(a.Light);a.PointLight=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(a,c,d,e,f,g){b.call(this,a,g),this.position=c,this.direction=d,this.angle=e,this.exponent=f}return __extends(c,b),c.prototype.setDirectionToTarget=function(b){return this.direction=a.Vector3.Normalize(b.subtract(this.position)),this.direction},c.prototype.transferToEffect=function(b,c,d){var e;if(this.parent&&this.parent.getWorldMatrix){this._transformedDirection||(this._transformedDirection=a.Vector3.Zero()),this._transformedPosition||(this._transformedPosition=a.Vector3.Zero());var f=this.parent.getWorldMatrix();a.Vector3.TransformCoordinatesToRef(this.position,f,this._transformedPosition),a.Vector3.TransformNormalToRef(this.direction,f,this._transformedDirection),b.setFloat4(c,this._transformedPosition.x,this._transformedPosition.y,this._transformedPosition.z,this.exponent),e=a.Vector3.Normalize(this._transformedDirection)}else b.setFloat4(c,this.position.x,this.position.y,this.position.z,this.exponent),e=a.Vector3.Normalize(this.direction);b.setFloat4(d,e.x,e.y,e.z,Math.cos(.5*this.angle))},c.prototype._getWorldMatrix=function(){return this._worldMatrix||(this._worldMatrix=a.Matrix.Identity()),a.Matrix.TranslationToRef(this.position.x,this.position.y,this.position.z,this._worldMatrix),this._worldMatrix},c}(a.Light);a.SpotLight=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(a,c,d){b.call(this,a,d),this.direction=c,this.position=c.scale(-1)}return __extends(c,b),c.prototype.setDirectionToTarget=function(b){return this.direction=a.Vector3.Normalize(b.subtract(this.position)),this.direction},c.prototype._computeTransformedPosition=function(){return this.parent&&this.parent.getWorldMatrix?(this._transformedPosition||(this._transformedPosition=a.Vector3.Zero()),a.Vector3.TransformCoordinatesToRef(this.position,this.parent.getWorldMatrix(),this._transformedPosition),!0):!1},c.prototype.transferToEffect=function(b,c){return this.parent&&this.parent.getWorldMatrix?(this._transformedDirection||(this._transformedDirection=a.Vector3.Zero()),a.Vector3.TransformNormalToRef(this.direction,this.parent.getWorldMatrix(),this._transformedDirection),void b.setFloat4(c,this._transformedDirection.x,this._transformedDirection.y,this._transformedDirection.z,1)):void b.setFloat4(c,this.direction.x,this.direction.y,this.direction.z,1)},c.prototype._getWorldMatrix=function(){return this._worldMatrix||(this._worldMatrix=a.Matrix.Identity()),a.Matrix.TranslationToRef(this.position.x,this.position.y,this.position.z,this._worldMatrix),this._worldMatrix},c}(a.Light);a.DirectionalLight=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c){var d=this;this.useVarianceShadowMap=!0,this._darkness=0,this._transparencyShadow=!1,this._viewMatrix=a.Matrix.Zero(),this._projectionMatrix=a.Matrix.Zero(),this._transformMatrix=a.Matrix.Zero(),this._worldViewProjection=a.Matrix.Zero(),this._light=c,this._scene=c.getScene(),c._shadowGenerator=this,this._shadowMap=new a.RenderTargetTexture(c.name+"_shadowMap",b,this._scene,!1),this._shadowMap.wrapU=a.Texture.CLAMP_ADDRESSMODE,this._shadowMap.wrapV=a.Texture.CLAMP_ADDRESSMODE,this._shadowMap.renderParticles=!1;var e=function(b){var c=b.getRenderingMesh(),e=d._scene,f=e.getEngine();f.setState(b.getMaterial().backFaceCulling);var g=c._getInstancesRenderList();if(!g.mustReturn){var h=null!==f.getCaps().instancedArrays&&null!==g.visibleInstances;if(d.isReady(c,h)){if(f.enableEffect(d._effect),c._bind(b,d._effect,!1),d._effect.setMatrix("viewProjection",d.getTransformMatrix()),c.material&&c.material.needAlphaTesting()){var i=c.material.getAlphaTestTexture();d._effect.setTexture("diffuseSampler",i),d._effect.setMatrix("diffuseMatrix",i.getTextureMatrix())}var j=c.skeleton&&c.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&c.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind);if(j&&d._effect.setMatrices("mBones",c.skeleton.getTransformMatrices()),h)c._renderWithInstances(b,!1,g,d._effect,f);else if(g.renderSelf&&(d._effect.setMatrix("world",c.getWorldMatrix()),c._draw(b,!0)),g.visibleInstances)for(var k=0;k<g.visibleInstances.length;k++){var l=g.visibleInstances[k];d._effect.setMatrix("world",l.getWorldMatrix()),c._draw(b,!0)}}else d._shadowMap.resetRefreshCounter()}};this._shadowMap.customRenderFunction=function(a,b,c){var f;for(f=0;f<a.length;f++)e(a.data[f]);for(f=0;f<b.length;f++)e(b.data[f]);if(d._transparencyShadow)for(f=0;f<c.length;f++)e(c.data[f])}}return b.prototype.isReady=function(b,c){var d=[];this.useVarianceShadowMap&&d.push("#define VSM");var e=[a.VertexBuffer.PositionKind];b.material&&b.material.needAlphaTesting()&&(d.push("#define ALPHATEST"),b.isVerticesDataPresent(a.VertexBuffer.UVKind)&&(e.push(a.VertexBuffer.UVKind),d.push("#define UV1")),b.isVerticesDataPresent(a.VertexBuffer.UV2Kind)&&(e.push(a.VertexBuffer.UV2Kind),d.push("#define UV2"))),b.skeleton&&b.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&b.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind)&&(e.push(a.VertexBuffer.MatricesIndicesKind),e.push(a.VertexBuffer.MatricesWeightsKind),d.push("#define BONES"),d.push("#define BonesPerMesh "+(b.skeleton.bones.length+1))),c&&(d.push("#define INSTANCES"),e.push("world0"),e.push("world1"),e.push("world2"),e.push("world3"));var f=d.join("\n");return this._cachedDefines!=f&&(this._cachedDefines=f,this._effect=this._scene.getEngine().createEffect("shadowMap",e,["world","mBones","viewProjection","diffuseMatrix"],["diffuseSampler"],f)),this._effect.isReady()},b.prototype.getShadowMap=function(){return this._shadowMap},b.prototype.getLight=function(){return this._light},b.prototype.getTransformMatrix=function(){var b=this._light.position,c=this._light.direction;if(this._light._computeTransformedPosition()&&(b=this._light._transformedPosition),!(this._cachedPosition&&this._cachedDirection&&b.equals(this._cachedPosition)&&c.equals(this._cachedDirection))){this._cachedPosition=b.clone(),this._cachedDirection=c.clone();var d=this._scene.activeCamera;a.Matrix.LookAtLHToRef(b,this._light.position.add(c),a.Vector3.Up(),this._viewMatrix),a.Matrix.PerspectiveFovLHToRef(Math.PI/2,1,d.minZ,d.maxZ,this._projectionMatrix),this._viewMatrix.multiplyToRef(this._projectionMatrix,this._transformMatrix)}return this._transformMatrix},b.prototype.getDarkness=function(){return this._darkness},b.prototype.setDarkness=function(a){a>=1?this._darkness=1:0>=a&&(this._darkness=0),elsethis._darkness=a},b.prototype.setTransparencyShadow=function(a){this._transparencyShadow=a},b.prototype.dispose=function(){this._shadowMap.dispose()},b}();a.ShadowGenerator=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e){b.call(this,c,e),this.direction=d,this.groundColor=new a.Color3(0,0,0)}return __extends(c,b),c.prototype.setDirectionToTarget=function(b){return this.direction=a.Vector3.Normalize(b.subtract(a.Vector3.Zero())),this.direction},c.prototype.getShadowGenerator=function(){return null},c.prototype.transferToEffect=function(b,c,d){var e=a.Vector3.Normalize(this.direction);b.setFloat4(c,e.x,e.y,e.z,0),b.setColor3(d,this.groundColor.scale(this.intensity))},c.prototype._getWorldMatrix=function(){return this._worldMatrix||(this._worldMatrix=a.Matrix.Identity()),this._worldMatrix},c}(a.Light);a.HemisphericLight=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(a,b,c,d){return a.x>c.x+d?!1:c.x-d>b.x?!1:a.y>c.y+d?!1:c.y-d>b.y?!1:a.z>c.z+d?!1:c.z-d>b.z?!1:!0},c=function(a,b,c,d){var e=b*b-4*a*c,f={root:0,found:!1};if(0>e)return f;var g=Math.sqrt(e),h=(-b-g)/(2*a),i=(-b+g)/(2*a);if(h>i){var j=i;i=h,h=j}return h>0&&d>h?(f.root=h,f.found=!0,f):i>0&&d>i?(f.root=i,f.found=!0,f):f},d=function(){function d(){this.radius=new a.Vector3(1,1,1),this.retry=0,this.basePointWorld=a.Vector3.Zero(),this.velocityWorld=a.Vector3.Zero(),this.normalizedVelocity=a.Vector3.Zero(),this._collisionPoint=a.Vector3.Zero(),this._planeIntersectionPoint=a.Vector3.Zero(),this._tempVector=a.Vector3.Zero(),this._tempVector2=a.Vector3.Zero(),this._tempVector3=a.Vector3.Zero(),this._tempVector4=a.Vector3.Zero(),this._edge=a.Vector3.Zero(),this._baseToVertex=a.Vector3.Zero(),this._destinationPoint=a.Vector3.Zero(),this._slidePlaneNormal=a.Vector3.Zero(),this._displacementVector=a.Vector3.Zero()}return d.prototype._initialize=function(b,c,d){this.velocity=c,a.Vector3.NormalizeToRef(c,this.normalizedVelocity),this.basePoint=b,b.multiplyToRef(this.radius,this.basePointWorld),c.multiplyToRef(this.radius,this.velocityWorld),this.velocityWorldLength=this.velocityWorld.length(),this.epsilon=d,this.collisionFound=!1},d.prototype._checkPointInTriangle=function(b,c,d,e,f){c.subtractToRef(b,this._tempVector),d.subtractToRef(b,this._tempVector2),a.Vector3.CrossToRef(this._tempVector,this._tempVector2,this._tempVector4);var g=a.Vector3.Dot(this._tempVector4,f);return 0>g?!1:(e.subtractToRef(b,this._tempVector3),a.Vector3.CrossToRef(this._tempVector2,this._tempVector3,this._tempVector4),g=a.Vector3.Dot(this._tempVector4,f),0>g?!1:(a.Vector3.CrossToRef(this._tempVector3,this._tempVector,this._tempVector4),g=a.Vector3.Dot(this._tempVector4,f),g>=0))},d.prototype._canDoCollision=function(c,d,e,f){var g=a.Vector3.Distance(this.basePointWorld,c),h=Math.max(this.radius.x,this.radius.y,this.radius.z);return g>this.velocityWorldLength+h+d?!1:b(e,f,this.basePointWorld,this.velocityWorldLength+h)?!0:!1},d.prototype._testTriangle=function(b,d,e,f,g){var h,i=!1;d._trianglePlanes||(d._trianglePlanes=[]),d._trianglePlanes[b]||(d._trianglePlanes[b]=new a.Plane(0,0,0,0),d._trianglePlanes[b].copyFromPoints(e,f,g));var j=d._trianglePlanes[b];if(d.getMaterial()||j.isFrontFacingTo(this.normalizedVelocity,0)){var k=j.signedDistanceTo(this.basePoint),l=a.Vector3.Dot(j.normal,this.velocity);if(0==l){if(Math.abs(k)>=1)return;i=!0,h=0}else{h=(-1-k)/l;var m=(1-k)/l;if(h>m){var n=m;m=h,h=n}if(h>1||0>m)return;0>h&&(h=0),h>1&&(h=1)}this._collisionPoint.copyFromFloats(0,0,0);var o=!1,p=1;if(i||(this.basePoint.subtractToRef(j.normal,this._planeIntersectionPoint),this.velocity.scaleToRef(h,this._tempVector),this._planeIntersectionPoint.addInPlace(this._tempVector),this._checkPointInTriangle(this._planeIntersectionPoint,e,f,g,j.normal)&&(o=!0,p=h,this._collisionPoint.copyFrom(this._planeIntersectionPoint))),!o){var q=this.velocity.lengthSquared(),r=q;this.basePoint.subtractToRef(e,this._tempVector);var s=2*a.Vector3.Dot(this.velocity,this._tempVector),t=this._tempVector.lengthSquared()-1,u=c(r,s,t,p);u.found&&(p=u.root,o=!0,this._collisionPoint.copyFrom(e)),this.basePoint.subtractToRef(f,this._tempVector),s=2*a.Vector3.Dot(this.velocity,this._tempVector),t=this._tempVector.lengthSquared()-1,u=c(r,s,t,p),u.found&&(p=u.root,o=!0,this._collisionPoint.copyFrom(f)),this.basePoint.subtractToRef(g,this._tempVector),s=2*a.Vector3.Dot(this.velocity,this._tempVector),t=this._tempVector.lengthSquared()-1,u=c(r,s,t,p),u.found&&(p=u.root,o=!0,this._collisionPoint.copyFrom(g)),f.subtractToRef(e,this._edge),e.subtractToRef(this.basePoint,this._baseToVertex);var v=this._edge.lengthSquared(),w=a.Vector3.Dot(this._edge,this.velocity),x=a.Vector3.Dot(this._edge,this._baseToVertex);if(r=v*-q+w*w,s=2*v*a.Vector3.Dot(this.velocity,this._baseToVertex)-2*w*x,t=v*(1-this._baseToVertex.lengthSquared())+x*x,u=c(r,s,t,p),u.found){var y=(w*u.root-x)/v;y>=0&&1>=y&&(p=u.root,o=!0,this._edge.scaleInPlace(y),e.addToRef(this._edge,this._collisionPoint))}g.subtractToRef(f,this._edge),f.subtractToRef(this.basePoint,this._baseToVertex),v=this._edge.lengthSquared(),w=a.Vector3.Dot(this._edge,this.velocity),x=a.Vector3.Dot(this._edge,this._baseToVertex),r=v*-q+w*w,s=2*v*a.Vector3.Dot(this.velocity,this._baseToVertex)-2*w*x,t=v*(1-this._baseToVertex.lengthSquared())+x*x,u=c(r,s,t,p),u.found&&(y=(w*u.root-x)/v,y>=0&&1>=y&&(p=u.root,o=!0,this._edge.scaleInPlace(y),f.addToRef(this._edge,this._collisionPoint))),e.subtractToRef(g,this._edge),g.subtractToRef(this.basePoint,this._baseToVertex),v=this._edge.lengthSquared(),w=a.Vector3.Dot(this._edge,this.velocity),x=a.Vector3.Dot(this._edge,this._baseToVertex),r=v*-q+w*w,s=2*v*a.Vector3.Dot(this.velocity,this._baseToVertex)-2*w*x,t=v*(1-this._baseToVertex.lengthSquared())+x*x,u=c(r,s,t,p),u.found&&(y=(w*u.root-x)/v,y>=0&&1>=y&&(p=u.root,o=!0,this._edge.scaleInPlace(y),g.addToRef(this._edge,this._collisionPoint)))}if(o){var z=p*this.velocity.length();(!this.collisionFound||z<this.nearestDistance)&&(this.intersectionPoint?this.intersectionPoint.copyFrom(this._collisionPoint):this.intersectionPoint=this._collisionPoint.clone(),this.nearestDistance=z,this.collisionFound=!0,this.collidedMesh=d.getMesh())}}},d.prototype._collide=function(a,b,c,d,e,f){for(var g=d;e>g;g+=3){var h=b[c[g]-f],i=b[c[g+1]-f],j=b[c[g+2]-f];this._testTriangle(g,a,j,i,h)}},d.prototype._getResponse=function(b,c){b.addToRef(c,this._destinationPoint),c.scaleInPlace(this.nearestDistance/c.length()),this.basePoint.addToRef(c,b),b.subtractToRef(this.intersectionPoint,this._slidePlaneNormal),this._slidePlaneNormal.normalize(),this._slidePlaneNormal.scaleToRef(this.epsilon,this._displacementVector),b.addInPlace(this._displacementVector),this.intersectionPoint.addInPlace(this._displacementVector),this._slidePlaneNormal.scaleInPlace(a.Plane.SignedDistanceToPlaneFromPositionAndNormal(this.intersectionPoint,this._slidePlaneNormal,this._destinationPoint)),this._destinationPoint.subtractInPlace(this._slidePlaneNormal),this._destinationPoint.subtractToRef(this.intersectionPoint,c)},d}();a.Collider=d}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){BABYLON.InputControllerTarget=function(){this._position=new BABYLON.Vector3(0,0,0),this._orientation={yaw:0,pitch:0,roll:0}},BABYLON.InputControllerTarget.prototype.getPosition=function(){return this._position},BABYLON.InputControllerTarget.prototype.getOrientation=function(){return this._orientation},BABYLON.InputControllerTarget.prototype.moveRelative=function(){},BABYLON.InputControllerTarget.prototype.rotateRelative=function(){},BABYLON.InputControllerTarget.prototype.getOrientationMatrix=function(){return new BABYLON.Matrix},BABYLON.InputControllerTarget.prototype.getInvertOrientationMatrix=function(){return new BABYLON.Matrix},BABYLON.InputControllerMultiTarget=function(a){this.targets=a;var b=this.targets[0];b.controllers?b.controllers.push(this):b.controllers=[this]},BABYLON.InputControllerMultiTarget.prototype.getPosition=function(){return this.targets[0].getPosition()},BABYLON.InputControllerMultiTarget.prototype.getOrientation=function(){return this.targets[0].getOrientation()},BABYLON.InputControllerMultiTarget.prototype.getOrientationMatrix=function(){return this.targets[0].getOrientationMatrix()},BABYLON.InputControllerMultiTarget.prototype.getInvertOrientationMatrix=function(){return this.targets[0].getInvertOrientationMatrix()},BABYLON.InputControllerMultiTarget.prototype.moveRelative=function(a){for(var b=0;b<this.targets.length;++b)this.targets[b].moveRelative(a)},BABYLON.InputControllerMultiTarget.prototype.rotateRelative=function(a){for(var b=0;b<this.targets.length;++b)this.targets[b].rotateRelative(a)},BABYLON.InputControllerMultiTarget.prototype.update=function(){if(this.controllers)for(var a=0;a<this.controllers.length;++a)this.controllers[a].update()},BABYLON.InputController=function(a,b){this.scene=a,this.target=b,this.target.controllers?this.target.controllers.push(this):this.target.controllers=[this]},BABYLON.InputController.prototype.attachToCanvas=function(){},BABYLON.InputController.prototype.detachFromCanvas=function(){},BABYLON.InputController.prototype.update=function(){},BABYLON.InputController.prototype.dispose=function(){},BABYLON.inputFilter=function(a,b){BABYLON.InputController.call(this,a,b)},BABYLON.inputFilter.prototype=Object.create(BABYLON.InputController.prototype),BABYLON.inputFilter.prototype.update=function(){if(this.controllers)for(var a=0;a<this.controllers.length;++a)this.controllers[a].update()},BABYLON.inputFilter.prototype.getPosition=function(){return this.target.getPosition()},BABYLON.inputFilter.prototype.getOrientation=function(){return this.target.getOrientation()},BABYLON.inputFilter.prototype.getOrientationMatrix=function(){return this.target.getOrientationMatrix()},BABYLON.inputFilter.prototype.getInvertOrientationMatrix=function(){return this.target.getInvertOrientationMatrix()},BABYLON.inputFilter.prototype.moveRelative=function(a){this.target.moveRelative(a)},BABYLON.inputFilter.prototype.rotateRelative=function(a){this.target.rotateRelative(a)}}();var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(d,e,f){b.call(this,d,f),this.position=e,this.upVector=a.Vector3.Up(),this.orthoLeft=null,this.orthoRight=null,this.orthoBottom=null,this.orthoTop=null,this.fov=.8,this.minZ=.1,this.maxZ=1e3,this.inertia=.9,this.mode=c.PERSPECTIVE_CAMERA,this.isIntermediate=!1,this.viewport=new a.Viewport(0,0,1,1),this.subCameras=[],this.layerMask=4294967295,this._computedViewMatrix=a.Matrix.Identity(),this._projectionMatrix=new a.Matrix,this._postProcesses=new Array,this._postProcessesTakenIndices=[],f.cameras.push(this),f.activeCamera||(f.activeCamera=this)}return __extends(c,b),c.prototype._initCache=function(){b.prototype._initCache.call(this),this._cache.position=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cache.upVector=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cache.mode=void 0,this._cache.minZ=void 0,this._cache.maxZ=void 0,this._cache.fov=void 0,this._cache.aspectRatio=void 0,this._cache.orthoLeft=void 0,this._cache.orthoRight=void 0,this._cache.orthoBottom=void 0,this._cache.orthoTop=void 0,this._cache.renderWidth=void 0,this._cache.renderHeight=void 0},c.prototype._updateCache=function(a){a||b.prototype._updateCache.call(this);var c=this.getEngine();this._cache.position.copyFrom(this.position),this._cache.upVector.copyFrom(this.upVector),this._cache.mode=this.mode,this._cache.minZ=this.minZ,this._cache.maxZ=this.maxZ,this._cache.fov=this.fov,this._cache.aspectRatio=c.getAspectRatio(this),this._cache.orthoLeft=this.orthoLeft,this._cache.orthoRight=this.orthoRight,this._cache.orthoBottom=this.orthoBottom,this._cache.orthoTop=this.orthoTop,this._cache.renderWidth=c.getRenderWidth(),this._cache.renderHeight=c.getRenderHeight()},c.prototype._updateFromScene=function(){this.updateCache(),this._update()},c.prototype._isSynchronized=function(){return this._isSynchronizedViewMatrix()&&this._isSynchronizedProjectionMatrix()},c.prototype._isSynchronizedViewMatrix=function(){return b.prototype._isSynchronized.call(this)?this._cache.position.equals(this.position)&&this._cache.upVector.equals(this.upVector)&&this.isSynchronizedWithParent():!1},c.prototype._isSynchronizedProjectionMatrix=function(){var b=this._cache.mode===this.mode&&this._cache.minZ===this.minZ&&this._cache.maxZ===this.maxZ;if(!b)return!1;var c=this.getEngine();return b=this.mode===a.Camera.PERSPECTIVE_CAMERA?this._cache.fov===this.fov&&this._cache.aspectRatio===c.getAspectRatio(this):this._cache.orthoLeft===this.orthoLeft&&this._cache.orthoRight===this.orthoRight&&this._cache.orthoBottom===this.orthoBottom&&this._cache.orthoTop===this.orthoTop&&this._cache.renderWidth===c.getRenderWidth()&&this._cache.renderHeight===c.getRenderHeight()},c.prototype.attachControl=function(){},c.prototype.detachControl=function(){},c.prototype._update=function(){},c.prototype.attachPostProcess=function(b,c){if("undefined"==typeof c&&(c=null),!b.isReusable()&&this._postProcesses.indexOf(b)>-1)return a.Tools.Error("You're trying to reuse a post process not defined as reusable."),0;if(null==c||0>c)return this._postProcesses.push(b),this._postProcessesTakenIndices.push(this._postProcesses.length-1),this._postProcesses.length-1;var d=0;if(this._postProcesses[c]){for(var e=this._postProcesses.length-1,f=e;f>=c+1;--f)this._postProcesses[f+1]=this._postProcesses[f];d=1}for(f=0;f<this._postProcessesTakenIndices.length;++f)if(!(this._postProcessesTakenIndices[f]<c)){e=this._postProcessesTakenIndices.length-1;for(var g=e;g>=f;--g)this._postProcessesTakenIndices[g+1]=this._postProcessesTakenIndices[g]+d;this._postProcessesTakenIndices[f]=c;break}d||-1!=this._postProcessesTakenIndices.indexOf(c)||this._postProcessesTakenIndices.push(c);
var h=c+d;return this._postProcesses[h]=b,h},c.prototype.detachPostProcess=function(a,b){"undefined"==typeof b&&(b=null);var c=[];if(b)for(b=b instanceof Array?b:[b],f=0;f<b.length;f++){var d=this._postProcesses[b[f]];d===a?(delete this._postProcesses[b[f]],g=this._postProcessesTakenIndices.indexOf(b[f]),this._postProcessesTakenIndices.splice(g,1)):c.push(f)}else for(var e=this._postProcesses.length,f=0;e>f;f++)if(this._postProcesses[f]===a){delete this._postProcesses[f];var g=this._postProcessesTakenIndices.indexOf(f);this._postProcessesTakenIndices.splice(g,1)}return c},c.prototype.getWorldMatrix=function(){this._worldMatrix||(this._worldMatrix=a.Matrix.Identity());var b=this.getViewMatrix();return b.invertToRef(this._worldMatrix),this._worldMatrix},c.prototype._getViewMatrix=function(){return a.Matrix.Identity()},c.prototype.getViewMatrix=function(){return this._computedViewMatrix=this._computeViewMatrix(),this.parent&&this.parent.getWorldMatrix&&!this.isSynchronized()?(this._worldMatrix||(this._worldMatrix=a.Matrix.Identity()),this._computedViewMatrix.invertToRef(this._worldMatrix),this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(),this._computedViewMatrix),this._computedViewMatrix.invert(),this._currentRenderId=this.getScene().getRenderId(),this._computedViewMatrix):this._computedViewMatrix},c.prototype._computeViewMatrix=function(a){return!a&&this._isSynchronizedViewMatrix()?this._computedViewMatrix:(this._computedViewMatrix=this._getViewMatrix(),this.parent&&this.parent.getWorldMatrix||(this._currentRenderId=this.getScene().getRenderId()),this._computedViewMatrix)},c.prototype.getProjectionMatrix=function(b){if(!b&&this._isSynchronizedProjectionMatrix())return this._projectionMatrix;var c=this.getEngine();if(this.mode===a.Camera.PERSPECTIVE_CAMERA)return this.minZ<=0&&(this.minZ=.1),a.Matrix.PerspectiveFovLHToRef(this.fov,c.getAspectRatio(this),this.minZ,this.maxZ,this._projectionMatrix),this._projectionMatrix;var d=c.getRenderWidth()/2,e=c.getRenderHeight()/2;return a.Matrix.OrthoOffCenterLHToRef(this.orthoLeft||-d,this.orthoRight||d,this.orthoBottom||-e,this.orthoTop||e,this.minZ,this.maxZ,this._projectionMatrix),this._projectionMatrix},c.prototype.dispose=function(){var a=this.getScene().cameras.indexOf(this);this.getScene().cameras.splice(a,1);for(var b=0;b<this._postProcessesTakenIndices.length;++b)this._postProcesses[this._postProcessesTakenIndices[b]].dispose(this)},c.PERSPECTIVE_CAMERA=0,c.ORTHOGRAPHIC_CAMERA=1,c}(a.Node);a.Camera=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e){b.call(this,c,d,e),this.cameraDirection=new a.Vector3(0,0,0),this.cameraRotation=new a.Vector2(0,0),this.rotation=new a.Vector3(0,0,0),this.ellipsoid=new a.Vector3(.5,1,.5),this.keysUp=[38],this.keysDown=[40],this.keysLeft=[37],this.keysRight=[39],this.speed=2,this.checkCollisions=!1,this.applyGravity=!1,this.noRotationConstraint=!1,this.angularSensibility=2e3,this.lockedTarget=null,this.onCollide=null,this._keys=[],this._collider=new a.Collider,this._needMoveForGravity=!0,this._currentTarget=a.Vector3.Zero(),this._viewMatrix=a.Matrix.Zero(),this._camMatrix=a.Matrix.Zero(),this._cameraTransformMatrix=a.Matrix.Zero(),this._cameraRotationMatrix=a.Matrix.Zero(),this._referencePoint=a.Vector3.Zero(),this._transformedReferencePoint=a.Vector3.Zero(),this._oldPosition=a.Vector3.Zero(),this._diffPosition=a.Vector3.Zero(),this._newPosition=a.Vector3.Zero(),this._lookAtTemp=a.Matrix.Zero(),this._tempMatrix=a.Matrix.Zero()}return __extends(c,b),c.prototype._getLockedTargetPosition=function(){return this.lockedTarget?this.lockedTarget.position||this.lockedTarget:null},c.prototype._initCache=function(){b.prototype._initCache.call(this),this._cache.lockedTarget=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cache.rotation=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)},c.prototype._updateCache=function(a){a||b.prototype._updateCache.call(this);var c=this._getLockedTargetPosition();c?this._cache.lockedTarget?this._cache.lockedTarget.copyFrom(c):this._cache.lockedTarget=c.clone():this._cache.lockedTarget=null,this._cache.rotation.copyFrom(this.rotation)},c.prototype._isSynchronizedViewMatrix=function(){if(!b.prototype._isSynchronizedViewMatrix.call(this))return!1;var a=this._getLockedTargetPosition();return(this._cache.lockedTarget?this._cache.lockedTarget.equals(a):!a)&&this._cache.rotation.equals(this.rotation)},c.prototype._computeLocalCameraSpeed=function(){return this.speed*(a.Tools.GetDeltaTime()/(10*a.Tools.GetFps()))},c.prototype.setTarget=function(b){this.upVector.normalize(),a.Matrix.LookAtLHToRef(this.position,b,this.upVector,this._camMatrix),this._camMatrix.invert(),this.rotation.x=Math.atan(this._camMatrix.m[6]/this._camMatrix.m[10]);var c=b.subtract(this.position);this.rotation.y=c.x>=0?-Math.atan(c.z/c.x)+Math.PI/2:-Math.atan(c.z/c.x)-Math.PI/2,this.rotation.z=-Math.acos(a.Vector3.Dot(new a.Vector3(0,1,0),this.upVector)),isNaN(this.rotation.x)&&(this.rotation.x=0),isNaN(this.rotation.y)&&(this.rotation.y=0),isNaN(this.rotation.z)&&(this.rotation.z=0)},c.prototype.getTarget=function(){return this._currentTarget},c.prototype.attachControl=function(b,c){var d,e=this,f=this.getEngine();this._attachedElement||(this._attachedElement=b,void 0===this._onMouseDown&&(this._onMouseDown=function(a){d={x:a.clientX,y:a.clientY},c||a.preventDefault()},this._onMouseUp=function(a){d=null,c||a.preventDefault()},this._onMouseOut=function(a){d=null,e._keys=[],c||a.preventDefault()},this._onMouseMove=function(a){if(d||f.isPointerLock){var b,g;f.isPointerLock?(b=a.movementX||a.mozMovementX||a.webkitMovementX||a.msMovementX||0,g=a.movementY||a.mozMovementY||a.webkitMovementY||a.msMovementY||0):(b=a.clientX-d.x,g=a.clientY-d.y),e.cameraRotation.y+=b/e.angularSensibility,e.cameraRotation.x+=g/e.angularSensibility,d={x:a.clientX,y:a.clientY},c||a.preventDefault()}},this._onKeyDown=function(a){if(-1!==e.keysUp.indexOf(a.keyCode)||-1!==e.keysDown.indexOf(a.keyCode)||-1!==e.keysLeft.indexOf(a.keyCode)||-1!==e.keysRight.indexOf(a.keyCode)){var b=e._keys.indexOf(a.keyCode);-1===b&&e._keys.push(a.keyCode),c||a.preventDefault()}},this._onKeyUp=function(a){if(-1!==e.keysUp.indexOf(a.keyCode)||-1!==e.keysDown.indexOf(a.keyCode)||-1!==e.keysLeft.indexOf(a.keyCode)||-1!==e.keysRight.indexOf(a.keyCode)){var b=e._keys.indexOf(a.keyCode);b>=0&&e._keys.splice(b,1),c||a.preventDefault()}},this._onLostFocus=function(){e._keys=[]},this._reset=function(){e._keys=[],d=null,e.cameraDirection=new a.Vector3(0,0,0),e.cameraRotation=new a.Vector2(0,0)}),b.addEventListener("mousedown",this._onMouseDown,!1),b.addEventListener("mouseup",this._onMouseUp,!1),b.addEventListener("mouseout",this._onMouseOut,!1),b.addEventListener("mousemove",this._onMouseMove,!1),a.Tools.RegisterTopRootEvents([{name:"keydown",handler:this._onKeyDown},{name:"keyup",handler:this._onKeyUp},{name:"blur",handler:this._onLostFocus}]))},c.prototype.detachControl=function(b){this._attachedElement==b&&(b.removeEventListener("mousedown",this._onMouseDown),b.removeEventListener("mouseup",this._onMouseUp),b.removeEventListener("mouseout",this._onMouseOut),b.removeEventListener("mousemove",this._onMouseMove),a.Tools.UnregisterTopRootEvents([{name:"keydown",handler:this._onKeyDown},{name:"keyup",handler:this._onKeyUp},{name:"blur",handler:this._onLostFocus}]),this._attachedElement=null,this._reset&&this._reset())},c.prototype._collideWithWorld=function(b){var c;c=this.parent?a.Vector3.TransformCoordinates(this.position,this.parent.getWorldMatrix()):this.position,c.subtractFromFloatsToRef(0,this.ellipsoid.y,0,this._oldPosition),this._collider.radius=this.ellipsoid,this.getScene()._getNewPosition(this._oldPosition,b,this._collider,3,this._newPosition),this._newPosition.subtractToRef(this._oldPosition,this._diffPosition),this._diffPosition.length()>a.Engine.CollisionsEpsilon&&(this.position.addInPlace(this._diffPosition),this.onCollide&&this.onCollide(this._collider.collidedMesh))},c.prototype._checkInputs=function(){this._localDirection||(this._localDirection=a.Vector3.Zero(),this._transformedDirection=a.Vector3.Zero());for(var b=0;b<this._keys.length;b++){var c=this._keys[b],d=this._computeLocalCameraSpeed();-1!==this.keysLeft.indexOf(c)?this._localDirection.copyFromFloats(-d,0,0):-1!==this.keysUp.indexOf(c)?this._localDirection.copyFromFloats(0,0,d):-1!==this.keysRight.indexOf(c)?this._localDirection.copyFromFloats(d,0,0):-1!==this.keysDown.indexOf(c)&&this._localDirection.copyFromFloats(0,0,-d),this.getViewMatrix().invertToRef(this._cameraTransformMatrix),a.Vector3.TransformNormalToRef(this._localDirection,this._cameraTransformMatrix,this._transformedDirection),this.cameraDirection.addInPlace(this._transformedDirection)}},c.prototype._update=function(){this._checkInputs();var b=this._needMoveForGravity||Math.abs(this.cameraDirection.x)>0||Math.abs(this.cameraDirection.y)>0||Math.abs(this.cameraDirection.z)>0,c=Math.abs(this.cameraRotation.x)>0||Math.abs(this.cameraRotation.y)>0;if(b)if(this.checkCollisions&&this.getScene().collisionsEnabled){if(this._collideWithWorld(this.cameraDirection),this.applyGravity){var d=this.position;this._collideWithWorld(this.getScene().gravity),this._needMoveForGravity=0!=a.Vector3.DistanceSquared(d,this.position)}}else this.position.addInPlace(this.cameraDirection);if(c&&(this.rotation.x+=this.cameraRotation.x,this.rotation.y+=this.cameraRotation.y,!this.noRotationConstraint)){var e=Math.PI/2*.95;this.rotation.x>e&&(this.rotation.x=e),this.rotation.x<-e&&(this.rotation.x=-e)}b&&(Math.abs(this.cameraDirection.x)<a.Engine.Epsilon&&(this.cameraDirection.x=0),Math.abs(this.cameraDirection.y)<a.Engine.Epsilon&&(this.cameraDirection.y=0),Math.abs(this.cameraDirection.z)<a.Engine.Epsilon&&(this.cameraDirection.z=0),this.cameraDirection.scaleInPlace(this.inertia)),c&&(Math.abs(this.cameraRotation.x)<a.Engine.Epsilon&&(this.cameraRotation.x=0),Math.abs(this.cameraRotation.y)<a.Engine.Epsilon&&(this.cameraRotation.y=0),this.cameraRotation.scaleInPlace(this.inertia))},c.prototype._getViewMatrix=function(){return a.Vector3.FromFloatsToRef(0,0,1,this._referencePoint),this.lockedTarget?this._currentTarget.copyFrom(this._getLockedTargetPosition()):(0!=this.upVector.x||1!=this.upVector.y||0!=this.upVector.z?(a.Matrix.LookAtLHToRef(a.Vector3.Zero(),this._referencePoint,this.upVector,this._lookAtTemp),a.Matrix.RotationYawPitchRollToRef(this.rotation.y,this.rotation.x,this.rotation.z,this._cameraRotationMatrix),this._lookAtTemp.multiplyToRef(this._cameraRotationMatrix,this._tempMatrix),this._lookAtTemp.invert(),this._tempMatrix.multiplyToRef(this._lookAtTemp,this._cameraRotationMatrix)):a.Matrix.RotationYawPitchRollToRef(this.rotation.y,this.rotation.x,this.rotation.z,this._cameraRotationMatrix),a.Vector3.TransformCoordinatesToRef(this._referencePoint,this._cameraRotationMatrix,this._transformedReferencePoint),this.position.addToRef(this._transformedReferencePoint,this._currentTarget)),a.Matrix.LookAtLHToRef(this.position,this._currentTarget,this.upVector,this._viewMatrix),this._viewMatrix},c}(a.Camera);a.FreeCamera=b}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){BABYLON.TouchCamera=function(a,b,c){BABYLON.FreeCamera.call(this,a,b,c),this._offsetX=null,this._offsetY=null,this._pointerCount=0,this._pointerPressed=[],this.angularSensibility=2e5,this.moveSensibility=500},BABYLON.TouchCamera.prototype=Object.create(BABYLON.FreeCamera.prototype),BABYLON.TouchCamera.prototype.attachControl=function(a,b){var c,d=this;this._attachedCanvas||(this._attachedCanvas=a,void 0===this._onPointerDown&&(this._onPointerDown=function(a){b||a.preventDefault(),d._pointerPressed.push(a.pointerId),1===d._pointerPressed.length&&(c={x:a.clientX,y:a.clientY})},this._onPointerUp=function(a){b||a.preventDefault();var e=d._pointerPressed.indexOf(a.pointerId);-1!==e&&(d._pointerPressed.splice(e,1),0==e&&(c=null,d._offsetX=null,d._offsetY=null))},this._onPointerMove=function(a){if(b||a.preventDefault(),c){var e=d._pointerPressed.indexOf(a.pointerId);0==e&&(d._offsetX=a.clientX-c.x,d._offsetY=-(a.clientY-c.y))}},this._onLostFocus=function(){d._offsetX=null,d._offsetY=null}),a.addEventListener("pointerdown",this._onPointerDown),a.addEventListener("pointerup",this._onPointerUp),a.addEventListener("pointerout",this._onPointerUp),a.addEventListener("pointermove",this._onPointerMove),BABYLON.Tools.RegisterTopRootEvents([{name:"blur",handler:this._onLostFocus}]))},BABYLON.TouchCamera.prototype.detachControl=function(a){this._attachedCanvas==a&&(a.removeEventListener("pointerdown",this._onPointerDown),a.removeEventListener("pointerup",this._onPointerUp),a.removeEventListener("pointerout",this._onPointerUp),a.removeEventListener("pointermove",this._onPointerMove),BABYLON.Tools.UnregisterTopRootEvents([{name:"blur",handler:this._onLostFocus}]),this._attachedCanvas=null)},BABYLON.TouchCamera.prototype._checkInputs=function(){if(this._offsetX)if(this.cameraRotation.y+=this._offsetX/this.angularSensibility,this._pointerPressed.length>1)this.cameraRotation.x+=-this._offsetY/this.angularSensibility;else{var a=this._computeLocalCameraSpeed(),b=new BABYLON.Vector3(0,0,a*this._offsetY/this.moveSensibility);BABYLON.Matrix.RotationYawPitchRollToRef(this.rotation.y,this.rotation.x,0,this._cameraRotationMatrix),this.cameraDirection.addInPlace(BABYLON.Vector3.TransformCoordinates(b,this._cameraRotationMatrix))}}}();var BABYLON=BABYLON||{};!function(){BABYLON.DeviceOrientationCamera=function(a,b,c){BABYLON.FreeCamera.call(this,a,b,c),this._offsetX=null,this._offsetY=null,this._orientationGamma=0,this._orientationBeta=0,this._initialOrientationGamma=0,this._initialOrientationBeta=0},BABYLON.DeviceOrientationCamera.prototype=Object.create(BABYLON.FreeCamera.prototype),BABYLON.DeviceOrientationCamera.prototype.angularSensibility=1e4,BABYLON.DeviceOrientationCamera.prototype.moveSensibility=50,BABYLON.DeviceOrientationCamera.prototype.attachControl=function(a){if(!this._attachedCanvas){this._attachedCanvas=a;var b=this;this._orientationChanged||(this._orientationChanged=function(a){b._initialOrientationGamma||(b._initialOrientationGamma=a.gamma,b._initialOrientationBeta=a.beta),b._orientationGamma=a.gamma,b._orientationBeta=a.beta,b._offsetY=b._initialOrientationBeta-b._orientationBeta,b._offsetX=b._initialOrientationGamma-b._orientationGamma}),window.addEventListener("deviceorientation",this._orientationChanged)}},BABYLON.DeviceOrientationCamera.prototype.detachControl=function(a){this._attachedCanvas==a&&(window.removeEventListener("deviceorientation",this._orientationChanged),this._attachedCanvas=null,this._orientationGamma=0,this._orientationBeta=0,this._initialOrientationGamma=0,this._initialOrientationBeta=0)},BABYLON.DeviceOrientationCamera.prototype._checkInputs=function(){if(this._offsetX){this.cameraRotation.y-=this._offsetX/this.angularSensibility;var a=this._computeLocalCameraSpeed(),b=new BABYLON.Vector3(0,0,a*this._offsetY/this.moveSensibility);BABYLON.Matrix.RotationYawPitchRollToRef(this.rotation.y,this.rotation.x,0,this._cameraRotationMatrix),this.cameraDirection.addInPlace(BABYLON.Vector3.TransformCoordinates(b,this._cameraRotationMatrix))}}}();var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=a.Tools.GetPointerPrefix(),c=function(c){function d(b,d,e,f,g,h){c.call(this,b,a.Vector3.Zero(),h),this.alpha=d,this.beta=e,this.radius=f,this.target=g,this.inertialAlphaOffset=0,this.inertialBetaOffset=0,this.inertialRadiusOffset=0,this.lowerAlphaLimit=null,this.upperAlphaLimit=null,this.lowerBetaLimit=.01,this.upperBetaLimit=Math.PI,this.lowerRadiusLimit=null,this.upperRadiusLimit=null,this.angularSensibility=1e3,this.wheelPrecision=3,this.keysUp=[38],this.keysDown=[40],this.keysLeft=[37],this.keysRight=[39],this.zoomOnFactor=1,this._keys=[],this._viewMatrix=new a.Matrix,this.getViewMatrix()}return __extends(d,c),d.prototype._getTargetPosition=function(){return this.target.position||this.target},d.prototype._initCache=function(){c.prototype._initCache.call(this),this._cache.target=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this._cache.alpha=void 0,this._cache.beta=void 0,this._cache.radius=void 0},d.prototype._updateCache=function(a){a||c.prototype._updateCache.call(this),this._cache.target.copyFrom(this._getTargetPosition()),this._cache.alpha=this.alpha,this._cache.beta=this.beta,this._cache.radius=this.radius},d.prototype._isSynchronizedViewMatrix=function(){return c.prototype._isSynchronizedViewMatrix.call(this)?this._cache.target.equals(this._getTargetPosition())&&this._cache.alpha===this.alpha&&this._cache.beta===this.beta&&this._cache.radius===this.radius:!1},d.prototype.attachControl=function(c,d){var e,f,g=this;if(!this._attachedElement){this._attachedElement=c;var h=this.getEngine();void 0===this._onPointerDown&&(this._onPointerDown=function(a){f||(f=a.pointerId,e={x:a.clientX,y:a.clientY},d||a.preventDefault())},this._onPointerUp=function(a){e=null,f=null,d||a.preventDefault()},this._onPointerMove=function(a){if(e&&f===a.pointerId){var b=a.clientX-e.x,c=a.clientY-e.y;g.inertialAlphaOffset-=b/g.angularSensibility,g.inertialBetaOffset-=c/g.angularSensibility,e={x:a.clientX,y:a.clientY},d||a.preventDefault()}},this._onMouseMove=function(a){if(h.isPointerLock){var b=a.movementX||a.mozMovementX||a.webkitMovementX||a.msMovementX||0,c=a.movementY||a.mozMovementY||a.webkitMovementY||a.msMovementY||0;g.inertialAlphaOffset-=b/g.angularSensibility,g.inertialBetaOffset-=c/g.angularSensibility,d||a.preventDefault()}},this._wheel=function(a){var b=0;a.wheelDelta?b=a.wheelDelta/(40*g.wheelPrecision):a.detail&&(b=-a.detail/g.wheelPrecision),b&&(g.inertialRadiusOffset+=b),a.preventDefault&&(d||a.preventDefault())},this._onKeyDown=function(a){if(-1!==g.keysUp.indexOf(a.keyCode)||-1!==g.keysDown.indexOf(a.keyCode)||-1!==g.keysLeft.indexOf(a.keyCode)||-1!==g.keysRight.indexOf(a.keyCode)){var b=g._keys.indexOf(a.keyCode);-1===b&&g._keys.push(a.keyCode),a.preventDefault&&(d||a.preventDefault())}},this._onKeyUp=function(a){if(-1!==g.keysUp.indexOf(a.keyCode)||-1!==g.keysDown.indexOf(a.keyCode)||-1!==g.keysLeft.indexOf(a.keyCode)||-1!==g.keysRight.indexOf(a.keyCode)){var b=g._keys.indexOf(a.keyCode);b>=0&&g._keys.splice(b,1),a.preventDefault&&(d||a.preventDefault())}},this._onLostFocus=function(){g._keys=[],f=null},this._onGestureStart=function(a){void 0!==window.MSGesture&&(g._MSGestureHandler||(g._MSGestureHandler=new MSGesture,g._MSGestureHandler.target=c),g._MSGestureHandler.addPointer(a.pointerId))},this._onGesture=function(a){g.radius*=a.scale,a.preventDefault&&(d||(a.stopPropagation(),a.preventDefault()))},this._reset=function(){g._keys=[],g.inertialAlphaOffset=0,g.inertialBetaOffset=0,g.inertialRadiusOffset=0,e=null,f=null}),c.addEventListener(b+"down",this._onPointerDown,!1),c.addEventListener(b+"up",this._onPointerUp,!1),c.addEventListener(b+"out",this._onPointerUp,!1),c.addEventListener(b+"move",this._onPointerMove,!1),c.addEventListener("mousemove",this._onMouseMove,!1),c.addEventListener("MSPointerDown",this._onGestureStart,!1),c.addEventListener("MSGestureChange",this._onGesture,!1),c.addEventListener("mousewheel",this._wheel,!1),c.addEventListener("DOMMouseScroll",this._wheel,!1),a.Tools.RegisterTopRootEvents([{name:"keydown",handler:this._onKeyDown},{name:"keyup",handler:this._onKeyUp},{name:"blur",handler:this._onLostFocus}])}},d.prototype.detachControl=function(c){this._attachedElement==c&&(c.removeEventListener(b+"down",this._onPointerDown),c.removeEventListener(b+"up",this._onPointerUp),c.removeEventListener(b+"out",this._onPointerUp),c.removeEventListener(b+"move",this._onPointerMove),c.removeEventListener("mousemove",this._onMouseMove),c.removeEventListener("MSPointerDown",this._onGestureStart),c.removeEventListener("MSGestureChange",this._onGesture),c.removeEventListener("mousewheel",this._wheel),c.removeEventListener("DOMMouseScroll",this._wheel),a.Tools.UnregisterTopRootEvents([{name:"keydown",handler:this._onKeyDown},{name:"keyup",handler:this._onKeyUp},{name:"blur",handler:this._onLostFocus}]),this._MSGestureHandler=null,this._attachedElement=null,this._reset&&this._reset())},d.prototype._update=function(){for(var b=0;b<this._keys.length;b++){var c=this._keys[b];-1!==this.keysLeft.indexOf(c)?this.inertialAlphaOffset-=.01:-1!==this.keysUp.indexOf(c)?this.inertialBetaOffset-=.01:-1!==this.keysRight.indexOf(c)?this.inertialAlphaOffset+=.01:-1!==this.keysDown.indexOf(c)&&(this.inertialBetaOffset+=.01)}(0!=this.inertialAlphaOffset||0!=this.inertialBetaOffset||0!=this.inertialRadiusOffset)&&(this.alpha+=this.inertialAlphaOffset,this.beta+=this.inertialBetaOffset,this.radius-=this.inertialRadiusOffset,this.inertialAlphaOffset*=this.inertia,this.inertialBetaOffset*=this.inertia,this.inertialRadiusOffset*=this.inertia,Math.abs(this.inertialAlphaOffset)<a.Engine.Epsilon&&(this.inertialAlphaOffset=0),Math.abs(this.inertialBetaOffset)<a.Engine.Epsilon&&(this.inertialBetaOffset=0),Math.abs(this.inertialRadiusOffset)<a.Engine.Epsilon&&(this.inertialRadiusOffset=0)),this.lowerAlphaLimit&&this.alpha<this.lowerAlphaLimit&&(this.alpha=this.lowerAlphaLimit),this.upperAlphaLimit&&this.alpha>this.upperAlphaLimit&&(this.alpha=this.upperAlphaLimit),this.lowerBetaLimit&&this.beta<this.lowerBetaLimit&&(this.beta=this.lowerBetaLimit),this.upperBetaLimit&&this.beta>this.upperBetaLimit&&(this.beta=this.upperBetaLimit),this.lowerRadiusLimit&&this.radius<this.lowerRadiusLimit&&(this.radius=this.lowerRadiusLimit),this.upperRadiusLimit&&this.radius>this.upperRadiusLimit&&(this.radius=this.upperRadiusLimit)},d.prototype.setPosition=function(a){var b=a.subtract(this._getTargetPosition());this.radius=b.length(),this.alpha=Math.acos(b.x/Math.sqrt(Math.pow(b.x,2)+Math.pow(b.z,2))),b.z<0&&(this.alpha=2*Math.PI-this.alpha),this.beta=Math.acos(b.y/this.radius)},d.prototype._getViewMatrix=function(){var b=Math.cos(this.alpha),c=Math.sin(this.alpha),d=Math.cos(this.beta),e=Math.sin(this.beta),f=this._getTargetPosition();return f.addToRef(new a.Vector3(this.radius*b*e,this.radius*d,this.radius*c*e),this.position),a.Matrix.LookAtLHToRef(this.position,f,this.upVector,this._viewMatrix),this._viewMatrix},d.prototype.zoomOn=function(b){b=b||this.getScene().meshes;var c=a.Mesh.MinMax(b),d=a.Vector3.Distance(c.min,c.max);this.radius=d*this.zoomOnFactor,this.focusOn({min:c.min,max:c.max,distance:d})},d.prototype.focusOn=function(b){var c,d;void 0===b.min?(c=b||this.getScene().meshes,c=a.Mesh.MinMax(c),d=a.Vector3.Distance(c.min,c.max)):(c=b,d=b.distance),this.target=a.Mesh.Center(c),this.maxZ=2*d},d}(a.Camera);a.ArcRotateCamera=c}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b){this.autoClear=!0,this.clearColor=new a.Color3(.2,.2,.3),this.ambientColor=new a.Color3(0,0,0),this.forceWireframe=!1,this.fogMode=a.Scene.FOGMODE_NONE,this.fogColor=new a.Color3(.2,.2,.3),this.fogDensity=.1,this.fogStart=0,this.fogEnd=1e3,this.lightsEnabled=!0,this.lights=new Array,this.cameras=new Array,this.activeCameras=new Array,this.meshes=new Array,this._geometries=new Array,this.materials=new Array,this.multiMaterials=new Array,this.defaultMaterial=new a.StandardMaterial("default material",this),this.texturesEnabled=!0,this.textures=new Array,this.particlesEnabled=!0,this.particleSystems=new Array,this.spriteManagers=new Array,this.layers=new Array,this.skeletons=new Array,this.lensFlareSystems=new Array,this.collisionsEnabled=!0,this.gravity=new a.Vector3(0,-9,0),this.postProcessesEnabled=!0,this.renderTargetsEnabled=!0,this.customRenderTargets=new Array,this.importedMeshesFiles=new Array,this._totalVertices=0,this._activeVertices=0,this._activeParticles=0,this._lastFrameDuration=0,this._evaluateActiveMeshesDuration=0,this._renderTargetsDuration=0,this._particlesDuration=0,this._renderDuration=0,this._spritesDuration=0,this._animationRatio=0,this._renderId=0,this._executeWhenReadyTimeoutId=-1,this._toBeDisposed=new a.SmartArray(256),this._onReadyCallbacks=new Array,this._pendingData=[],this._onBeforeRenderCallbacks=new Array,this._activeMeshes=new a.SmartArray(256),this._processedMaterials=new a.SmartArray(256),this._renderTargets=new a.SmartArray(256),this._activeParticleSystems=new a.SmartArray(256),this._activeSkeletons=new a.SmartArray(32),this._activeAnimatables=new Array,this._transformMatrix=a.Matrix.Zero(),this._scaledPosition=a.Vector3.Zero(),this._scaledVelocity=a.Vector3.Zero(),this._engine=b,b.scenes.push(this),this._renderingManager=new a.RenderingManager(this),this.postProcessManager=new a.PostProcessManager(this),this.postProcessRenderPipelineManager=new a.PostProcessRenderPipelineManager,this._boundingBoxRenderer=new a.BoundingBoxRenderer(this),this.attachControl()}return Object.defineProperty(b.prototype,"meshUnderPointer",{get:function(){return this._meshUnderPointer},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"pointerX",{get:function(){return this._pointerX},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"pointerY",{get:function(){return this._pointerY},enumerable:!0,configurable:!0}),b.prototype.getBoundingBoxRenderer=function(){return this._boundingBoxRenderer},b.prototype.getEngine=function(){return this._engine},b.prototype.getTotalVertices=function(){return this._totalVertices},b.prototype.getActiveVertices=function(){return this._activeVertices},b.prototype.getActiveParticles=function(){return this._activeParticles},b.prototype.getLastFrameDuration=function(){return this._lastFrameDuration},b.prototype.getEvaluateActiveMeshesDuration=function(){return this._evaluateActiveMeshesDuration},b.prototype.getActiveMeshes=function(){return this._activeMeshes},b.prototype.getRenderTargetsDuration=function(){return this._renderTargetsDuration},b.prototype.getRenderDuration=function(){return this._renderDuration},b.prototype.getParticlesDuration=function(){return this._particlesDuration},b.prototype.getSpritesDuration=function(){return this._spritesDuration},b.prototype.getAnimationRatio=function(){return this._animationRatio},b.prototype.getRenderId=function(){return this._renderId},b.prototype.attachControl=function(){var b=this;this._onPointerMove=function(a){var c=b._engine.getRenderingCanvas();b._pointerX=a.offsetX||a.layerX,b._pointerY=a.offsetY||a.layerY;var d=b.pick(b._pointerX,b._pointerY,function(a){return a.actionManager&&a.isPickable});d.hit?(b.setPointerOverMesh(d.pickedMesh),c.style.cursor="pointer",b._meshUnderPointer=d.pickedMesh):(b.setPointerOverMesh(null),c.style.cursor="",b._meshUnderPointer=null)},this._onPointerDown=function(c){var d=b.pick(c.offsetX||c.layerX,c.offsetY||c.layerY);if(d.hit&&d.pickedMesh.actionManager){switch(c.buttons){case 1:d.pickedMesh.actionManager.processTrigger(a.ActionManager.OnLeftPickTrigger,a.ActionEvent.CreateNew(d.pickedMesh));break;case 2:d.pickedMesh.actionManager.processTrigger(a.ActionManager.OnRightPickTrigger,a.ActionEvent.CreateNew(d.pickedMesh));break;case 3:d.pickedMesh.actionManager.processTrigger(a.ActionManager.OnCenterPickTrigger,a.ActionEvent.CreateNew(d.pickedMesh))}d.pickedMesh.actionManager.processTrigger(a.ActionManager.OnPickTrigger,a.ActionEvent.CreateNew(d.pickedMesh))}b.onPointerDown&&b.onPointerDown(c,d)};var c=a.Tools.GetPointerPrefix();this._engine.getRenderingCanvas().addEventListener(c+"move",this._onPointerMove,!1),this._engine.getRenderingCanvas().addEventListener(c+"down",this._onPointerDown,!1)},b.prototype.detachControl=function(){var b=a.Tools.GetPointerPrefix();this._engine.getRenderingCanvas().removeEventListener(b+"move",this._onPointerMove),this._engine.getRenderingCanvas().removeEventListener(b+"down",this._onPointerDown)},b.prototype.isReady=function(){if(this._pendingData.length>0)return!1;for(var b=0;b<this._geometries.length;b++){var c=this._geometries[b];if(c.delayLoadState===a.Engine.DELAYLOADSTATE_LOADING)return!1}for(b=0;b<this.meshes.length;b++){var d=this.meshes[b];if(!d.isReady())return!1;var e=d.material;if(e&&!e.isReady(d))return!1}return!0},b.prototype.registerBeforeRender=function(a){this._onBeforeRenderCallbacks.push(a)},b.prototype.unregisterBeforeRender=function(a){var b=this._onBeforeRenderCallbacks.indexOf(a);b>-1&&this._onBeforeRenderCallbacks.splice(b,1)},b.prototype._addPendingData=function(a){this._pendingData.push(a)},b.prototype._removePendingData=function(a){var b=this._pendingData.indexOf(a);-1!==b&&this._pendingData.splice(b,1)},b.prototype.getWaitingItemsCount=function(){return this._pendingData.length},b.prototype.executeWhenReady=function(a){var b=this;this._onReadyCallbacks.push(a),-1===this._executeWhenReadyTimeoutId&&(this._executeWhenReadyTimeoutId=setTimeout(function(){b._checkIsReady()},150))},b.prototype._checkIsReady=function(){var a=this;return this.isReady()?(this._onReadyCallbacks.forEach(function(a){a()}),this._onReadyCallbacks=[],void(this._executeWhenReadyTimeoutId=-1)):void(this._executeWhenReadyTimeoutId=setTimeout(function(){a._checkIsReady()},150))},b.prototype.beginAnimation=function(b,c,d,e,f,g,h){if(void 0===f&&(f=1),this.stopAnimation(b),h||(h=new a.Animatable(this,b,c,d,e,f,g)),b.animations&&h.appendAnimations(b,b.animations),b.getAnimatables)for(var i=b.getAnimatables(),j=0;j<i.length;j++)this.beginAnimation(i[j],c,d,e,f,g,h);return h},b.prototype.beginDirectAnimation=function(b,c,d,e,f,g,h){void 0===g&&(g=1);var i=new a.Animatable(this,b,d,e,f,g,h,c);return i},b.prototype.getAnimatableByTarget=function(a){for(var b=0;b<this._activeAnimatables.length;b++)if(this._activeAnimatables[b].target===a)return this._activeAnimatables[b];return null},b.prototype.stopAnimation=function(a){var b=this.getAnimatableByTarget(a);b&&b.stop()},b.prototype._animate=function(){this._animationStartDate||(this._animationStartDate=(new Date).getTime());for(var a=(new Date).getTime(),b=a-this._animationStartDate,c=0;c<this._activeAnimatables.length;c++)this._activeAnimatables[c]._animate(b)||(this._activeAnimatables.splice(c,1),c--)},b.prototype.getViewMatrix=function(){return this._viewMatrix},b.prototype.getProjectionMatrix=function(){return this._projectionMatrix},b.prototype.getTransformMatrix=function(){return this._transformMatrix},b.prototype.setTransformMatrix=function(a,b){this._viewMatrix=a,this._projectionMatrix=b,this._viewMatrix.multiplyToRef(this._projectionMatrix,this._transformMatrix)},b.prototype.setActiveCameraByID=function(a){var b=this.getCameraByID(a);return b?(this.activeCamera=b,b):null},b.prototype.setActiveCameraByName=function(a){var b=this.getCameraByName(a);return b?(this.activeCamera=b,b):null},b.prototype.getMaterialByID=function(a){for(var b=0;b<this.materials.length;b++)if(this.materials[b].id===a)return this.materials[b];return null},b.prototype.getMaterialByName=function(a){for(var b=0;b<this.materials.length;b++)if(this.materials[b].name===a)return this.materials[b];return null},b.prototype.getCameraByID=function(a){for(var b=0;b<this.cameras.length;b++)if(this.cameras[b].id===a)return this.cameras[b];return null},b.prototype.getCameraByName=function(a){for(var b=0;b<this.cameras.length;b++)if(this.cameras[b].name===a)return this.cameras[b];return null},b.prototype.getLightByName=function(a){for(var b=0;b<this.lights.length;b++)if(this.lights[b].name===a)return this.lights[b];return null},b.prototype.getLightByID=function(a){for(var b=0;b<this.lights.length;b++)if(this.lights[b].id===a)return this.lights[b];return null},b.prototype.getGeometryByID=function(a){for(var b=0;b<this._geometries.length;b++)if(this._geometries[b].id===a)return this._geometries[b];return null},b.prototype.pushGeometry=function(a,b){return!b&&this.getGeometryByID(a.id)?!1:(this._geometries.push(a),!0)},b.prototype.getGeometries=function(){return this._geometries
},b.prototype.getMeshByID=function(a){for(var b=0;b<this.meshes.length;b++)if(this.meshes[b].id===a)return this.meshes[b];return null},b.prototype.getLastMeshByID=function(a){for(var b=this.meshes.length-1;b>=0;b--)if(this.meshes[b].id===a)return this.meshes[b];return null},b.prototype.getLastEntryByID=function(a){for(var b=this.meshes.length-1;b>=0;b--)if(this.meshes[b].id===a)return this.meshes[b];for(b=this.cameras.length-1;b>=0;b--)if(this.cameras[b].id===a)return this.cameras[b];for(b=this.lights.length-1;b>=0;b--)if(this.lights[b].id===a)return this.lights[b];return null},b.prototype.getMeshByName=function(a){for(var b=0;b<this.meshes.length;b++)if(this.meshes[b].name===a)return this.meshes[b];return null},b.prototype.getLastSkeletonByID=function(a){for(var b=this.skeletons.length-1;b>=0;b--)if(this.skeletons[b].id===a)return this.skeletons[b];return null},b.prototype.getSkeletonById=function(a){for(var b=0;b<this.skeletons.length;b++)if(this.skeletons[b].id===a)return this.skeletons[b];return null},b.prototype.getSkeletonByName=function(a){for(var b=0;b<this.skeletons.length;b++)if(this.skeletons[b].name===a)return this.skeletons[b];return null},b.prototype.isActiveMesh=function(a){return-1!==this._activeMeshes.indexOf(a)},b.prototype._evaluateSubMesh=function(a,b){if(1==b.subMeshes.length||a.isInFrustum(this._frustumPlanes)){var c=a.getMaterial();b.showSubMeshesBoundingBox&&this._boundingBoxRenderer.renderList.push(a.getBoundingInfo().boundingBox),c&&(c.getRenderTargetTextures&&-1===this._processedMaterials.indexOf(c)&&(this._processedMaterials.push(c),this._renderTargets.concat(c.getRenderTargetTextures())),this._activeVertices+=a.verticesCount,this._renderingManager.dispatch(a))}},b.prototype._evaluateActiveMeshes=function(){this._activeMeshes.reset(),this._renderingManager.reset(),this._processedMaterials.reset(),this._activeParticleSystems.reset(),this._activeSkeletons.reset(),this._boundingBoxRenderer.reset(),this._frustumPlanes?a.Frustum.GetPlanesToRef(this._transformMatrix,this._frustumPlanes):this._frustumPlanes=a.Frustum.GetPlanes(this._transformMatrix);var b,c;if(this._selectionOctree){var d=this._selectionOctree.select(this._frustumPlanes);b=d.data,c=d.length}else c=this.meshes.length,b=this.meshes;for(var e=0;c>e;e++){var f=b[e];this._totalVertices+=f.getTotalVertices(),f.isReady()&&(f.computeWorldMatrix(),f._preActivate(),f.isEnabled()&&f.isVisible&&f.visibility>0&&0!=(f.layerMask&this.activeCamera.layerMask)&&f.isInFrustum(this._frustumPlanes)&&(this._activeMeshes.push(f),f._activate(this._renderId),this._activeMesh(f)))}var g=(new Date).getTime();if(this.particlesEnabled)for(var h=0;h<this.particleSystems.length;h++){var i=this.particleSystems[h];i.isStarted()&&(!i.emitter.position||i.emitter&&i.emitter.isEnabled())&&(this._activeParticleSystems.push(i),i.animate())}this._particlesDuration+=(new Date).getTime()-g},b.prototype._activeMesh=function(a){if(a.skeleton&&this._activeSkeletons.pushNoDuplicate(a.skeleton),a.showBoundingBox&&this._boundingBoxRenderer.renderList.push(a.getBoundingInfo().boundingBox),a.subMeshes){var b,c;if(a._submeshesOctree&&a.useOctreeForRenderingSelection){var d=a._submeshesOctree.select(this._frustumPlanes);b=d.length,c=d.data}else c=a.subMeshes,b=c.length;for(var e=0;b>e;e++){var f=c[e];this._evaluateSubMesh(f,a)}}},b.prototype.updateTransformMatrix=function(a){this.setTransformMatrix(this.activeCamera.getViewMatrix(),this.activeCamera.getProjectionMatrix(a))},b.prototype._renderForCamera=function(a){var b=this._engine;if(this.activeCamera=a,!this.activeCamera)throw new Error("Active camera not set");b.setViewport(this.activeCamera.viewport),this._renderId++,this.updateTransformMatrix(),this.beforeCameraRender&&this.beforeCameraRender(this.activeCamera);var c=(new Date).getTime();this._evaluateActiveMeshes(),this._evaluateActiveMeshesDuration+=(new Date).getTime()-c;for(var d=0;d<this._activeSkeletons.length;d++){var e=this._activeSkeletons.data[d];e.prepare()}for(var f=0;f<this.customRenderTargets.length;f++){var g=this.customRenderTargets[f];this._renderTargets.push(g)}var h=(new Date).getTime();if(this.renderTargetsEnabled){for(var i=0;i<this._renderTargets.length;i++)g=this._renderTargets.data[i],g._shouldRender()&&(this._renderId++,g.render());this._renderId++}this._renderTargets.length>0&&b.restoreDefaultFramebuffer(),this._renderTargetsDuration=(new Date).getTime()-h,this.postProcessManager._prepareFrame();var j=(new Date).getTime();if(this.layers.length){b.setDepthBuffer(!1);var k,l;for(k=0;k<this.layers.length;k++)l=this.layers[k],l.isBackground&&l.render();b.setDepthBuffer(!0)}this._renderingManager.render(null,null,!0,!0),this._boundingBoxRenderer.render();for(var m=0;m<this.lensFlareSystems.length;m++)this.lensFlareSystems[m].render();if(this.layers.length){for(b.setDepthBuffer(!1),k=0;k<this.layers.length;k++)l=this.layers[k],l.isBackground||l.render();b.setDepthBuffer(!0)}this._renderDuration+=(new Date).getTime()-j,this.postProcessManager._finalizeFrame(a.isIntermediate),this.activeCamera._updateFromScene(),this._renderTargets.reset(),this.afterCameraRender&&this.afterCameraRender(this.activeCamera)},b.prototype._processSubCameras=function(a){if(0==a.subCameras.length)return void this._renderForCamera(a);for(var b=0;b<a.subCameras.length;b++)this._renderForCamera(a.subCameras[b]);this.activeCamera=a,this.setTransformMatrix(this.activeCamera.getViewMatrix(),this.activeCamera.getProjectionMatrix()),this.activeCamera._updateFromScene()},b.prototype.render=function(){var b=(new Date).getTime();this._particlesDuration=0,this._spritesDuration=0,this._activeParticles=0,this._renderDuration=0,this._evaluateActiveMeshesDuration=0,this._totalVertices=0,this._activeVertices=0,this.actionManager&&this.actionManager.processTrigger(a.ActionManager.OnEveryFrameTrigger,null),this.beforeRender&&this.beforeRender();for(var c=0;c<this._onBeforeRenderCallbacks.length;c++)this._onBeforeRenderCallbacks[c]();var d=a.Tools.GetDeltaTime();this._animationRatio=.06*d,this._animate(),this._physicsEngine&&this._physicsEngine._runOneStep(d/1e3),this._engine.clear(this.clearColor,this.autoClear||this.forceWireframe,!0);for(var e=0;e<this.lights.length;e++){var f=this.lights[e],g=f.getShadowGenerator();f.isEnabled()&&g&&-1!==g.getShadowMap().getScene().textures.indexOf(g.getShadowMap())&&this._renderTargets.push(g.getShadowMap())}if(this.postProcessRenderPipelineManager.update(),this.activeCameras.length>0)for(var h=this._renderId,i=0;i<this.activeCameras.length;i++)this._renderId=h,this._processSubCameras(this.activeCameras[i]);else this._processSubCameras(this.activeCamera);this.afterRender&&this.afterRender();for(var j=0;j<this._toBeDisposed.length;j++)this._toBeDisposed.data[j].dispose(),this._toBeDisposed[j]=null;this._toBeDisposed.reset(),this._lastFrameDuration=(new Date).getTime()-b},b.prototype.dispose=function(){this.beforeRender=null,this.afterRender=null,this.skeletons=[],this._boundingBoxRenderer.dispose(),this.detachControl();var a,b=this._engine.getRenderingCanvas();for(a=0;a<this.cameras.length;a++)this.cameras[a].detachControl(b);for(;this.lights.length;)this.lights[0].dispose();for(;this.meshes.length;)this.meshes[0].dispose(!0);for(;this.cameras.length;)this.cameras[0].dispose();for(;this.materials.length;)this.materials[0].dispose();for(;this.particleSystems.length;)this.particleSystems[0].dispose();for(;this.spriteManagers.length;)this.spriteManagers[0].dispose();for(;this.layers.length;)this.layers[0].dispose();for(;this.textures.length;)this.textures[0].dispose();this.postProcessManager.dispose(),this._physicsEngine&&this.disablePhysicsEngine(),a=this._engine.scenes.indexOf(this),this._engine.scenes.splice(a,1),this._engine.wipeCaches()},b.prototype._getNewPosition=function(a,b,c,d,e){a.divideToRef(c.radius,this._scaledPosition),b.divideToRef(c.radius,this._scaledVelocity),c.retry=0,c.initialVelocity=this._scaledVelocity,c.initialPosition=this._scaledPosition,this._collideWithWorld(this._scaledPosition,this._scaledVelocity,c,d,e),e.multiplyInPlace(c.radius)},b.prototype._collideWithWorld=function(b,c,d,e,f){var g=10*a.Engine.CollisionsEpsilon;if(d.retry>=e)return void f.copyFrom(b);d._initialize(b,c,g);for(var h=0;h<this.meshes.length;h++){var i=this.meshes[h];i.isEnabled()&&i.checkCollisions&&i._checkCollision(d)}return d.collisionFound?((0!=c.x||0!=c.y||0!=c.z)&&d._getResponse(b,c),c.length()<=g?void f.copyFrom(b):(d.retry++,void this._collideWithWorld(b,c,d,e,f))):void b.addToRef(c,f)},b.prototype.createOrUpdateSelectionOctree=function(b,c){"undefined"==typeof b&&(b=64),"undefined"==typeof c&&(c=2),this._selectionOctree||(this._selectionOctree=new a.Octree(a.Octree.CreationFuncForMeshes,b,c));for(var d=new a.Vector3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e=new a.Vector3(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),f=0;f<this.meshes.length;f++){var g=this.meshes[f];g.computeWorldMatrix(!0);var h=g.getBoundingInfo().boundingBox.minimumWorld,i=g.getBoundingInfo().boundingBox.maximumWorld;a.Tools.CheckExtends(h,d,e),a.Tools.CheckExtends(i,d,e)}return this._selectionOctree.update(d,e,this.meshes),this._selectionOctree},b.prototype.createPickingRay=function(b,c,d,e){var f=this._engine;if(!e){if(!this.activeCamera)throw new Error("Active camera not set");e=this.activeCamera}var g=e.viewport,h=g.toGlobal(f);return b=b/this._engine.getHardwareScalingLevel()-h.x,c=c/this._engine.getHardwareScalingLevel()-(this._engine.getRenderHeight()-h.y-h.height),a.Ray.CreateNew(b,c,h.width,h.height,d?d:a.Matrix.Identity(),e.getViewMatrix(),e.getProjectionMatrix())},b.prototype._internalPick=function(b,c,d){for(var e=null,f=0;f<this.meshes.length;f++){var g=this.meshes[f];if(c){if(!c(g))continue}else if(!g.isEnabled()||!g.isVisible||!g.isPickable)continue;var h=g.getWorldMatrix(),i=b(h),j=g.intersects(i,d);if(j&&j.hit&&(d||null==e||!(j.distance>=e.distance))&&(e=j,d))break}return e||new a.PickingInfo},b.prototype.pick=function(a,b,c,d,e){var f=this;return this._internalPick(function(c){return f.createPickingRay(a,b,c,e)},c,d)},b.prototype.pickWithRay=function(b,c,d){var e=this;return this._internalPick(function(c){return e._pickWithRayInverseMatrix||(e._pickWithRayInverseMatrix=a.Matrix.Identity()),c.invertToRef(e._pickWithRayInverseMatrix),a.Ray.Transform(b,e._pickWithRayInverseMatrix)},c,d)},b.prototype.setPointerOverMesh=function(b){this._pointerOverMesh!==b&&(this._pointerOverMesh&&this._pointerOverMesh.actionManager&&this._pointerOverMesh.actionManager.processTrigger(a.ActionManager.OnPointerOutTrigger,a.ActionEvent.CreateNew(this._pointerOverMesh)),this._pointerOverMesh=b,this._pointerOverMesh&&this._pointerOverMesh.actionManager&&this._pointerOverMesh.actionManager.processTrigger(a.ActionManager.OnPointerOverTrigger,a.ActionEvent.CreateNew(this._pointerOverMesh)))},b.prototype.getPointerOverMesh=function(){return this._pointerOverMesh},b.prototype.getPhysicsEngine=function(){return this._physicsEngine},b.prototype.enablePhysics=function(b,c){return this._physicsEngine?!0:(this._physicsEngine=new a.PhysicsEngine(c),this._physicsEngine.isSupported()?(this._physicsEngine._initialize(b),!0):(this._physicsEngine=null,!1))},b.prototype.disablePhysicsEngine=function(){this._physicsEngine&&(this._physicsEngine.dispose(),this._physicsEngine=void 0)},b.prototype.isPhysicsEnabled=function(){return void 0!==this._physicsEngine},b.prototype.setGravity=function(a){this._physicsEngine&&this._physicsEngine._setGravity(a)},b.prototype.createCompoundImpostor=function(a,b){if(a.parts&&(b=a,a=a.parts),!this._physicsEngine)return null;for(var c=0;c<a.length;c++){var d=a[c].mesh;d._physicImpostor=a[c].impostor,d._physicsMass=b.mass/a.length,d._physicsFriction=b.friction,d._physicRestitution=b.restitution}return this._physicsEngine._registerMeshesAsCompound(a,b)},b.prototype.deleteCompoundImpostor=function(b){for(var c=0;c<b.parts.length;c++){var d=b.parts[c].mesh;d._physicImpostor=a.PhysicsEngine.NoImpostor,this._physicsEngine._unregisterMesh(d)}},b.prototype._getByTags=function(b,c){if(void 0===c)return b;var d=[];for(var e in b){var f=b[e];a.Tags.MatchesQuery(f,c)&&d.push(f)}return d},b.prototype.getMeshesByTags=function(a){return this._getByTags(this.meshes,a)},b.prototype.getCamerasByTags=function(a){return this._getByTags(this.cameras,a)},b.prototype.getLightsByTags=function(a){return this._getByTags(this.lights,a)},b.prototype.getMaterialByTags=function(a){return this._getByTags(this.materials,a).concat(this._getByTags(this.multiMaterials,a))},b.FOGMODE_NONE=0,b.FOGMODE_EXP=1,b.FOGMODE_EXP2=2,b.FOGMODE_LINEAR=3,b}();a.Scene=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(c,d,e,f,g){switch(this._engine=c instanceof a.Mesh?c.getScene().getEngine():c,this._updatable=f,this._data=d,g||this.create(),this._kind=e,e){case b.PositionKind:this._strideSize=3;break;case b.NormalKind:this._strideSize=3;break;case b.UVKind:this._strideSize=2;break;case b.UV2Kind:this._strideSize=2;break;case b.ColorKind:this._strideSize=3;break;case b.MatricesIndicesKind:this._strideSize=4;break;case b.MatricesWeightsKind:this._strideSize=4}}return b.prototype.isUpdatable=function(){return this._updatable},b.prototype.getData=function(){return this._data},b.prototype.getBuffer=function(){return this._buffer},b.prototype.getStrideSize=function(){return this._strideSize},b.prototype.create=function(a){(a||!this._buffer)&&(a=a||this._data,this._buffer||(this._buffer=this._updatable?this._engine.createDynamicVertexBuffer(4*a.length):this._engine.createVertexBuffer(a)),this._updatable&&(this._engine.updateDynamicVertexBuffer(this._buffer,a),this._data=a))},b.prototype.update=function(a){this.create(a)},b.prototype.dispose=function(){this._buffer&&this._engine._releaseBuffer(this._buffer)&&(this._buffer=null)},Object.defineProperty(b,"PositionKind",{get:function(){return b._PositionKind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"NormalKind",{get:function(){return b._NormalKind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"UVKind",{get:function(){return b._UVKind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"UV2Kind",{get:function(){return b._UV2Kind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ColorKind",{get:function(){return b._ColorKind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"MatricesIndicesKind",{get:function(){return b._MatricesIndicesKind},enumerable:!0,configurable:!0}),Object.defineProperty(b,"MatricesWeightsKind",{get:function(){return b._MatricesWeightsKind},enumerable:!0,configurable:!0}),b._PositionKind="position",b._NormalKind="normal",b._UVKind="uv",b._UV2Kind="uv2",b._ColorKind="color",b._MatricesIndicesKind="matricesIndices",b._MatricesWeightsKind="matricesWeights",b}();a.VertexBuffer=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d){b.call(this,c,d),this.position=new a.Vector3(0,0,0),this.rotation=new a.Vector3(0,0,0),this.scaling=new a.Vector3(1,1,1),this.billboardMode=a.AbstractMesh.BILLBOARDMODE_NONE,this.visibility=1,this.infiniteDistance=!1,this.isVisible=!0,this.isPickable=!0,this.showBoundingBox=!1,this.showSubMeshesBoundingBox=!1,this.onDispose=null,this.checkCollisions=!1,this.renderingGroupId=0,this.receiveShadows=!1,this.useOctreeForRenderingSelection=!0,this.useOctreeForPicking=!0,this.useOctreeForCollisions=!0,this.layerMask=4294967295,this._physicImpostor=a.PhysicsEngine.NoImpostor,this._localScaling=a.Matrix.Zero(),this._localRotation=a.Matrix.Zero(),this._localTranslation=a.Matrix.Zero(),this._localBillboard=a.Matrix.Zero(),this._localPivotScaling=a.Matrix.Zero(),this._localPivotScalingRotation=a.Matrix.Zero(),this._localWorld=a.Matrix.Zero(),this._worldMatrix=a.Matrix.Zero(),this._rotateYByPI=a.Matrix.RotationY(Math.PI),this._absolutePosition=a.Vector3.Zero(),this._collisionsTransformMatrix=a.Matrix.Zero(),this._collisionsScalingMatrix=a.Matrix.Zero(),this._isDirty=!1,this._pivotMatrix=a.Matrix.Identity(),this._isDisposed=!1,this._renderId=0,d.meshes.push(this)}return __extends(c,b),Object.defineProperty(c,"BILLBOARDMODE_NONE",{get:function(){return c._BILLBOARDMODE_NONE},enumerable:!0,configurable:!0}),Object.defineProperty(c,"BILLBOARDMODE_X",{get:function(){return c._BILLBOARDMODE_X},enumerable:!0,configurable:!0}),Object.defineProperty(c,"BILLBOARDMODE_Y",{get:function(){return c._BILLBOARDMODE_Y},enumerable:!0,configurable:!0}),Object.defineProperty(c,"BILLBOARDMODE_Z",{get:function(){return c._BILLBOARDMODE_Z},enumerable:!0,configurable:!0}),Object.defineProperty(c,"BILLBOARDMODE_ALL",{get:function(){return c._BILLBOARDMODE_ALL},enumerable:!0,configurable:!0}),c.prototype.getTotalVertices=function(){return 0},c.prototype.getIndices=function(){return null},c.prototype.getVerticesData=function(){return null},c.prototype.isVerticesDataPresent=function(){return!1},c.prototype.getBoundingInfo=function(){return this._boundingInfo},c.prototype._preActivate=function(){},c.prototype._activate=function(a){this._renderId=a},c.prototype.getWorldMatrix=function(){return this._currentRenderId!==this.getScene().getRenderId()&&this.computeWorldMatrix(),this._worldMatrix},Object.defineProperty(c.prototype,"worldMatrixFromCache",{get:function(){return this._worldMatrix},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"absolutePosition",{get:function(){return this._absolutePosition},enumerable:!0,configurable:!0}),c.prototype.rotate=function(b,c,d){if(this.rotationQuaternion||(this.rotationQuaternion=a.Quaternion.RotationYawPitchRoll(this.rotation.y,this.rotation.x,this.rotation.z),this.rotation=a.Vector3.Zero()),d&&0!=d){if(this.parent){var e=this.parent.getWorldMatrix().clone();e.invert(),b=a.Vector3.TransformNormal(b,e)}f=a.Quaternion.RotationAxis(b,c),this.rotationQuaternion=f.multiply(this.rotationQuaternion)}else{var f=a.Quaternion.RotationAxis(b,c);this.rotationQuaternion=this.rotationQuaternion.multiply(f)}},c.prototype.translate=function(a,b,c){var d=a.scale(b);if(c&&0!=c)this.setAbsolutePosition(this.getAbsolutePosition().add(d));else{var e=this.getPositionExpressedInLocalSpace().add(d);this.setPositionWithLocalVector(e)}},c.prototype.getAbsolutePosition=function(){return this.computeWorldMatrix(),this._absolutePosition},c.prototype.setAbsolutePosition=function(b){if(b){var c,d,e;if(void 0===b.x){if(arguments.length<3)return;c=arguments[0],d=arguments[1],e=arguments[2]}else c=b.x,d=b.y,e=b.z;if(this.parent){var f=this.parent.getWorldMatrix().clone();f.invert();var g=new a.Vector3(c,d,e);this.position=a.Vector3.TransformCoordinates(g,f)}else this.position.x=c,this.position.y=d,this.position.z=e}},c.prototype.setPivotMatrix=function(a){this._pivotMatrix=a,this._cache.pivotMatrixUpdated=!0},c.prototype.getPivotMatrix=function(){return this._pivotMatrix},c.prototype._isSynchronized=function(){if(this._isDirty)return!1;if(this.billboardMode!==c.BILLBOARDMODE_NONE)return!1;if(this._cache.pivotMatrixUpdated)return!1;if(this.infiniteDistance)return!1;if(!this._cache.position.equals(this.position))return!1;if(this.rotationQuaternion){if(!this._cache.rotationQuaternion.equals(this.rotationQuaternion))return!1}else if(!this._cache.rotation.equals(this.rotation))return!1;return this._cache.scaling.equals(this.scaling)?!0:!1},c.prototype._initCache=function(){b.prototype._initCache.call(this),this._cache.localMatrixUpdated=!1,this._cache.position=a.Vector3.Zero(),this._cache.scaling=a.Vector3.Zero(),this._cache.rotation=a.Vector3.Zero(),this._cache.rotationQuaternion=new a.Quaternion(0,0,0,0)},c.prototype.markAsDirty=function(a){"rotation"===a&&(this.rotationQuaternion=null),this._currentRenderId=Number.MAX_VALUE,this._isDirty=!0},c.prototype._updateBoundingInfo=function(){if(this._boundingInfo=this._boundingInfo||new a.BoundingInfo(this.absolutePosition,this.absolutePosition),this._boundingInfo._update(this.worldMatrixFromCache),this.subMeshes)for(var b=0;b<this.subMeshes.length;b++){var c=this.subMeshes[b];c.updateBoundingInfo(this.worldMatrixFromCache)}},c.prototype.computeWorldMatrix=function(b){if(!b&&(this._currentRenderId==this.getScene().getRenderId()||this.isSynchronized(!0)))return this._worldMatrix;if(this._cache.position.copyFrom(this.position),this._cache.scaling.copyFrom(this.scaling),this._cache.pivotMatrixUpdated=!1,this._currentRenderId=this.getScene().getRenderId(),this._isDirty=!1,a.Matrix.ScalingToRef(this.scaling.x,this.scaling.y,this.scaling.z,this._localScaling),this.rotationQuaternion?(this.rotationQuaternion.toRotationMatrix(this._localRotation),this._cache.rotationQuaternion.copyFrom(this.rotationQuaternion)):(a.Matrix.RotationYawPitchRollToRef(this.rotation.y,this.rotation.x,this.rotation.z,this._localRotation),this._cache.rotation.copyFrom(this.rotation)),this.infiniteDistance&&!this.parent){var d=this.getScene().activeCamera,e=d.getWorldMatrix(),f=new a.Vector3(e.m[12],e.m[13],e.m[14]);a.Matrix.TranslationToRef(this.position.x+f.x,this.position.y+f.y,this.position.z+f.z,this._localTranslation)}else a.Matrix.TranslationToRef(this.position.x,this.position.y,this.position.z,this._localTranslation);if(this._pivotMatrix.multiplyToRef(this._localScaling,this._localPivotScaling),this._localPivotScaling.multiplyToRef(this._localRotation,this._localPivotScalingRotation),this.billboardMode!==c.BILLBOARDMODE_NONE){var g=this.position.clone(),h=this.getScene().activeCamera.position.clone();this.parent&&this.parent.position&&(g.addInPlace(this.parent.position),a.Matrix.TranslationToRef(g.x,g.y,g.z,this._localTranslation)),(this.billboardMode&c.BILLBOARDMODE_ALL)===c.BILLBOARDMODE_ALL?h=this.getScene().activeCamera.position:(this.billboardMode&a.AbstractMesh.BILLBOARDMODE_X&&(h.x=g.x+a.Engine.Epsilon),this.billboardMode&a.AbstractMesh.BILLBOARDMODE_Y&&(h.y=g.y+.001),this.billboardMode&a.AbstractMesh.BILLBOARDMODE_Z&&(h.z=g.z+.001)),a.Matrix.LookAtLHToRef(g,h,a.Vector3.Up(),this._localBillboard),this._localBillboard.m[12]=this._localBillboard.m[13]=this._localBillboard.m[14]=0,this._localBillboard.invert(),this._localPivotScalingRotation.multiplyToRef(this._localBillboard,this._localWorld),this._rotateYByPI.multiplyToRef(this._localWorld,this._localPivotScalingRotation)}return this._localPivotScalingRotation.multiplyToRef(this._localTranslation,this._localWorld),this.parent&&this.parent.getWorldMatrix&&this.billboardMode===a.AbstractMesh.BILLBOARDMODE_NONE?this._localWorld.multiplyToRef(this.parent.getWorldMatrix(),this._worldMatrix):this._worldMatrix.copyFrom(this._localWorld),this._updateBoundingInfo(),this._absolutePosition.copyFromFloats(this._worldMatrix.m[12],this._worldMatrix.m[13],this._worldMatrix.m[14]),this._worldMatrix},c.prototype.setPositionWithLocalVector=function(b){this.computeWorldMatrix(),this.position=a.Vector3.TransformNormal(b,this._localWorld)},c.prototype.getPositionExpressedInLocalSpace=function(){this.computeWorldMatrix();var b=this._localWorld.clone();return b.invert(),a.Vector3.TransformNormal(this.position,b)},c.prototype.locallyTranslate=function(b){this.computeWorldMatrix(),this.position=a.Vector3.TransformCoordinates(b,this._localWorld)},c.prototype.lookAt=function(b,c,d,e){c=c||0,d=d||0,e=e||0;var f=b.subtract(this.position),g=-Math.atan2(f.z,f.x)-Math.PI/2,h=Math.sqrt(f.x*f.x+f.z*f.z),i=Math.atan2(f.y,h);this.rotationQuaternion=a.Quaternion.RotationYawPitchRoll(g+c,i+d,e)},c.prototype.isInFrustum=function(a){return this._boundingInfo.isInFrustum(a)?!0:!1},c.prototype.intersectsMesh=function(a,b){return this._boundingInfo&&a._boundingInfo?this._boundingInfo.intersects(a._boundingInfo,b):!1},c.prototype.intersectsPoint=function(a){return this._boundingInfo?this._boundingInfo.intersectsPoint(a):!1},c.prototype.setPhysicsState=function(b,c){var d=this.getScene().getPhysicsEngine();if(d){if(b.impostor&&(c=b,b=b.impostor),b=b||a.PhysicsEngine.NoImpostor,b===a.PhysicsEngine.NoImpostor)return void d._unregisterMesh(this);c.mass=c.mass||0,c.friction=c.friction||.2,c.restitution=c.restitution||.9,this._physicImpostor=b,this._physicsMass=c.mass,this._physicsFriction=c.friction,this._physicRestitution=c.restitution,d._registerMesh(this,b,c)}},c.prototype.getPhysicsImpostor=function(){return this._physicImpostor?this._physicImpostor:a.PhysicsEngine.NoImpostor},c.prototype.getPhysicsMass=function(){return this._physicsMass?this._physicsMass:0},c.prototype.getPhysicsFriction=function(){return this._physicsFriction?this._physicsFriction:0},c.prototype.getPhysicsRestitution=function(){return this._physicRestitution?this._physicRestitution:0},c.prototype.applyImpulse=function(a,b){this._physicImpostor&&this.getScene().getPhysicsEngine()._applyImpulse(this,a,b)},c.prototype.setPhysicsLinkWith=function(a,b,c){this._physicImpostor&&this.getScene().getPhysicsEngine()._createLink(this,a,b,c)},c.prototype.createOrUpdateSubmeshesOctree=function(b,c){"undefined"==typeof b&&(b=64),"undefined"==typeof c&&(c=2),this._submeshesOctree||(this._submeshesOctree=new a.Octree(a.Octree.CreationFuncForSubMeshes,b,c)),this.computeWorldMatrix(!0);var d=this.getBoundingInfo().boundingBox;return this._submeshesOctree.update(d.minimumWorld,d.maximumWorld,this.subMeshes),this._submeshesOctree},c.prototype._collideForSubMesh=function(b,c,d){if(this._generatePointsArray(),!b._lastColliderWorldVertices||!b._lastColliderTransformMatrix.equals(c)){b._lastColliderTransformMatrix=c.clone(),b._lastColliderWorldVertices=[],b._trianglePlanes=[];for(var e=b.verticesStart,f=b.verticesStart+b.verticesCount,g=e;f>g;g++)b._lastColliderWorldVertices.push(a.Vector3.TransformCoordinates(this._positions[g],c))}d._collide(b,b._lastColliderWorldVertices,this.getIndices(),b.indexStart,b.indexStart+b.indexCount,b.verticesStart)},c.prototype._processCollisionsForSubMeshes=function(a,b){var c,d;if(this._submeshesOctree&&this.useOctreeForCollisions){var e=a.velocityWorldLength+Math.max(a.radius.x,a.radius.y,a.radius.z),f=this._submeshesOctree.intersects(a.basePointWorld,e);d=f.length,c=f.data}else c=this.subMeshes,d=c.length;for(var g=0;d>g;g++){var h=c[g];d>1&&!h._checkCollision(a)||this._collideForSubMesh(h,b,a)}},c.prototype._checkCollision=function(b){this._boundingInfo._checkCollision(b)&&(a.Matrix.ScalingToRef(1/b.radius.x,1/b.radius.y,1/b.radius.z,this._collisionsScalingMatrix),this.worldMatrixFromCache.multiplyToRef(this._collisionsScalingMatrix,this._collisionsTransformMatrix),this._processCollisionsForSubMeshes(b,this._collisionsTransformMatrix))},c.prototype._generatePointsArray=function(){return!1},c.prototype.intersects=function(b,c){var d=new a.PickingInfo;if(!(this.subMeshes&&this._boundingInfo&&b.intersectsSphere(this._boundingInfo.boundingSphere)&&b.intersectsBox(this._boundingInfo.boundingBox)))return d;if(!this._generatePointsArray())return d;var e,f,g=null;if(this._submeshesOctree&&this.useOctreeForPicking){var h=a.Ray.Transform(b,this.getWorldMatrix()),i=this._submeshesOctree.intersectsRay(h);f=i.length,e=i.data}else e=this.subMeshes,f=e.length;for(var j=0;f>j;j++){var k=e[j];if(!(f>1)||k.canIntersects(b)){var l=k.intersects(b,this._positions,this.getIndices(),c);if(l&&(c||!g||l.distance<g.distance)&&(g=l,c))break}}if(g){var m=this.getWorldMatrix(),n=a.Vector3.TransformCoordinates(b.origin,m),o=b.direction.clone();o.normalize(),o=o.scale(g.distance);var p=a.Vector3.TransformNormal(o,m),q=n.add(p);return d.hit=!0,d.distance=a.Vector3.Distance(n,q),d.pickedPoint=q,d.pickedMesh=this,d.bu=g.bu,d.bv=g.bv,d.faceId=g.faceId,d}return d},c.prototype.clone=function(){return null},c.prototype.releaseSubMeshes=function(){if(this.subMeshes)for(;this.subMeshes.length;)this.subMeshes[0].dispose();else this.subMeshes=new Array},c.prototype.dispose=function(b){this.getPhysicsImpostor()!=a.PhysicsEngine.NoImpostor&&this.setPhysicsState(a.PhysicsEngine.NoImpostor),this.releaseSubMeshes();var c=this.getScene().meshes.indexOf(this);if(this.getScene().meshes.splice(c,1),b)for(c=0;c<this.getScene().meshes.length;c++){var d=this.getScene().meshes[c];d.parent===this&&(d.parent=null,d.computeWorldMatrix(!0))}else{for(c=0;c<this.getScene().particleSystems.length;c++)this.getScene().particleSystems[c].emitter==this&&(this.getScene().particleSystems[c].dispose(),c--);var e=this.getScene().meshes.slice(0);for(c=0;c<e.length;c++)e[c].parent==this&&e[c].dispose()}this._isDisposed=!0,this.onDispose&&this.onDispose()},c._BILLBOARDMODE_NONE=0,c._BILLBOARDMODE_X=1,c._BILLBOARDMODE_Y=2,c._BILLBOARDMODE_Z=4,c._BILLBOARDMODE_ALL=7,c}(a.Node);a.AbstractMesh=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(){function a(){this.mustReturn=!1,this.renderSelf=!0}return a}();a._InstancesBatch=b;var c=function(c){function d(d,e){c.call(this,d,e),this.delayLoadState=a.Engine.DELAYLOADSTATE_NONE,this.instances=new Array,this._onBeforeRenderCallbacks=[],this._visibleInstances={},this._renderIdForInstances=-1,this._batchCache=new b,this._instancesBufferSize=2048}return __extends(d,c),d.prototype.getTotalVertices=function(){return this._geometry?this._geometry.getTotalVertices():0},d.prototype.getVerticesData=function(a){return this._geometry?this._geometry.getVerticesData(a):null},d.prototype.getVertexBuffer=function(a){return this._geometry?this._geometry.getVertexBuffer(a):void 0},d.prototype.isVerticesDataPresent=function(a){return this._geometry?this._geometry.isVerticesDataPresent(a):this._delayInfo?-1!==this._delayInfo.indexOf(a):!1},d.prototype.getVerticesDataKinds=function(){if(!this._geometry){var a=[];if(this._delayInfo)for(var b in this._delayInfo)a.push(b);return a}return this._geometry.getVerticesDataKinds()},d.prototype.getTotalIndices=function(){return this._geometry?this._geometry.getTotalIndices():0},d.prototype.getIndices=function(){return this._geometry?this._geometry.getIndices():[]},d.prototype.isReady=function(){return this.delayLoadState===a.Engine.DELAYLOADSTATE_LOADING?!1:c.prototype.isReady.call(this)},d.prototype.isDisposed=function(){return this._isDisposed},d.prototype._preActivate=function(){this._visibleInstances=null},d.prototype._registerInstanceForRenderId=function(a,b){this._visibleInstances||(this._visibleInstances={},this._visibleInstances.defaultRenderId=b,this._visibleInstances.selfDefaultRenderId=this._renderId),this._visibleInstances[b]||(this._visibleInstances[b]=new Array),this._visibleInstances[b].push(a)},d.prototype.refreshBoundingInfo=function(){var b=this.getVerticesData(a.VertexBuffer.PositionKind);if(b){var c=a.Tools.ExtractMinAndMax(b,0,this.getTotalVertices());this._boundingInfo=new a.BoundingInfo(c.minimum,c.maximum)}if(this.subMeshes)for(var d=0;d<this.subMeshes.length;d++)this.subMeshes[d].refreshBoundingInfo();this._updateBoundingInfo()},d.prototype._createGlobalSubMesh=function(){var b=this.getTotalVertices();return b&&this.getIndices()?(this.releaseSubMeshes(),new a.SubMesh(0,0,b,0,this.getTotalIndices(),this)):null},d.prototype.subdivide=function(b){if(!(1>b)){for(var c=this.getTotalIndices(),d=c/b|0,e=0;d%3!=0;)d++;this.releaseSubMeshes();for(var f=0;b>f&&!(e>=c);f++)a.SubMesh.CreateFromIndices(0,e,Math.min(d,c-e),this),e+=d;this.synchronizeInstances()}},d.prototype.setVerticesData=function(b,c,d){if(b instanceof Array){var e=c;c=b,b=e,a.Tools.Warn("Deprecated usage of setVerticesData detected (since v1.12). Current signature is setVerticesData(kind, data, updatable).")}if(this._geometry)this._geometry.setVerticesData(b,c,d);else{var f=new a.VertexData;f.set(c,b);var g=this.getScene();new a.Geometry(a.Geometry.RandomId(),g,f,d,this)}},d.prototype.updateVerticesData=function(a,b,c,d){this._geometry&&(d?(this.makeGeometryUnique(),this.updateVerticesData(a,b,c,!1)):this._geometry.updateVerticesData(a,b,c))},d.prototype.makeGeometryUnique=function(){if(this._geometry){var b=this._geometry.copy(a.Geometry.RandomId());
b.applyToMesh(this)}},d.prototype.setIndices=function(b){if(this._geometry)this._geometry.setIndices(b);else{var c=new a.VertexData;c.indices=b;var d=this.getScene();new a.Geometry(a.Geometry.RandomId(),d,c,!1,this)}},d.prototype._bind=function(a,b,c){var d=this.getScene().getEngine(),e=this._geometry.getIndexBuffer();c&&(e=a.getLinesIndexBuffer(this.getIndices(),d)),d.bindMultiBuffers(this._geometry.getVertexBuffers(),e,b)},d.prototype._draw=function(a,b,c){if(this._geometry&&this._geometry.getVertexBuffers()&&this._geometry.getIndexBuffer()){var d=this.getScene().getEngine();d.draw(b,b?a.indexStart:0,b?a.indexCount:a.linesIndexCount,c)}},d.prototype.registerBeforeRender=function(a){this._onBeforeRenderCallbacks.push(a)},d.prototype.unregisterBeforeRender=function(a){var b=this._onBeforeRenderCallbacks.indexOf(a);b>-1&&this._onBeforeRenderCallbacks.splice(b,1)},d.prototype._getInstancesRenderList=function(){var a=this.getScene();if(this._batchCache.mustReturn=!1,this._batchCache.renderSelf=!0,this._batchCache.visibleInstances=null,this._visibleInstances){var b=a.getRenderId();this._batchCache.visibleInstances=this._visibleInstances[b];var c=this._renderId;if(!this._batchCache.visibleInstances&&this._visibleInstances.defaultRenderId&&(this._batchCache.visibleInstances=this._visibleInstances[this._visibleInstances.defaultRenderId],b=this._visibleInstances.defaultRenderId,c=this._visibleInstances.selfDefaultRenderId),this._batchCache.visibleInstances&&this._batchCache.visibleInstances.length){if(this._renderIdForInstances===b)return this._batchCache.mustReturn=!0,this._batchCache;b!==c&&(this._batchCache.renderSelf=!1)}this._renderIdForInstances=b}return this._batchCache},d.prototype._renderWithInstances=function(a,b,c,d,e){for(var f=this.instances.length+1,g=16*f*4;this._instancesBufferSize<g;)this._instancesBufferSize*=2;(!this._worldMatricesInstancesBuffer||this._worldMatricesInstancesBuffer.capacity<this._instancesBufferSize)&&(this._worldMatricesInstancesBuffer&&e.deleteInstancesBuffer(this._worldMatricesInstancesBuffer),this._worldMatricesInstancesBuffer=e.createInstancesBuffer(this._instancesBufferSize),this._worldMatricesInstancesArray=new Float32Array(this._instancesBufferSize/4));var h=0,i=0,j=this.getWorldMatrix();c.renderSelf&&(j.copyToArray(this._worldMatricesInstancesArray,h),h+=16,i++);for(var k=0;k<c.visibleInstances.length;k++){var l=c.visibleInstances[k];l.getWorldMatrix().copyToArray(this._worldMatricesInstancesArray,h),h+=16,i++}var m=d.getAttributeLocationByName("world0"),n=d.getAttributeLocationByName("world1"),o=d.getAttributeLocationByName("world2"),p=d.getAttributeLocationByName("world3"),q=[m,n,o,p];e.updateAndBindInstancesBuffer(this._worldMatricesInstancesBuffer,this._worldMatricesInstancesArray,q),this._draw(a,!b,i),e.unBindInstancesBuffer(this._worldMatricesInstancesBuffer,q)},d.prototype.render=function(a){var b=this.getScene(),c=this._getInstancesRenderList();if(!c.mustReturn&&this._geometry&&this._geometry.getVertexBuffers()&&this._geometry.getIndexBuffer()){for(var d=0;d<this._onBeforeRenderCallbacks.length;d++)this._onBeforeRenderCallbacks[d]();var e=b.getEngine(),f=null!==e.getCaps().instancedArrays&&null!==c.visibleInstances,g=a.getMaterial();if(g&&g.isReady(this,f)){g._preBind();var h=g.getEffect(),i=e.forceWireframe||g.wireframe;this._bind(a,h,i);var j=this.getWorldMatrix();if(g.bind(j,this),f)this._renderWithInstances(a,i,c,h,e);else if(c.renderSelf&&this._draw(a,!i),c.visibleInstances)for(var k=0;k<c.visibleInstances.length;k++){var l=c.visibleInstances[k];j=l.getWorldMatrix(),g.bindOnlyWorldMatrix(j),this._draw(a,!i)}g.unbind()}}},d.prototype.getEmittedParticleSystems=function(){for(var a=new Array,b=0;b<this.getScene().particleSystems.length;b++){var c=this.getScene().particleSystems[b];c.emitter===this&&a.push(c)}return a},d.prototype.getHierarchyEmittedParticleSystems=function(){var a=new Array,b=this.getDescendants();b.push(this);for(var c=0;c<this.getScene().particleSystems.length;c++){var d=this.getScene().particleSystems[c];-1!==b.indexOf(d.emitter)&&a.push(d)}return a},d.prototype.getChildren=function(){for(var a=[],b=0;b<this.getScene().meshes.length;b++){var c=this.getScene().meshes[b];c.parent==this&&a.push(c)}return a},d.prototype._checkDelayState=function(){var b=this,c=this,d=this.getScene();this._geometry?this._geometry.load(d):c.delayLoadState===a.Engine.DELAYLOADSTATE_NOTLOADED&&(c.delayLoadState=a.Engine.DELAYLOADSTATE_LOADING,d._addPendingData(c),a.Tools.LoadFile(this.delayLoadingFile,function(c){b._delayLoadingFunction(JSON.parse(c),b),b.delayLoadState=a.Engine.DELAYLOADSTATE_LOADED,d._removePendingData(b)},function(){},d.database))},d.prototype.isInFrustum=function(b){return this.delayLoadState===a.Engine.DELAYLOADSTATE_LOADING?!1:c.prototype.isInFrustum.call(this,b)?(this._checkDelayState(),!0):!1},d.prototype.setMaterialByID=function(a){for(var b=this.getScene().materials,c=0;c<b.length;c++)if(b[c].id==a)return void(this.material=b[c]);var d=this.getScene().multiMaterials;for(c=0;c<d.length;c++)if(d[c].id==a)return void(this.material=d[c])},d.prototype.getAnimatables=function(){var a=[];return this.material&&a.push(this.material),a},d.prototype.bakeTransformIntoVertices=function(b){if(this.isVerticesDataPresent(a.VertexBuffer.PositionKind)){this._resetPointsArrayCache();for(var c=this.getVerticesData(a.VertexBuffer.PositionKind),d=[],e=0;e<c.length;e+=3)a.Vector3.TransformCoordinates(a.Vector3.FromArray(c,e),b).toArray(d,e);if(this.setVerticesData(a.VertexBuffer.PositionKind,d,this.getVertexBuffer(a.VertexBuffer.PositionKind).isUpdatable()),this.isVerticesDataPresent(a.VertexBuffer.NormalKind)){for(c=this.getVerticesData(a.VertexBuffer.NormalKind),e=0;e<c.length;e+=3)a.Vector3.TransformNormal(a.Vector3.FromArray(c,e),b).toArray(d,e);this.setVerticesData(a.VertexBuffer.NormalKind,d,this.getVertexBuffer(a.VertexBuffer.NormalKind).isUpdatable())}}},d.prototype._resetPointsArrayCache=function(){this._positions=null},d.prototype._generatePointsArray=function(){if(this._positions)return!0;this._positions=[];var b=this.getVerticesData(a.VertexBuffer.PositionKind);if(!b)return!1;for(var c=0;c<b.length;c+=3)this._positions.push(a.Vector3.FromArray(b,c));return!0},d.prototype.clone=function(b,c,d){var e=new a.Mesh(b,this.getScene());if(this._geometry.applyToMesh(e),a.Tools.DeepCopy(this,e,["name","material","skeleton"],[]),e.material=this.material,c&&(e.parent=c),!d)for(var f=0;f<this.getScene().meshes.length;f++){var g=this.getScene().meshes[f];g.parent==this&&g.clone(g.name,e)}for(f=0;f<this.getScene().particleSystems.length;f++){var h=this.getScene().particleSystems[f];h.emitter==this&&h.clone(h.name,e)}return e.computeWorldMatrix(!0),e},d.prototype.dispose=function(a){for(this._geometry&&this._geometry.releaseForMesh(this,!0),this._worldMatricesInstancesBuffer&&(this.getEngine().deleteInstancesBuffer(this._worldMatricesInstancesBuffer),this._worldMatricesInstancesBuffer=null);this.instances.length;)this.instances[0].dispose();c.prototype.dispose.call(this,a)},d.prototype.convertToFlatShadedMesh=function(){for(var b=this.getVerticesDataKinds(),c=[],d=[],e=[],f=!1,g=0;g<b.length;g++){var h=b[g],i=this.getVertexBuffer(h);h!==a.VertexBuffer.NormalKind?(c[h]=i,d[h]=c[h].getData(),e[h]=[]):(f=i.isUpdatable(),b.splice(g,1),g--)}var j=this.subMeshes.slice(0),k=this.getIndices(),l=this.getTotalIndices();for(r=0;l>r;r++){var m=k[r];for(g=0;g<b.length;g++){h=b[g];for(var n=c[h].getStrideSize(),o=0;n>o;o++)e[h].push(d[h][m*n+o])}}for(var p=[],q=e[a.VertexBuffer.PositionKind],r=0;l>r;r+=3){k[r]=r,k[r+1]=r+1,k[r+2]=r+2;for(var s=a.Vector3.FromArray(q,3*r),t=a.Vector3.FromArray(q,3*(r+1)),u=a.Vector3.FromArray(q,3*(r+2)),v=s.subtract(t),w=u.subtract(t),x=a.Vector3.Normalize(a.Vector3.Cross(v,w)),y=0;3>y;y++)p.push(x.x),p.push(x.y),p.push(x.z)}for(this.setIndices(k),this.setVerticesData(a.VertexBuffer.NormalKind,p,f),g=0;g<b.length;g++)h=b[g],this.setVerticesData(h,e[h],c[h].isUpdatable());this.releaseSubMeshes();for(var z=0;z<j.length;z++){var A=j[z];new a.SubMesh(A.materialIndex,A.indexStart,A.indexCount,A.indexStart,A.indexCount,this)}this.synchronizeInstances()},d.prototype.createInstance=function(b){return new a.InstancedMesh(b,this)},d.prototype.synchronizeInstances=function(){for(var a=0;a<this.instances.length;a++){var b=this.instances[a];b._syncSubMeshes()}},d.CreateBox=function(b,c,d,e){var f=new a.Mesh(b,d),g=a.VertexData.CreateBox(c);return g.applyToMesh(f,e),f},d.CreateSphere=function(b,c,d,e,f){var g=new a.Mesh(b,e),h=a.VertexData.CreateSphere(c,d);return h.applyToMesh(g,f),g},d.CreateCylinder=function(b,c,d,e,f,g,h){var i=new a.Mesh(b,g),j=a.VertexData.CreateCylinder(c,d,e,f);return j.applyToMesh(i,h),i},d.CreateTorus=function(b,c,d,e,f,g){var h=new a.Mesh(b,f),i=a.VertexData.CreateTorus(c,d,e);return i.applyToMesh(h,g),h},d.CreateTorusKnot=function(b,c,d,e,f,g,h,i,j){var k=new a.Mesh(b,i),l=a.VertexData.CreateTorusKnot(c,d,e,f,g,h);return l.applyToMesh(k,j),k},d.CreatePlane=function(b,c,d,e){var f=new a.Mesh(b,d),g=a.VertexData.CreatePlane(c);return g.applyToMesh(f,e),f},d.CreateGround=function(b,c,d,e,f,g){var h=new a.GroundMesh(b,f);h._setReady(!1),h._subdivisions=e;var i=a.VertexData.CreateGround(c,d,e);return i.applyToMesh(h,g),h._setReady(!0),h},d.CreateGroundFromHeightMap=function(b,c,d,e,f,g,h,i,j){var k=new a.GroundMesh(b,i);k._subdivisions=f,k._setReady(!1);var l=function(b){var c=document.createElement("canvas"),i=c.getContext("2d"),l=b.width,m=b.height;c.width=l,c.height=m,i.drawImage(b,0,0);var n=i.getImageData(0,0,l,m).data,o=a.VertexData.CreateGroundFromHeightMap(d,e,f,g,h,n,l,m);o.applyToMesh(k,j),k._setReady(!0)};return a.Tools.LoadImage(c,l,function(){},i.database),k},d.MinMax=function(a){var b=null,c=null;for(var d in a){var e=a[d],f=e.getBoundingInfo().boundingBox;b?(b.MinimizeInPlace(f.minimumWorld),c.MaximizeInPlace(f.maximumWorld)):(b=f.minimumWorld,c=f.maximumWorld)}return{min:b,max:c}},d.Center=function(b){var c=void 0!==b.min?b:a.Mesh.MinMax(b);return a.Vector3.Center(c.min,c.max)},d}(a.AbstractMesh);a.Mesh=c}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d){b.call(this,c,d),this.generateOctree=!1,this._worldInverse=new a.Matrix}return __extends(c,b),Object.defineProperty(c.prototype,"subdivisions",{get:function(){return this._subdivisions},enumerable:!0,configurable:!0}),c.prototype.optimize=function(){this.subdivide(this._subdivisions),this.createOrUpdateSubmeshesOctree(32)},c.prototype.getHeightAtCoordinates=function(b,c){var d=new a.Ray(new a.Vector3(b,this.getBoundingInfo().boundingBox.maximumWorld.y+1,c),new a.Vector3(0,-1,0));this.getWorldMatrix().invertToRef(this._worldInverse),d=a.Ray.Transform(d,this._worldInverse);var e=this.intersects(d);if(e.hit){var f=a.Vector3.TransformCoordinates(e.pickedPoint,this.getWorldMatrix());return f.y}return 0},c}(a.Mesh);a.GroundMesh=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(a,c){b.call(this,a,c.getScene()),c.instances.push(this),this._sourceMesh=c,this.position.copyFrom(c.position),this.rotation.copyFrom(c.rotation),this.scaling.copyFrom(c.scaling),c.rotationQuaternion&&(this.rotationQuaternion=c.rotationQuaternion.clone()),this.infiniteDistance=c.infiniteDistance,this.setPivotMatrix(c.getPivotMatrix()),this.refreshBoundingInfo(),this._syncSubMeshes()}return __extends(c,b),Object.defineProperty(c.prototype,"receiveShadows",{get:function(){return this._sourceMesh.receiveShadows},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"material",{get:function(){return this._sourceMesh.material},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"visibility",{get:function(){return this._sourceMesh.visibility},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"skeleton",{get:function(){return this._sourceMesh.skeleton},enumerable:!0,configurable:!0}),c.prototype.getTotalVertices=function(){return this._sourceMesh.getTotalVertices()},Object.defineProperty(c.prototype,"sourceMesh",{get:function(){return this._sourceMesh},enumerable:!0,configurable:!0}),c.prototype.getVerticesData=function(a){return this._sourceMesh.getVerticesData(a)},c.prototype.isVerticesDataPresent=function(a){return this._sourceMesh.isVerticesDataPresent(a)},c.prototype.getIndices=function(){return this._sourceMesh.getIndices()},Object.defineProperty(c.prototype,"_positions",{get:function(){return this._sourceMesh._positions},enumerable:!0,configurable:!0}),c.prototype.refreshBoundingInfo=function(){var b=this._sourceMesh.getVerticesData(a.VertexBuffer.PositionKind);if(b){var c=a.Tools.ExtractMinAndMax(b,0,this._sourceMesh.getTotalVertices());this._boundingInfo=new a.BoundingInfo(c.minimum,c.maximum)}this._updateBoundingInfo()},c.prototype._activate=function(a){this.sourceMesh._registerInstanceForRenderId(this,a)},c.prototype._syncSubMeshes=function(){this.releaseSubMeshes();for(var a=0;a<this._sourceMesh.subMeshes.length;a++)this._sourceMesh.subMeshes[a].clone(this,this._sourceMesh)},c.prototype._generatePointsArray=function(){return this._sourceMesh._generatePointsArray()},c.prototype.clone=function(b,c,d){var e=this._sourceMesh.createInstance(b);if(a.Tools.DeepCopy(this,e,["name"],[]),this.refreshBoundingInfo(),c&&(e.parent=c),!d)for(var f=0;f<this.getScene().meshes.length;f++){var g=this.getScene().meshes[f];g.parent==this&&g.clone(g.name,e)}return e.computeWorldMatrix(!0),e},c.prototype.dispose=function(a){var c=this._sourceMesh.instances.indexOf(this);this._sourceMesh.instances.splice(c,1),b.prototype.dispose.call(this,a)},c}(a.AbstractMesh);a.InstancedMesh=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c,d,e,f,g,h){"undefined"==typeof h&&(h=!0),this.materialIndex=a,this.verticesStart=b,this.verticesCount=c,this.indexStart=d,this.indexCount=e,this._renderId=0,this._mesh=f,this._renderingMesh=g||f,f.subMeshes.push(this),h&&this.refreshBoundingInfo()}return b.prototype.getBoundingInfo=function(){return this._boundingInfo},b.prototype.getMesh=function(){return this._mesh},b.prototype.getRenderingMesh=function(){return this._renderingMesh},b.prototype.getMaterial=function(){var b=this._renderingMesh.material;if(b&&b instanceof a.MultiMaterial){var c=b;return c.getSubMaterial(this.materialIndex)}return b?b:this._mesh.getScene().defaultMaterial},b.prototype.refreshBoundingInfo=function(){var b=this._renderingMesh.getVerticesData(a.VertexBuffer.PositionKind);if(!b)return void(this._boundingInfo=this._mesh._boundingInfo);var c,d=this._renderingMesh.getIndices();c=0===this.indexStart&&this.indexCount===d.length?a.Tools.ExtractMinAndMax(b,this.verticesStart,this.verticesCount):a.Tools.ExtractMinAndMaxIndexed(b,d,this.indexStart,this.indexCount),this._boundingInfo=new a.BoundingInfo(c.minimum,c.maximum)},b.prototype._checkCollision=function(a){return this._boundingInfo._checkCollision(a)},b.prototype.updateBoundingInfo=function(a){this._boundingInfo||this.refreshBoundingInfo(),this._boundingInfo._update(a)},b.prototype.isInFrustum=function(a){return this._boundingInfo.isInFrustum(a)},b.prototype.render=function(){this._renderingMesh.render(this)},b.prototype.getLinesIndexBuffer=function(a,b){if(!this._linesIndexBuffer){for(var c=[],d=this.indexStart;d<this.indexStart+this.indexCount;d+=3)c.push(a[d],a[d+1],a[d+1],a[d+2],a[d+2],a[d]);this._linesIndexBuffer=b.createIndexBuffer(c),this.linesIndexCount=c.length}return this._linesIndexBuffer},b.prototype.canIntersects=function(a){return a.intersectsBox(this._boundingInfo.boundingBox)},b.prototype.intersects=function(a,b,c,d){for(var e=null,f=this.indexStart;f<this.indexStart+this.indexCount;f+=3){var g=b[c[f]],h=b[c[f+1]],i=b[c[f+2]],j=a.intersectsTriangle(g,h,i);if(j&&(d||!e||j.distance<e.distance)&&(e=j,e.faceId=f/3,d))break}return e},b.prototype.clone=function(c,d){var e=new b(this.materialIndex,this.verticesStart,this.verticesCount,this.indexStart,this.indexCount,c,d,!1);return e._boundingInfo=new a.BoundingInfo(this._boundingInfo.minimum,this._boundingInfo.maximum),e},b.prototype.dispose=function(){this._linesIndexBuffer&&(this._mesh.getScene().getEngine()._releaseBuffer(this._linesIndexBuffer),this._linesIndexBuffer=null);var a=this._mesh.subMeshes.indexOf(this);this._mesh.subMeshes.splice(a,1)},b.CreateFromIndices=function(b,c,d,e,f){var g=Number.MAX_VALUE,h=-Number.MAX_VALUE;f=f||e;for(var i=f.getIndices(),j=c;c+d>j;j++){var k=i[j];g>k?g=k:k>h&&(h=k)}return new a.SubMesh(b,g,h-g+1,c,d,e,f)},b}();a.SubMesh=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b){this.delayLoadState=a.Engine.DELAYLOADSTATE_NONE,this.hasAlpha=!1,this.getAlphaFromRGB=!1,this.level=1,this.isCube=!1,this.isRenderTarget=!1,this.animations=new Array,this.coordinatesIndex=0,this.coordinatesMode=a.Texture.EXPLICIT_MODE,this.wrapU=a.Texture.WRAP_ADDRESSMODE,this.wrapV=a.Texture.WRAP_ADDRESSMODE,this.anisotropicFilteringLevel=4,this._scene=b,this._scene.textures.push(this)}return b.prototype.getScene=function(){return this._scene},b.prototype.getTextureMatrix=function(){return null},b.prototype.getReflectionTextureMatrix=function(){return null},b.prototype.getInternalTexture=function(){return this._texture},b.prototype.isReady=function(){return this.delayLoadState===a.Engine.DELAYLOADSTATE_NOTLOADED?!0:this._texture?this._texture.isReady:!1},b.prototype.getSize=function(){return this._texture._width?{width:this._texture._width,height:this._texture._height}:this._texture._size?{width:this._texture._size,height:this._texture._size}:{width:0,height:0}},b.prototype.getBaseSize=function(){return this.isReady()?this._texture._size?{width:this._texture._size,height:this._texture._size}:{width:this._texture._baseWidth,height:this._texture._baseHeight}:{width:0,height:0}},b.prototype._getFromCache=function(a,b){for(var c=this._scene.getEngine().getLoadedTexturesCache(),d=0;d<c.length;d++){var e=c[d];if(e.url===a&&e.noMipmap===b)return e.references++,e}return null},b.prototype.delayLoad=function(){},b.prototype.releaseInternalTexture=function(){if(this._texture){var a=this._scene.getEngine().getLoadedTexturesCache();if(this._texture.references--,0==this._texture.references){var b=a.indexOf(this._texture);a.splice(b,1),this._scene.getEngine()._releaseTexture(this._texture),delete this._texture}}},b.prototype.clone=function(){return null},b.prototype.dispose=function(){var a=this._scene.textures.indexOf(this);a>=0&&this._scene.textures.splice(a,1),void 0!==this._texture&&(this.releaseInternalTexture(),this.onDispose&&this.onDispose())},b}();a.BaseTexture=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c){this.index=b,this._opaqueSubMeshes=new a.SmartArray(256),this._transparentSubMeshes=new a.SmartArray(256),this._alphaTestSubMeshes=new a.SmartArray(256),this._scene=c}return b.prototype.render=function(b,c){if(b)return b(this._opaqueSubMeshes,this._alphaTestSubMeshes,this._transparentSubMeshes,c),!0;if(0===this._opaqueSubMeshes.length&&0===this._alphaTestSubMeshes.length&&0===this._transparentSubMeshes.length)return!1;var d,e,f=this._scene.getEngine();for(d=0;d<this._opaqueSubMeshes.length;d++)e=this._opaqueSubMeshes.data[d],this._activeVertices+=e.verticesCount,e.render();for(f.setAlphaTesting(!0),d=0;d<this._alphaTestSubMeshes.length;d++)e=this._alphaTestSubMeshes.data[d],this._activeVertices+=e.verticesCount,e.render();if(f.setAlphaTesting(!1),c&&c(),this._transparentSubMeshes.length){for(d=0;d<this._transparentSubMeshes.length;d++)e=this._transparentSubMeshes.data[d],e._distanceToCamera=e.getBoundingInfo().boundingSphere.centerWorld.subtract(this._scene.activeCamera.position).length();var g=this._transparentSubMeshes.data.slice(0,this._transparentSubMeshes.length);for(g.sort(function(a,b){return a._distanceToCamera<b._distanceToCamera?1:a._distanceToCamera>b._distanceToCamera?-1:0}),f.setAlphaMode(a.Engine.ALPHA_COMBINE),d=0;d<g.length;d++)e=g[d],this._activeVertices+=e.verticesCount,e.render();f.setAlphaMode(a.Engine.ALPHA_DISABLE)}return!0},b.prototype.prepare=function(){this._opaqueSubMeshes.reset(),this._transparentSubMeshes.reset(),this._alphaTestSubMeshes.reset()},b.prototype.dispatch=function(a){var b=a.getMaterial(),c=a.getMesh();b.needAlphaBlending()||c.visibility<1?(b.alpha>0||c.visibility<1)&&this._transparentSubMeshes.push(a):b.needAlphaTesting()?this._alphaTestSubMeshes.push(a):this._opaqueSubMeshes.push(a)},b}();a.RenderingGroup=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a){this._renderingGroups=new Array,this._scene=a}return b.prototype._renderParticles=function(a,b){if(0!==this._scene._activeParticleSystems.length){for(var c=(new Date).getTime(),d=0;d<this._scene._activeParticleSystems.length;d++){var e=this._scene._activeParticleSystems.data[d];e.renderingGroupId===a&&(this._clearDepthBuffer(),e.emitter.position&&b&&-1===b.indexOf(e.emitter)||(this._scene._activeParticles+=e.render()))}this._scene._particlesDuration+=(new Date).getTime()-c}},b.prototype._renderSprites=function(a){if(0!==this._scene.spriteManagers.length){for(var b=(new Date).getTime(),c=0;c<this._scene.spriteManagers.length;c++){var d=this._scene.spriteManagers[c];d.renderingGroupId===a&&(this._clearDepthBuffer(),d.render())}this._scene._spritesDuration+=(new Date).getTime()-b}},b.prototype._clearDepthBuffer=function(){this._depthBufferAlreadyCleaned||(this._scene.getEngine().clear(0,!1,!0),this._depthBufferAlreadyCleaned=!0)},b.prototype.render=function(b,c,d,e){for(var f=this,g=0;g<a.RenderingManager.MAX_RENDERINGGROUPS;g++){this._depthBufferAlreadyCleaned=!1;var h=this._renderingGroups[g];h?(this._clearDepthBuffer(),h.render(b,function(){e&&f._renderSprites(g)})||this._renderingGroups.splice(g,1)):e&&this._renderSprites(g),d&&this._renderParticles(g,c)}},b.prototype.reset=function(){for(var a in this._renderingGroups){var b=this._renderingGroups[a];b.prepare()}},b.prototype.dispatch=function(b){var c=b.getMesh(),d=c.renderingGroupId||0;this._renderingGroups[d]||(this._renderingGroups[d]=new a.RenderingGroup(d,this._scene)),this._renderingGroups[d].dispatch(b)},b.MAX_RENDERINGGROUPS=4,b}();a.RenderingManager=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(d,e,f,g,h){"undefined"==typeof h&&(h=c.TRILINEAR_SAMPLINGMODE),b.call(this,e),this.uOffset=0,this.vOffset=0,this.uScale=1,this.vScale=1,this.uAng=0,this.vAng=0,this.wAng=0,this.name=d,this.url=d,this._noMipmap=f,this._invertY=g,this._samplingMode=h,d&&(this._texture=this._getFromCache(d,f),this._texture||(e.useDelayedTextureLoading?this.delayLoadState=a.Engine.DELAYLOADSTATE_NOTLOADED:this._texture=e.getEngine().createTexture(d,f,g,e,this._samplingMode)))}return __extends(c,b),c.prototype.delayLoad=function(){this.delayLoadState==a.Engine.DELAYLOADSTATE_NOTLOADED&&(this.delayLoadState=a.Engine.DELAYLOADSTATE_LOADED,this._texture=this._getFromCache(this.url,this._noMipmap),this._texture||(this._texture=this.getScene().getEngine().createTexture(this.url,this._noMipmap,this._invertY,this.getScene(),this._samplingMode)))},c.prototype._prepareRowForTextureGeneration=function(b,c,d,e){b-=this.uOffset+.5,c-=this.vOffset+.5,d-=.5,a.Vector3.TransformCoordinatesFromFloatsToRef(b,c,d,this._rowGenerationMatrix,e),e.x*=this.uScale,e.y*=this.vScale,e.x+=.5,e.y+=.5,e.z+=.5},c.prototype.getTextureMatrix=function(){return this.uOffset===this._cachedUOffset&&this.vOffset===this._cachedVOffset&&this.uScale===this._cachedUScale&&this.vScale===this._cachedVScale&&this.uAng===this._cachedUAng&&this.vAng===this._cachedVAng&&this.wAng===this._cachedWAng?this._cachedTextureMatrix:(this._cachedUOffset=this.uOffset,this._cachedVOffset=this.vOffset,this._cachedUScale=this.uScale,this._cachedVScale=this.vScale,this._cachedUAng=this.uAng,this._cachedVAng=this.vAng,this._cachedWAng=this.wAng,this._cachedTextureMatrix||(this._cachedTextureMatrix=a.Matrix.Zero(),this._rowGenerationMatrix=new a.Matrix,this._t0=a.Vector3.Zero(),this._t1=a.Vector3.Zero(),this._t2=a.Vector3.Zero()),a.Matrix.RotationYawPitchRollToRef(this.vAng,this.uAng,this.wAng,this._rowGenerationMatrix),this._prepareRowForTextureGeneration(0,0,0,this._t0),this._prepareRowForTextureGeneration(1,0,0,this._t1),this._prepareRowForTextureGeneration(0,1,0,this._t2),this._t1.subtractInPlace(this._t0),this._t2.subtractInPlace(this._t0),a.Matrix.IdentityToRef(this._cachedTextureMatrix),this._cachedTextureMatrix.m[0]=this._t1.x,this._cachedTextureMatrix.m[1]=this._t1.y,this._cachedTextureMatrix.m[2]=this._t1.z,this._cachedTextureMatrix.m[4]=this._t2.x,this._cachedTextureMatrix.m[5]=this._t2.y,this._cachedTextureMatrix.m[6]=this._t2.z,this._cachedTextureMatrix.m[8]=this._t0.x,this._cachedTextureMatrix.m[9]=this._t0.y,this._cachedTextureMatrix.m[10]=this._t0.z,this._cachedTextureMatrix)},c.prototype.getReflectionTextureMatrix=function(){if(this.uOffset===this._cachedUOffset&&this.vOffset===this._cachedVOffset&&this.uScale===this._cachedUScale&&this.vScale===this._cachedVScale&&this.coordinatesMode===this._cachedCoordinatesMode)return this._cachedTextureMatrix;switch(this._cachedTextureMatrix||(this._cachedTextureMatrix=a.Matrix.Zero(),this._projectionModeMatrix=a.Matrix.Zero()),this.coordinatesMode){case a.Texture.SPHERICAL_MODE:a.Matrix.IdentityToRef(this._cachedTextureMatrix),this._cachedTextureMatrix[0]=-.5*this.uScale,this._cachedTextureMatrix[5]=-.5*this.vScale,this._cachedTextureMatrix[12]=.5+this.uOffset,this._cachedTextureMatrix[13]=.5+this.vOffset;break;case a.Texture.PLANAR_MODE:a.Matrix.IdentityToRef(this._cachedTextureMatrix),this._cachedTextureMatrix[0]=this.uScale,this._cachedTextureMatrix[5]=this.vScale,this._cachedTextureMatrix[12]=this.uOffset,this._cachedTextureMatrix[13]=this.vOffset;break;case a.Texture.PROJECTION_MODE:a.Matrix.IdentityToRef(this._projectionModeMatrix),this._projectionModeMatrix.m[0]=.5,this._projectionModeMatrix.m[5]=-.5,this._projectionModeMatrix.m[10]=0,this._projectionModeMatrix.m[12]=.5,this._projectionModeMatrix.m[13]=.5,this._projectionModeMatrix.m[14]=1,this._projectionModeMatrix.m[15]=1,this.getScene().getProjectionMatrix().multiplyToRef(this._projectionModeMatrix,this._cachedTextureMatrix);break;default:a.Matrix.IdentityToRef(this._cachedTextureMatrix)}return this._cachedTextureMatrix},c.prototype.clone=function(){var b=new a.Texture(this._texture.url,this.getScene(),this._noMipmap,this._invertY);return b.hasAlpha=this.hasAlpha,b.level=this.level,b.wrapU=this.wrapU,b.wrapV=this.wrapV,b.coordinatesIndex=this.coordinatesIndex,b.coordinatesMode=this.coordinatesMode,b.uOffset=this.uOffset,b.vOffset=this.vOffset,b.uScale=this.uScale,b.vScale=this.vScale,b.uAng=this.uAng,b.vAng=this.vAng,b.wAng=this.wAng,b},c.NEAREST_SAMPLINGMODE=1,c.BILINEAR_SAMPLINGMODE=2,c.TRILINEAR_SAMPLINGMODE=3,c.EXPLICIT_MODE=0,c.SPHERICAL_MODE=1,c.PLANAR_MODE=2,c.CUBIC_MODE=3,c.PROJECTION_MODE=4,c.SKYBOX_MODE=5,c.CLAMP_ADDRESSMODE=0,c.WRAP_ADDRESSMODE=1,c.MIRROR_ADDRESSMODE=2,c}(a.BaseTexture);a.Texture=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f){b.call(this,d),this.coordinatesMode=a.Texture.CUBIC_MODE,this.name=c,this.url=c,this._noMipmap=f,this.hasAlpha=!1,this._texture=this._getFromCache(c,f),e||(e=["_px.jpg","_py.jpg","_pz.jpg","_nx.jpg","_ny.jpg","_nz.jpg"]),this._extensions=e,this._texture||(d.useDelayedTextureLoading?this.delayLoadState=a.Engine.DELAYLOADSTATE_NOTLOADED:this._texture=d.getEngine().createCubeTexture(c,d,e,f)),this.isCube=!0,this._textureMatrix=a.Matrix.Identity()}return __extends(c,b),c.prototype.clone=function(){var b=new a.CubeTexture(this.url,this.getScene(),this._extensions,this._noMipmap);return b.level=this.level,b.wrapU=this.wrapU,b.wrapV=this.wrapV,b.coordinatesIndex=this.coordinatesIndex,b.coordinatesMode=this.coordinatesMode,b},c.prototype.delayLoad=function(){this.delayLoadState==a.Engine.DELAYLOADSTATE_NOTLOADED&&(this.delayLoadState=a.Engine.DELAYLOADSTATE_LOADED,this._texture=this._getFromCache(this.url,this._noMipmap),this._texture||(this._texture=this.getScene().getEngine().createCubeTexture(this.url,this.getScene(),this._extensions)))},c.prototype.getReflectionTextureMatrix=function(){return this._textureMatrix},c}(a.BaseTexture);a.CubeTexture=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f,g){"undefined"==typeof g&&(g=!0),b.call(this,null,e,!f),this.renderList=new Array,this.renderParticles=!0,this.renderSprites=!1,this.coordinatesMode=a.Texture.PROJECTION_MODE,this._currentRefreshId=-1,this._refreshRate=1,this.name=c,this.isRenderTarget=!0,this._size=d,this._generateMipMaps=f,this._doNotChangeAspectRatio=g,this._texture=e.getEngine().createRenderTargetTexture(d,f),this._renderingManager=new a.RenderingManager(e)}return __extends(c,b),c.prototype.resetRefreshCounter=function(){this._currentRefreshId=-1},Object.defineProperty(c.prototype,"refreshRate",{get:function(){return this._refreshRate},set:function(a){this._refreshRate=a,this.resetRefreshCounter()},enumerable:!0,configurable:!0}),c.prototype._shouldRender=function(){return-1===this._currentRefreshId?(this._currentRefreshId=1,!0):this.refreshRate==this._currentRefreshId?(this._currentRefreshId=1,!0):(this._currentRefreshId++,!1)},c.prototype.getRenderSize=function(){return this._size},c.prototype.resize=function(a,b){this.releaseInternalTexture(),this._texture=this.getScene().getEngine().createRenderTargetTexture(a,b)},c.prototype.render=function(a){var b=this.getScene(),c=b.getEngine();if(this._waitingRenderList){this.renderList=[];for(var d=0;d<this._waitingRenderList.length;d++){var e=this._waitingRenderList[d];this.renderList.push(b.getMeshByID(e))}delete this._waitingRenderList}if(this.renderList&&0!=this.renderList.length){a&&b.postProcessManager._prepareFrame(this._texture)||c.bindFramebuffer(this._texture),c.clear(b.clearColor,!0,!0),this._renderingManager.reset();for(var f=0;f<this.renderList.length;f++){var g=this.renderList[f];if(g){if(!g.isReady()||g.material&&!g.material.isReady()){this.resetRefreshCounter();continue}if(g.isEnabled()&&g.isVisible&&g.subMeshes&&0!=(g.layerMask&b.activeCamera.layerMask)){g._activate(b.getRenderId());for(var h=0;h<g.subMeshes.length;h++){var i=g.subMeshes[h];b._activeVertices+=i.verticesCount,this._renderingManager.dispatch(i)}}}}this._doNotChangeAspectRatio||b.updateTransformMatrix(!0),this.onBeforeRender&&this.onBeforeRender(),this._renderingManager.render(this.customRenderFunction,this.renderList,this.renderParticles,this.renderSprites),a&&b.postProcessManager._finalizeFrame(!1,this._texture),this.onAfterRender&&this.onAfterRender(),c.unBindFramebuffer(this._texture),this._doNotChangeAspectRatio||b.updateTransformMatrix(!0)}},c.prototype.clone=function(){var b=this.getSize(),c=new a.RenderTargetTexture(this.name,b.width,this.getScene(),this._generateMipMaps);return c.hasAlpha=this.hasAlpha,c.level=this.level,c.coordinatesMode=this.coordinatesMode,c.renderList=this.renderList.slice(0),c},c}(a.Texture);a.RenderTargetTexture=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;
!function(a){var b=function(b){function c(c,d,e,f){var g=this;b.call(this,c,d,e,f,!0),this.mirrorPlane=new a.Plane(0,1,0,1),this._transformMatrix=a.Matrix.Zero(),this._mirrorMatrix=a.Matrix.Zero(),this.onBeforeRender=function(){a.Matrix.ReflectionToRef(g.mirrorPlane,g._mirrorMatrix),g._savedViewMatrix=e.getViewMatrix(),g._mirrorMatrix.multiplyToRef(g._savedViewMatrix,g._transformMatrix),e.setTransformMatrix(g._transformMatrix,e.getProjectionMatrix()),e.clipPlane=g.mirrorPlane,e.getEngine().cullBackFaces=!1},this.onAfterRender=function(){e.setTransformMatrix(g._savedViewMatrix,e.getProjectionMatrix()),e.getEngine().cullBackFaces=!0,delete e.clipPlane}}return __extends(c,b),c.prototype.clone=function(){var b=this.getSize(),c=new a.MirrorTexture(this.name,b.width,this.getScene(),this._generateMipMaps);return c.hasAlpha=this.hasAlpha,c.level=this.level,c.mirrorPlane=this.mirrorPlane.clone(),c.renderList=this.renderList.slice(0),c},c}(a.RenderTargetTexture);a.MirrorTexture=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f,g){"undefined"==typeof g&&(g=a.Texture.TRILINEAR_SAMPLINGMODE),b.call(this,null,e,!f),this.name=c,this.wrapU=a.Texture.CLAMP_ADDRESSMODE,this.wrapV=a.Texture.CLAMP_ADDRESSMODE,this._generateMipMaps=f,d.getContext?(this._canvas=d,this._texture=e.getEngine().createDynamicTexture(d.width,d.height,f,g)):(this._canvas=document.createElement("canvas"),this._texture=d.width?e.getEngine().createDynamicTexture(d.width,d.height,f,g):e.getEngine().createDynamicTexture(d,d,f,g));var h=this.getSize();this._canvas.width=h.width,this._canvas.height=h.height,this._context=this._canvas.getContext("2d")}return __extends(c,b),c.prototype.getContext=function(){return this._context},c.prototype.update=function(a){this.getScene().getEngine().updateDynamicTexture(this._texture,this._canvas,void 0===a?!0:a)},c.prototype.drawText=function(a,b,c,d,e,f,g){var h=this.getSize();if(f&&(this._context.fillStyle=f,this._context.fillRect(0,0,h.width,h.height)),this._context.font=d,null===b){var i=this._context.measureText(a);b=(h.width-i.width)/2}this._context.fillStyle=e,this._context.fillText(a,b,c),this.update(g)},c.prototype.clone=function(){var b=this.getSize(),c=new a.DynamicTexture(this.name,b.width,this.getScene(),this._generateMipMaps);return c.hasAlpha=this.hasAlpha,c.level=this.level,c.wrapU=this.wrapU,c.wrapV=this.wrapV,c},c}(a.Texture);a.DynamicTexture=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f,g,h,i){"undefined"==typeof i&&(i=a.Texture.TRILINEAR_SAMPLINGMODE);var j=this;b.call(this,null,f,!g,h),this._autoLaunch=!0,this.name=c,this.wrapU=a.Texture.WRAP_ADDRESSMODE,this.wrapV=a.Texture.WRAP_ADDRESSMODE;var k=e.width||e,l=e.height||e;this._texture=f.getEngine().createDynamicTexture(k,l,g,i);var m=this.getSize();this.video=document.createElement("video"),this.video.width=m.width,this.video.height=m.height,this.video.autoplay=!1,this.video.loop=!0,this.video.addEventListener("canplaythrough",function(){j._texture&&(j._texture.isReady=!0)}),d.forEach(function(a){var b=document.createElement("source");b.src=a,j.video.appendChild(b)}),this._lastUpdate=(new Date).getTime()}return __extends(c,b),c.prototype.update=function(){this._autoLaunch&&(this._autoLaunch=!1,this.video.play());var a=(new Date).getTime();return a-this._lastUpdate<15?!1:(this._lastUpdate=a,this.getScene().getEngine().updateVideoTexture(this._texture,this.video,this._invertY),!0)},c}(a.Texture);a.VideoTexture=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c,d,e,f,g,h,i){var j=this;this._isReady=!1,this._compilationError="",this._valueCache=[],this._engine=e,this.name=a,this.defines=f,this._uniformsNames=c.concat(d),this._samplers=d,this._attributesNames=b,this.onError=i,this.onCompiled=h;var k,l;a.vertexElement?(k=document.getElementById(a.vertexElement),l=document.getElementById(a.fragmentElement)):(k=a.vertexElement||a.vertex||a,l=a.fragmentElement||a.fragment||a),this._loadVertexShader(k,function(a){j._loadFragmentShader(l,function(c){j._prepareEffect(a,c,b,f,g)})})}return b.prototype.isReady=function(){return this._isReady},b.prototype.getProgram=function(){return this._program},b.prototype.getAttributesNames=function(){return this._attributesNames},b.prototype.getAttributeLocation=function(a){return this._attributes[a]},b.prototype.getAttributeLocationByName=function(a){var b=this._attributesNames.indexOf(a);return this._attributes[b]},b.prototype.getAttributesCount=function(){return this._attributes.length},b.prototype.getUniformIndex=function(a){return this._uniformsNames.indexOf(a)},b.prototype.getUniform=function(a){return this._uniforms[this._uniformsNames.indexOf(a)]},b.prototype.getSamplers=function(){return this._samplers},b.prototype.getCompilationError=function(){return this._compilationError},b.prototype._loadVertexShader=function(b,c){if(b instanceof HTMLElement){var d=a.Tools.GetDOMTextContent(b);return void c(d)}if(a.Effect.ShadersStore[b+"VertexShader"])return void c(a.Effect.ShadersStore[b+"VertexShader"]);var e;e="."===b[0]?b:a.Engine.ShadersRepository+b,a.Tools.LoadFile(e+".vertex.fx",c)},b.prototype._loadFragmentShader=function(b,c){if(b instanceof HTMLElement){var d=a.Tools.GetDOMTextContent(b);return void c(d)}if(a.Effect.ShadersStore[b+"PixelShader"])return void c(a.Effect.ShadersStore[b+"PixelShader"]);var e;e="."===b[0]?b:a.Engine.ShadersRepository+b,a.Tools.LoadFile(e+".fragment.fx",c)},b.prototype._prepareEffect=function(b,c,d,e,f,g){try{var h=this._engine;this._program=h.createShaderProgram(b,c,e),this._uniforms=h.getUniforms(this._program,this._uniformsNames),this._attributes=h.getAttributes(this._program,d);for(var i=0;i<this._samplers.length;i++){var j=this.getUniform(this._samplers[i]);null==j&&(this._samplers.splice(i,1),i--)}h.bindSamplers(this),this._isReady=!0,this.onCompiled&&this.onCompiled(this)}catch(k){if(!g&&f){for(i=0;i<f.length;i++)e=e.replace(f[i],"");this._prepareEffect(b,c,d,e,f,!0)}else a.Tools.Error("Unable to compile effect: "+this.name),a.Tools.Error("Defines: "+e),a.Tools.Error("Optional defines: "+f),a.Tools.Error("Error: "+k.message),this._compilationError=k.message,this.onError&&this.onError(this,this._compilationError)}},b.prototype._bindTexture=function(a,b){this._engine._bindTexture(this._samplers.indexOf(a),b)},b.prototype.setTexture=function(a,b){this._engine.setTexture(this._samplers.indexOf(a),b)},b.prototype.setTextureFromPostProcess=function(a,b){this._engine.setTextureFromPostProcess(this._samplers.indexOf(a),b)},b.prototype._cacheFloat2=function(a,b,c){return this._valueCache[a]?(this._valueCache[a][0]=b,void(this._valueCache[a][1]=c)):void(this._valueCache[a]=[b,c])},b.prototype._cacheFloat3=function(a,b,c,d){return this._valueCache[a]?(this._valueCache[a][0]=b,this._valueCache[a][1]=c,void(this._valueCache[a][2]=d)):void(this._valueCache[a]=[b,c,d])},b.prototype._cacheFloat4=function(a,b,c,d,e){return this._valueCache[a]?(this._valueCache[a][0]=b,this._valueCache[a][1]=c,this._valueCache[a][2]=d,void(this._valueCache[a][3]=e)):void(this._valueCache[a]=[b,c,d,e])},b.prototype.setArray=function(a,b){return this._engine.setArray(this.getUniform(a),b),this},b.prototype.setMatrices=function(a,b){return this._engine.setMatrices(this.getUniform(a),b),this},b.prototype.setMatrix=function(a,b){return this._engine.setMatrix(this.getUniform(a),b),this},b.prototype.setFloat=function(a,b){return this._valueCache[a]&&this._valueCache[a]===b?this:(this._valueCache[a]=b,this._engine.setFloat(this.getUniform(a),b),this)},b.prototype.setBool=function(a,b){return this._valueCache[a]&&this._valueCache[a]===b?this:(this._valueCache[a]=b,this._engine.setBool(this.getUniform(a),b?1:0),this)},b.prototype.setVector2=function(a,b){return this._valueCache[a]&&this._valueCache[a][0]==b.x&&this._valueCache[a][1]==b.y?this:(this._cacheFloat2(a,b.x,b.y),this._engine.setFloat2(this.getUniform(a),b.x,b.y),this)},b.prototype.setFloat2=function(a,b,c){return this._valueCache[a]&&this._valueCache[a][0]==b&&this._valueCache[a][1]==c?this:(this._cacheFloat2(a,b,c),this._engine.setFloat2(this.getUniform(a),b,c),this)},b.prototype.setVector3=function(a,b){return this._valueCache[a]&&this._valueCache[a][0]==b.x&&this._valueCache[a][1]==b.y&&this._valueCache[a][2]==b.z?this:(this._cacheFloat3(a,b.x,b.y,b.z),this._engine.setFloat3(this.getUniform(a),b.x,b.y,b.z),this)},b.prototype.setFloat3=function(a,b,c,d){return this._valueCache[a]&&this._valueCache[a][0]==b&&this._valueCache[a][1]==c&&this._valueCache[a][2]==d?this:(this._cacheFloat3(a,b,c,d),this._engine.setFloat3(this.getUniform(a),b,c,d),this)},b.prototype.setFloat4=function(a,b,c,d,e){return this._valueCache[a]&&this._valueCache[a][0]==b&&this._valueCache[a][1]==c&&this._valueCache[a][2]==d&&this._valueCache[a][3]==e?this:(this._cacheFloat4(a,b,c,d,e),this._engine.setFloat4(this.getUniform(a),b,c,d,e),this)},b.prototype.setColor3=function(a,b){return this._valueCache[a]&&this._valueCache[a][0]==b.r&&this._valueCache[a][1]==b.g&&this._valueCache[a][2]==b.b?this:(this._cacheFloat3(a,b.r,b.g,b.b),this._engine.setColor3(this.getUniform(a),b),this)},b.prototype.setColor4=function(a,b,c){return this._valueCache[a]&&this._valueCache[a][0]==b.r&&this._valueCache[a][1]==b.g&&this._valueCache[a][2]==b.b&&this._valueCache[a][3]==c?this:(this._cacheFloat4(a,b.r,b.g,b.b,c),this._engine.setColor4(this.getUniform(a),b,c),this)},b.ShadersStore={anaglyphPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\nuniform sampler2D leftSampler;\n\nvoid main(void)\n{\n    vec4 leftFrag = texture2D(leftSampler, vUV);\n    leftFrag = vec4(1.0, leftFrag.g, leftFrag.b, 1.0);\n\n	vec4 rightFrag = texture2D(textureSampler, vUV);\n    rightFrag = vec4(rightFrag.r, 1.0, 1.0, 1.0);\n\n    gl_FragColor = vec4(rightFrag.rgb * leftFrag.rgb, 1.0);\n}",blackAndWhitePixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nvoid main(void) \n{\n	float luminance = dot(texture2D(textureSampler, vUV).rgb, vec3(0.3, 0.59, 0.11));\n	gl_FragColor = vec4(luminance, luminance, luminance, 1.0);\n}",blurPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\n// Parameters\nuniform vec2 screenSize;\nuniform vec2 direction;\nuniform float blurWidth;\n\nvoid main(void)\n{\n	float weights[7];\n	weights[0] = 0.05;\n	weights[1] = 0.1;\n	weights[2] = 0.2;\n	weights[3] = 0.3;\n	weights[4] = 0.2;\n	weights[5] = 0.1;\n	weights[6] = 0.05;\n\n	vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);\n	vec2 texelStep = texelSize * direction * blurWidth;\n	vec2 start = vUV - 3.0 * texelStep;\n\n	vec4 baseColor = vec4(0., 0., 0., 0.);\n	vec2 texelOffset = vec2(0., 0.);\n\n	for (int i = 0; i < 7; i++)\n	{\n		baseColor += texture2D(textureSampler, start + texelOffset) * weights[i];\n		texelOffset += texelStep;\n	}\n\n	gl_FragColor = baseColor;\n}",colorPixelShader:"precision mediump float;\n\nuniform vec3 color;\n\nvoid main(void) {\n	gl_FragColor = vec4(color, 1.);\n}",colorVertexShader:"precision mediump float;\n\n// Attributes\nattribute vec3 position;\n\n// Uniforms\nuniform mat4 worldViewProjection;\n\nvoid main(void) {\n	gl_Position = worldViewProjection * vec4(position, 1.0);\n}",convolutionPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nuniform vec2 screenSize;\nuniform float kernel[9];\n\nvoid main(void)\n{\n	vec2 onePixel = vec2(1.0, 1.0) / screenSize;\n	vec4 colorSum =\n		texture2D(textureSampler, vUV + onePixel * vec2(-1, -1)) * kernel[0] +\n		texture2D(textureSampler, vUV + onePixel * vec2(0, -1)) * kernel[1] +\n		texture2D(textureSampler, vUV + onePixel * vec2(1, -1)) * kernel[2] +\n		texture2D(textureSampler, vUV + onePixel * vec2(-1, 0)) * kernel[3] +\n		texture2D(textureSampler, vUV + onePixel * vec2(0, 0)) * kernel[4] +\n		texture2D(textureSampler, vUV + onePixel * vec2(1, 0)) * kernel[5] +\n		texture2D(textureSampler, vUV + onePixel * vec2(-1, 1)) * kernel[6] +\n		texture2D(textureSampler, vUV + onePixel * vec2(0, 1)) * kernel[7] +\n		texture2D(textureSampler, vUV + onePixel * vec2(1, 1)) * kernel[8];\n\n	float kernelWeight =\n		kernel[0] +\n		kernel[1] +\n		kernel[2] +\n		kernel[3] +\n		kernel[4] +\n		kernel[5] +\n		kernel[6] +\n		kernel[7] +\n		kernel[8];\n\n	if (kernelWeight <= 0.0) {\n		kernelWeight = 1.0;\n	}\n\n	gl_FragColor = vec4((colorSum / kernelWeight).rgb, 1);\n}",defaultPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define MAP_EXPLICIT	0.\n#define MAP_SPHERICAL	1.\n#define MAP_PLANAR		2.\n#define MAP_CUBIC		3.\n#define MAP_PROJECTION	4.\n#define MAP_SKYBOX		5.\n\n// Constants\nuniform vec3 vEyePosition;\nuniform vec3 vAmbientColor;\nuniform vec4 vDiffuseColor;\nuniform vec4 vSpecularColor;\nuniform vec3 vEmissiveColor;\n\n// Input\nvarying vec3 vPositionW;\nvarying vec3 vNormalW;\n\n#ifdef VERTEXCOLOR\nvarying vec3 vColor;\n#endif\n\n// Lights\n#ifdef LIGHT0\nuniform vec4 vLightData0;\nuniform vec4 vLightDiffuse0;\nuniform vec3 vLightSpecular0;\n#ifdef SHADOW0\nvarying vec4 vPositionFromLight0;\nuniform sampler2D shadowSampler0;\nuniform float darkness0;\n#endif\n#ifdef SPOTLIGHT0\nuniform vec4 vLightDirection0;\n#endif\n#ifdef HEMILIGHT0\nuniform vec3 vLightGround0;\n#endif\n#endif\n\n#ifdef LIGHT1\nuniform vec4 vLightData1;\nuniform vec4 vLightDiffuse1;\nuniform vec3 vLightSpecular1;\n#ifdef SHADOW1\nvarying vec4 vPositionFromLight1;\nuniform sampler2D shadowSampler1;\nuniform float darkness1;\n#endif\n#ifdef SPOTLIGHT1\nuniform vec4 vLightDirection1;\n#endif\n#ifdef HEMILIGHT1\nuniform vec3 vLightGround1;\n#endif\n#endif\n\n#ifdef LIGHT2\nuniform vec4 vLightData2;\nuniform vec4 vLightDiffuse2;\nuniform vec3 vLightSpecular2;\n#ifdef SHADOW2\nvarying vec4 vPositionFromLight2;\nuniform sampler2D shadowSampler2;\nuniform float darkness2;\n#endif\n#ifdef SPOTLIGHT2\nuniform vec4 vLightDirection2;\n#endif\n#ifdef HEMILIGHT2\nuniform vec3 vLightGround2;\n#endif\n#endif\n\n#ifdef LIGHT3\nuniform vec4 vLightData3;\nuniform vec4 vLightDiffuse3;\nuniform vec3 vLightSpecular3;\n#ifdef SHADOW3\nvarying vec4 vPositionFromLight3;\nuniform sampler2D shadowSampler3;\nuniform float darkness3;\n#endif\n#ifdef SPOTLIGHT3\nuniform vec4 vLightDirection3;\n#endif\n#ifdef HEMILIGHT3\nuniform vec3 vLightGround3;\n#endif\n#endif\n\n// Samplers\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef AMBIENT\nvarying vec2 vAmbientUV;\nuniform sampler2D ambientSampler;\nuniform vec2 vAmbientInfos;\n#endif\n\n#ifdef OPACITY	\nvarying vec2 vOpacityUV;\nuniform sampler2D opacitySampler;\nuniform vec2 vOpacityInfos;\n#endif\n\n#ifdef EMISSIVE\nvarying vec2 vEmissiveUV;\nuniform vec2 vEmissiveInfos;\nuniform sampler2D emissiveSampler;\n#endif\n\n#ifdef SPECULAR\nvarying vec2 vSpecularUV;\nuniform vec2 vSpecularInfos;\nuniform sampler2D specularSampler;\n#endif\n\n// Reflection\n#ifdef REFLECTION\nvarying vec3 vPositionUVW;\nuniform samplerCube reflectionCubeSampler;\nuniform sampler2D reflection2DSampler;\nuniform vec3 vReflectionInfos;\nuniform mat4 reflectionMatrix;\nuniform mat4 view;\n\nvec3 computeReflectionCoords(float mode, vec4 worldPos, vec3 worldNormal)\n{\n	if (mode == MAP_SPHERICAL)\n	{\n		vec3 coords = vec3(view * vec4(worldNormal, 0.0));\n\n		return vec3(reflectionMatrix * vec4(coords, 1.0));\n	}\n	else if (mode == MAP_PLANAR)\n	{\n		vec3 viewDir = worldPos.xyz - vEyePosition;\n		vec3 coords = normalize(reflect(viewDir, worldNormal));\n\n		return vec3(reflectionMatrix * vec4(coords, 1));\n	}\n	else if (mode == MAP_CUBIC)\n	{\n		vec3 viewDir = worldPos.xyz - vEyePosition;\n		vec3 coords = reflect(viewDir, worldNormal);\n\n		return vec3(reflectionMatrix * vec4(coords, 0));\n	}\n	else if (mode == MAP_PROJECTION)\n	{\n		return vec3(reflectionMatrix * (view * worldPos));\n	}\n	else if (mode == MAP_SKYBOX)\n	{\n		return vPositionUVW;\n	}\n\n	return vec3(0, 0, 0);\n}\n#endif\n\n// Shadows\n#ifdef SHADOWS\n\nfloat unpack(vec4 color)\n{\n	const vec4 bitShift = vec4(1. / (255. * 255. * 255.), 1. / (255. * 255.), 1. / 255., 1.);\n	return dot(color, bitShift);\n}\n\nfloat unpackHalf(vec2 color)\n{\n	return color.x + (color.y / 255.0);\n}\n\nfloat computeShadow(vec4 vPositionFromLight, sampler2D shadowSampler, float darkness)\n{\n	vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w;\n	vec2 uv = 0.5 * depth.xy + vec2(0.5, 0.5);\n\n	if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0)\n	{\n		return 1.0;\n	}\n\n	float shadow = unpack(texture2D(shadowSampler, uv));\n\n	if (depth.z > shadow)\n	{\n		return darkness;\n	}\n	return 1.;\n}\n\n// Thanks to http://devmaster.net/\nfloat ChebychevInequality(vec2 moments, float t)\n{\n	if (t <= moments.x)\n	{\n		return 1.0;\n	}\n\n	float variance = moments.y - (moments.x * moments.x);\n	variance = max(variance, 0.);\n\n	float d = t - moments.x;\n	return variance / (variance + d * d);\n}\n\nfloat computeShadowWithVSM(vec4 vPositionFromLight, sampler2D shadowSampler)\n{\n	vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w;\n	vec2 uv = 0.5 * depth.xy + vec2(0.5, 0.5);\n\n	if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0)\n	{\n		return 1.0;\n	}\n\n	vec4 texel = texture2D(shadowSampler, uv);\n\n	vec2 moments = vec2(unpackHalf(texel.xy), unpackHalf(texel.zw));\n	return clamp(1.3 - ChebychevInequality(moments, depth.z), 0., 1.0);\n}\n#endif\n\n// Bump\n#ifdef BUMP\n#extension GL_OES_standard_derivatives : enable\nvarying vec2 vBumpUV;\nuniform vec2 vBumpInfos;\nuniform sampler2D bumpSampler;\n\n// Thanks to http://www.thetenthplanet.de/archives/1180\nmat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv)\n{\n	// get edge vectors of the pixel triangle\n	vec3 dp1 = dFdx(p);\n	vec3 dp2 = dFdy(p);\n	vec2 duv1 = dFdx(uv);\n	vec2 duv2 = dFdy(uv);\n\n	// solve the linear system\n	vec3 dp2perp = cross(dp2, normal);\n	vec3 dp1perp = cross(normal, dp1);\n	vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;\n	vec3 binormal = dp2perp * duv1.y + dp1perp * duv2.y;\n\n	// construct a scale-invariant frame \n	float invmax = inversesqrt(max(dot(tangent, tangent), dot(binormal, binormal)));\n	return mat3(tangent * invmax, binormal * invmax, normal);\n}\n\nvec3 perturbNormal(vec3 viewDir)\n{\n	vec3 map = texture2D(bumpSampler, vBumpUV).xyz * vBumpInfos.y;\n	map = map * 255. / 127. - 128. / 127.;\n	mat3 TBN = cotangent_frame(vNormalW, -viewDir, vBumpUV);\n	return normalize(TBN * map);\n}\n#endif\n\n#ifdef CLIPPLANE\nvarying float fClipDistance;\n#endif\n\n// Fog\n#ifdef FOG\n\n#define FOGMODE_NONE    0.\n#define FOGMODE_EXP     1.\n#define FOGMODE_EXP2    2.\n#define FOGMODE_LINEAR  3.\n#define E 2.71828\n\nuniform vec4 vFogInfos;\nuniform vec3 vFogColor;\nvarying float fFogDistance;\n\nfloat CalcFogFactor()\n{\n	float fogCoeff = 1.0;\n	float fogStart = vFogInfos.y;\n	float fogEnd = vFogInfos.z;\n	float fogDensity = vFogInfos.w;\n\n	if (FOGMODE_LINEAR == vFogInfos.x)\n	{\n		fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);\n	}\n	else if (FOGMODE_EXP == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);\n	}\n	else if (FOGMODE_EXP2 == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);\n	}\n\n	return clamp(fogCoeff, 0.0, 1.0);\n}\n#endif\n\n// Light Computing\nstruct lightingInfo\n{\n	vec3 diffuse;\n	vec3 specular;\n};\n\nlightingInfo computeLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec3 diffuseColor, vec3 specularColor, float range) {\n	lightingInfo result;\n\n	vec3 lightVectorW;\n	float attenuation = 1.0;\n	if (lightData.w == 0.)\n	{\n		vec3 direction = lightData.xyz - vPositionW;\n\n		attenuation =  max(0., 1.0 - length(direction) / range);\n		lightVectorW = normalize(direction);\n	}\n	else\n	{\n		lightVectorW = normalize(-lightData.xyz);\n	}\n\n	// diffuse\n	float ndl = max(0., dot(vNormal, lightVectorW));\n\n	// Specular\n	vec3 angleW = normalize(viewDirectionW + lightVectorW);\n	float specComp = max(0., dot(vNormal, angleW));\n	specComp = pow(specComp, max(1., vSpecularColor.a));\n\n	result.diffuse = ndl * diffuseColor * attenuation;\n	result.specular = specComp * specularColor * attenuation;\n\n	return result;\n}\n\nlightingInfo computeSpotLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec4 lightDirection, vec3 diffuseColor, vec3 specularColor, float range) {\n	lightingInfo result;\n\n	vec3 direction = lightData.xyz - vPositionW;\n	vec3 lightVectorW = normalize(direction);\n	float attenuation = max(0., 1.0 - length(direction) / range);\n\n	// diffuse\n	float cosAngle = max(0., dot(-lightDirection.xyz, lightVectorW));\n	float spotAtten = 0.0;\n\n	if (cosAngle >= lightDirection.w)\n	{\n		cosAngle = max(0., pow(cosAngle, lightData.w));\n		spotAtten = max(0., (cosAngle - lightDirection.w) / (1. - cosAngle));\n\n		// Diffuse\n		float ndl = max(0., dot(vNormal, -lightDirection.xyz));\n\n		// Specular\n		vec3 angleW = normalize(viewDirectionW - lightDirection.xyz);\n		float specComp = max(0., dot(vNormal, angleW));\n		specComp = pow(specComp, vSpecularColor.a);\n\n		result.diffuse = ndl * spotAtten * diffuseColor * attenuation;\n		result.specular = specComp * specularColor * spotAtten * attenuation;\n\n		return result;\n	}\n\n	result.diffuse = vec3(0.);\n	result.specular = vec3(0.);\n\n	return result;\n}\n\nlightingInfo computeHemisphericLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec3 diffuseColor, vec3 specularColor, vec3 groundColor) {\n	lightingInfo result;\n\n	// Diffuse\n	float ndl = dot(vNormal, lightData.xyz) * 0.5 + 0.5;\n\n	// Specular\n	vec3 angleW = normalize(viewDirectionW + lightData.xyz);\n	float specComp = max(0., dot(vNormal, angleW));\n	specComp = pow(specComp, vSpecularColor.a);\n\n	result.diffuse = mix(groundColor, diffuseColor, ndl);\n	result.specular = specComp * specularColor;\n\n	return result;\n}\n\nvoid main(void) {\n	// Clip plane\n#ifdef CLIPPLANE\n	if (fClipDistance > 0.0)\n		discard;\n#endif\n\n	vec3 viewDirectionW = normalize(vEyePosition - vPositionW);\n\n	// Base color\n	vec4 baseColor = vec4(1., 1., 1., 1.);\n	vec3 diffuseColor = vDiffuseColor.rgb;\n\n	// Alpha\n	float alpha = vDiffuseColor.a;\n\n#ifdef VERTEXCOLOR\n	diffuseColor *= vColor;\n#endif\n\n#ifdef DIFFUSE\n	baseColor = texture2D(diffuseSampler, vDiffuseUV);\n\n#ifdef ALPHATEST\n	if (baseColor.a < 0.4)\n		discard;\n#endif\n\n#ifdef ALPHAFROMDIFFUSE\n	alpha *= baseColor.a;\n#endif\n\n	baseColor.rgb *= vDiffuseInfos.y;\n#endif\n\n	// Bump\n	vec3 normalW = normalize(vNormalW);\n\n#ifdef BUMP\n	normalW = perturbNormal(viewDirectionW);\n#endif\n\n	// Ambient color\n	vec3 baseAmbientColor = vec3(1., 1., 1.);\n\n#ifdef AMBIENT\n	baseAmbientColor = texture2D(ambientSampler, vAmbientUV).rgb * vAmbientInfos.y;\n#endif\n\n	// Lighting\n	vec3 diffuseBase = vec3(0., 0., 0.);\n	vec3 specularBase = vec3(0., 0., 0.);\n	float shadow = 1.;\n\n#ifdef LIGHT0\n#ifdef SPOTLIGHT0\n	lightingInfo info = computeSpotLighting(viewDirectionW, normalW, vLightData0, vLightDirection0, vLightDiffuse0.rgb, vLightSpecular0, vLightDiffuse0.a);\n#endif\n#ifdef HEMILIGHT0\n	lightingInfo info = computeHemisphericLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0.rgb, vLightSpecular0, vLightGround0);\n#endif\n#ifdef POINTDIRLIGHT0\n	lightingInfo info = computeLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0.rgb, vLightSpecular0, vLightDiffuse0.a);\n#endif\n#ifdef SHADOW0\n#ifdef SHADOWVSM0\n	shadow = computeShadowWithVSM(vPositionFromLight0, shadowSampler0);\n#else\n	shadow = computeShadow(vPositionFromLight0, shadowSampler0, darkness0);\n#endif\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info.diffuse * shadow;\n	specularBase += info.specular * shadow;\n#endif\n\n#ifdef LIGHT1\n#ifdef SPOTLIGHT1\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData1, vLightDirection1, vLightDiffuse1.rgb, vLightSpecular1, vLightDiffuse1.a);\n#endif\n#ifdef HEMILIGHT1\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1.rgb, vLightSpecular1, vLightGround1);\n#endif\n#ifdef POINTDIRLIGHT1\n	info = computeLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1.rgb, vLightSpecular1, vLightDiffuse1.a);\n#endif\n#ifdef SHADOW1\n#ifdef SHADOWVSM1\n	shadow = computeShadowWithVSM(vPositionFromLight1, shadowSampler1);\n#else\n	shadow = computeShadow(vPositionFromLight1, shadowSampler1, darkness1);\n#endif\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info.diffuse * shadow;\n	specularBase += info.specular * shadow;\n#endif\n\n#ifdef LIGHT2\n#ifdef SPOTLIGHT2\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData2, vLightDirection2, vLightDiffuse2.rgb, vLightSpecular2, vLightDiffuse2.a);\n#endif\n#ifdef HEMILIGHT2\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2.rgb, vLightSpecular2, vLightGround2);\n#endif\n#ifdef POINTDIRLIGHT2\n	info = computeLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2.rgb, vLightSpecular2, vLightDiffuse2.a);\n#endif\n#ifdef SHADOW2\n#ifdef SHADOWVSM2\n	shadow = computeShadowWithVSM(vPositionFromLight2, shadowSampler2);\n#else\n	shadow = computeShadow(vPositionFromLight2, shadowSampler2, darkness2);\n#endif	\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info.diffuse * shadow;\n	specularBase += info.specular * shadow;\n#endif\n\n#ifdef LIGHT3\n#ifdef SPOTLIGHT3\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData3, vLightDirection3, vLightDiffuse3.rgb, vLightSpecular3, vLightDiffuse3.a);\n#endif\n#ifdef HEMILIGHT3\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3.rgb, vLightSpecular3, vLightGround3);\n#endif\n#ifdef POINTDIRLIGHT3\n	info = computeLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3.rgb, vLightSpecular3, vLightDiffuse3.a);\n#endif\n#ifdef SHADOW3\n#ifdef SHADOWVSM3\n	shadow = computeShadowWithVSM(vPositionFromLight3, shadowSampler3);\n#else\n	shadow = computeShadow(vPositionFromLight3, shadowSampler3, darkness3);\n#endif	\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info.diffuse * shadow;\n	specularBase += info.specular * shadow;\n#endif\n\n	// Reflection\n	vec3 reflectionColor = vec3(0., 0., 0.);\n\n#ifdef REFLECTION\n	vec3 vReflectionUVW = computeReflectionCoords(vReflectionInfos.x, vec4(vPositionW, 1.0), normalW);\n\n	if (vReflectionInfos.z != 0.0)\n	{\n		reflectionColor = textureCube(reflectionCubeSampler, vReflectionUVW).rgb * vReflectionInfos.y * shadow;\n	}\n	else\n	{\n		vec2 coords = vReflectionUVW.xy;\n\n		if (vReflectionInfos.x == MAP_PROJECTION)\n		{\n			coords /= vReflectionUVW.z;\n		}\n\n		coords.y = 1.0 - coords.y;\n\n		reflectionColor = texture2D(reflection2DSampler, coords).rgb * vReflectionInfos.y * shadow;\n	}\n#endif\n\n#ifdef OPACITY\n	vec4 opacityMap = texture2D(opacitySampler, vOpacityUV);\n\n#ifdef OPACITYRGB\n	opacityMap.rgb = opacityMap.rgb * vec3(0.3, 0.59, 0.11);\n	alpha *= (opacityMap.x + opacityMap.y + opacityMap.z)* vOpacityInfos.y;\n#else\n	alpha *= opacityMap.a * vOpacityInfos.y;\n#endif\n\n\n#endif\n\n	// Emissive\n	vec3 emissiveColor = vEmissiveColor;\n#ifdef EMISSIVE\n	emissiveColor += texture2D(emissiveSampler, vEmissiveUV).rgb * vEmissiveInfos.y;\n#endif\n\n	// Specular map\n	vec3 specularColor = vSpecularColor.rgb;\n#ifdef SPECULAR\n	specularColor = texture2D(specularSampler, vSpecularUV).rgb * vSpecularInfos.y;\n#endif\n\n	// Composition\n	vec3 finalDiffuse = clamp(diffuseBase * diffuseColor + emissiveColor + vAmbientColor, 0.0, 1.0) * baseColor.rgb;\n	vec3 finalSpecular = specularBase * specularColor;\n\n	vec4 color = vec4(finalDiffuse * baseAmbientColor + finalSpecular + reflectionColor, alpha);\n\n#ifdef FOG\n	float fog = CalcFogFactor();\n	color.rgb = fog * color.rgb + (1.0 - fog) * vFogColor;\n#endif\n\n	gl_FragColor = color;\n}",defaultVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec3 color;\n#endif\n#ifdef BONES\nattribute vec4 matricesIndices;\nattribute vec4 matricesWeights;\n#endif\n\n// Uniforms\n\n#ifdef INSTANCES\nattribute vec4 world0;\nattribute vec4 world1;\nattribute vec4 world2;\nattribute vec4 world3;\n#else\nuniform mat4 world;\n#endif\n\nuniform mat4 view;\nuniform mat4 viewProjection;\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef AMBIENT\nvarying vec2 vAmbientUV;\nuniform mat4 ambientMatrix;\nuniform vec2 vAmbientInfos;\n#endif\n\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\n\n#ifdef EMISSIVE\nvarying vec2 vEmissiveUV;\nuniform vec2 vEmissiveInfos;\nuniform mat4 emissiveMatrix;\n#endif\n\n#ifdef SPECULAR\nvarying vec2 vSpecularUV;\nuniform vec2 vSpecularInfos;\nuniform mat4 specularMatrix;\n#endif\n\n#ifdef BUMP\nvarying vec2 vBumpUV;\nuniform vec2 vBumpInfos;\nuniform mat4 bumpMatrix;\n#endif\n\n#ifdef BONES\nuniform mat4 mBones[BonesPerMesh];\n#endif\n\n// Output\nvarying vec3 vPositionW;\nvarying vec3 vNormalW;\n\n#ifdef VERTEXCOLOR\nvarying vec3 vColor;\n#endif\n\n#ifdef CLIPPLANE\nuniform vec4 vClipPlane;\nvarying float fClipDistance;\n#endif\n\n#ifdef FOG\nvarying float fFogDistance;\n#endif\n\n#ifdef SHADOWS\n#ifdef LIGHT0\nuniform mat4 lightMatrix0;\nvarying vec4 vPositionFromLight0;\n#endif\n#ifdef LIGHT1\nuniform mat4 lightMatrix1;\nvarying vec4 vPositionFromLight1;\n#endif\n#ifdef LIGHT2\nuniform mat4 lightMatrix2;\nvarying vec4 vPositionFromLight2;\n#endif\n#ifdef LIGHT3\nuniform mat4 lightMatrix3;\nvarying vec4 vPositionFromLight3;\n#endif\n#endif\n\n#ifdef REFLECTION\nvarying vec3 vPositionUVW;\n#endif\n\nvoid main(void) {\n	mat4 finalWorld;\n\n#ifdef REFLECTION\n	vPositionUVW = position;\n#endif \n\n#ifdef BONES\n	mat4 m0 = mBones[int(matricesIndices.x)] * matricesWeights.x;\n	mat4 m1 = mBones[int(matricesIndices.y)] * matricesWeights.y;\n	mat4 m2 = mBones[int(matricesIndices.z)] * matricesWeights.z;\n\n#ifdef BONES4\n	mat4 m3 = mBones[int(matricesIndices.w)] * matricesWeights.w;\n	finalWorld = world * (m0 + m1 + m2 + m3);\n#else\n	finalWorld = world * (m0 + m1 + m2);\n#endif \n\n#else\n#ifdef INSTANCES\n	finalWorld = mat4(world0, world1, world2, world3);\n#else\n	finalWorld = world;\n#endif\n#endif\n	gl_Position = viewProjection * finalWorld * vec4(position, 1.0);\n\n	vec4 worldPos = finalWorld * vec4(position, 1.0);\n	vPositionW = vec3(worldPos);\n	vNormalW = normalize(vec3(finalWorld * vec4(normal, 0.0)));\n\n	// Texture coordinates\n#ifndef UV1\n	vec2 uv = vec2(0., 0.);\n#endif\n#ifndef UV2\n	vec2 uv2 = vec2(0., 0.);\n#endif\n\n#ifdef DIFFUSE\n	if (vDiffuseInfos.x == 0.)\n	{\n		vDiffuseUV = vec2(diffuseMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vDiffuseUV = vec2(diffuseMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef AMBIENT\n	if (vAmbientInfos.x == 0.)\n	{\n		vAmbientUV = vec2(ambientMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vAmbientUV = vec2(ambientMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef OPACITY\n	if (vOpacityInfos.x == 0.)\n	{\n		vOpacityUV = vec2(opacityMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vOpacityUV = vec2(opacityMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef EMISSIVE\n	if (vEmissiveInfos.x == 0.)\n	{\n		vEmissiveUV = vec2(emissiveMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vEmissiveUV = vec2(emissiveMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef SPECULAR\n	if (vSpecularInfos.x == 0.)\n	{\n		vSpecularUV = vec2(specularMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vSpecularUV = vec2(specularMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef BUMP\n	if (vBumpInfos.x == 0.)\n	{\n		vBumpUV = vec2(bumpMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vBumpUV = vec2(bumpMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n	// Clip plane\n#ifdef CLIPPLANE\n	fClipDistance = dot(worldPos, vClipPlane);\n#endif\n\n	// Fog\n#ifdef FOG\n	fFogDistance = (view * worldPos).z;\n#endif\n\n	// Shadows\n#ifdef SHADOWS\n#ifdef LIGHT0\n	vPositionFromLight0 = lightMatrix0 * worldPos;\n#endif\n#ifdef LIGHT1\n	vPositionFromLight1 = lightMatrix1 * worldPos;\n#endif\n#ifdef LIGHT2\n	vPositionFromLight2 = lightMatrix2 * worldPos;\n#endif\n#ifdef LIGHT3\n	vPositionFromLight3 = lightMatrix3 * worldPos;\n#endif\n#endif\n\n	// Vertex color\n#ifdef VERTEXCOLOR\n	vColor = color;\n#endif\n}",displayPassPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\nuniform sampler2D passSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(passSampler, vUV);\n}",filterPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nuniform mat4 kernelMatrix;\n\nvoid main(void)\n{\n	vec3 baseColor = texture2D(textureSampler, vUV).rgb;\n	vec3 updatedColor = (kernelMatrix * vec4(baseColor, 1.0)).rgb;\n\n	gl_FragColor = vec4(updatedColor, 1.0);\n}",fxaaPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define FXAA_REDUCE_MIN   (1.0/128.0)\n#define FXAA_REDUCE_MUL   (1.0/8.0)\n#define FXAA_SPAN_MAX     8.0\n\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\nuniform vec2 texelSize;\n\nvoid main(){\n	vec2 localTexelSize = texelSize;\n	vec3 rgbNW = texture2D(textureSampler, (vUV + vec2(-1.0, -1.0) * localTexelSize)).xyz;\n	vec3 rgbNE = texture2D(textureSampler, (vUV + vec2(1.0, -1.0) * localTexelSize)).xyz;\n	vec3 rgbSW = texture2D(textureSampler, (vUV + vec2(-1.0, 1.0) * localTexelSize)).xyz;\n	vec3 rgbSE = texture2D(textureSampler, (vUV + vec2(1.0, 1.0) * localTexelSize)).xyz;\n	vec3 rgbM = texture2D(textureSampler, vUV ).xyz;\n	vec3 luma = vec3(0.299, 0.587, 0.114);\n	float lumaNW = dot(rgbNW, luma);\n	float lumaNE = dot(rgbNE, luma);\n	float lumaSW = dot(rgbSW, luma);\n	float lumaSE = dot(rgbSE, luma);\n	float lumaM = dot(rgbM, luma);\n	float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n	float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n	vec2 dir = vec2(-((lumaNW + lumaNE) - (lumaSW + lumaSE)), ((lumaNW + lumaSW) - (lumaNE + lumaSE)));\n\n	float dirReduce = max(\n		(lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),\n		FXAA_REDUCE_MIN);\n\n	float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n	dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n		max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n		dir * rcpDirMin)) * localTexelSize;\n\n	vec3 rgbA = 0.5 * (\n		texture2D(textureSampler, vUV + dir * (1.0 / 3.0 - 0.5)).xyz +\n		texture2D(textureSampler, vUV + dir * (2.0 / 3.0 - 0.5)).xyz);\n\n	vec3 rgbB = rgbA * 0.5 + 0.25 * (\n		texture2D(textureSampler, vUV + dir *  -0.5).xyz +\n		texture2D(textureSampler, vUV + dir * 0.5).xyz);\n	float lumaB = dot(rgbB, luma);\n	if ((lumaB < lumaMin) || (lumaB > lumaMax)) {\n		gl_FragColor = vec4(rgbA, 1.0);\n	}\n	else {\n		gl_FragColor = vec4(rgbB, 1.0);\n	}\n}",layerPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\n// Color\nuniform vec4 color;\n\nvoid main(void) {\n	vec4 baseColor = texture2D(textureSampler, vUV);\n\n	gl_FragColor = baseColor * color;\n}",layerVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec2 position;\n\n// Uniforms\nuniform mat4 textureMatrix;\n\n// Output\nvarying vec2 vUV;\n\nconst vec2 madd = vec2(0.5, 0.5);\n\nvoid main(void) {	\n\n	vUV = vec2(textureMatrix * vec4(position * madd + madd, 1.0, 0.0));\n	gl_Position = vec4(position, 0.0, 1.0);\n}",legacydefaultPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define MAP_PROJECTION	4.\n\n// Constants\nuniform vec3 vEyePosition;\nuniform vec3 vAmbientColor;\nuniform vec4 vDiffuseColor;\nuniform vec4 vSpecularColor;\nuniform vec3 vEmissiveColor;\n\n// Input\nvarying vec3 vPositionW;\nvarying vec3 vNormalW;\n\n#ifdef VERTEXCOLOR\nvarying vec3 vColor;\n#endif\n\n// Lights\n#ifdef LIGHT0\nuniform vec4 vLightData0;\nuniform vec4 vLightDiffuse0;\nuniform vec3 vLightSpecular0;\n#ifdef SHADOW0\nvarying vec4 vPositionFromLight0;\nuniform sampler2D shadowSampler0;\n#endif\n#ifdef SPOTLIGHT0\nuniform vec4 vLightDirection0;\n#endif\n#ifdef HEMILIGHT0\nuniform vec3 vLightGround0;\n#endif\n#endif\n\n#ifdef LIGHT1\nuniform vec4 vLightData1;\nuniform vec4 vLightDiffuse1;\nuniform vec3 vLightSpecular1;\n#ifdef SHADOW1\nvarying vec4 vPositionFromLight1;\nuniform sampler2D shadowSampler1;\n#endif\n#ifdef SPOTLIGHT1\nuniform vec4 vLightDirection1;\n#endif\n#ifdef HEMILIGHT1\nuniform vec3 vLightGround1;\n#endif\n#endif\n\n#ifdef LIGHT2\nuniform vec4 vLightData2;\nuniform vec4 vLightDiffuse2;\nuniform vec3 vLightSpecular2;\n#ifdef SHADOW2\nvarying vec4 vPositionFromLight2;\nuniform sampler2D shadowSampler2;\n#endif\n#ifdef SPOTLIGHT2\nuniform vec4 vLightDirection2;\n#endif\n#ifdef HEMILIGHT2\nuniform vec3 vLightGround2;\n#endif\n#endif\n\n#ifdef LIGHT3\nuniform vec4 vLightData3;\nuniform vec4 vLightDiffuse3;\nuniform vec3 vLightSpecular3;\n#ifdef SHADOW3\nvarying vec4 vPositionFromLight3;\nuniform sampler2D shadowSampler3;\n#endif\n#ifdef SPOTLIGHT3\nuniform vec4 vLightDirection3;\n#endif\n#ifdef HEMILIGHT3\nuniform vec3 vLightGround3;\n#endif\n#endif\n\n// Samplers\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform sampler2D diffuseSampler;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef AMBIENT\nvarying vec2 vAmbientUV;\nuniform sampler2D ambientSampler;\nuniform vec2 vAmbientInfos;\n#endif\n\n#ifdef OPACITY	\nvarying vec2 vOpacityUV;\nuniform sampler2D opacitySampler;\nuniform vec2 vOpacityInfos;\n#endif\n\n#ifdef REFLECTION\nvarying vec3 vReflectionUVW;\nuniform samplerCube reflectionCubeSampler;\nuniform sampler2D reflection2DSampler;\nuniform vec3 vReflectionInfos;\n#endif\n\n#ifdef EMISSIVE\nvarying vec2 vEmissiveUV;\nuniform vec2 vEmissiveInfos;\nuniform sampler2D emissiveSampler;\n#endif\n\n#ifdef SPECULAR\nvarying vec2 vSpecularUV;\nuniform vec2 vSpecularInfos;\nuniform sampler2D specularSampler;\n#endif\n\n// Shadows\n#ifdef SHADOWS\n\nfloat unpack(vec4 color)\n{\n	const vec4 bitShift = vec4(1. / (255. * 255. * 255.), 1. / (255. * 255.), 1. / 255., 1.);\n	return dot(color, bitShift);\n}\n\nfloat unpackHalf(vec2 color)\n{\n	return color.x + (color.y / 255.0);\n}\n\nfloat computeShadow(vec4 vPositionFromLight, sampler2D shadowSampler)\n{\n	vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w;\n	vec2 uv = 0.5 * depth.xy + vec2(0.5, 0.5);\n\n	if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0)\n	{\n		return 1.0;\n	}\n\n	float shadow = unpack(texture2D(shadowSampler, uv));\n\n	if (depth.z > shadow)\n	{\n		return 0.;\n	}\n	return 1.;\n}\n\n// Thanks to http://devmaster.net/\nfloat ChebychevInequality(vec2 moments, float t)\n{\n	if (t <= moments.x)\n	{\n		return 1.0;\n	}\n\n	float variance = moments.y - (moments.x * moments.x);\n	variance = max(variance, 0.);\n\n	float d = t - moments.x;\n	return variance / (variance + d * d);\n}\n\nfloat computeShadowWithVSM(vec4 vPositionFromLight, sampler2D shadowSampler)\n{\n	vec3 depth = vPositionFromLight.xyz / vPositionFromLight.w;\n	vec2 uv = 0.5 * depth.xy + vec2(0.5, 0.5);\n\n	if (uv.x < 0. || uv.x > 1.0 || uv.y < 0. || uv.y > 1.0)\n	{\n		return 1.0;\n	}\n\n	vec4 texel = texture2D(shadowSampler, uv);\n\n	vec2 moments = vec2(unpackHalf(texel.xy), unpackHalf(texel.zw));\n	return clamp(1.3 - ChebychevInequality(moments, depth.z), 0., 1.0);\n}\n#endif\n\n#ifdef CLIPPLANE\nvarying float fClipDistance;\n#endif\n\n// Fog\n#ifdef FOG\n\n#define FOGMODE_NONE    0.\n#define FOGMODE_EXP     1.\n#define FOGMODE_EXP2    2.\n#define FOGMODE_LINEAR  3.\n#define E 2.71828\n\nuniform vec4 vFogInfos;\nuniform vec3 vFogColor;\nvarying float fFogDistance;\n\nfloat CalcFogFactor()\n{\n	float fogCoeff = 1.0;\n	float fogStart = vFogInfos.y;\n	float fogEnd = vFogInfos.z;\n	float fogDensity = vFogInfos.w;\n\n	if (FOGMODE_LINEAR == vFogInfos.x)\n	{\n		fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);\n	}\n	else if (FOGMODE_EXP == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);\n	}\n	else if (FOGMODE_EXP2 == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);\n	}\n\n	return clamp(fogCoeff, 0.0, 1.0);\n}\n#endif\n\n// Light Computing\nmat3 computeLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec4 diffuseColor, vec3 specularColor) {\n	mat3 result;\n\n	vec3 lightVectorW;\n	if (lightData.w == 0.)\n	{\n		lightVectorW = normalize(lightData.xyz - vPositionW);\n	}\n	else\n	{\n		lightVectorW = normalize(-lightData.xyz);\n	}\n\n	// diffuse\n	float ndl = max(0., dot(vNormal, lightVectorW));\n\n	// Specular\n	vec3 angleW = normalize(viewDirectionW + lightVectorW);\n	float specComp = max(0., dot(vNormal, angleW));\n	specComp = max(0., pow(specComp, max(1.0, vSpecularColor.a)));\n\n	result[0] = ndl * diffuseColor.rgb;\n	result[1] = specComp * specularColor;\n	result[2] = vec3(0.);\n\n	return result;\n}\n\nmat3 computeSpotLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec4 lightDirection, vec4 diffuseColor, vec3 specularColor) {\n	mat3 result;\n\n	vec3 lightVectorW = normalize(lightData.xyz - vPositionW);\n\n	// diffuse\n	float cosAngle = max(0., dot(-lightDirection.xyz, lightVectorW));\n	float spotAtten = 0.0;\n\n	if (cosAngle >= lightDirection.w)\n	{\n		cosAngle = max(0., pow(cosAngle, lightData.w));\n		spotAtten = max(0., (cosAngle - lightDirection.w) / (1. - cosAngle));\n\n		// Diffuse\n		float ndl = max(0., dot(vNormal, -lightDirection.xyz));\n\n		// Specular\n		vec3 angleW = normalize(viewDirectionW - lightDirection.xyz);\n		float specComp = max(0., dot(vNormal, angleW));\n		specComp = pow(specComp, vSpecularColor.a);\n\n		result[0] = ndl * spotAtten * diffuseColor.rgb;\n		result[1] = specComp * specularColor * spotAtten;\n		result[2] = vec3(0.);\n\n		return result;\n	}\n\n	result[0] = vec3(0.);\n	result[1] = vec3(0.);\n	result[2] = vec3(0.);\n\n	return result;\n}\n\nmat3 computeHemisphericLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec4 diffuseColor, vec3 specularColor, vec3 groundColor) {\n	mat3 result;\n\n	// Diffuse\n	float ndl = dot(vNormal, lightData.xyz) * 0.5 + 0.5;\n\n	// Specular\n	vec3 angleW = normalize(viewDirectionW + lightData.xyz);\n	float specComp = max(0., dot(vNormal, angleW));\n	specComp = pow(specComp, vSpecularColor.a);\n\n	result[0] = mix(groundColor, diffuseColor.rgb, ndl);\n	result[1] = specComp * specularColor;\n	result[2] = vec3(0.);\n\n	return result;\n}\n\nvoid main(void) {\n	// Clip plane\n#ifdef CLIPPLANE\n	if (fClipDistance > 0.0)\n		discard;\n#endif\n\n	vec3 viewDirectionW = normalize(vEyePosition - vPositionW);\n\n	// Base color\n	vec4 baseColor = vec4(1., 1., 1., 1.);\n	vec3 diffuseColor = vDiffuseColor.rgb;\n\n#ifdef VERTEXCOLOR\n	diffuseColor *= vColor;\n#endif\n\n#ifdef DIFFUSE\n	baseColor = texture2D(diffuseSampler, vDiffuseUV);\n\n#ifdef ALPHATEST\n	if (baseColor.a < 0.4)\n		discard;\n#endif\n\n	baseColor.rgb *= vDiffuseInfos.y;\n#endif\n\n	// Bump\n	vec3 normalW = normalize(vNormalW);\n\n	// Ambient color\n	vec3 baseAmbientColor = vec3(1., 1., 1.);\n\n#ifdef AMBIENT\n	baseAmbientColor = texture2D(ambientSampler, vAmbientUV).rgb * vAmbientInfos.y;\n#endif\n\n	// Lighting\n	vec3 diffuseBase = vec3(0., 0., 0.);\n	vec3 specularBase = vec3(0., 0., 0.);\n	float shadow = 1.;\n\n#ifdef LIGHT0\n#ifdef SPOTLIGHT0\n	mat3 info = computeSpotLighting(viewDirectionW, normalW, vLightData0, vLightDirection0, vLightDiffuse0, vLightSpecular0);\n#endif\n#ifdef HEMILIGHT0\n	mat3 info = computeHemisphericLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0, vLightSpecular0, vLightGround0);\n#endif\n#ifdef POINTDIRLIGHT0\n	mat3 info = computeLighting(viewDirectionW, normalW, vLightData0, vLightDiffuse0, vLightSpecular0);\n#endif\n#ifdef SHADOW0\n#ifdef SHADOWVSM0\n	shadow = computeShadowWithVSM(vPositionFromLight0, shadowSampler0);\n#else\n	shadow = computeShadow(vPositionFromLight0, shadowSampler0);\n#endif\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info[0] * shadow;\n	specularBase += info[1] * shadow;\n#endif\n\n#ifdef LIGHT1\n#ifdef SPOTLIGHT1\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData1, vLightDirection1, vLightDiffuse1, vLightSpecular1);\n#endif\n#ifdef HEMILIGHT1\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1, vLightSpecular1, vLightGround1);\n#endif\n#ifdef POINTDIRLIGHT1\n	info = computeLighting(viewDirectionW, normalW, vLightData1, vLightDiffuse1, vLightSpecular1);\n#endif\n#ifdef SHADOW1\n#ifdef SHADOWVSM1\n	shadow = computeShadowWithVSM(vPositionFromLight1, shadowSampler1);\n#else\n	shadow = computeShadow(vPositionFromLight1, shadowSampler1);\n#endif\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info[0] * shadow;\n	specularBase += info[1] * shadow;\n#endif\n\n#ifdef LIGHT2\n#ifdef SPOTLIGHT2\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData2, vLightDirection2, vLightDiffuse2, vLightSpecular2);\n#endif\n#ifdef HEMILIGHT2\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2, vLightSpecular2, vLightGround2);\n#endif\n#ifdef POINTDIRLIGHT2\n	info = computeLighting(viewDirectionW, normalW, vLightData2, vLightDiffuse2, vLightSpecular2);\n#endif\n#ifdef SHADOW2\n#ifdef SHADOWVSM2\n	shadow = computeShadowWithVSM(vPositionFromLight2, shadowSampler2);\n#else\n	shadow = computeShadow(vPositionFromLight2, shadowSampler2);\n#endif	\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info[0] * shadow;\n	specularBase += info[1] * shadow;\n#endif\n\n#ifdef LIGHT3\n#ifdef SPOTLIGHT3\n	info = computeSpotLighting(viewDirectionW, normalW, vLightData3, vLightDirection3, vLightDiffuse3, vLightSpecular3);\n#endif\n#ifdef HEMILIGHT3\n	info = computeHemisphericLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3, vLightSpecular3, vLightGround3);\n#endif\n#ifdef POINTDIRLIGHT3\n	info = computeLighting(viewDirectionW, normalW, vLightData3, vLightDiffuse3, vLightSpecular3);\n#endif\n#ifdef SHADOW3\n#ifdef SHADOWVSM3\n	shadow = computeShadowWithVSM(vPositionFromLight3, shadowSampler3);\n#else\n	shadow = computeShadow(vPositionFromLight3, shadowSampler3);\n#endif	\n#else\n	shadow = 1.;\n#endif\n	diffuseBase += info[0] * shadow;\n	specularBase += info[1] * shadow;\n#endif\n\n	// Reflection\n	vec3 reflectionColor = vec3(0., 0., 0.);\n\n#ifdef REFLECTION\n	if (vReflectionInfos.z != 0.0)\n	{\n		reflectionColor = textureCube(reflectionCubeSampler, vReflectionUVW).rgb * vReflectionInfos.y;\n	}\n	else\n	{\n		vec2 coords = vReflectionUVW.xy;\n\n		if (vReflectionInfos.x == MAP_PROJECTION)\n		{\n			coords /= vReflectionUVW.z;\n		}\n\n		coords.y = 1.0 - coords.y;\n\n		reflectionColor = texture2D(reflection2DSampler, coords).rgb * vReflectionInfos.y;\n	}\n#endif\n\n	// Alpha\n	float alpha = vDiffuseColor.a;\n\n#ifdef OPACITY\n	vec4 opacityMap = texture2D(opacitySampler, vOpacityUV);\n#ifdef OPACITYRGB\n	opacityMap.rgb = opacityMap.rgb * vec3(0.3, 0.59, 0.11);\n	alpha *= (opacityMap.x + opacityMap.y + opacityMap.z)* vOpacityInfos.y;\n#else\n	alpha *= opacityMap.a * vOpacityInfos.y;\n#endif\n#endif\n\n	// Emissive\n	vec3 emissiveColor = vEmissiveColor;\n#ifdef EMISSIVE\n	emissiveColor += texture2D(emissiveSampler, vEmissiveUV).rgb * vEmissiveInfos.y;\n#endif\n\n	// Specular map\n	vec3 specularColor = vSpecularColor.rgb;\n#ifdef SPECULAR\n	specularColor = texture2D(specularSampler, vSpecularUV).rgb * vSpecularInfos.y;\n#endif\n\n	// Composition\n	vec3 finalDiffuse = clamp(diffuseBase * diffuseColor + emissiveColor + vAmbientColor, 0.0, 1.0) * baseColor.rgb;\n	vec3 finalSpecular = specularBase * specularColor;\n\n	vec4 color = vec4(finalDiffuse * baseAmbientColor + finalSpecular + reflectionColor, alpha);\n\n#ifdef FOG\n	float fog = CalcFogFactor();\n	color.rgb = fog * color.rgb + (1.0 - fog) * vFogColor;\n#endif\n\n	gl_FragColor = color;\n}",legacydefaultVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define MAP_EXPLICIT	0.\n#define MAP_SPHERICAL	1.\n#define MAP_PLANAR		2.\n#define MAP_CUBIC		3.\n#define MAP_PROJECTION	4.\n#define MAP_SKYBOX		5.\n\n// Attributes\nattribute vec3 position;\nattribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec3 color;\n#endif\n#ifdef BONES\nattribute vec4 matricesIndices;\nattribute vec4 matricesWeights;\n#endif\n\n// Uniforms\nuniform mat4 world;\nuniform mat4 view;\nuniform mat4 viewProjection;\n\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n\n#ifdef AMBIENT\nvarying vec2 vAmbientUV;\nuniform mat4 ambientMatrix;\nuniform vec2 vAmbientInfos;\n#endif\n\n#ifdef OPACITY\nvarying vec2 vOpacityUV;\nuniform mat4 opacityMatrix;\nuniform vec2 vOpacityInfos;\n#endif\n\n#ifdef REFLECTION\nuniform vec3 vEyePosition;\nvarying vec3 vReflectionUVW;\nuniform vec3 vReflectionInfos;\nuniform mat4 reflectionMatrix;\n#endif\n\n#ifdef EMISSIVE\nvarying vec2 vEmissiveUV;\nuniform vec2 vEmissiveInfos;\nuniform mat4 emissiveMatrix;\n#endif\n\n#ifdef SPECULAR\nvarying vec2 vSpecularUV;\nuniform vec2 vSpecularInfos;\nuniform mat4 specularMatrix;\n#endif\n\n#ifdef BUMP\nvarying vec2 vBumpUV;\nuniform vec2 vBumpInfos;\nuniform mat4 bumpMatrix;\n#endif\n\n#ifdef BONES\nuniform mat4 mBones[BonesPerMesh];\n#endif\n\n// Output\nvarying vec3 vPositionW;\nvarying vec3 vNormalW;\n\n#ifdef VERTEXCOLOR\nvarying vec3 vColor;\n#endif\n\n#ifdef CLIPPLANE\nuniform vec4 vClipPlane;\nvarying float fClipDistance;\n#endif\n\n#ifdef FOG\nvarying float fFogDistance;\n#endif\n\n#ifdef SHADOWS\n#ifdef LIGHT0\nuniform mat4 lightMatrix0;\nvarying vec4 vPositionFromLight0;\n#endif\n#ifdef LIGHT1\nuniform mat4 lightMatrix1;\nvarying vec4 vPositionFromLight1;\n#endif\n#ifdef LIGHT2\nuniform mat4 lightMatrix2;\nvarying vec4 vPositionFromLight2;\n#endif\n#ifdef LIGHT3\nuniform mat4 lightMatrix3;\nvarying vec4 vPositionFromLight3;\n#endif\n#endif\n\n#ifdef REFLECTION\nvec3 computeReflectionCoords(float mode, vec4 worldPos, vec3 worldNormal)\n{\n	if (mode == MAP_SPHERICAL)\n	{\n		vec3 coords = vec3(view * vec4(worldNormal, 0.0));\n\n		return vec3(reflectionMatrix * vec4(coords, 1.0));\n	}\n	else if (mode == MAP_PLANAR)\n	{\n		vec3 viewDir = worldPos.xyz - vEyePosition;\n		vec3 coords = normalize(reflect(viewDir, worldNormal));\n\n		return vec3(reflectionMatrix * vec4(coords, 1));\n	}\n	else if (mode == MAP_CUBIC)\n	{\n		vec3 viewDir = worldPos.xyz - vEyePosition;\n		vec3 coords = reflect(viewDir, worldNormal);\n\n		return vec3(reflectionMatrix * vec4(coords, 0));\n	}\n	else if (mode == MAP_PROJECTION)\n	{\n		return vec3(reflectionMatrix * (view * worldPos));\n	}\n	else if (mode == MAP_SKYBOX)\n	{\n		return position;\n	}\n\n	return vec3(0, 0, 0);\n}\n#endif\n\nvoid main(void) {\n	mat4 finalWorld;\n\n#ifdef BONES\n	mat4 m0 = mBones[int(matricesIndices.x)] * matricesWeights.x;\n	mat4 m1 = mBones[int(matricesIndices.y)] * matricesWeights.y;\n	mat4 m2 = mBones[int(matricesIndices.z)] * matricesWeights.z;\n\n#ifdef BONES4\n	mat4 m3 = mBones[int(matricesIndices.w)] * matricesWeights.w;\n	finalWorld = world * (m0 + m1 + m2 + m3);\n#else\n	finalWorld = world * (m0 + m1 + m2);\n#endif \n\n#else\n	finalWorld = world;\n#endif\n\n	gl_Position = viewProjection * finalWorld * vec4(position, 1.0);\n\n	vec4 worldPos = finalWorld * vec4(position, 1.0);\n	vPositionW = vec3(worldPos);\n	vNormalW = normalize(vec3(finalWorld * vec4(normal, 0.0)));\n\n	// Texture coordinates\n#ifndef UV1\n	vec2 uv = vec2(0., 0.);\n#endif\n#ifndef UV2\n	vec2 uv2 = vec2(0., 0.);\n#endif\n\n#ifdef DIFFUSE\n	if (vDiffuseInfos.x == 0.)\n	{\n		vDiffuseUV = vec2(diffuseMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vDiffuseUV = vec2(diffuseMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef AMBIENT\n	if (vAmbientInfos.x == 0.)\n	{\n		vAmbientUV = vec2(ambientMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vAmbientUV = vec2(ambientMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef OPACITY\n	if (vOpacityInfos.x == 0.)\n	{\n		vOpacityUV = vec2(opacityMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vOpacityUV = vec2(opacityMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef REFLECTION\n	vReflectionUVW = computeReflectionCoords(vReflectionInfos.x, vec4(vPositionW, 1.0), vNormalW);\n#endif\n\n#ifdef EMISSIVE\n	if (vEmissiveInfos.x == 0.)\n	{\n		vEmissiveUV = vec2(emissiveMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vEmissiveUV = vec2(emissiveMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef SPECULAR\n	if (vSpecularInfos.x == 0.)\n	{\n		vSpecularUV = vec2(specularMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vSpecularUV = vec2(specularMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n#ifdef BUMP\n	if (vBumpInfos.x == 0.)\n	{\n		vBumpUV = vec2(bumpMatrix * vec4(uv, 1.0, 0.0));\n	}\n	else\n	{\n		vBumpUV = vec2(bumpMatrix * vec4(uv2, 1.0, 0.0));\n	}\n#endif\n\n	// Clip plane\n#ifdef CLIPPLANE\n	fClipDistance = dot(worldPos, vClipPlane);\n#endif\n\n	// Fog\n#ifdef FOG\n	fFogDistance = (view * worldPos).z;\n#endif\n\n	// Shadows\n#ifdef SHADOWS\n#ifdef LIGHT0\n	vPositionFromLight0 = lightMatrix0 * worldPos;\n#endif\n#ifdef LIGHT1\n	vPositionFromLight1 = lightMatrix1 * worldPos;\n#endif\n#ifdef LIGHT2\n	vPositionFromLight2 = lightMatrix2 * worldPos;\n#endif\n#ifdef LIGHT3\n	vPositionFromLight3 = lightMatrix3 * worldPos;\n#endif\n#endif\n\n	// Vertex color\n#ifdef VERTEXCOLOR\n	vColor = color;\n#endif\n}",lensFlarePixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\n// Color\nuniform vec4 color;\n\nvoid main(void) {\n	vec4 baseColor = texture2D(textureSampler, vUV);\n\n	gl_FragColor = baseColor * color;\n}",lensFlareVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec2 position;\n\n// Uniforms\nuniform mat4 viewportMatrix;\n\n// Output\nvarying vec2 vUV;\n\nconst vec2 madd = vec2(0.5, 0.5);\n\nvoid main(void) {	\n\n	vUV = position * madd + madd;\n	gl_Position = viewportMatrix * vec4(position, 0.0, 1.0);\n}",oculusDistortionCorrectionPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\nuniform vec2 LensCenter;\nuniform vec2 Scale;\nuniform vec2 ScaleIn;\nuniform vec4 HmdWarpParam;\n\nvec2 HmdWarp(vec2 in01) {\n\n	vec2 theta = (in01 - LensCenter) * ScaleIn; // Scales to [-1, 1]\n	float rSq = theta.x * theta.x + theta.y * theta.y;\n	vec2 rvector = theta * (HmdWarpParam.x + HmdWarpParam.y * rSq + HmdWarpParam.z * rSq * rSq + HmdWarpParam.w * rSq * rSq * rSq);\n	return LensCenter + Scale * rvector;\n}\n\n\n\nvoid main(void)\n{\n	vec2 tc = HmdWarp(vUV);\n	if (tc.x <0.0 || tc.x>1.0 || tc.y<0.0 || tc.y>1.0)\n		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n	else{\n		gl_FragColor = vec4(texture2D(textureSampler, tc).rgb, 1.0);\n	}\n}",particlesPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nvarying vec4 vColor;\nuniform vec4 textureMask;\nuniform sampler2D diffuseSampler;\n\n#ifdef CLIPPLANE\nvarying float fClipDistance;\n#endif\n\nvoid main(void) {\n#ifdef CLIPPLANE\n	if (fClipDistance > 0.0)\n		discard;\n#endif\n	vec4 baseColor = texture2D(diffuseSampler, vUV);\n\n	gl_FragColor = (baseColor * textureMask + (vec4(1., 1., 1., 1.) - textureMask)) * vColor;\n}",particlesVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec3 position;\nattribute vec4 color;\nattribute vec4 options;\n\n// Uniforms\nuniform mat4 view;\nuniform mat4 projection;\n\n// Output\nvarying vec2 vUV;\nvarying vec4 vColor;\n\n#ifdef CLIPPLANE\nuniform vec4 vClipPlane;\nuniform mat4 invView;\nvarying float fClipDistance;\n#endif\n\nvoid main(void) {	\n	vec3 viewPos = (view * vec4(position, 1.0)).xyz; \n	vec3 cornerPos;\n	float size = options.y;\n	float angle = options.x;\n	vec2 offset = options.zw;\n\n	cornerPos = vec3(offset.x - 0.5, offset.y  - 0.5, 0.) * size;\n\n	// Rotate\n	vec3 rotatedCorner;\n	rotatedCorner.x = cornerPos.x * cos(angle) - cornerPos.y * sin(angle);\n	rotatedCorner.y = cornerPos.x * sin(angle) + cornerPos.y * cos(angle);\n	rotatedCorner.z = 0.;\n\n	// Position\n	viewPos += rotatedCorner;\n	gl_Position = projection * vec4(viewPos, 1.0);   \n	\n	vColor = color;\n	vUV = offset;\n\n	// Clip plane\n#ifdef CLIPPLANE\n	vec4 worldPos = invView * vec4(viewPos, 1.0);\n	fClipDistance = dot(worldPos, vClipPlane);\n#endif\n}",passPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nvoid main(void) \n{\n	gl_FragColor = texture2D(textureSampler, vUV);\n}",postprocessVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec2 position;\n\n// Output\nvarying vec2 vUV;\n\nconst vec2 madd = vec2(0.5, 0.5);\n\nvoid main(void) {	\n\n	vUV = position * madd + madd;\n	gl_Position = vec4(position, 0.0, 1.0);\n}",refractionPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\nuniform sampler2D refractionSampler;\n\n// Parameters\nuniform vec3 baseColor;\nuniform float depth;\nuniform float colorLevel;\n\nvoid main() {\n	float ref = 1.0 - texture2D(refractionSampler, vUV).r;\n\n	vec2 uv = vUV - vec2(0.5);\n	vec2 offset = uv * depth * ref;\n	vec3 sourceColor = texture2D(textureSampler, vUV - offset).rgb;\n\n	gl_FragColor = vec4(sourceColor + sourceColor * ref * colorLevel, 1.0);\n}",shadowMapPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvec4 pack(float depth)\n{\n	const vec4 bitOffset = vec4(255. * 255. * 255., 255. * 255., 255., 1.);\n	const vec4 bitMask = vec4(0., 1. / 255., 1. / 255., 1. / 255.);\n	\n	vec4 comp = mod(depth * bitOffset * vec4(254.), vec4(255.)) / vec4(254.);\n	comp -= comp.xxyz * bitMask;\n	\n	return comp;\n}\n\n// Thanks to http://devmaster.net/\nvec2 packHalf(float depth) \n{ \n	const vec2 bitOffset = vec2(1.0 / 255., 0.);\n	vec2 color = vec2(depth, fract(depth * 255.));\n\n	return color - (color.yy * bitOffset);\n}\n\n#ifndef VSM\nvarying vec4 vPosition;\n#endif\n\n#ifdef ALPHATEST\nvarying vec2 vUV;\nuniform sampler2D diffuseSampler;\n#endif\n\nvoid main(void)\n{\n#ifdef ALPHATEST\n	if (texture2D(diffuseSampler, vUV).a < 0.4)\n		discard;\n#endif\n\n#ifdef VSM\n	float moment1 = gl_FragCoord.z / gl_FragCoord.w;\n	float moment2 = moment1 * moment1;\n	gl_FragColor = vec4(packHalf(moment1), packHalf(moment2));\n#else\n	gl_FragColor = pack(vPosition.z / vPosition.w);\n#endif\n}",shadowMapVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attribute\nattribute vec3 position;\n#ifdef BONES\nattribute vec4 matricesIndices;\nattribute vec4 matricesWeights;\n#endif\n\n// Uniform\n#ifdef INSTANCES\nattribute vec4 world0;\nattribute vec4 world1;\nattribute vec4 world2;\nattribute vec4 world3;\n#else\nuniform mat4 world;\n#endif\n\nuniform mat4 viewProjection;\n#ifdef BONES\nuniform mat4 mBones[BonesPerMesh];\n#endif\n\n#ifndef VSM\nvarying vec4 vPosition;\n#endif\n\n#ifdef ALPHATEST\nvarying vec2 vUV;\nuniform mat4 diffuseMatrix;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#endif\n\nvoid main(void)\n{\n#ifdef INSTANCES\n	mat4 finalWorld = mat4(world0, world1, world2, world3);\n#else\n	mat4 finalWorld = world;\n#endif\n\n#ifdef BONES\n	mat4 m0 = mBones[int(matricesIndices.x)] * matricesWeights.x;\n	mat4 m1 = mBones[int(matricesIndices.y)] * matricesWeights.y;\n	mat4 m2 = mBones[int(matricesIndices.z)] * matricesWeights.z;\n	mat4 m3 = mBones[int(matricesIndices.w)] * matricesWeights.w;\n	finalWorld = finalWorld * (m0 + m1 + m2 + m3);\n	gl_Position = viewProjection * finalWorld * vec4(position, 1.0);\n#else\n#ifndef VSM\n	vPosition = viewProjection * finalWorld * vec4(position, 1.0);\n#endif\n	gl_Position = viewProjection * finalWorld * vec4(position, 1.0);\n#endif\n\n#ifdef ALPHATEST\n#ifdef UV1\n	vUV = vec2(diffuseMatrix * vec4(uv, 1.0, 0.0));\n#endif\n#ifdef UV2\n	vUV = vec2(diffuseMatrix * vec4(uv2, 1.0, 0.0));\n#endif\n#endif\n}",spritesPixelShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform bool alphaTest;\n\nvarying vec4 vColor;\n\n// Samplers\nvarying vec2 vUV;\nuniform sampler2D diffuseSampler;\n\n// Fog\n#ifdef FOG\n\n#define FOGMODE_NONE    0.\n#define FOGMODE_EXP     1.\n#define FOGMODE_EXP2    2.\n#define FOGMODE_LINEAR  3.\n#define E 2.71828\n\nuniform vec4 vFogInfos;\nuniform vec3 vFogColor;\nvarying float fFogDistance;\n\nfloat CalcFogFactor()\n{\n	float fogCoeff = 1.0;\n	float fogStart = vFogInfos.y;\n	float fogEnd = vFogInfos.z;\n	float fogDensity = vFogInfos.w;\n\n	if (FOGMODE_LINEAR == vFogInfos.x)\n	{\n		fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);\n	}\n	else if (FOGMODE_EXP == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);\n	}\n	else if (FOGMODE_EXP2 == vFogInfos.x)\n	{\n		fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);\n	}\n\n	return min(1., max(0., fogCoeff));\n}\n#endif\n\n\nvoid main(void) {\n	vec4 baseColor = texture2D(diffuseSampler, vUV);\n\n	if (alphaTest) \n	{\n		if (baseColor.a < 0.95)\n			discard;\n	}\n\n	baseColor *= vColor;\n\n#ifdef FOG\n	float fog = CalcFogFactor();\n	baseColor.rgb = fog * baseColor.rgb + (1.0 - fog) * vFogColor;\n#endif\n\n	gl_FragColor = baseColor;\n}",spritesVertexShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Attributes\nattribute vec3 position;\nattribute vec4 options;\nattribute vec4 cellInfo;\nattribute vec4 color;\n\n// Uniforms\nuniform vec2 textureInfos;\nuniform mat4 view;\nuniform mat4 projection;\n\n// Output\nvarying vec2 vUV;\nvarying vec4 vColor;\n\n#ifdef FOG\nvarying float fFogDistance;\n#endif\n\nvoid main(void) {	\n	vec3 viewPos = (view * vec4(position, 1.0)).xyz; \n	vec3 cornerPos;\n	\n	float angle = options.x;\n	float size = options.y;\n	vec2 offset = options.zw;\n	vec2 uvScale = textureInfos.xy;\n\n	cornerPos = vec3(offset.x - 0.5, offset.y  - 0.5, 0.) * size;\n\n	// Rotate\n	vec3 rotatedCorner;\n	rotatedCorner.x = cornerPos.x * cos(angle) - cornerPos.y * sin(angle);\n	rotatedCorner.y = cornerPos.x * sin(angle) + cornerPos.y * cos(angle);\n	rotatedCorner.z = 0.;\n\n	// Position\n	viewPos += rotatedCorner;\n	gl_Position = projection * vec4(viewPos, 1.0);   \n\n	// Color\n	vColor = color;\n	\n	// Texture\n	vec2 uvOffset = vec2(abs(offset.x - cellInfo.x), 1.0 - abs(offset.y - cellInfo.y));\n\n	vUV = (uvOffset + cellInfo.zw) * uvScale;\n\n	// Fog\n#ifdef FOG\n	fFogDistance = viewPos.z;\n#endif\n}"},b
}();a.Effect=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a,b,c){this.name=a,this.checkReadyOnEveryCall=!0,this.checkReadyOnlyOnce=!1,this.state="",this.alpha=1,this.wireframe=!1,this.backFaceCulling=!0,this._wasPreviouslyReady=!1,this.id=a,this._scene=b,c||b.materials.push(this)}return a.prototype.isReady=function(){return!0},a.prototype.getEffect=function(){return this._effect},a.prototype.getScene=function(){return this._scene},a.prototype.needAlphaBlending=function(){return this.alpha<1},a.prototype.needAlphaTesting=function(){return!1},a.prototype.getAlphaTestTexture=function(){return null},a.prototype.trackCreation=function(){},a.prototype._preBind=function(){var a=this._scene.getEngine();a.enableEffect(this._effect),a.setState(this.backFaceCulling)},a.prototype.bind=function(){},a.prototype.bindOnlyWorldMatrix=function(){},a.prototype.unbind=function(){},a.prototype.dispose=function(a){var b=this._scene.materials.indexOf(this);this._scene.materials.splice(b,1),a&&this._effect&&(this._scene.getEngine()._releaseEffect(this._effect),this._effect=null),this.onDispose&&this.onDispose()},a}();a.Material=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=4,c=function(c){function d(b,d){var e=this;c.call(this,b,d),this.ambientColor=new a.Color3(0,0,0),this.diffuseColor=new a.Color3(1,1,1),this.specularColor=new a.Color3(1,1,1),this.specularPower=64,this.emissiveColor=new a.Color3(0,0,0),this.useAlphaFromDiffuseTexture=!1,this._cachedDefines=null,this._renderTargets=new a.SmartArray(16),this._worldViewProjectionMatrix=a.Matrix.Zero(),this._globalAmbientColor=new a.Color3(0,0,0),this._baseColor=new a.Color3,this._scaledDiffuse=new a.Color3,this._scaledSpecular=new a.Color3,this.getRenderTargetTextures=function(){return e._renderTargets.reset(),e.reflectionTexture&&e.reflectionTexture.isRenderTarget&&e._renderTargets.push(e.reflectionTexture),e._renderTargets}}return __extends(d,c),d.prototype.needAlphaBlending=function(){return this.alpha<1||null!=this.opacityTexture||this._shouldUseAlphaFromDiffuseTexture()},d.prototype.needAlphaTesting=function(){return null!=this.diffuseTexture&&this.diffuseTexture.hasAlpha&&!this.diffuseTexture.getAlphaFromRGB},d.prototype._shouldUseAlphaFromDiffuseTexture=function(){return null!=this.diffuseTexture&&this.diffuseTexture.hasAlpha&&this.useAlphaFromDiffuseTexture},d.prototype.getAlphaTestTexture=function(){return this.diffuseTexture},d.prototype.isReady=function(c,d){if(this.checkReadyOnlyOnce&&this._wasPreviouslyReady)return!0;var e=this.getScene();if(!this.checkReadyOnEveryCall&&this._renderId===e.getRenderId())return!0;var f=e.getEngine(),g=[],h=new Array;if(e.texturesEnabled){if(this.diffuseTexture&&a.StandardMaterial.DiffuseTextureEnabled){if(!this.diffuseTexture.isReady())return!1;g.push("#define DIFFUSE")}if(this.ambientTexture&&a.StandardMaterial.AmbientTextureEnabled){if(!this.ambientTexture.isReady())return!1;g.push("#define AMBIENT")}if(this.opacityTexture&&a.StandardMaterial.OpacityTextureEnabled){if(!this.opacityTexture.isReady())return!1;g.push("#define OPACITY"),this.opacityTexture.getAlphaFromRGB&&g.push("#define OPACITYRGB")}if(this.reflectionTexture&&a.StandardMaterial.ReflectionTextureEnabled){if(!this.reflectionTexture.isReady())return!1;g.push("#define REFLECTION")}if(this.emissiveTexture&&a.StandardMaterial.EmissiveTextureEnabled){if(!this.emissiveTexture.isReady())return!1;g.push("#define EMISSIVE")}if(this.specularTexture&&a.StandardMaterial.SpecularTextureEnabled){if(!this.specularTexture.isReady())return!1;g.push("#define SPECULAR"),h.push(g[g.length-1])}}if(e.getEngine().getCaps().standardDerivatives&&this.bumpTexture&&a.StandardMaterial.BumpTextureEnabled){if(!this.bumpTexture.isReady())return!1;g.push("#define BUMP"),h.push(g[g.length-1])}e.clipPlane&&g.push("#define CLIPPLANE"),f.getAlphaTesting()&&g.push("#define ALPHATEST"),this._shouldUseAlphaFromDiffuseTexture()&&g.push("#define ALPHAFROMDIFFUSE"),e.fogMode!==a.Scene.FOGMODE_NONE&&(g.push("#define FOG"),h.push(g[g.length-1]));var i=!1,j=0;if(e.lightsEnabled)for(var k=0;k<e.lights.length;k++){var l=e.lights[k];if(l.isEnabled()){if(l._excludedMeshesIds.length>0){for(var m=0;m<l._excludedMeshesIds.length;m++){var n=e.getMeshByID(l._excludedMeshesIds[m]);n&&l.excludedMeshes.push(n)}l._excludedMeshesIds=[]}if(!c||-1===l.excludedMeshes.indexOf(c)){g.push("#define LIGHT"+j),j>0&&h.push(g[g.length-1]);var o;o=l instanceof a.SpotLight?"#define SPOTLIGHT"+j:l instanceof a.HemisphericLight?"#define HEMILIGHT"+j:"#define POINTDIRLIGHT"+j,g.push(o),j>0&&h.push(g[g.length-1]);var p=l.getShadowGenerator();if(c&&c.receiveShadows&&p&&(g.push("#define SHADOW"+j),j>0&&h.push(g[g.length-1]),i||(g.push("#define SHADOWS"),i=!0),p.useVarianceShadowMap&&(g.push("#define SHADOWVSM"+j),j>0&&h.push(g[g.length-1]))),j++,j==b)break}}}var q=[a.VertexBuffer.PositionKind,a.VertexBuffer.NormalKind];c&&(c.isVerticesDataPresent(a.VertexBuffer.UVKind)&&(q.push(a.VertexBuffer.UVKind),g.push("#define UV1")),c.isVerticesDataPresent(a.VertexBuffer.UV2Kind)&&(q.push(a.VertexBuffer.UV2Kind),g.push("#define UV2")),c.isVerticesDataPresent(a.VertexBuffer.ColorKind)&&(q.push(a.VertexBuffer.ColorKind),g.push("#define VERTEXCOLOR")),c.skeleton&&c.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&c.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind)&&(q.push(a.VertexBuffer.MatricesIndicesKind),q.push(a.VertexBuffer.MatricesWeightsKind),g.push("#define BONES"),g.push("#define BonesPerMesh "+(c.skeleton.bones.length+1)),g.push("#define BONES4"),h.push(g[g.length-1])),d&&(g.push("#define INSTANCES"),q.push("world0"),q.push("world1"),q.push("world2"),q.push("world3")));var r=g.join("\n");if(this._cachedDefines!=r){this._cachedDefines=r;var s="default";e.getEngine().getCaps().standardDerivatives||(s="legacydefault"),this._effect=e.getEngine().createEffect(s,q,["world","view","viewProjection","vEyePosition","vLightsType","vAmbientColor","vDiffuseColor","vSpecularColor","vEmissiveColor","vLightData0","vLightDiffuse0","vLightSpecular0","vLightDirection0","vLightGround0","lightMatrix0","vLightData1","vLightDiffuse1","vLightSpecular1","vLightDirection1","vLightGround1","lightMatrix1","vLightData2","vLightDiffuse2","vLightSpecular2","vLightDirection2","vLightGround2","lightMatrix2","vLightData3","vLightDiffuse3","vLightSpecular3","vLightDirection3","vLightGround3","lightMatrix3","vFogInfos","vFogColor","vDiffuseInfos","vAmbientInfos","vOpacityInfos","vReflectionInfos","vEmissiveInfos","vSpecularInfos","vBumpInfos","mBones","vClipPlane","diffuseMatrix","ambientMatrix","opacityMatrix","reflectionMatrix","emissiveMatrix","specularMatrix","bumpMatrix","darkness0","darkness1","darkness2","darkness3"],["diffuseSampler","ambientSampler","opacitySampler","reflectionCubeSampler","reflection2DSampler","emissiveSampler","specularSampler","bumpSampler","shadowSampler0","shadowSampler1","shadowSampler2","shadowSampler3"],r,h,this.onCompiled,this.onError)}return this._effect.isReady()?(this._renderId=e.getRenderId(),this._wasPreviouslyReady=!0,!0):!1},d.prototype.unbind=function(){this.reflectionTexture&&this.reflectionTexture.isRenderTarget&&this._effect.setTexture("reflection2DSampler",null)},d.prototype.bindOnlyWorldMatrix=function(a){this._effect.setMatrix("world",a)},d.prototype.bind=function(c,d){var e=this.getScene();if(this._baseColor.copyFrom(this.diffuseColor),this.bindOnlyWorldMatrix(c),this._effect.setMatrix("viewProjection",e.getTransformMatrix()),d.skeleton&&d.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&d.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind)&&this._effect.setMatrices("mBones",d.skeleton.getTransformMatrices()),this.diffuseTexture&&a.StandardMaterial.DiffuseTextureEnabled&&(this._effect.setTexture("diffuseSampler",this.diffuseTexture),this._effect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._effect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix()),this._baseColor.copyFromFloats(1,1,1)),this.ambientTexture&&a.StandardMaterial.AmbientTextureEnabled&&(this._effect.setTexture("ambientSampler",this.ambientTexture),this._effect.setFloat2("vAmbientInfos",this.ambientTexture.coordinatesIndex,this.ambientTexture.level),this._effect.setMatrix("ambientMatrix",this.ambientTexture.getTextureMatrix())),this.opacityTexture&&a.StandardMaterial.OpacityTextureEnabled&&(this._effect.setTexture("opacitySampler",this.opacityTexture),this._effect.setFloat2("vOpacityInfos",this.opacityTexture.coordinatesIndex,this.opacityTexture.level),this._effect.setMatrix("opacityMatrix",this.opacityTexture.getTextureMatrix())),this.reflectionTexture&&a.StandardMaterial.ReflectionTextureEnabled&&(this.reflectionTexture.isCube?this._effect.setTexture("reflectionCubeSampler",this.reflectionTexture):this._effect.setTexture("reflection2DSampler",this.reflectionTexture),this._effect.setMatrix("reflectionMatrix",this.reflectionTexture.getReflectionTextureMatrix()),this._effect.setFloat3("vReflectionInfos",this.reflectionTexture.coordinatesMode,this.reflectionTexture.level,this.reflectionTexture.isCube?1:0)),this.emissiveTexture&&a.StandardMaterial.EmissiveTextureEnabled&&(this._effect.setTexture("emissiveSampler",this.emissiveTexture),this._effect.setFloat2("vEmissiveInfos",this.emissiveTexture.coordinatesIndex,this.emissiveTexture.level),this._effect.setMatrix("emissiveMatrix",this.emissiveTexture.getTextureMatrix())),this.specularTexture&&a.StandardMaterial.SpecularTextureEnabled&&(this._effect.setTexture("specularSampler",this.specularTexture),this._effect.setFloat2("vSpecularInfos",this.specularTexture.coordinatesIndex,this.specularTexture.level),this._effect.setMatrix("specularMatrix",this.specularTexture.getTextureMatrix())),this.bumpTexture&&e.getEngine().getCaps().standardDerivatives&&a.StandardMaterial.BumpTextureEnabled&&(this._effect.setTexture("bumpSampler",this.bumpTexture),this._effect.setFloat2("vBumpInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._effect.setMatrix("bumpMatrix",this.bumpTexture.getTextureMatrix())),e.ambientColor.multiplyToRef(this.ambientColor,this._globalAmbientColor),this._effect.setVector3("vEyePosition",e.activeCamera.position),this._effect.setColor3("vAmbientColor",this._globalAmbientColor),this._effect.setColor4("vDiffuseColor",this._baseColor,this.alpha*d.visibility),this._effect.setColor4("vSpecularColor",this.specularColor,this.specularPower),this._effect.setColor3("vEmissiveColor",this.emissiveColor),e.lightsEnabled)for(var f=0,g=0;g<e.lights.length;g++){var h=e.lights[g];if(h.isEnabled()&&(!d||-1===h.excludedMeshes.indexOf(d))){h instanceof a.PointLight?h.transferToEffect(this._effect,"vLightData"+f):h instanceof a.DirectionalLight?h.transferToEffect(this._effect,"vLightData"+f):h instanceof a.SpotLight?h.transferToEffect(this._effect,"vLightData"+f,"vLightDirection"+f):h instanceof a.HemisphericLight&&h.transferToEffect(this._effect,"vLightData"+f,"vLightGround"+f),h.diffuse.scaleToRef(h.intensity,this._scaledDiffuse),h.specular.scaleToRef(h.intensity,this._scaledSpecular),this._effect.setColor4("vLightDiffuse"+f,this._scaledDiffuse,h.range),this._effect.setColor3("vLightSpecular"+f,this._scaledSpecular);var i=h.getShadowGenerator();if(d.receiveShadows&&i&&(this._effect.setMatrix("lightMatrix"+f,i.getTransformMatrix()),this._effect.setTexture("shadowSampler"+f,i.getShadowMap()),this._effect.setFloat("darkness"+f,i.getDarkness())),f++,f==b)break}}if(e.clipPlane){var j=e.clipPlane;this._effect.setFloat4("vClipPlane",j.normal.x,j.normal.y,j.normal.z,j.d)}(e.fogMode!==a.Scene.FOGMODE_NONE||this.reflectionTexture)&&this._effect.setMatrix("view",e.getViewMatrix()),e.fogMode!==a.Scene.FOGMODE_NONE&&(this._effect.setFloat4("vFogInfos",e.fogMode,e.fogStart,e.fogEnd,e.fogDensity),this._effect.setColor3("vFogColor",e.fogColor))},d.prototype.getAnimatables=function(){var a=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&a.push(this.diffuseTexture),this.ambientTexture&&this.ambientTexture.animations&&this.ambientTexture.animations.length>0&&a.push(this.ambientTexture),this.opacityTexture&&this.opacityTexture.animations&&this.opacityTexture.animations.length>0&&a.push(this.opacityTexture),this.reflectionTexture&&this.reflectionTexture.animations&&this.reflectionTexture.animations.length>0&&a.push(this.reflectionTexture),this.emissiveTexture&&this.emissiveTexture.animations&&this.emissiveTexture.animations.length>0&&a.push(this.emissiveTexture),this.specularTexture&&this.specularTexture.animations&&this.specularTexture.animations.length>0&&a.push(this.specularTexture),this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&a.push(this.bumpTexture),a},d.prototype.dispose=function(a){this.diffuseTexture&&this.diffuseTexture.dispose(),this.ambientTexture&&this.ambientTexture.dispose(),this.opacityTexture&&this.opacityTexture.dispose(),this.reflectionTexture&&this.reflectionTexture.dispose(),this.emissiveTexture&&this.emissiveTexture.dispose(),this.specularTexture&&this.specularTexture.dispose(),this.bumpTexture&&this.bumpTexture.dispose(),c.prototype.dispose.call(this,a)},d.prototype.clone=function(b){var c=new a.StandardMaterial(b,this.getScene());return c.checkReadyOnEveryCall=this.checkReadyOnEveryCall,c.alpha=this.alpha,c.wireframe=this.wireframe,c.backFaceCulling=this.backFaceCulling,this.diffuseTexture&&this.diffuseTexture.clone&&(c.diffuseTexture=this.diffuseTexture.clone()),this.ambientTexture&&this.ambientTexture.clone&&(c.ambientTexture=this.ambientTexture.clone()),this.opacityTexture&&this.opacityTexture.clone&&(c.opacityTexture=this.opacityTexture.clone()),this.reflectionTexture&&this.reflectionTexture.clone&&(c.reflectionTexture=this.reflectionTexture.clone()),this.emissiveTexture&&this.emissiveTexture.clone&&(c.emissiveTexture=this.emissiveTexture.clone()),this.specularTexture&&this.specularTexture.clone&&(c.specularTexture=this.specularTexture.clone()),this.bumpTexture&&this.bumpTexture.clone&&(c.bumpTexture=this.bumpTexture.clone()),c.ambientColor=this.ambientColor.clone(),c.diffuseColor=this.diffuseColor.clone(),c.specularColor=this.specularColor.clone(),c.specularPower=this.specularPower,c.emissiveColor=this.emissiveColor.clone(),c},d.DiffuseTextureEnabled=!0,d.AmbientTextureEnabled=!0,d.OpacityTextureEnabled=!0,d.ReflectionTextureEnabled=!0,d.EmissiveTextureEnabled=!0,d.SpecularTextureEnabled=!0,d.BumpTextureEnabled=!0,d}(a.Material);a.StandardMaterial=c}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c){a.call(this,b,c,!0),this.subMaterials=new Array,c.multiMaterials.push(this)}return __extends(b,a),b.prototype.getSubMaterial=function(a){return 0>a||a>=this.subMaterials.length?this.getScene().defaultMaterial:this.subMaterials[a]},b.prototype.isReady=function(a){for(var b=0;b<this.subMaterials.length;b++){var c=this.subMaterials[b];if(c&&!this.subMaterials[b].isReady(a))return!1}return!0},b}(a.Material);a.MultiMaterial=b}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){function a(a){var b=document.createElement("a");b.href=a;var c=a.substring(a.lastIndexOf("/")+1,a.length),d=a.substring(0,a.indexOf(c,0));return d}{var b=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction,window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange}BABYLON.Database=function(a){this.currentSceneUrl=BABYLON.Database.ReturnFullUrlLocation(a),this.db=null,this.enableSceneOffline=!1,this.enableTexturesOffline=!1,this.manifestVersionFound=0,this.mustUpdateRessources=!1,this.hasReachedQuota=!1,this.checkManifestFile()},BABYLON.Database.isUASupportingBlobStorage=!0,BABYLON.Database.ReturnFullUrlLocation=function(b){return-1===b.indexOf("http:/")?a(window.location.href)+b:b},BABYLON.Database.prototype.checkManifestFile=function(){function a(){BABYLON.Tools.Log("Valid manifest file not found. Scene & textures will be loaded directly from the web server."),b.enableSceneOffline=!1,b.enableTexturesOffline=!1}var b=this,c=this.currentSceneUrl+".manifest",d=new XMLHttpRequest;d.open("GET",c,!1),d.addEventListener("load",function(){if(200===d.status)try{var c=JSON.parse(d.response);b.enableSceneOffline=c.enableSceneOffline,b.enableTexturesOffline=c.enableTexturesOffline,c.version&&!isNaN(parseInt(c.version))&&(b.manifestVersionFound=c.version)}catch(e){a()}else a()},!1),d.addEventListener("error",function(){a()},!1);try{d.send()}catch(e){BABYLON.Tools.Error("Error on XHR send request.")}},BABYLON.Database.prototype.openAsync=function(a,c){function d(){e.isSupported=!1,c&&c()}var e=this;if(b&&(this.enableSceneOffline||this.enableTexturesOffline))if(this.db)a&&a();else{this.hasReachedQuota=!1,this.isSupported=!0;var f=b.open("babylonjs",1);f.onerror=function(){d()},f.onblocked=function(){BABYLON.Tools.Error("IDB request blocked. Please reload the page."),d()},f.onsuccess=function(){e.db=f.result,a()},f.onupgradeneeded=function(a){e.db=a.target.result;try{{e.db.createObjectStore("scenes",{keyPath:"sceneUrl"}),e.db.createObjectStore("versions",{keyPath:"sceneUrl"}),e.db.createObjectStore("textures",{keyPath:"textureUrl"})}}catch(b){BABYLON.Tools.Error("Error while creating object stores. Exception: "+b.message),d()}}}else this.isSupported=!1,c&&c()},BABYLON.Database.prototype.loadImageFromDB=function(a,b){var c=this,d=BABYLON.Database.ReturnFullUrlLocation(a),e=function(){c.hasReachedQuota||null===c.db?b.src=a:c._saveImageIntoDBAsync(d,b)};this.mustUpdateRessources?e():this._loadImageFromDBAsync(d,b,e)},BABYLON.Database.prototype._loadImageFromDBAsync=function(a,b,c){if(this.isSupported&&null!==this.db){var d,e=this.db.transaction(["textures"]);e.onabort=function(){b.src=a},e.oncomplete=function(){var a;if(d){var e=window.URL||window.webkitURL;a=e.createObjectURL(d.data,{oneTimeOnly:!0}),b.src=a}else c()};var f=e.objectStore("textures").get(a);f.onsuccess=function(a){d=a.target.result},f.onerror=function(){BABYLON.Tools.Error("Error loading texture "+a+" from DB."),b.src=a}}else BABYLON.Tools.Error("Error: IndexedDB not supported by your browser or BabylonJS Database is not open."),b.src=a},BABYLON.Database.prototype._saveImageIntoDBAsync=function(a,b){if(this.isSupported){var c=function(){var a;if(d){var c=window.URL||window.webkitURL;try{a=c.createObjectURL(d,{oneTimeOnly:!0})}catch(e){a=c.createObjectURL(d)}}b.src=a};if(BABYLON.Database.isUASupportingBlobStorage){var d,e=this,f=new XMLHttpRequest;f.open("GET",a,!0),f.responseType="blob",f.addEventListener("load",function(){if(200===f.status){d=f.response;var g=e.db.transaction(["textures"],"readwrite");g.onabort=function(a){try{"QuotaExceededError"===a.srcElement.error.name&&(e.hasReachedQuota=!0)}catch(b){}c()},g.oncomplete=function(){c()};var h={};h.textureUrl=a,h.data=d;try{var i=g.objectStore("textures").put(h);i.onsuccess=function(){},i.onerror=function(){c()}}catch(j){25===j.code&&(BABYLON.Database.isUASupportingBlobStorage=!1),b.src=a}}else b.src=a},!1),f.addEventListener("error",function(){BABYLON.Tools.Error("Error in XHR request in BABYLON.Database."),b.src=a},!1),f.send()}else b.src=a}else BABYLON.Tools.Error("Error: IndexedDB not supported by your browser or BabylonJS Database is not open."),b.src=a},BABYLON.Database.prototype._checkVersionFromDB=function(a,b){var c=this,d=function(){c._saveVersionIntoDBAsync(a,b)};this._loadVersionFromDBAsync(a,b,d)},BABYLON.Database.prototype._loadVersionFromDBAsync=function(a,b,c){if(this.isSupported){var d,e=this;try{var f=this.db.transaction(["versions"]);f.oncomplete=function(){d?e.manifestVersionFound>d.data?(e.mustUpdateRessources=!0,c()):b(d.data):(e.mustUpdateRessources=!0,c())},f.onabort=function(){b(-1)};var g=f.objectStore("versions").get(a);g.onsuccess=function(a){d=a.target.result},g.onerror=function(){BABYLON.Tools.Error("Error loading version for scene "+a+" from DB."),b(-1)}}catch(h){BABYLON.Tools.Error("Error while accessing 'versions' object store (READ OP). Exception: "+h.message),b(-1)}}else BABYLON.Tools.Error("Error: IndexedDB not supported by your browser or BabylonJS Database is not open."),b(-1)},BABYLON.Database.prototype._saveVersionIntoDBAsync=function(a,b){if(this.isSupported&&!this.hasReachedQuota){var c=this;try{var d=this.db.transaction(["versions"],"readwrite");d.onabort=function(a){try{"QuotaExceededError"===a.srcElement.error.name&&(c.hasReachedQuota=!0)}catch(d){}b(-1)},d.oncomplete=function(){b(c.manifestVersionFound)};var e={};e.sceneUrl=a,e.data=this.manifestVersionFound;var f=d.objectStore("versions").put(e);f.onsuccess=function(){},f.onerror=function(){BABYLON.Tools.Error("Error in DB add version request in BABYLON.Database.")}}catch(g){BABYLON.Tools.Error("Error while accessing 'versions' object store (WRITE OP). Exception: "+g.message),b(-1)}}else b(-1)},BABYLON.Database.prototype.loadSceneFromDB=function(a,b,c,d){var e=this,f=BABYLON.Database.ReturnFullUrlLocation(a),g=function(){e._saveSceneIntoDBAsync(f,b,c)};this._checkVersionFromDB(f,function(a){-1!==a?e.mustUpdateRessources?e._saveSceneIntoDBAsync(f,b,c):e._loadSceneFromDBAsync(f,b,g):d()})},BABYLON.Database.prototype._loadSceneFromDBAsync=function(a,b,c){if(this.isSupported){var d,e=this.db.transaction(["scenes"]);e.oncomplete=function(){d?b(d.data):c()},e.onabort=function(){c()};var f=e.objectStore("scenes").get(a);f.onsuccess=function(a){d=a.target.result},f.onerror=function(){BABYLON.Tools.Error("Error loading scene "+a+" from DB."),c()}}else BABYLON.Tools.Error("Error: IndexedDB not supported by your browser or BabylonJS Database is not open."),b()},BABYLON.Database.prototype._saveSceneIntoDBAsync=function(a,b,c){if(this.isSupported){var d,e=new XMLHttpRequest,f=this;e.open("GET",a,!0),e.onprogress=c,e.addEventListener("load",function(){if(200===e.status)if(d=e.responseText,f.hasReachedQuota)b(d);else{var c=f.db.transaction(["scenes"],"readwrite");c.onabort=function(a){try{"QuotaExceededError"===a.srcElement.error.name&&(f.hasReachedQuota=!0)}catch(c){}b(d)},c.oncomplete=function(){b(d)};var g={};g.sceneUrl=a,g.data=d,g.version=f.manifestVersionFound;try{var h=c.objectStore("scenes").put(g);h.onsuccess=function(){},h.onerror=function(){BABYLON.Tools.Error("Error in DB add scene request in BABYLON.Database.")}}catch(i){b(d)}}else b()},!1),e.addEventListener("error",function(){BABYLON.Tools.Error("error on XHR request."),b()},!1),e.send()}else BABYLON.Tools.Error("Error: IndexedDB not supported by your browser or BabylonJS Database is not open."),b()}}();var BABYLON;!function(a){var b=function(){function b(b,c,d,e,f,g){this.name=b,this.cellSize=e,this.sprites=new Array,this.renderingGroupId=0,this._vertexDeclaration=[3,4,4,4],this._vertexStrideSize=60,this._capacity=d,this._spriteTexture=new a.Texture(c,f,!0,!1),this._spriteTexture.wrapU=a.Texture.CLAMP_ADDRESSMODE,this._spriteTexture.wrapV=a.Texture.CLAMP_ADDRESSMODE,this._epsilon=void 0===g?.01:g,this._scene=f,this._scene.spriteManagers.push(this),this._vertexDeclaration=[3,4,4,4],this._vertexStrideSize=60,this._vertexBuffer=f.getEngine().createDynamicVertexBuffer(d*this._vertexStrideSize*4);for(var h=[],i=0,j=0;d>j;j++)h.push(i),h.push(i+1),h.push(i+2),h.push(i),h.push(i+2),h.push(i+3),i+=4;this._indexBuffer=f.getEngine().createIndexBuffer(h),this._vertices=new Float32Array(d*this._vertexStrideSize),this._effectBase=this._scene.getEngine().createEffect("sprites",["position","options","cellInfo","color"],["view","projection","textureInfos","alphaTest"],["diffuseSampler"],""),this._effectFog=this._scene.getEngine().createEffect("sprites",["position","options","cellInfo","color"],["view","projection","textureInfos","alphaTest","vFogInfos","vFogColor"],["diffuseSampler"],"#define FOG")}return b.prototype._appendSpriteVertex=function(a,b,c,d,e){var f=15*a;0==c?c=this._epsilon:1==c&&(c=1-this._epsilon),0==d?d=this._epsilon:1==d&&(d=1-this._epsilon),this._vertices[f]=b.position.x,this._vertices[f+1]=b.position.y,this._vertices[f+2]=b.position.z,this._vertices[f+3]=b.angle,this._vertices[f+4]=b.size,this._vertices[f+5]=c,this._vertices[f+6]=d,this._vertices[f+7]=b.invertU?1:0,this._vertices[f+8]=b.invertV?1:0;var g=b.cellIndex/e>>0;this._vertices[f+9]=b.cellIndex-g*e,this._vertices[f+10]=g,this._vertices[f+11]=b.color.r,this._vertices[f+12]=b.color.g,this._vertices[f+13]=b.color.b,this._vertices[f+14]=b.color.a},b.prototype.render=function(){if(this._effectBase.isReady()&&this._effectFog.isReady()&&this._spriteTexture&&this._spriteTexture.isReady()){for(var b=this._scene.getEngine(),c=this._spriteTexture.getBaseSize(),d=a.Tools.GetDeltaTime(),e=Math.min(this._capacity,this.sprites.length),f=c.width/this.cellSize,g=0,h=0;e>h;h++){var i=this.sprites[h];i&&(i._animate(d),this._appendSpriteVertex(g++,i,0,0,f),this._appendSpriteVertex(g++,i,1,0,f),this._appendSpriteVertex(g++,i,1,1,f),this._appendSpriteVertex(g++,i,0,1,f))}b.updateDynamicVertexBuffer(this._vertexBuffer,this._vertices,e*this._vertexStrideSize);var j=this._effectBase;this._scene.fogMode!==a.Scene.FOGMODE_NONE&&(j=this._effectFog),b.enableEffect(j);var k=this._scene.getViewMatrix();j.setTexture("diffuseSampler",this._spriteTexture),j.setMatrix("view",k),j.setMatrix("projection",this._scene.getProjectionMatrix()),j.setFloat2("textureInfos",this.cellSize/c.width,this.cellSize/c.height),this._scene.fogMode!==a.Scene.FOGMODE_NONE&&(j.setFloat4("vFogInfos",this._scene.fogMode,this._scene.fogStart,this._scene.fogEnd,this._scene.fogDensity),j.setColor3("vFogColor",this._scene.fogColor)),b.bindBuffers(this._vertexBuffer,this._indexBuffer,this._vertexDeclaration,this._vertexStrideSize,j),j.setBool("alphaTest",!0),b.setColorWrite(!1),b.draw(!0,0,6*e),b.setColorWrite(!0),j.setBool("alphaTest",!1),b.setAlphaMode(a.Engine.ALPHA_COMBINE),b.draw(!0,0,6*e),b.setAlphaMode(a.Engine.ALPHA_DISABLE)}},b.prototype.dispose=function(){this._vertexBuffer&&(this._scene.getEngine()._releaseBuffer(this._vertexBuffer),this._vertexBuffer=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null),this._spriteTexture&&(this._spriteTexture.dispose(),this._spriteTexture=null);var a=this._scene.spriteManagers.indexOf(this);this._scene.spriteManagers.splice(a,1),this.onDispose&&this.onDispose()},b}();a.SpriteManager=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c){this.name=b,this.color=new a.Color4(1,1,1,1),this.size=1,this.angle=0,this.cellIndex=0,this.invertU=0,this.invertV=0,this.animations=new Array,this._animationStarted=!1,this._loopAnimation=!1,this._fromIndex=0,this._toIndex=0,this._delay=0,this._direction=1,this._frameCount=0,this._time=0,this._manager=c,this._manager.sprites.push(this),this.position=a.Vector3.Zero()}return b.prototype.playAnimation=function(a,b,c,d){this._fromIndex=a,this._toIndex=b,this._loopAnimation=c,this._delay=d,this._animationStarted=!0,this._direction=b>a?1:-1,this.cellIndex=a,this._time=0},b.prototype.stopAnimation=function(){this._animationStarted=!1},b.prototype._animate=function(a){this._animationStarted&&(this._time+=a,this._time>this._delay&&(this._time=this._time%this._delay,this.cellIndex+=this._direction,this.cellIndex==this._toIndex&&(this._loopAnimation?this.cellIndex=this._fromIndex:(this._animationStarted=!1,this.disposeWhenFinishedAnimating&&this.dispose()))))},b.prototype.dispose=function(){for(var a=0;a<this._manager.sprites.length;a++)this._manager.sprites[a]==this&&this._manager.sprites.splice(a,1)},b}();a.Sprite=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d,e,f){this.name=b,this._vertexDeclaration=[2],this._vertexStrideSize=8,this.texture=c?new a.Texture(c,d,!0):null,this.isBackground=void 0===e?!0:e,this.color=void 0===f?new a.Color4(1,1,1,1):f,this._scene=d,this._scene.layers.push(this);var g=[];g.push(1,1),g.push(-1,1),g.push(-1,-1),g.push(1,-1),this._vertexBuffer=d.getEngine().createVertexBuffer(g);var h=[];h.push(0),h.push(1),h.push(2),h.push(0),h.push(2),h.push(3),this._indexBuffer=d.getEngine().createIndexBuffer(h),this._effect=this._scene.getEngine().createEffect("layer",["position"],["textureMatrix","color"],["textureSampler"],"")}return b.prototype.render=function(){if(this._effect.isReady()&&this.texture&&this.texture.isReady()){var b=this._scene.getEngine();b.enableEffect(this._effect),b.setState(!1),this._effect.setTexture("textureSampler",this.texture),this._effect.setMatrix("textureMatrix",this.texture.getTextureMatrix()),this._effect.setFloat4("color",this.color.r,this.color.g,this.color.b,this.color.a),b.bindBuffers(this._vertexBuffer,this._indexBuffer,this._vertexDeclaration,this._vertexStrideSize,this._effect),b.setAlphaMode(a.Engine.ALPHA_COMBINE),b.draw(!0,0,6),b.setAlphaMode(a.Engine.ALPHA_DISABLE)}},b.prototype.dispose=function(){this._vertexBuffer&&(this._scene.getEngine()._releaseBuffer(this._vertexBuffer),this._vertexBuffer=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null),this.texture&&(this.texture.dispose(),this.texture=null);var a=this._scene.layers.indexOf(this);this._scene.layers.splice(a,1),this.onDispose&&this.onDispose()},b}();a.Layer=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(){this.position=a.Vector3.Zero(),this.direction=a.Vector3.Zero(),this.color=new a.Color4(0,0,0,0),this.colorStep=new a.Color4(0,0,0,0),this.lifeTime=1,this.age=0,this.size=0,this.angle=0,this.angularSpeed=0}return b}();a.Particle=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(a,b){if(a==b)return a;var c=Math.random();return c*(b-a)+a},c=function(){function c(c,d,e){var f=this;this.name=c,this.renderingGroupId=0,this.emitter=null,this.emitRate=10,this.manualEmitCount=-1,this.updateSpeed=.01,this.targetStopDuration=0,this.disposeOnStop=!1,this.minEmitPower=1,this.maxEmitPower=1,this.minLifeTime=1,this.maxLifeTime=1,this.minSize=1,this.maxSize=1,this.minAngularSpeed=0,this.maxAngularSpeed=0,this.blendMode=a.ParticleSystem.BLENDMODE_ONEONE,this.forceDepthWrite=!1,this.gravity=a.Vector3.Zero(),this.direction1=new a.Vector3(0,1,0),this.direction2=new a.Vector3(0,1,0),this.minEmitBox=new a.Vector3(-.5,-.5,-.5),this.maxEmitBox=new a.Vector3(.5,.5,.5),this.color1=new a.Color4(1,1,1,1),this.color2=new a.Color4(1,1,1,1),this.colorDead=new a.Color4(0,0,0,1),this.textureMask=new a.Color4(1,1,1,1),this.particles=new Array,this._vertexDeclaration=[3,4,4],this._vertexStrideSize=44,this._stockParticles=new Array,this._newPartsExcess=0,this._scaledColorStep=new a.Color4(0,0,0,0),this._colorDiff=new a.Color4(0,0,0,0),this._scaledDirection=a.Vector3.Zero(),this._scaledGravity=a.Vector3.Zero(),this._currentRenderId=-1,this._started=!1,this._stopped=!1,this._actualFrame=0,this.id=c,this._capacity=d,this._scene=e,e.particleSystems.push(this),this._vertexBuffer=e.getEngine().createDynamicVertexBuffer(d*this._vertexStrideSize*4);for(var g=[],h=0,i=0;d>i;i++)g.push(h),g.push(h+1),g.push(h+2),g.push(h),g.push(h+2),g.push(h+3),h+=4;this._indexBuffer=e.getEngine().createIndexBuffer(g),this._vertices=new Float32Array(d*this._vertexStrideSize),this.startDirectionFunction=function(c,d,e){var g=b(f.direction1.x,f.direction2.x),h=b(f.direction1.y,f.direction2.y),i=b(f.direction1.z,f.direction2.z);a.Vector3.TransformNormalFromFloatsToRef(g*c,h*c,i*c,d,e)},this.startPositionFunction=function(c,d){var e=b(f.minEmitBox.x,f.maxEmitBox.x),g=b(f.minEmitBox.y,f.maxEmitBox.y),h=b(f.minEmitBox.z,f.maxEmitBox.z);a.Vector3.TransformCoordinatesFromFloatsToRef(e,g,h,c,d)}}return c.prototype.getCapacity=function(){return this._capacity
},c.prototype.isAlive=function(){return this._alive},c.prototype.isStarted=function(){return this._started},c.prototype.start=function(){this._started=!0,this._stopped=!1,this._actualFrame=0},c.prototype.stop=function(){this._stopped=!0},c.prototype._appendParticleVertex=function(a,b,c,d){var e=11*a;this._vertices[e]=b.position.x,this._vertices[e+1]=b.position.y,this._vertices[e+2]=b.position.z,this._vertices[e+3]=b.color.r,this._vertices[e+4]=b.color.g,this._vertices[e+5]=b.color.b,this._vertices[e+6]=b.color.a,this._vertices[e+7]=b.angle,this._vertices[e+8]=b.size,this._vertices[e+9]=c,this._vertices[e+10]=d},c.prototype._update=function(c){this._alive=this.particles.length>0;for(var d=0;d<this.particles.length;d++){var e=this.particles[d];e.age+=this._scaledUpdateSpeed,e.age>=e.lifeTime?(this._stockParticles.push(this.particles.splice(d,1)[0]),d--):(e.colorStep.scaleToRef(this._scaledUpdateSpeed,this._scaledColorStep),e.color.addInPlace(this._scaledColorStep),e.color.a<0&&(e.color.a=0),e.angle+=e.angularSpeed*this._scaledUpdateSpeed,e.direction.scaleToRef(this._scaledUpdateSpeed,this._scaledDirection),e.position.addInPlace(this._scaledDirection),this.gravity.scaleToRef(this._scaledUpdateSpeed,this._scaledGravity),e.direction.addInPlace(this._scaledGravity))}var f;for(f=this.emitter.position?this.emitter.getWorldMatrix():a.Matrix.Translation(this.emitter.x,this.emitter.y,this.emitter.z),d=0;c>d&&this.particles.length!=this._capacity;d++){0!==this._stockParticles.length?(e=this._stockParticles.pop(),e.age=0):e=new a.Particle,this.particles.push(e);var g=b(this.minEmitPower,this.maxEmitPower);this.startDirectionFunction(g,f,e.direction),e.lifeTime=b(this.minLifeTime,this.maxLifeTime),e.size=b(this.minSize,this.maxSize),e.angularSpeed=b(this.minAngularSpeed,this.maxAngularSpeed),this.startPositionFunction(f,e.position);var h=b(0,1);a.Color4.LerpToRef(this.color1,this.color2,h,e.color),this.colorDead.subtractToRef(e.color,this._colorDiff),this._colorDiff.scaleToRef(1/e.lifeTime,e.colorStep)}},c.prototype._getEffect=function(){var a=[];this._scene.clipPlane&&a.push("#define CLIPPLANE");var b=a.join("\n");return this._cachedDefines!=b&&(this._cachedDefines=b,this._effect=this._scene.getEngine().createEffect("particles",["position","color","options"],["invView","view","projection","vClipPlane","textureMask"],["diffuseSampler"],b)),this._effect},c.prototype.animate=function(){if(this._started){var a=this._getEffect();if(this.emitter&&a.isReady()&&this.particleTexture&&this.particleTexture.isReady()&&this._currentRenderId!==this._scene.getRenderId()){this._currentRenderId=this._scene.getRenderId(),this._scaledUpdateSpeed=this.updateSpeed*this._scene.getAnimationRatio();var b;this.manualEmitCount>-1?(b=this.manualEmitCount,this.manualEmitCount=0):b=this.emitRate;var c=b*this._scaledUpdateSpeed>>0;this._newPartsExcess+=b*this._scaledUpdateSpeed-c,this._newPartsExcess>1&&(c+=this._newPartsExcess>>0,this._newPartsExcess-=this._newPartsExcess>>0),this._alive=!1,this._stopped?c=0:(this._actualFrame+=this._scaledUpdateSpeed,this.targetStopDuration&&this._actualFrame>=this.targetStopDuration&&this.stop()),this._update(c),this._stopped&&(this._alive||(this._started=!1,this.disposeOnStop&&this._scene._toBeDisposed.push(this)));for(var d=0,e=0;e<this.particles.length;e++){var f=this.particles[e];this._appendParticleVertex(d++,f,0,0),this._appendParticleVertex(d++,f,1,0),this._appendParticleVertex(d++,f,1,1),this._appendParticleVertex(d++,f,0,1)}var g=this._scene.getEngine();g.updateDynamicVertexBuffer(this._vertexBuffer,this._vertices,this.particles.length*this._vertexStrideSize)}}},c.prototype.render=function(){var b=this._getEffect();if(!(this.emitter&&b.isReady()&&this.particleTexture&&this.particleTexture.isReady()&&this.particles.length))return 0;var c=this._scene.getEngine();c.enableEffect(b);var d=this._scene.getViewMatrix();if(b.setTexture("diffuseSampler",this.particleTexture),b.setMatrix("view",d),b.setMatrix("projection",this._scene.getProjectionMatrix()),b.setFloat4("textureMask",this.textureMask.r,this.textureMask.g,this.textureMask.b,this.textureMask.a),this._scene.clipPlane){var e=this._scene.clipPlane,f=d.clone();f.invert(),b.setMatrix("invView",f),b.setFloat4("vClipPlane",e.normal.x,e.normal.y,e.normal.z,e.d)}return c.bindBuffers(this._vertexBuffer,this._indexBuffer,this._vertexDeclaration,this._vertexStrideSize,b),c.setAlphaMode(this.blendMode===a.ParticleSystem.BLENDMODE_ONEONE?a.Engine.ALPHA_ADD:a.Engine.ALPHA_COMBINE),this.forceDepthWrite&&c.setDepthWrite(!0),c.draw(!0,0,6*this.particles.length),c.setAlphaMode(a.Engine.ALPHA_DISABLE),this.particles.length},c.prototype.dispose=function(){this._vertexBuffer&&(this._scene.getEngine()._releaseBuffer(this._vertexBuffer),this._vertexBuffer=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null);var a=this._scene.particleSystems.indexOf(this);this._scene.particleSystems.splice(a,1),this.onDispose&&this.onDispose()},c.prototype.clone=function(b,c){var d=new a.ParticleSystem(b,this._capacity,this._scene);return a.Tools.DeepCopy(this,d,["particles"],["_vertexDeclaration","_vertexStrideSize"]),void 0===c&&(c=this.emitter),d.emitter=c,this.particleTexture&&(d.particleTexture=new a.Texture(this.particleTexture.url,this._scene)),d.start(),d},c.BLENDMODE_ONEONE=0,c.BLENDMODE_STANDARD=1,c}();a.ParticleSystem=c}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,c,d,e,f){this.name=a,this.targetProperty=c,this.framePerSecond=d,this.dataType=e,this.loopMode=f,this._offsetsCache={},this._highLimitsCache={},this._stopped=!1,this.targetPropertyPath=c.split("."),this.dataType=e,this.loopMode=void 0===f?b.ANIMATIONLOOPMODE_CYCLE:f}return b.prototype.isStopped=function(){return this._stopped},b.prototype.getKeys=function(){return this._keys},b.prototype.floatInterpolateFunction=function(a,b,c){return a+(b-a)*c},b.prototype.quaternionInterpolateFunction=function(b,c,d){return a.Quaternion.Slerp(b,c,d)},b.prototype.vector3InterpolateFunction=function(b,c,d){return a.Vector3.Lerp(b,c,d)},b.prototype.color3InterpolateFunction=function(b,c,d){return a.Color3.Lerp(b,c,d)},b.prototype.clone=function(){var a=new b(this.name,this.targetPropertyPath.join("."),this.framePerSecond,this.dataType,this.loopMode);return a.setKeys(this._keys),a},b.prototype.setKeys=function(a){this._keys=a.slice(0),this._offsetsCache={},this._highLimitsCache={}},b.prototype._interpolate=function(a,c,d,e,f){if(d===b.ANIMATIONLOOPMODE_CONSTANT&&c>0)return f.clone?f.clone():f;this.currentFrame=a;for(var g=0;g<this._keys.length;g++)if(this._keys[g+1].frame>=a){var h=this._keys[g].value,i=this._keys[g+1].value,j=(a-this._keys[g].frame)/(this._keys[g+1].frame-this._keys[g].frame);switch(this.dataType){case b.ANIMATIONTYPE_FLOAT:switch(d){case b.ANIMATIONLOOPMODE_CYCLE:case b.ANIMATIONLOOPMODE_CONSTANT:return this.floatInterpolateFunction(h,i,j);case b.ANIMATIONLOOPMODE_RELATIVE:return e*c+this.floatInterpolateFunction(h,i,j)}break;case b.ANIMATIONTYPE_QUATERNION:var k=null;switch(d){case b.ANIMATIONLOOPMODE_CYCLE:case b.ANIMATIONLOOPMODE_CONSTANT:k=this.quaternionInterpolateFunction(h,i,j);break;case b.ANIMATIONLOOPMODE_RELATIVE:k=this.quaternionInterpolateFunction(h,i,j).add(e.scale(c))}return k;case b.ANIMATIONTYPE_VECTOR3:switch(d){case b.ANIMATIONLOOPMODE_CYCLE:case b.ANIMATIONLOOPMODE_CONSTANT:return this.vector3InterpolateFunction(h,i,j);case b.ANIMATIONLOOPMODE_RELATIVE:return this.vector3InterpolateFunction(h,i,j).add(e.scale(c))}case b.ANIMATIONTYPE_COLOR3:switch(d){case b.ANIMATIONLOOPMODE_CYCLE:case b.ANIMATIONLOOPMODE_CONSTANT:return this.color3InterpolateFunction(h,i,j);case b.ANIMATIONLOOPMODE_RELATIVE:return this.color3InterpolateFunction(h,i,j).add(e.scale(c))}case b.ANIMATIONTYPE_MATRIX:switch(d){case b.ANIMATIONLOOPMODE_CYCLE:case b.ANIMATIONLOOPMODE_CONSTANT:case b.ANIMATIONLOOPMODE_RELATIVE:return h}}break}return this._keys[this._keys.length-1].value},b.prototype.animate=function(a,c,d,e,f){if(!this.targetPropertyPath||this.targetPropertyPath.length<1)return this._stopped=!0,!1;var g=!0;if(0!=this._keys[0].frame){var h={frame:0,value:this._keys[0].value};this._keys.splice(0,0,h)}(c<this._keys[0].frame||c>this._keys[this._keys.length-1].frame)&&(c=this._keys[0].frame),(d<this._keys[0].frame||d>this._keys[this._keys.length-1].frame)&&(d=this._keys[this._keys.length-1].frame);var i=d-c,j=a*this.framePerSecond*f/1e3;if(j>i&&!e)k=0,g=!1,l=this._keys[this._keys.length-1].value;else{var k=0,l=0;if(this.loopMode!=b.ANIMATIONLOOPMODE_CYCLE){var m=d.toString()+c.toString();if(!this._offsetsCache[m]){var n=this._interpolate(c,0,b.ANIMATIONLOOPMODE_CYCLE),o=this._interpolate(d,0,b.ANIMATIONLOOPMODE_CYCLE);switch(this.dataType){case b.ANIMATIONTYPE_FLOAT:this._offsetsCache[m]=o-n;break;case b.ANIMATIONTYPE_QUATERNION:this._offsetsCache[m]=o.subtract(n);break;case b.ANIMATIONTYPE_VECTOR3:this._offsetsCache[m]=o.subtract(n);case b.ANIMATIONTYPE_COLOR3:this._offsetsCache[m]=o.subtract(n)}this._highLimitsCache[m]=o}l=this._highLimitsCache[m],k=this._offsetsCache[m]}}var p=j/i>>0,q=g?c+j%i:d,r=this._interpolate(q,p,this.loopMode,k,l);if(this.targetPropertyPath.length>1){for(var s=this._target[this.targetPropertyPath[0]],t=1;t<this.targetPropertyPath.length-1;t++)s=s[this.targetPropertyPath[t]];s[this.targetPropertyPath[this.targetPropertyPath.length-1]]=r}else this._target[this.targetPropertyPath[0]]=r;return this._target.markAsDirty&&this._target.markAsDirty(this.targetProperty),g||(this._stopped=!0),g},Object.defineProperty(b,"ANIMATIONTYPE_FLOAT",{get:function(){return b._ANIMATIONTYPE_FLOAT},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONTYPE_VECTOR3",{get:function(){return b._ANIMATIONTYPE_VECTOR3},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONTYPE_QUATERNION",{get:function(){return b._ANIMATIONTYPE_QUATERNION},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONTYPE_MATRIX",{get:function(){return b._ANIMATIONTYPE_MATRIX},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONTYPE_COLOR3",{get:function(){return b._ANIMATIONTYPE_COLOR3},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONLOOPMODE_RELATIVE",{get:function(){return b._ANIMATIONLOOPMODE_RELATIVE},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONLOOPMODE_CYCLE",{get:function(){return b._ANIMATIONLOOPMODE_CYCLE},enumerable:!0,configurable:!0}),Object.defineProperty(b,"ANIMATIONLOOPMODE_CONSTANT",{get:function(){return b._ANIMATIONLOOPMODE_CONSTANT},enumerable:!0,configurable:!0}),b._ANIMATIONTYPE_FLOAT=0,b._ANIMATIONTYPE_VECTOR3=1,b._ANIMATIONTYPE_QUATERNION=2,b._ANIMATIONTYPE_MATRIX=3,b._ANIMATIONTYPE_COLOR3=4,b._ANIMATIONLOOPMODE_RELATIVE=0,b._ANIMATIONLOOPMODE_CYCLE=1,b._ANIMATIONLOOPMODE_CONSTANT=2,b}();a.Animation=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a,b,c,d,e,f,g,h){"undefined"==typeof c&&(c=0),"undefined"==typeof d&&(d=100),"undefined"==typeof e&&(e=!1),"undefined"==typeof f&&(f=1),this.target=b,this.fromFrame=c,this.toFrame=d,this.loopAnimation=e,this.speedRatio=f,this.onAnimationEnd=g,this._animations=new Array,this._paused=!1,this.animationStarted=!1,h&&this.appendAnimations(b,h),this._scene=a,a._activeAnimatables.push(this)}return a.prototype.appendAnimations=function(a,b){for(var c=0;c<b.length;c++){var d=b[c];d._target=a,this._animations.push(d)}},a.prototype.getAnimationByTargetProperty=function(a){for(var b=this._animations,c=0;c<b.length;c++)if(b[c].targetProperty===a)return b[c];return null},a.prototype.pause=function(){this._paused=!0},a.prototype.restart=function(){this._paused=!1},a.prototype.stop=function(){var a=this._scene._activeAnimatables.indexOf(this);a>-1&&this._scene._activeAnimatables.splice(a,1),this.onAnimationEnd&&this.onAnimationEnd()},a.prototype._animate=function(a){if(this._paused)return!0;this._localDelayOffset||(this._localDelayOffset=a);for(var b=!1,c=this._animations,d=0;d<c.length;d++){var e=c[d],f=e.animate(a-this._localDelayOffset,this.fromFrame,this.toFrame,this.loopAnimation,this.speedRatio);b=b||f}return!b&&this.onAnimationEnd&&this.onAnimationEnd(),b},a}();a.Animatable=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d){"undefined"==typeof d&&(d=2),this.maxDepth=d,this.dynamicContent=new Array,this._maxBlockCapacity=c||64,this._selectionContent=new a.SmartArray(1024),this._creationFunc=b}return b.prototype.update=function(a,c,d){b._CreateBlocks(a,c,d,this._maxBlockCapacity,0,this.maxDepth,this,this._creationFunc)},b.prototype.addMesh=function(a){for(var b=0;b<this.blocks.length;b++){var c=this.blocks[b];c.addEntry(a)}},b.prototype.select=function(a,b){this._selectionContent.reset();for(var c=0;c<this.blocks.length;c++){var d=this.blocks[c];d.select(a,this._selectionContent,b)}return b?this._selectionContent.concat(this.dynamicContent):this._selectionContent.concatWithNoDuplicate(this.dynamicContent),this._selectionContent},b.prototype.intersects=function(a,b,c){this._selectionContent.reset();for(var d=0;d<this.blocks.length;d++){var e=this.blocks[d];e.intersects(a,b,this._selectionContent,c)}return c?this._selectionContent.concat(this.dynamicContent):this._selectionContent.concatWithNoDuplicate(this.dynamicContent),this._selectionContent},b.prototype.intersectsRay=function(a){this._selectionContent.reset();for(var b=0;b<this.blocks.length;b++){var c=this.blocks[b];c.intersectsRay(a,this._selectionContent)}return this._selectionContent.concatWithNoDuplicate(this.dynamicContent),this._selectionContent},b._CreateBlocks=function(b,c,d,e,f,g,h,i){h.blocks=new Array;for(var j=new a.Vector3((c.x-b.x)/2,(c.y-b.y)/2,(c.z-b.z)/2),k=0;2>k;k++)for(var l=0;2>l;l++)for(var m=0;2>m;m++){var n=b.add(j.multiplyByFloats(k,l,m)),o=b.add(j.multiplyByFloats(k+1,l+1,m+1)),p=new a.OctreeBlock(n,o,e,f+1,g,i);p.addEntries(d),h.blocks.push(p)}},b.CreationFuncForMeshes=function(a,b){a.getBoundingInfo().boundingBox.intersectsMinMax(b.minPoint,b.maxPoint)&&b.entries.push(a)},b.CreationFuncForSubMeshes=function(a,b){a.getBoundingInfo().boundingBox.intersectsMinMax(b.minPoint,b.maxPoint)&&b.entries.push(a)},b}();a.Octree=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c,d,e,f){this.entries=new Array,this._boundingVectors=new Array,this._capacity=c,this._depth=d,this._maxDepth=e,this._creationFunc=f,this._minPoint=a,this._maxPoint=b,this._boundingVectors.push(a.clone()),this._boundingVectors.push(b.clone()),this._boundingVectors.push(a.clone()),this._boundingVectors[2].x=b.x,this._boundingVectors.push(a.clone()),this._boundingVectors[3].y=b.y,this._boundingVectors.push(a.clone()),this._boundingVectors[4].z=b.z,this._boundingVectors.push(b.clone()),this._boundingVectors[5].z=a.z,this._boundingVectors.push(b.clone()),this._boundingVectors[6].x=a.x,this._boundingVectors.push(b.clone()),this._boundingVectors[7].y=a.y}return Object.defineProperty(b.prototype,"capacity",{get:function(){return this._capacity},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"minPoint",{get:function(){return this._minPoint},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"maxPoint",{get:function(){return this._maxPoint},enumerable:!0,configurable:!0}),b.prototype.addEntry=function(a){if(this.blocks)for(var b=0;b<this.blocks.length;b++){var c=this.blocks[b];c.addEntry(a)}else this._creationFunc(a,this),this.entries.length>this.capacity&&this._depth<this._maxDepth&&this.createInnerBlocks()},b.prototype.addEntries=function(a){for(var b=0;b<a.length;b++){var c=a[b];this.addEntry(c)}},b.prototype.select=function(b,c,d){if(a.BoundingBox.IsInFrustum(this._boundingVectors,b)){if(this.blocks){for(var e=0;e<this.blocks.length;e++){var f=this.blocks[e];f.select(b,c,d)}return}d?c.concat(this.entries):c.concatWithNoDuplicate(this.entries)}},b.prototype.intersects=function(b,c,d,e){if(a.BoundingBox.IntersectsSphere(this._minPoint,this._maxPoint,b,c)){if(this.blocks){for(var f=0;f<this.blocks.length;f++){var g=this.blocks[f];g.intersects(b,c,d,e)}return}e?d.concat(this.entries):d.concatWithNoDuplicate(this.entries)}},b.prototype.intersectsRay=function(a,b){if(a.intersectsBoxMinMax(this._minPoint,this._maxPoint)){if(this.blocks){for(var c=0;c<this.blocks.length;c++){var d=this.blocks[c];d.intersectsRay(a,b)}return}b.concatWithNoDuplicate(this.entries)}},b.prototype.createInnerBlocks=function(){a.Octree._CreateBlocks(this._minPoint,this._maxPoint,this.entries,this._capacity,this._depth,this._maxDepth,this,this._creationFunc)},b}();a.OctreeBlock=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d,e){this.name=b,this.children=new Array,this.animations=new Array,this._worldTransform=new a.Matrix,this._absoluteTransform=new a.Matrix,this._invertedAbsoluteTransform=new a.Matrix,this._skeleton=c,this._matrix=e,this._baseMatrix=e,c.bones.push(this),d?(this._parent=d,d.children.push(this)):this._parent=null,this._updateDifferenceMatrix()}return b.prototype.getParent=function(){return this._parent},b.prototype.getLocalMatrix=function(){return this._matrix},b.prototype.getBaseMatrix=function(){return this._baseMatrix},b.prototype.getWorldMatrix=function(){return this._worldTransform},b.prototype.getInvertedAbsoluteTransform=function(){return this._invertedAbsoluteTransform},b.prototype.getAbsoluteMatrix=function(){for(var a=this._matrix.clone(),b=this._parent;b;)a=a.multiply(b.getLocalMatrix()),b=b.getParent();return a},b.prototype.updateMatrix=function(a){this._matrix=a,this._skeleton._markAsDirty(),this._updateDifferenceMatrix()},b.prototype._updateDifferenceMatrix=function(){this._parent?this._matrix.multiplyToRef(this._parent._absoluteTransform,this._absoluteTransform):this._absoluteTransform.copyFrom(this._matrix),this._absoluteTransform.invertToRef(this._invertedAbsoluteTransform);for(var a=0;a<this.children.length;a++)this.children[a]._updateDifferenceMatrix()},b.prototype.markAsDirty=function(){this._skeleton._markAsDirty()},b}();a.Bone=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d){this.name=b,this.id=c,this.bones=new Array,this._isDirty=!0,this._identity=a.Matrix.Identity(),this.bones=[],this._scene=d,d.skeletons.push(this)}return b.prototype.getTransformMatrices=function(){return this._transformMatrices},b.prototype._markAsDirty=function(){this._isDirty=!0},b.prototype.prepare=function(){if(this._isDirty){this._transformMatrices&&this._transformMatrices.length===16*(this.bones.length+1)||(this._transformMatrices=new Float32Array(16*(this.bones.length+1)));for(var a=0;a<this.bones.length;a++){var b=this.bones[a],c=b.getParent();c?b.getLocalMatrix().multiplyToRef(c.getWorldMatrix(),b.getWorldMatrix()):b.getWorldMatrix().copyFrom(b.getLocalMatrix()),b.getInvertedAbsoluteTransform().multiplyToArray(b.getWorldMatrix(),this._transformMatrices,16*a)}this._identity.copyToArray(this._transformMatrices,16*this.bones.length),this._isDirty=!1}},b.prototype.getAnimatables=function(){if(!this._animatables||this._animatables.length!=this.bones.length){this._animatables=[];for(var a=0;a<this.bones.length;a++)this._animatables.push(this.bones[a])}return this._animatables},b.prototype.clone=function(b,c){for(var d=new a.Skeleton(b,c||b,this._scene),e=0;e<this.bones.length;e++){var f=this.bones[e],g=null;if(f.getParent()){var h=this.bones.indexOf(f.getParent());g=d.bones[h]}var i=new a.Bone(f.name,d,g,f.getBaseMatrix());a.Tools.DeepCopy(f.animations,i.animations)}return d},b}();a.Skeleton=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d,e,f,g,h,i,j){this.name=b,this.width=-1,this.height=-1,this._reusable=!1,this._textures=new a.SmartArray(2),this._currentRenderTextureInd=0,null!=g?(this._camera=g,this._scene=g.getScene(),g.attachPostProcess(this),this._engine=this._scene.getEngine()):this._engine=i,this._renderRatio=f,this.renderTargetSamplingMode=h?h:a.Texture.NEAREST_SAMPLINGMODE,this._reusable=j||!1,e=e||[],e.push("textureSampler"),this._effect=this._engine.createEffect({vertex:"postprocess",fragment:c},["position"],d||[],e,"")}return b.prototype.isReusable=function(){return this._reusable},b.prototype.activate=function(a,b){a=a||this._camera;var c=a.getScene(),d=(b?b._width:this._engine.getRenderingCanvas().width)*this._renderRatio,e=(b?b._height:this._engine.getRenderingCanvas().height)*this._renderRatio;if(this.width!==d||this.height!==e){if(this._textures.length>0){for(var f=0;f<this._textures.length;f++)this._engine._releaseTexture(this._textures.data[f]);this._textures.reset()}this.width=d,this.height=e,this._textures.push(this._engine.createRenderTargetTexture({width:this.width,height:this.height},{generateMipMaps:!1,generateDepthBuffer:a._postProcesses.indexOf(this)===a._postProcessesTakenIndices[0],samplingMode:this.renderTargetSamplingMode})),this._reusable&&this._textures.push(this._engine.createRenderTargetTexture({width:this.width,height:this.height},{generateMipMaps:!1,generateDepthBuffer:a._postProcesses.indexOf(this)===a._postProcessesTakenIndices[0],samplingMode:this.renderTargetSamplingMode})),this.onSizeChanged&&this.onSizeChanged()}this._engine.bindFramebuffer(this._textures.data[this._currentRenderTextureInd]),this.onActivate&&this.onActivate(a),this._engine.clear(c.clearColor,c.autoClear||c.forceWireframe,!0),this._reusable&&(this._currentRenderTextureInd=(this._currentRenderTextureInd+1)%2)},b.prototype.apply=function(){return this._effect.isReady()?(this._engine.enableEffect(this._effect),this._engine.setState(!1),this._engine.setAlphaMode(a.Engine.ALPHA_DISABLE),this._engine.setDepthBuffer(!1),this._engine.setDepthWrite(!1),this._effect._bindTexture("textureSampler",this._textures.data[this._currentRenderTextureInd]),this.onApply&&this.onApply(this._effect),this._effect):null},b.prototype.dispose=function(a){if(a=a||this._camera,this._textures.length>0){for(var b=0;b<this._textures.length;b++)this._engine._releaseTexture(this._textures.data[b]);this._textures.reset()}a.detachPostProcess(this);var c=a._postProcesses.indexOf(this);c===a._postProcessesTakenIndices[0]&&a._postProcessesTakenIndices.length>0&&(this._camera._postProcesses[a._postProcessesTakenIndices[0]].width=-1)},b}();a.PostProcess=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a){this._vertexDeclaration=[2],this._vertexStrideSize=8,this._scene=a;var b=[];b.push(1,1),b.push(-1,1),b.push(-1,-1),b.push(1,-1),this._vertexBuffer=a.getEngine().createVertexBuffer(b);var c=[];c.push(0),c.push(1),c.push(2),c.push(0),c.push(2),c.push(3),this._indexBuffer=a.getEngine().createIndexBuffer(c)}return a.prototype._prepareFrame=function(a){var b=this._scene.activeCamera._postProcesses,c=this._scene.activeCamera._postProcessesTakenIndices;return 0!==c.length&&this._scene.postProcessesEnabled?(b[this._scene.activeCamera._postProcessesTakenIndices[0]].activate(this._scene.activeCamera,a),!0):!1},a.prototype._finalizeFrame=function(a,b){var c=this._scene.activeCamera._postProcesses,d=this._scene.activeCamera._postProcessesTakenIndices;if(0!==d.length&&this._scene.postProcessesEnabled){for(var e=this._scene.getEngine(),f=0;f<d.length&&(f<d.length-1?c[d[f+1]].activate(this._scene.activeCamera):b?e.bindFramebuffer(b):e.restoreDefaultFramebuffer(),!a);f++){var g=c[d[f]].apply();g&&(e.bindBuffers(this._vertexBuffer,this._indexBuffer,this._vertexDeclaration,this._vertexStrideSize,g),e.draw(!0,0,6))}e.setDepthBuffer(!0),e.setDepthWrite(!0)}},a.prototype.dispose=function(){this._vertexBuffer&&(this._scene.getEngine()._releaseBuffer(this._vertexBuffer),this._vertexBuffer=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null)},a}();a.PostProcessManager=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g){a.call(this,b,"pass",null,null,c,d,e,f,g)}return __extends(b,a),b}(a.PostProcess);a.PassPostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f,g,h,i,j){"undefined"==typeof h&&(h=a.Texture.BILINEAR_SAMPLINGMODE);var k=this;b.call(this,c,"blur",["screenSize","direction","blurWidth"],null,f,g,h,i,j),this.direction=d,this.blurWidth=e,this.onApply=function(a){a.setFloat2("screenSize",k.width,k.height),a.setVector2("direction",k.direction),a.setFloat("blurWidth",k.blurWidth)}}return __extends(c,b),c}(a.PostProcess);a.BlurPostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g,h){var i=this;a.call(this,b,"filter",["kernelMatrix"],null,d,e,f,g,h),this.kernelMatrix=c,this.onApply=function(a){a.setMatrix("kernelMatrix",i.kernelMatrix)}}return __extends(b,a),b}(a.PostProcess);a.FilterPostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f,g,h,i,j,k,l){var m=this;b.call(this,c,"refraction",["baseColor","depth","colorLevel"],["refractionSampler"],h,i,j,k,l),this.color=e,this.depth=f,this.colorLevel=g,this.onActivate=function(b){m._refRexture=m._refRexture||new a.Texture(d,b.getScene())},this.onApply=function(a){a.setColor3("baseColor",m.color),a.setFloat("depth",m.depth),a.setFloat("colorLevel",m.colorLevel),a.setTexture("refractionSampler",m._refRexture)}}return __extends(c,b),c.prototype.dispose=function(a){this._refRexture&&this._refRexture.dispose(),b.prototype.dispose.call(this,a)},c}(a.PostProcess);a.RefractionPostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g){a.call(this,b,"blackAndWhite",null,null,c,d,e,f,g)}return __extends(b,a),b}(a.PostProcess);a.BlackAndWhitePostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g,h){var i=this;a.call(this,b,"convolution",["kernel","screenSize"],null,d,e,f,g,h),this.kernel=c,this.onApply=function(a){a.setFloat2("screenSize",i.width,i.height),a.setArray("kernel",i.kernel)}}return __extends(b,a),b.EdgeDetect0Kernel=[1,0,-1,0,0,0,-1,0,1],b.EdgeDetect1Kernel=[0,1,0,1,-4,1,0,1,0],b.EdgeDetect2Kernel=[-1,-1,-1,-1,8,-1,-1,-1,-1],b.SharpenKernel=[0,-1,0,-1,5,-1,0,-1,0],b.EmbossKernel=[-2,-1,0,-1,1,1,0,1,2],b.GaussianKernel=[0,1,0,1,1,1,0,1,0],b}(a.PostProcess);a.ConvolutionPostProcess=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g){var h=this;a.call(this,b,"fxaa",["texelSize"],null,c,d,e,f,g),this.onSizeChanged=function(){h.texelWidth=1/h.width,h.texelHeight=1/h.height},this.onApply=function(a){a.setFloat2("texelSize",h.texelWidth,h.texelHeight)}}return __extends(b,a),b}(a.PostProcess);a.FxaaPostProcess=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d,e,f){this.size=b,this.position=c,this.dispose=function(){this.texture&&this.texture.dispose();var a=this._system.lensFlares.indexOf(this);this._system.lensFlares.splice(a,1)},this.color=d||new a.Color3(1,1,1),this.texture=e?new a.Texture(e,f.getScene(),!0):null,this._system=f,f.lensFlares.push(this)}return b}();a.LensFlare=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c){this.name=a,this.lensFlares=new Array,this.borderLimit=300,this._vertexDeclaration=[2],this._vertexStrideSize=8,this._isEnabled=!0,this._scene=c,this._emitter=b,c.lensFlareSystems.push(this),this.meshesSelectionPredicate=function(a){return a.material&&a.isVisible&&a.isEnabled()&&a.checkCollisions&&0!=(a.layerMask&c.activeCamera.layerMask)};var d=[];d.push(1,1),d.push(-1,1),d.push(-1,-1),d.push(1,-1),this._vertexBuffer=c.getEngine().createVertexBuffer(d);var e=[];e.push(0),e.push(1),e.push(2),e.push(0),e.push(2),e.push(3),this._indexBuffer=c.getEngine().createIndexBuffer(e),this._effect=this._scene.getEngine().createEffect("lensFlare",["position"],["color","viewportMatrix"],["textureSampler"],"")}return Object.defineProperty(b.prototype,"isEnabled",{get:function(){return this._isEnabled},set:function(a){this._isEnabled=a},enumerable:!0,configurable:!0}),b.prototype.getScene=function(){return this._scene},b.prototype.getEmitter=function(){return this._emitter},b.prototype.getEmitterPosition=function(){return this._emitter.getAbsolutePosition?this._emitter.getAbsolutePosition():this._emitter.position},b.prototype.computeEffectivePosition=function(b){var c=this.getEmitterPosition();return c=a.Vector3.Project(c,a.Matrix.Identity(),this._scene.getTransformMatrix(),b),this._positionX=c.x,this._positionY=c.y,c=a.Vector3.TransformCoordinates(this.getEmitterPosition(),this._scene.getViewMatrix()),c.z>0&&this._positionX>b.x&&this._positionX<b.x+b.width&&this._positionY>b.y&&this._positionY<b.y+b.height?!0:!1},b.prototype._isVisible=function(){if(!this._isEnabled)return!1;var b=this.getEmitterPosition(),c=b.subtract(this._scene.activeCamera.position),d=c.length();c.normalize();var e=new a.Ray(this._scene.activeCamera.position,c),f=this._scene.pickWithRay(e,this.meshesSelectionPredicate,!0);return!f.hit||f.distance>d},b.prototype.render=function(){if(!this._effect.isReady())return!1;var b=this._scene.getEngine(),c=this._scene.activeCamera.viewport,d=c.toGlobal(b);if(!this.computeEffectivePosition(d))return!1;if(!this._isVisible())return!1;var e,f;e=this._positionX<this.borderLimit+d.x?this.borderLimit+d.x-this._positionX:this._positionX>d.x+d.width-this.borderLimit?this._positionX-d.x-d.width+this.borderLimit:0,f=this._positionY<this.borderLimit+d.y?this.borderLimit+d.y-this._positionY:this._positionY>d.y+d.height-this.borderLimit?this._positionY-d.y-d.height+this.borderLimit:0;var g=e>f?e:f;g>this.borderLimit&&(g=this.borderLimit);var h=1-g/this.borderLimit;if(0>h)return!1;h>1&&(h=1);var i=d.x+d.width/2,j=d.y+d.height/2,k=i-this._positionX,l=j-this._positionY;b.enableEffect(this._effect),b.setState(!1),b.setDepthBuffer(!1),b.setAlphaMode(a.Engine.ALPHA_ADD),b.bindBuffers(this._vertexBuffer,this._indexBuffer,this._vertexDeclaration,this._vertexStrideSize,this._effect);for(var m=0;m<this.lensFlares.length;m++){var n=this.lensFlares[m],o=i-k*n.position,p=j-l*n.position,q=n.size,r=n.size*b.getAspectRatio(this._scene.activeCamera),s=2*(o/d.width)-1,t=1-2*(p/d.height),u=a.Matrix.FromValues(q/2,0,0,0,0,r/2,0,0,0,0,1,0,s,t,0,1);this._effect.setMatrix("viewportMatrix",u),this._effect.setTexture("textureSampler",n.texture),this._effect.setFloat4("color",n.color.r*h,n.color.g*h,n.color.b*h,1),b.draw(!0,0,6)}return b.setDepthBuffer(!0),b.setAlphaMode(a.Engine.ALPHA_DISABLE),!0},b.prototype.dispose=function(){for(this._vertexBuffer&&(this._scene.getEngine()._releaseBuffer(this._vertexBuffer),this._vertexBuffer=null),this._indexBuffer&&(this._scene.getEngine()._releaseBuffer(this._indexBuffer),this._indexBuffer=null);this.lensFlares.length;)this.lensFlares[0].dispose();var a=this._scene.lensFlareSystems.indexOf(this);
this._scene.lensFlareSystems.splice(a,1)},b}();a.LensFlareSystem=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a,b,c){this.bu=a,this.bv=b,this.distance=c,this.faceId=0}return a}();a.IntersectionInfo=b;var c=function(){function b(){this.hit=!1,this.distance=0,this.pickedPoint=null,this.pickedMesh=null,this.bu=0,this.bv=0,this.faceId=-1}return b.prototype.getNormal=function(){if(!this.pickedMesh)return null;var b=this.pickedMesh.getIndices(),c=this.pickedMesh.getVerticesData(a.VertexBuffer.NormalKind),d=a.Vector3.FromArray(c,3*b[3*this.faceId]),e=a.Vector3.FromArray(c,3*b[3*this.faceId+1]),f=a.Vector3.FromArray(c,3*b[3*this.faceId+2]);return d=d.scale(this.bu),e=e.scale(this.bv),f=f.scale(1-this.bu-this.bv),new a.Vector3(d.x+e.x+f.x,d.y+e.y+f.y,d.z+e.z+f.z)},b}();a.PickingInfo=c}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c,d,e,f,g,h){this.engine=a,this.canvas=c,this.currentScene=b,this.sceneLoadedCallback=d,this.progressCallback=e,this.additionnalRenderLoopLogicCallback=f,this.textureLoadingCallback=g,this.startingProcessingFilesCallback=h}return b.prototype.monitorElementForDragNDrop=function(a){var b=this;a&&(this.elementToMonitor=a,this.elementToMonitor.addEventListener("dragenter",function(a){b.drag(a)},!1),this.elementToMonitor.addEventListener("dragover",function(a){b.drag(a)},!1),this.elementToMonitor.addEventListener("drop",function(a){b.drop(a)},!1))},b.prototype.renderFunction=function(){if(this.additionnalRenderLoopLogicCallback&&this.additionnalRenderLoopLogicCallback(),this.currentScene){if(this.textureLoadingCallback){var a=this.currentScene.getWaitingItemsCount();a>0&&this.textureLoadingCallback(a)}this.currentScene.render()}},b.prototype.drag=function(a){a.stopPropagation(),a.preventDefault()},b.prototype.drop=function(a){a.stopPropagation(),a.preventDefault(),this.loadFiles(a)},b.prototype.loadFiles=function(b){var c=this,d=this;this.startingProcessingFilesCallback&&this.startingProcessingFilesCallback();var e,f;if(b&&b.dataTransfer&&b.dataTransfer.files&&(f=b.dataTransfer.files),b&&b.target&&b.target.files&&(f=b.target.files),f&&f.length>0){for(var g=0;g<f.length;g++)switch(f[g].type){case"image/jpeg":case"image/png":a.FilesInput.FilesTextures[f[g].name]=f[g];break;case"image/targa":case"image/vnd.ms-dds":a.FilesInput.FilesToLoad[f[g].name]=f[g];break;default:-1!==f[g].name.indexOf(".babylon")&&-1===f[g].name.indexOf(".manifest")&&-1===f[g].name.indexOf(".incremental")&&-1===f[g].name.indexOf(".babylonmeshdata")&&-1===f[g].name.indexOf(".babylongeometrydata")&&(e=f[g])}e?(this.currentScene&&(this.engine.stopRenderLoop(),this.currentScene.dispose()),a.SceneLoader.Load("file:",e,this.engine,function(a){d.currentScene=a,d.currentScene.executeWhenReady(function(){d.currentScene.activeCamera&&d.currentScene.activeCamera.attachControl(d.canvas),d.sceneLoadedCallback&&d.sceneLoadedCallback(e,d.currentScene),d.engine.runRenderLoop(function(){d.renderFunction()})})},function(a){c.progressCallback&&c.progressCallback(a)})):a.Tools.Error("Please provide a valid .babylon file.")}},b.FilesTextures=new Array,b.FilesToLoad=new Array,b}();a.FilesInput=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b){this._currentPlugin=b||new a.CannonJSPlugin}return b.prototype._initialize=function(a){this._currentPlugin.initialize(),this._setGravity(a)},b.prototype._runOneStep=function(a){a>.1?a=.1:0>=a&&(a=1/60),this._currentPlugin.runOneStep(a)},b.prototype._setGravity=function(b){this.gravity=b||new a.Vector3(0,-9.82,0),this._currentPlugin.setGravity(this.gravity)},b.prototype._registerMesh=function(a,b,c){return this._currentPlugin.registerMesh(a,b,c)},b.prototype._registerMeshesAsCompound=function(a,b){return this._currentPlugin.registerMeshesAsCompound(a,b)},b.prototype._unregisterMesh=function(a){this._currentPlugin.unregisterMesh(a)},b.prototype._applyImpulse=function(a,b,c){this._currentPlugin.applyImpulse(a,b,c)},b.prototype._createLink=function(a,b,c,d){return this._currentPlugin.createLink(a,b,c,d)},b.prototype.dispose=function(){this._currentPlugin.dispose()},b.prototype.isSupported=function(){return this._currentPlugin.isSupported()},b.NoImpostor=0,b.SphereImpostor=1,b.BoxImpostor=2,b.PlaneImpostor=3,b.CompoundImpostor=4,b.MeshImpostor=4,b.Epsilon=.001,b}();a.PhysicsEngine=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(b){var c={};if(c.name=b.name,c.id=b.id,c.tags=a.Tags.GetTags(b),b instanceof a.PointLight)c.type=0,c.position=b.position.asArray();else if(b instanceof a.DirectionalLight){c.type=1;var d=b;c.position=d.position.asArray(),c.direction=d.direction.asArray()}else if(b instanceof a.SpotLight){c.type=2;var e=b;c.position=e.position.asArray(),c.direction=e.position.asArray(),c.angle=e.angle,c.exponent=e.exponent}else if(b instanceof a.HemisphericLight){c.type=3;var f=b;c.direction=f.direction.asArray(),c.groundColor=f.groundColor.asArray()}return b.intensity&&(c.intensity=b.intensity),c.range=b.range,c.diffuse=b.diffuse.asArray(),c.specular=b.specular.asArray(),c},c=function(b){var c={};return c.name=b.name,c.tags=a.Tags.GetTags(b),c.id=b.id,c.position=b.position.asArray(),b.parent&&(c.parentId=b.parent.id),c.rotation=b.rotation.asArray(),b.lockedTarget&&b.lockedTarget.id&&(c.lockedTargetId=b.lockedTarget.id),c.fov=b.fov,c.minZ=b.minZ,c.maxZ=b.maxZ,c.speed=b.speed,c.inertia=b.inertia,c.checkCollisions=b.checkCollisions,c.applyGravity=b.applyGravity,b.ellipsoid&&(c.ellipsoid=b.ellipsoid.asArray()),d(b,c),c.layerMask=b.layerMask,c},d=function(a,b){if(a.animations){b.animations=[];for(var c=0;c<a.animations.length;c++){var d=a.animations[c];b.animations.push(e(d))}}},e=function(b){var c={};c.name=b.name,c.property=b.targetProperty,c.framePerSecond=b.framePerSecond,c.dataType=b.dataType,c.loopBehavior=b.loopMode;var d=b.dataType;c.keys=[];for(var e=b.getKeys(),f=0;f<e.length;f++){var g=e[f],h={};switch(h.frame=g.frame,d){case a.Animation.ANIMATIONTYPE_FLOAT:h.values=[g.value];break;case a.Animation.ANIMATIONTYPE_QUATERNION:case a.Animation.ANIMATIONTYPE_MATRIX:case a.Animation.ANIMATIONTYPE_VECTOR3:h.values=g.value.asArray()}c.keys.push(h)}return c},f=function(b){var c={};c.name=b.name,c.id=b.id,c.tags=a.Tags.GetTags(b),c.materials=[];for(var d=0;d<b.subMaterials.length;d++){var e=b.subMaterials[d];c.materials.push(e?e.id:null)}return c},g=function(b){var c={};return c.name=b.name,c.ambient=b.ambientColor.asArray(),c.diffuse=b.diffuseColor.asArray(),c.specular=b.specularColor.asArray(),c.specularPower=b.specularPower,c.emissive=b.emissiveColor.asArray(),c.alpha=b.alpha,c.id=b.id,c.tags=a.Tags.GetTags(b),c.backFaceCulling=b.backFaceCulling,b.diffuseTexture&&(c.diffuseTexture=h(b.diffuseTexture)),b.ambientTexture&&(c.ambientTexture=h(b.ambientTexture)),b.opacityTexture&&(c.opacityTexture=h(b.opacityTexture)),b.reflectionTexture&&(c.reflectionTexture=h(b.reflectionTexture)),b.emissiveTexture&&(c.emissiveTexture=h(b.emissiveTexture)),b.specularTexture&&(c.specularTexture=h(b.specularTexture)),b.bumpTexture&&(c.bumpTexture=h(b.bumpTexture)),c},h=function(b){var c={};if(!b.name)return null;if(b instanceof a.CubeTexture)return c.name=b.name,c.hasAlpha=b.hasAlpha,c.level=b.level,c.coordinatesMode=b.coordinatesMode,c;if(b instanceof a.MirrorTexture){var e=b;c.renderTargetSize=e.getRenderSize(),c.renderList=[];for(var f=0;f<e.renderList.length;f++)c.renderList.push(e.renderList[f].id);c.mirrorPlane=e.mirrorPlane.asArray()}else if(b instanceof a.RenderTargetTexture){var g=b;for(c.renderTargetSize=g.getRenderSize(),c.renderList=[],f=0;f<g.renderList.length;f++)c.renderList.push(g.renderList[f].id)}var h=b;return c.name=b.name,c.hasAlpha=b.hasAlpha,c.level=b.level,c.coordinatesIndex=b.coordinatesIndex,c.coordinatesMode=b.coordinatesMode,c.uOffset=h.uOffset,c.vOffset=h.vOffset,c.uScale=h.uScale,c.vScale=h.vScale,c.uAng=h.uAng,c.vAng=h.vAng,c.wAng=h.wAng,c.wrapU=b.wrapU,c.wrapV=b.wrapV,d(b,c),c},i=function(a){var b={};b.name=a.name,b.id=a.id,b.bones=[];for(var c=0;c<a.bones.length;c++){var d=a.bones[c],f={parentBoneIndex:d.getParent()?a.bones.indexOf(d.getParent()):-1,name:d.name,matrix:d.getLocalMatrix().toArray()};b.bones.push(f),d.animations&&d.animations.length>0&&(f.animation=e(d.animations[0]))}return b},j=function(a){var b={};return b.emitterId=a.emitter.id,b.capacity=a.getCapacity(),a.particleTexture&&(b.textureName=a.particleTexture.name),b.minAngularSpeed=a.minAngularSpeed,b.maxAngularSpeed=a.maxAngularSpeed,b.minSize=a.minSize,b.maxSize=a.maxSize,b.minLifeTime=a.minLifeTime,b.maxLifeTime=a.maxLifeTime,b.emitRate=a.emitRate,b.minEmitBox=a.minEmitBox.asArray(),b.maxEmitBox=a.maxEmitBox.asArray(),b.gravity=a.gravity.asArray(),b.direction1=a.direction1.asArray(),b.direction2=a.direction2.asArray(),b.color1=a.color1.asArray(),b.color2=a.color2.asArray(),b.colorDead=a.colorDead.asArray(),b.updateSpeed=a.updateSpeed,b.targetStopDuration=a.targetStopDuration,b.textureMask=a.textureMask.asArray(),b.blendMode=a.blendMode,b},k=function(b){var c={};c.emitterId=b.getEmitter().id,c.borderLimit=b.borderLimit,c.flares=[];for(var d=0;d<b.lensFlares.length;d++){var e=b.lensFlares[d];c.flares.push({size:e.size,position:e.position,color:e.color.asArray(),textureName:a.Tools.GetFilename(e.texture.name)})}return c},l=function(a){var b={},c=a.getShadowGenerator();b.lightId=a.id,b.mapSize=c.getShadowMap().getRenderSize(),b.useVarianceShadowMap=c.useVarianceShadowMap,b.renderList=[];for(var d=0;d<c.getShadowMap().renderList.length;d++){var e=c.getShadowMap().renderList[d];b.renderList.push(e.id)}return b},m=[],n=function(b,c){if(!m[b.id]){if(b instanceof a.Geometry.Primitives.Box)c.boxes.push(r(b));else if(b instanceof a.Geometry.Primitives.Sphere)c.spheres.push(s(b));else if(b instanceof a.Geometry.Primitives.Cylinder)c.cylinders.push(t(b));else if(b instanceof a.Geometry.Primitives.Torus)c.toruses.push(u(b));else if(b instanceof a.Geometry.Primitives.Ground)c.grounds.push(v(b));else if(b instanceof a.Geometry.Primitives.Plane)c.planes.push(w(b));else if(b instanceof a.Geometry.Primitives.TorusKnot)c.torusKnots.push(x(b));else{if(b instanceof a.Geometry.Primitives._Primitive)throw new Error("Unknow primitive type");c.vertexData.push(p(b))}m[b.id]=!0}},o=function(b){var c={};return c.id=b.id,a.Tags.HasTags(b)&&(c.tags=a.Tags.GetTags(b)),c},p=function(b){var c=o(b);return b.isVerticesDataPresent(a.VertexBuffer.PositionKind)&&(c.positions=b.getVerticesData(a.VertexBuffer.PositionKind)),b.isVerticesDataPresent(a.VertexBuffer.NormalKind)&&(c.normals=b.getVerticesData(a.VertexBuffer.NormalKind)),b.isVerticesDataPresent(a.VertexBuffer.UVKind)&&(c.uvs=b.getVerticesData(a.VertexBuffer.UVKind)),b.isVerticesDataPresent(a.VertexBuffer.UV2Kind)&&(c.uvs2=b.getVerticesData(a.VertexBuffer.UV2Kind)),b.isVerticesDataPresent(a.VertexBuffer.ColorKind)&&(c.colors=b.getVerticesData(a.VertexBuffer.ColorKind)),b.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&(c.matricesIndices=b.getVerticesData(a.VertexBuffer.MatricesIndicesKind),c.matricesIndices._isExpanded=!0),b.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind)&&(c.matricesWeights=b.getVerticesData(a.VertexBuffer.MatricesWeightsKind)),c.indices=b.getIndices(),c},q=function(a){var b=o(a);return b.canBeRegenerated=a.canBeRegenerated(),b},r=function(a){var b=q(a);return b.size=a.size,b},s=function(a){var b=q(a);return b.segments=a.segments,b.diameter=a.diameter,b},t=function(a){var b=q(a);return b.height=a.height,b.diameterTop=a.diameterTop,b.diameterBottom=a.diameterBottom,b.tessellation=a.tessellation,b},u=function(a){var b=q(a);return b.diameter=a.diameter,b.thickness=a.thickness,b.tessellation=a.tessellation,b},v=function(a){var b=q(a);return b.width=a.width,b.height=a.height,b.subdivisions=a.subdivisions,b},w=function(a){var b=q(a);return b.size=a.size,b},x=function(a){var b=q(a);return b.radius=a.radius,b.tube=a.tube,b.radialSegments=a.radialSegments,b.tubularSegments=a.tubularSegments,b.p=a.p,b.q=a.q,b},y=function(b,c){var e={};e.name=b.name,e.id=b.id,a.Tags.HasTags(b)&&(e.tags=a.Tags.GetTags(b)),e.position=b.position.asArray(),b.rotationQuaternion?e.rotationQuaternion=b.rotationQuaternion.asArray():b.rotation&&(e.rotation=b.rotation.asArray()),e.scaling=b.scaling.asArray(),e.localMatrix=b.getPivotMatrix().asArray(),e.isEnabled=b.isEnabled(),e.isVisible=b.isVisible,e.infiniteDistance=b.infiniteDistance,e.pickable=b.isPickable,e.receiveShadows=b.receiveShadows,e.billboardMode=b.billboardMode,e.visibility=b.visibility,e.checkCollisions=b.checkCollisions,b.parent&&(e.parentId=b.parent.id);var f=b._geometry;if(f){var g=f.id;e.geometryId=g,b.getScene().getGeometryByID(g)||n(f,c.geometries),e.subMeshes=[];for(var h=0;h<b.subMeshes.length;h++){var i=b.subMeshes[h];e.subMeshes.push({materialIndex:i.materialIndex,verticesStart:i.verticesStart,verticesCount:i.verticesCount,indexStart:i.indexStart,indexCount:i.indexCount})}}if(b.material?e.materialId=b.material.id:b.material=null,b.skeleton&&(e.skeletonId=b.skeleton.id),b.getPhysicsImpostor()!==a.PhysicsEngine.NoImpostor)switch(e.physicsMass=b.getPhysicsMass(),e.physicsFriction=b.getPhysicsFriction(),e.physicsRestitution=b.getPhysicsRestitution(),b.getPhysicsImpostor()){case a.PhysicsEngine.BoxImpostor:e.physicsImpostor=1;break;case a.PhysicsEngine.SphereImpostor:e.physicsImpostor=2}return d(b,e),e.layerMask=b.layerMask,e},z=function(){function d(){}return d.Serialize=function(d){var e={};e.useDelayedTextureLoading=d.useDelayedTextureLoading,e.autoClear=d.autoClear,e.clearColor=d.clearColor.asArray(),e.ambientColor=d.ambientColor.asArray(),e.gravity=d.gravity.asArray(),d.fogMode&&0!==d.fogMode&&(e.fogMode=d.fogMode,e.fogColor=d.fogColor.asArray(),e.fogStart=d.fogStart,e.fogEnd=d.fogEnd,e.fogDensity=d.fogDensity),e.lights=[];for(var h=0;h<d.lights.length;h++){var o=d.lights[h];e.lights.push(b(o))}for(e.cameras=[],h=0;h<d.cameras.length;h++){var p=d.cameras[h];p instanceof a.FreeCamera&&e.cameras.push(c(p))}for(d.activeCamera&&(e.activeCameraID=d.activeCamera.id),e.materials=[],e.multiMaterials=[],h=0;h<d.materials.length;h++){var q=d.materials[h];q instanceof a.StandardMaterial?e.materials.push(g(q)):q instanceof a.MultiMaterial&&e.multiMaterials.push(f(q))}for(e.skeletons=[],h=0;h<d.skeletons.length;h++)e.skeletons.push(i(d.skeletons[h]));e.geometries={},e.geometries.boxes=[],e.geometries.spheres=[],e.geometries.cylinders=[],e.geometries.toruses=[],e.geometries.grounds=[],e.geometries.planes=[],e.geometries.torusKnots=[],e.geometries.vertexData=[],m=[];for(var r=d.getGeometries(),h=0;h<r.length;h++){var s=r[h];s.isReady()&&n(s,e.geometries)}for(e.meshes=[],h=0;h<d.meshes.length;h++){var t=d.meshes[h];if(t instanceof a.Mesh){var u=t;(u.delayLoadState===a.Engine.DELAYLOADSTATE_LOADED||u.delayLoadState===a.Engine.DELAYLOADSTATE_NONE)&&e.meshes.push(y(u,e))}}for(e.particleSystems=[],h=0;h<d.particleSystems.length;h++)e.particleSystems.push(j(d.particleSystems[h]));for(e.lensFlareSystems=[],h=0;h<d.lensFlareSystems.length;h++)e.lensFlareSystems.push(k(d.lensFlareSystems[h]));for(e.shadowGenerators=[],h=0;h<d.lights.length;h++)o=d.lights[h],o.getShadowGenerator()&&e.shadowGenerators.push(l(o));return e},d}();a.SceneSerializer=z}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){BABYLON.SceneLoader={_registeredPlugins:[],_getPluginForFilename:function(a){for(var b=a.lastIndexOf("."),c=a.substring(b).toLowerCase(),d=0;d<this._registeredPlugins.length;d++){var e=this._registeredPlugins[d];if(-1!==e.extensions.indexOf(c))return e}return this._registeredPlugins[this._registeredPlugins.length-1]},ForceFullSceneLoadingForIncremental:!1,RegisterPlugin:function(a){a.extensions=a.extensions.toLowerCase(),this._registeredPlugins.push(a)},ImportMesh:function(a,b,c,d,e,f,g){var h=new BABYLON.Database(b+c);d.database=h;var i=this._getPluginForFilename(c),j=function(f){var h=[],j=[],k=[];return i.importMesh(a,d,f,b,h,j,k)?void(e&&(d.importedMeshesFiles.push(b+c),e(h,j,k))):void(g&&g(d))};return c.substr&&"data:"===c.substr(0,5)?void j(c.substr(5)):void BABYLON.Tools.LoadFile(b+c,function(a){j(a)},f,h)},Load:function(a,b,c,d,e,f){var g,h=this._getPluginForFilename(b.name||b),i=function(b){var e=new BABYLON.Scene(c);return e.database=g,h.load(e,b,a)?void(d&&d(e)):void(f&&f(e))};return b.substr&&"data:"===b.substr(0,5)?void i(b.substr(5)):void(-1===a.indexOf("file:")?(g=new BABYLON.Database(a+b),BABYLON.Tools.LoadFile(a+b,i,e,g)):BABYLON.Tools.ReadFile(b,i,e))}}}();var BABYLON=BABYLON||{};!function(){var a=function(a,b,c){var d=new BABYLON.CubeTexture(a+b.name,c);return d.name=b.name,d.hasAlpha=b.hasAlpha,d.level=b.level,d.coordinatesMode=b.coordinatesMode,d},b=function(b,c,d){if(!c.name&&!c.isRenderTarget)return null;if(c.isCube)return a(b,c,d);var e;if(c.mirrorPlane?(e=new BABYLON.MirrorTexture(c.name,c.renderTargetSize,d),e._waitingRenderList=c.renderList,e.mirrorPlane=BABYLON.Plane.FromArray(c.mirrorPlane)):c.isRenderTarget?(e=new BABYLON.RenderTargetTexture(c.name,c.renderTargetSize,d),e._waitingRenderList=c.renderList):e=new BABYLON.Texture(b+c.name,d),e.name=c.name,e.hasAlpha=c.hasAlpha,e.getAlphaFromRGB=c.getAlphaFromRGB,e.level=c.level,e.coordinatesIndex=c.coordinatesIndex,e.coordinatesMode=c.coordinatesMode,e.uOffset=c.uOffset,e.vOffset=c.vOffset,e.uScale=c.uScale,e.vScale=c.vScale,e.uAng=c.uAng,e.vAng=c.vAng,e.wAng=c.wAng,e.wrapU=c.wrapU,e.wrapV=c.wrapV,c.animations)for(var f=0;f<c.animations.length;f++){var g=c.animations[f];e.animations.push(j(g))}return e},c=function(a,b){for(var c=new BABYLON.Skeleton(a.name,a.id,b),d=0;d<a.bones.length;d++){var e=a.bones[d],f=null;e.parentBoneIndex>-1&&(f=c.bones[e.parentBoneIndex]);var g=new BABYLON.Bone(e.name,c,f,BABYLON.Matrix.FromArray(e.matrix));e.animation&&g.animations.push(j(e.animation))}return c},d=function(a,c,d){var e;return e=new BABYLON.StandardMaterial(a.name,c),e.ambientColor=BABYLON.Color3.FromArray(a.ambient),e.diffuseColor=BABYLON.Color3.FromArray(a.diffuse),e.specularColor=BABYLON.Color3.FromArray(a.specular),e.specularPower=a.specularPower,e.emissiveColor=BABYLON.Color3.FromArray(a.emissive),e.alpha=a.alpha,e.id=a.id,BABYLON.Tags.AddTagsTo(e,a.tags),e.backFaceCulling=a.backFaceCulling,e.wireframe=a.wireframe,a.diffuseTexture&&(e.diffuseTexture=b(d,a.diffuseTexture,c)),a.ambientTexture&&(e.ambientTexture=b(d,a.ambientTexture,c)),a.opacityTexture&&(e.opacityTexture=b(d,a.opacityTexture,c)),a.reflectionTexture&&(e.reflectionTexture=b(d,a.reflectionTexture,c)),a.emissiveTexture&&(e.emissiveTexture=b(d,a.emissiveTexture,c)),a.specularTexture&&(e.specularTexture=b(d,a.specularTexture,c)),a.bumpTexture&&(e.bumpTexture=b(d,a.bumpTexture,c)),e},e=function(a,b,c,e){for(var f=0;f<b.materials.length;f++){var g=b.materials[f];if(g.id===a)return d(g,c,e)}return null},f=function(a,b){var c=new BABYLON.MultiMaterial(a.name,b);c.id=a.id,BABYLON.Tags.AddTagsTo(c,a.tags);for(var d=0;d<a.materials.length;d++){var e=a.materials[d];c.subMaterials.push(e?b.getMaterialByID(e):null)}return c},g=function(a,b,c){var d=b.getLastEntryByID(a.emitterId),e=new BABYLON.LensFlareSystem("lensFlareSystem#"+a.emitterId,d,b);e.borderLimit=a.borderLimit;for(var f=0;f<a.flares.length;f++){var g=a.flares[f];new BABYLON.LensFlare(g.size,g.position,BABYLON.Color3.FromArray(g.color),c+g.textureName,e)}return e},h=function(a,b,c){var d=b.getLastMeshByID(a.emitterId),e=new BABYLON.ParticleSystem("particles#"+d.name,a.capacity,b);return a.textureName&&(e.particleTexture=new BABYLON.Texture(c+a.textureName,b),e.particleTexture.name=a.textureName),e.minAngularSpeed=a.minAngularSpeed,e.maxAngularSpeed=a.maxAngularSpeed,e.minSize=a.minSize,e.maxSize=a.maxSize,e.minLifeTime=a.minLifeTime,e.maxLifeTime=a.maxLifeTime,e.emitter=d,e.emitRate=a.emitRate,e.minEmitBox=BABYLON.Vector3.FromArray(a.minEmitBox),e.maxEmitBox=BABYLON.Vector3.FromArray(a.maxEmitBox),e.gravity=BABYLON.Vector3.FromArray(a.gravity),e.direction1=BABYLON.Vector3.FromArray(a.direction1),e.direction2=BABYLON.Vector3.FromArray(a.direction2),e.color1=BABYLON.Color4.FromArray(a.color1),e.color2=BABYLON.Color4.FromArray(a.color2),e.colorDead=BABYLON.Color4.FromArray(a.colorDead),e.updateSpeed=a.updateSpeed,e.targetStopDuration=a.targetStopFrame,e.textureMask=BABYLON.Color4.FromArray(a.textureMask),e.blendMode=a.blendMode,e.start(),e},i=function(a,b){for(var c=b.getLightByID(a.lightId),d=new BABYLON.ShadowGenerator(a.mapSize,c),e=0;e<a.renderList.length;e++){var f=b.getMeshByID(a.renderList[e]);d.getShadowMap().renderList.push(f)}return d.useVarianceShadowMap=a.useVarianceShadowMap,d},j=function(a){for(var b=new BABYLON.Animation(a.name,a.property,a.framePerSecond,a.dataType,a.loopBehavior),c=a.dataType,d=[],e=0;e<a.keys.length;e++){var f,g=a.keys[e];switch(c){case BABYLON.Animation.ANIMATIONTYPE_FLOAT:f=g.values[0];break;case BABYLON.Animation.ANIMATIONTYPE_QUATERNION:f=BABYLON.Quaternion.FromArray(g.values);break;case BABYLON.Animation.ANIMATIONTYPE_MATRIX:f=BABYLON.Matrix.FromArray(g.values);break;case BABYLON.Animation.ANIMATIONTYPE_VECTOR3:default:f=BABYLON.Vector3.FromArray(g.values)}d.push({frame:g.frame,value:f})}return b.setKeys(d),b},k=function(a,b){var c;switch(a.type){case 0:c=new BABYLON.PointLight(a.name,BABYLON.Vector3.FromArray(a.position),b);break;case 1:c=new BABYLON.DirectionalLight(a.name,BABYLON.Vector3.FromArray(a.direction),b),c.position=BABYLON.Vector3.FromArray(a.position);break;case 2:c=new BABYLON.SpotLight(a.name,BABYLON.Vector3.FromArray(a.position),BABYLON.Vector3.FromArray(a.direction),a.angle,a.exponent,b);break;case 3:c=new BABYLON.HemisphericLight(a.name,BABYLON.Vector3.FromArray(a.direction),b),c.groundColor=BABYLON.Color3.FromArray(a.groundColor)}if(c.id=a.id,BABYLON.Tags.AddTagsTo(c,a.tags),void 0!==a.intensity&&(c.intensity=a.intensity),a.range&&(c.range=a.range),c.diffuse=BABYLON.Color3.FromArray(a.diffuse),c.specular=BABYLON.Color3.FromArray(a.specular),a.excludedMeshesIds&&(c._excludedMeshesIds=a.excludedMeshesIds),a.animations)for(var d=0;d<a.animations.length;d++){var e=a.animations[d];c.animations.push(j(e))}a.autoAnimate&&b.beginAnimation(c,a.autoAnimateFrom,a.autoAnimateTo,a.autoAnimateLoop,1)},l=function(a,b){var c=new BABYLON.FreeCamera(a.name,BABYLON.Vector3.FromArray(a.position),b);if(c.id=a.id,BABYLON.Tags.AddTagsTo(c,a.tags),a.parentId&&(c._waitingParentId=a.parentId),a.target?c.setTarget(BABYLON.Vector3.FromArray(a.target)):c.rotation=BABYLON.Vector3.FromArray(a.rotation),a.lockedTargetId&&(c._waitingLockedTargetId=a.lockedTargetId),c.fov=a.fov,c.minZ=a.minZ,c.maxZ=a.maxZ,c.speed=a.speed,c.inertia=a.inertia,c.checkCollisions=a.checkCollisions,c.applyGravity=a.applyGravity,a.ellipsoid&&(c.ellipsoid=BABYLON.Vector3.FromArray(a.ellipsoid)),a.animations)for(var d=0;d<a.animations.length;d++){var e=a.animations[d];c.animations.push(j(e))}return a.autoAnimate&&b.beginAnimation(c,a.autoAnimateFrom,a.autoAnimateTo,a.autoAnimateLoop,1),c.layerMask=a.layerMask&&!isNaN(a.layerMask)?Math.abs(parseInt(a.layerMask)):4294967295,c},m=function(a,b){var c=a.id;return b.getGeometryByID(c)},n=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Box(a.id,b.getEngine(),a.size,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},o=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Sphere(a.id,b.getEngine(),a.segments,a.diameter,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},p=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Cylinder(a.id,b.getEngine(),a.height,a.diameterTop,a.diameterBottom,a.tessellation,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},q=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Torus(a.id,b.getEngine(),a.diameter,a.thickness,a.tessellation,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},r=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Ground(a.id,b.getEngine(),a.width,a.height,a.subdivisions,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},s=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.Plane(a.id,b.getEngine(),a.size,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},t=function(a,b){if(m(a,b))return null;var c=new BABYLON.Geometry.Primitives.TorusKnot(a.id,b.getEngine(),a.radius,a.tube,a.radialSegments,a.tubularSegments,a.p,a.q,a.canBeRegenerated,null);return BABYLON.Tags.AddTagsTo(c,a.tags),b.pushGeometry(c,!0),c},u=function(a,b,c){if(m(a,b))return null;var d=new BABYLON.Geometry(a.id,b);return BABYLON.Tags.AddTagsTo(d,a.tags),a.delayLoadingFile?(d.delayLoadState=BABYLON.Engine.DELAYLOADSTATE_NOTLOADED,d.delayLoadingFile=c+a.delayLoadingFile,d._boundingInfo=new BABYLON.BoundingInfo(BABYLON.Vector3.FromArray(a.boundingBoxMinimum),BABYLON.Vector3.FromArray(a.boundingBoxMaximum)),d._delayInfo=[],a.hasUVs&&d._delayInfo.push(BABYLON.VertexBuffer.UVKind),a.hasUVs2&&d._delayInfo.push(BABYLON.VertexBuffer.UV2Kind),a.hasColors&&d._delayInfo.push(BABYLON.VertexBuffer.ColorKind),a.hasMatricesIndices&&d._delayInfo.push(BABYLON.VertexBuffer.MatricesIndicesKind),a.hasMatricesWeights&&d._delayInfo.push(BABYLON.VertexBuffer.MatricesWeightsKind),d._delayLoadingFunction=x):x(a,d),b.pushGeometry(d,!0),d},v=function(a,b,c){var d=new BABYLON.Mesh(a.name,b);if(d.id=a.id,BABYLON.Tags.AddTagsTo(d,a.tags),d.position=BABYLON.Vector3.FromArray(a.position),a.rotationQuaternion?d.rotationQuaternion=BABYLON.Quaternion.FromArray(a.rotationQuaternion):a.rotation&&(d.rotation=BABYLON.Vector3.FromArray(a.rotation)),d.scaling=BABYLON.Vector3.FromArray(a.scaling),a.localMatrix?d.setPivotMatrix(BABYLON.Matrix.FromArray(a.localMatrix)):a.pivotMatrix&&d.setPivotMatrix(BABYLON.Matrix.FromArray(a.pivotMatrix)),d.setEnabled(a.isEnabled),d.isVisible=a.isVisible,d.infiniteDistance=a.infiniteDistance,d.showBoundingBox=a.showBoundingBox,d.showSubMeshesBoundingBox=a.showSubMeshesBoundingBox,void 0!==a.pickable&&(d.isPickable=a.pickable),d.receiveShadows=a.receiveShadows,d.billboardMode=a.billboardMode,void 0!==a.visibility&&(d.visibility=a.visibility),d.checkCollisions=a.checkCollisions,d._shouldGenerateFlatShading=a.useFlatShading,a.parentId&&(d.parent=b.getLastEntryByID(a.parentId)),a.delayLoadingFile?(d.delayLoadState=BABYLON.Engine.DELAYLOADSTATE_NOTLOADED,d.delayLoadingFile=c+a.delayLoadingFile,d._boundingInfo=new BABYLON.BoundingInfo(BABYLON.Vector3.FromArray(a.boundingBoxMinimum),BABYLON.Vector3.FromArray(a.boundingBoxMaximum)),d._delayInfo=[],a.hasUVs&&d._delayInfo.push(BABYLON.VertexBuffer.UVKind),a.hasUVs2&&d._delayInfo.push(BABYLON.VertexBuffer.UV2Kind),a.hasColors&&d._delayInfo.push(BABYLON.VertexBuffer.ColorKind),a.hasMatricesIndices&&d._delayInfo.push(BABYLON.VertexBuffer.MatricesIndicesKind),a.hasMatricesWeights&&d._delayInfo.push(BABYLON.VertexBuffer.MatricesWeightsKind),d._delayLoadingFunction=y,BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental&&d._checkDelayState()):y(a,d),a.materialId?d.setMaterialByID(a.materialId):d.material=null,a.skeletonId>-1&&(d.skeleton=b.getLastSkeletonByID(a.skeletonId)),a.physicsImpostor)switch(b.isPhysicsEnabled()||b.enablePhysics(),a.physicsImpostor){case 1:d.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor,mass:a.physicsMass,friction:a.physicsFriction,restitution:a.physicsRestitution});break;case 2:d.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor,mass:a.physicsMass,friction:a.physicsFriction,restitution:a.physicsRestitution})}if(a.animations)for(var e=0;e<a.animations.length;e++){var f=a.animations[e];d.animations.push(j(f))}if(a.autoAnimate&&b.beginAnimation(d,a.autoAnimateFrom,a.autoAnimateTo,a.autoAnimateLoop,1),d.layerMask=a.layerMask&&!isNaN(a.layerMask)?Math.abs(parseInt(a.layerMask)):4294967295,a.instances)for(var g=0;g<a.instances.length;g++){var h=a.instances[g],i=d.createInstance(h.name);if(BABYLON.Tags.AddTagsTo(i,h.tags),i.position=BABYLON.Vector3.FromArray(h.position),h.rotationQuaternion?i.rotationQuaternion=BABYLON.Quaternion.FromArray(h.rotationQuaternion):h.rotation&&(i.rotation=BABYLON.Vector3.FromArray(h.rotation)),i.scaling=BABYLON.Vector3.FromArray(h.scaling),i.checkCollisions=d.checkCollisions,a.animations)for(e=0;e<a.animations.length;e++)f=a.animations[e],i.animations.push(j(f))}return d},w=function(a,b,c){b=b instanceof Array?b:[b];for(var d in b)if(a.name===b[d])return c.push(a.id),!0;return a.parentId&&-1!==c.indexOf(a.parentId)?(c.push(a.id),!0):!1},x=function(a,b){var c=new BABYLON.VertexData,d=a.positions;d&&c.set(d,BABYLON.VertexBuffer.PositionKind);var e=a.normals;e&&c.set(e,BABYLON.VertexBuffer.NormalKind);var f=a.uvs;f&&c.set(f,BABYLON.VertexBuffer.UVKind);var g=a.uv2s;g&&c.set(g,BABYLON.VertexBuffer.UV2Kind);var h=a.colors;h&&c.set(h,BABYLON.VertexBuffer.ColorKind);var i=a.matricesIndices;i&&c.set(i,BABYLON.VertexBuffer.MatricesIndicesKind);var j=a.matricesWeights;j&&c.set(j,BABYLON.VertexBuffer.MatricesWeightsKind);var k=a.indices;k&&(c.indices=k),b.setAllVerticesData(c,a.updatable)},y=function(a,b){var c=b.getScene(),d=a.geometryId;if(d){var e=c.getGeometryByID(d);e&&e.applyToMesh(b)}else if(a.positions&&a.normals&&a.indices){if(b.setVerticesData(BABYLON.VertexBuffer.PositionKind,a.positions,!1),b.setVerticesData(BABYLON.VertexBuffer.NormalKind,a.normals,!1),a.uvs&&b.setVerticesData(BABYLON.VertexBuffer.UVKind,a.uvs,!1),a.uvs2&&b.setVerticesData(BABYLON.VertexBuffer.UV2Kind,a.uvs2,!1),a.colors&&b.setVerticesData(BABYLON.VertexBuffer.ColorKind,a.colors,!1),a.matricesIndices)if(a.matricesIndices._isExpanded)delete a.matricesIndices._isExpanded,b.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind,a.matricesIndices,!1);else{for(var f=[],g=0;g<a.matricesIndices.length;g++){var h=a.matricesIndices[g];f.push(255&h),f.push((65280&h)>>8),f.push((16711680&h)>>16),f.push(h>>24)}b.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind,f,!1)}a.matricesWeights&&b.setVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind,a.matricesWeights,!1),b.setIndices(a.indices)}if(a.subMeshes){b.subMeshes=[];for(var i=0;i<a.subMeshes.length;i++){var j=a.subMeshes[i];new BABYLON.SubMesh(j.materialIndex,j.verticesStart,j.verticesCount,j.indexStart,j.indexCount,b)}}b.computeWorldMatrix(!0),b._shouldGenerateFlatShading&&(b.convertToFlatShadedMesh(),delete b._shouldGenerateFlatShading),c._selectionOctree&&c._selectionOctree.addMesh(b)};BABYLON.SceneLoader.RegisterPlugin({extensions:".babylon",importMesh:function(a,b,d,g,i,j,k){for(var l=JSON.parse(d),m=[],n=[],o=[],p=0;p<l.meshes.length;p++){var q=l.meshes[p];if(!a||w(q,a,o)){if(a instanceof Array&&delete a[a.indexOf(q.name)],q.materialId){var r=-1!==n.indexOf(q.materialId);if(!r)for(var s=0;s<l.multiMaterials.length;s++){var t=l.multiMaterials[s];if(t.id==q.materialId){for(var u=0;u<t.materials.length;u++){var x=t.materials[u];n.push(x),e(x,l,b,g)}n.push(t.id),f(t,b),r=!0;break}}r||(n.push(q.materialId),e(q.materialId,l,b,g))}if(q.skeletonId>-1&&b.skeletons){var y=m.indexOf(q.skeletonId)>-1;if(!y)for(var z=0;z<l.skeletons.length;z++){var A=l.skeletons[z];A.id===q.skeletonId&&(k.push(c(A,b)),m.push(A.id))}}var B=v(q,b,g);i.push(B)}}if(l.particleSystems)for(var p=0;p<l.particleSystems.length;p++){var C=l.particleSystems[p];-1!==o.indexOf(C.emitterId)&&j.push(h(C,b,g))}return!0},load:function(a,b,e){var j=JSON.parse(b);a.useDelayedTextureLoading=j.useDelayedTextureLoading&&!BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental,a.autoClear=j.autoClear,a.clearColor=BABYLON.Color3.FromArray(j.clearColor),a.ambientColor=BABYLON.Color3.FromArray(j.ambientColor),a.gravity=BABYLON.Vector3.FromArray(j.gravity),j.fogMode&&0!==j.fogMode&&(a.fogMode=j.fogMode,a.fogColor=BABYLON.Color3.FromArray(j.fogColor),a.fogStart=j.fogStart,a.fogEnd=j.fogEnd,a.fogDensity=j.fogDensity);for(var m=0;m<j.lights.length;m++){var w=j.lights[m];k(w,a)}for(var m=0;m<j.cameras.length;m++){var x=j.cameras[m];l(x,a)}if(j.activeCameraID&&a.setActiveCameraByID(j.activeCameraID),j.materials)for(var m=0;m<j.materials.length;m++){var y=j.materials[m];
d(y,a,e)}if(j.multiMaterials)for(var m=0;m<j.multiMaterials.length;m++){var z=j.multiMaterials[m];f(z,a)}if(j.skeletons)for(var m=0;m<j.skeletons.length;m++){var A=j.skeletons[m];c(A,a)}var B=j.geometries;if(B){var C=B.boxes;if(C)for(var m=0;m<C.length;m++){var D=C[m];n(D,a)}var E=B.spheres;if(E)for(var m=0;m<E.length;m++){var F=E[m];o(F,a)}var G=B.cylinders;if(G)for(var m=0;m<G.length;m++){var H=G[m];p(H,a)}var I=B.toruses;if(I)for(var m=0;m<I.length;m++){var J=I[m];q(J,a)}var K=B.grounds;if(K)for(var m=0;m<K.length;m++){var L=K[m];r(L,a)}var M=B.planes;if(M)for(var m=0;m<M.length;m++){var N=M[m];s(N,a)}var O=B.torusKnots;if(O)for(var m=0;m<O.length;m++){var P=O[m];t(P,a)}var Q=B.vertexData;if(Q)for(var m=0;m<Q.length;m++){var R=Q[m];u(R,a,e)}}for(var m=0;m<j.meshes.length;m++){var S=j.meshes[m];v(S,a,e)}for(var m=0;m<a.cameras.length;m++){var T=a.cameras[m];T._waitingParentId&&(T.parent=a.getLastEntryByID(T._waitingParentId),delete T._waitingParentId),T._waitingLockedTargetId&&(T.lockedTarget=a.getLastEntryByID(T._waitingLockedTargetId),delete T._waitingLockedTargetId)}if(j.particleSystems)for(var m=0;m<j.particleSystems.length;m++){var U=j.particleSystems[m];h(U,a,e)}if(j.lensFlareSystems)for(var m=0;m<j.lensFlareSystems.length;m++){var V=j.lensFlareSystems[m];g(V,a,e)}if(j.shadowGenerators)for(var m=0;m<j.shadowGenerators.length;m++){var W=j.shadowGenerators[m];i(W,a)}return!0}})}();var BABYLON;!function(a){var b=0,c=function(){function b(a,b,c){this.pos=a,this.normal=b,this.uv=c}return b.prototype.clone=function(){return new b(this.pos.clone(),this.normal.clone(),this.uv.clone())},b.prototype.flip=function(){this.normal=this.normal.scale(-1)},b.prototype.interpolate=function(c,d){return new b(a.Vector3.Lerp(this.pos,c.pos,d),a.Vector3.Lerp(this.normal,c.normal,d),a.Vector2.Lerp(this.uv,c.uv,d))},b}(),d=function(){function b(a,b){this.normal=a,this.w=b}return b.FromPoints=function(c,d,e){var f=e.subtract(c),g=d.subtract(c);if(0===f.lengthSquared()||0===g.lengthSquared())return null;var h=a.Vector3.Normalize(a.Vector3.Cross(f,g));return new b(h,a.Vector3.Dot(h,c))},b.prototype.clone=function(){return new b(this.normal.clone(),this.w)},b.prototype.flip=function(){this.normal.scaleInPlace(-1),this.w=-this.w},b.prototype.splitPolygon=function(c,d,f,g,h){for(var i=0,j=1,k=2,l=3,m=0,n=[],o=0;o<c.vertices.length;o++){var p=a.Vector3.Dot(this.normal,c.vertices[o].pos)-this.w,q=p<-b.EPSILON?k:p>b.EPSILON?j:i;m|=q,n.push(q)}switch(m){case i:(a.Vector3.Dot(this.normal,c.plane.normal)>0?d:f).push(c);break;case j:g.push(c);break;case k:h.push(c);break;case l:var r=[],s=[];for(o=0;o<c.vertices.length;o++){var t=(o+1)%c.vertices.length,u=n[o],v=n[t],w=c.vertices[o],x=c.vertices[t];if(u!=k&&r.push(w),u!=j&&s.push(u!=k?w.clone():w),(u|v)==l){p=(this.w-a.Vector3.Dot(this.normal,w.pos))/a.Vector3.Dot(this.normal,x.pos.subtract(w.pos));var y=w.interpolate(x,p);r.push(y),s.push(y.clone())}}if(r.length>=3){var z=new e(r,c.shared);z.plane&&g.push(z)}s.length>=3&&(z=new e(s,c.shared),z.plane&&h.push(z))}},b.EPSILON=1e-5,b}(),e=function(){function a(a,b){this.vertices=a,this.shared=b,this.plane=d.FromPoints(a[0].pos,a[1].pos,a[2].pos)}return a.prototype.clone=function(){var b=this.vertices.map(function(a){return a.clone()});return new a(b,this.shared)},a.prototype.flip=function(){this.vertices.reverse().map(function(a){a.flip()}),this.plane.flip()},a}(),f=function(){function a(a){this.plane=null,this.front=null,this.back=null,this.polygons=[],a&&this.build(a)}return a.prototype.clone=function(){var b=new a;return b.plane=this.plane&&this.plane.clone(),b.front=this.front&&this.front.clone(),b.back=this.back&&this.back.clone(),b.polygons=this.polygons.map(function(a){return a.clone()}),b},a.prototype.invert=function(){for(var a=0;a<this.polygons.length;a++)this.polygons[a].flip();this.plane&&this.plane.flip(),this.front&&this.front.invert(),this.back&&this.back.invert();var b=this.front;this.front=this.back,this.back=b},a.prototype.clipPolygons=function(a){if(!this.plane)return a.slice();for(var b=[],c=[],d=0;d<a.length;d++)this.plane.splitPolygon(a[d],b,c,b,c);return this.front&&(b=this.front.clipPolygons(b)),c=this.back?this.back.clipPolygons(c):[],b.concat(c)},a.prototype.clipTo=function(a){this.polygons=a.clipPolygons(this.polygons),this.front&&this.front.clipTo(a),this.back&&this.back.clipTo(a)},a.prototype.allPolygons=function(){var a=this.polygons.slice();return this.front&&(a=a.concat(this.front.allPolygons())),this.back&&(a=a.concat(this.back.allPolygons())),a},a.prototype.build=function(b){if(b.length){this.plane||(this.plane=b[0].plane.clone());for(var c=[],d=[],e=0;e<b.length;e++)this.plane.splitPolygon(b[e],this.polygons,this.polygons,c,d);c.length&&(this.front||(this.front=new a),this.front.build(c)),d.length&&(this.back||(this.back=new a),this.back.build(d))}},a}(),g=function(){function d(){this.polygons=new Array}return d.FromMesh=function(f){var g,h,i,j,k,l,m=[];if(!(f instanceof a.Mesh))throw"BABYLON.CSG:Wrong Mesh type,must be BABYLON.Mesh";f.computeWorldMatrix(!0);for(var n=f.getWorldMatrix(),o=f.position.clone(),p=f.rotation.clone(),q=f.scaling.clone(),r=f.getIndices(),s=f.getVerticesData(a.VertexBuffer.PositionKind),t=f.getVerticesData(a.VertexBuffer.NormalKind),u=f.getVerticesData(a.VertexBuffer.UVKind),v=f.subMeshes,w=0,x=v.length;x>w;w++)for(var y=v[w].indexStart,z=v[w].indexCount+v[w].indexStart;z>y;y+=3){l=[];for(var A=0;3>A;A++)h=new a.Vector3(t[3*r[y+A]],t[3*r[y+A]+1],t[3*r[y+A]+2]),i=new a.Vector2(u[2*r[y+A]],u[2*r[y+A]+1]),j=new a.Vector3(s[3*r[y+A]],s[3*r[y+A]+1],s[3*r[y+A]+2]),a.Vector3.TransformCoordinatesToRef(j,n,j),a.Vector3.TransformNormalToRef(h,n,h),g=new c(j,h,i),l.push(g);k=new e(l,{subMeshId:w,meshId:b,materialIndex:v[w].materialIndex}),k.plane&&m.push(k)}var B=d.FromPolygons(m);return B.matrix=n,B.position=o,B.rotation=p,B.scaling=q,b++,B},d.FromPolygons=function(b){var c=new a.CSG;return c.polygons=b,c},d.prototype.clone=function(){var b=new a.CSG;return b.polygons=this.polygons.map(function(a){return a.clone()}),b.copyTransformAttributes(this),b},d.prototype.toPolygons=function(){return this.polygons},d.prototype.union=function(a){var b=new f(this.clone().polygons),c=new f(a.clone().polygons);return b.clipTo(c),c.clipTo(b),c.invert(),c.clipTo(b),c.invert(),b.build(c.allPolygons()),d.FromPolygons(b.allPolygons()).copyTransformAttributes(this)},d.prototype.unionInPlace=function(a){var b=new f(this.polygons),c=new f(a.polygons);b.clipTo(c),c.clipTo(b),c.invert(),c.clipTo(b),c.invert(),b.build(c.allPolygons()),this.polygons=b.allPolygons()},d.prototype.subtract=function(a){var b=new f(this.clone().polygons),c=new f(a.clone().polygons);return b.invert(),b.clipTo(c),c.clipTo(b),c.invert(),c.clipTo(b),c.invert(),b.build(c.allPolygons()),b.invert(),d.FromPolygons(b.allPolygons()).copyTransformAttributes(this)},d.prototype.subtractInPlace=function(a){var b=new f(this.polygons),c=new f(a.polygons);b.invert(),b.clipTo(c),c.clipTo(b),c.invert(),c.clipTo(b),c.invert(),b.build(c.allPolygons()),b.invert(),this.polygons=b.allPolygons()},d.prototype.intersect=function(a){var b=new f(this.clone().polygons),c=new f(a.clone().polygons);return b.invert(),c.clipTo(b),c.invert(),b.clipTo(c),c.clipTo(b),b.build(c.allPolygons()),b.invert(),d.FromPolygons(b.allPolygons()).copyTransformAttributes(this)},d.prototype.intersectInPlace=function(a){var b=new f(this.polygons),c=new f(a.polygons);b.invert(),c.clipTo(b),c.invert(),b.clipTo(c),c.clipTo(b),b.build(c.allPolygons()),b.invert(),this.polygons=b.allPolygons()},d.prototype.inverse=function(){var a=this.clone();return a.inverseInPlace(),a},d.prototype.inverseInPlace=function(){this.polygons.map(function(a){a.flip()})},d.prototype.copyTransformAttributes=function(a){return this.matrix=a.matrix,this.position=a.position,this.rotation=a.rotation,this.scaling=a.scaling,this},d.prototype.buildMeshGeometry=function(b,c,d){var e=this.matrix.clone();e.invert();var f,g,h,i=new a.Mesh(b,c),j=[],k=[],l=[],m=[],n=a.Vector3.Zero(),o=a.Vector3.Zero(),p=a.Vector2.Zero(),q=this.polygons,r=[0,0,0],s={},t=0,u={};d&&q.sort(function(a,b){return a.shared.meshId===b.shared.meshId?a.shared.subMeshId-b.shared.subMeshId:a.shared.meshId-b.shared.meshId});for(var v=0,w=q.length;w>v;v++){f=q[v],u[f.shared.meshId]||(u[f.shared.meshId]={}),u[f.shared.meshId][f.shared.subMeshId]||(u[f.shared.meshId][f.shared.subMeshId]={indexStart:+1/0,indexEnd:-1/0,materialIndex:f.shared.materialIndex}),h=u[f.shared.meshId][f.shared.subMeshId];for(var x=2,y=f.vertices.length;y>x;x++){r[0]=0,r[1]=x-1,r[2]=x;for(var z=0;3>z;z++)n.copyFrom(f.vertices[r[z]].pos),o.copyFrom(f.vertices[r[z]].normal),p.copyFrom(f.vertices[r[z]].uv),a.Vector3.TransformCoordinatesToRef(n,e,n),a.Vector3.TransformNormalToRef(o,e,o),g=s[n.x+","+n.y+","+n.z],("undefined"==typeof g||l[3*g]!==o.x||l[3*g+1]!==o.y||l[3*g+2]!==o.z||m[2*g]!==p.x||m[2*g+1]!==p.y)&&(j.push(n.x,n.y,n.z),m.push(p.x,p.y),l.push(o.x,o.y,o.z),g=s[n.x+","+n.y+","+n.z]=j.length/3-1),k.push(g),h.indexStart=Math.min(t,h.indexStart),h.indexEnd=Math.max(t,h.indexEnd),t++}}if(i.setVerticesData(a.VertexBuffer.PositionKind,j),i.setVerticesData(a.VertexBuffer.NormalKind,l),i.setVerticesData(a.VertexBuffer.UVKind,m),i.setIndices(k),d){var A,B=0;i.subMeshes.length=0;for(var C in u){A=-1;for(var D in u[C])h=u[C][D],a.SubMesh.CreateFromIndices(h.materialIndex+B,h.indexStart,h.indexEnd-h.indexStart+1,i),A=Math.max(h.materialIndex,A);B+=++A}}return i},d.prototype.toMesh=function(a,b,c,d){var e=this.buildMeshGeometry(a,c,d);return e.material=b,e.position.copyFrom(this.position),e.rotation.copyFrom(this.rotation),e.scaling.copyFrom(this.scaling),e.computeWorldMatrix(!0),e},d}();a.CSG=g}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f){var g=this;b.call(this,c,"oculusDistortionCorrection",["LensCenter","Scale","ScaleIn","HmdWarpParam"],null,f.PostProcessScaleFactor,d,a.Texture.BILINEAR_SAMPLINGMODE,null,null),this._isRightEye=e,this._distortionFactors=f.DistortionK,this._postProcessScaleFactor=f.PostProcessScaleFactor,this._lensCenterOffset=f.LensCenterOffset,this.onSizeChanged=function(){g.aspectRatio=.5*g.width/g.height,g._scaleIn=new a.Vector2(2,2/g.aspectRatio),g._scaleFactor=new a.Vector2(.5*(1/g._postProcessScaleFactor),.5*(1/g._postProcessScaleFactor)*g.aspectRatio),g._lensCenter=new a.Vector2(g._isRightEye?.5-.5*g._lensCenterOffset:.5+.5*g._lensCenterOffset,.5)},this.onApply=function(a){a.setFloat2("LensCenter",g._lensCenter.x,g._lensCenter.y),a.setFloat2("Scale",g._scaleFactor.x,g._scaleFactor.y),a.setFloat2("ScaleIn",g._scaleIn.x,g._scaleIn.y),a.setFloat4("HmdWarpParam",g._distortionFactors[0],g._distortionFactors[1],g._distortionFactors[2],g._distortionFactors[3])}}return __extends(c,b),c}(a.PostProcess);a.OculusDistortionCorrectionPostProcess=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){!function(a){a[a.X=0]="X",a[a.Y=1]="Y",a[a.Z=2]="Z"}(a.JoystickAxis||(a.JoystickAxis={}));var b=(a.JoystickAxis,function(){function b(c){var d=this;this._leftJoystick=c?!0:!1,this._joystickIndex=b._globalJoystickIndex,b._globalJoystickIndex++,this._axisTargetedByLeftAndRight=0,this._axisTargetedByUpAndDown=1,this.reverseLeftRight=!1,this.reverseUpDown=!1,this._touches=new a.VirtualJoystick.Collection,this.deltaPosition=a.Vector3.Zero(),this._joystickSensibility=25,this._inversedSensibility=1/(this._joystickSensibility/1e3),this._rotationSpeed=25,this._inverseRotationSpeed=1/(this._rotationSpeed/1e3),this._rotateOnAxisRelativeToMesh=!1,b.vjCanvas||(window.addEventListener("resize",function(){b.vjCanvasWidth=window.innerWidth,b.vjCanvasHeight=window.innerHeight,b.vjCanvas.width=b.vjCanvasWidth,b.vjCanvas.height=b.vjCanvasHeight,b.halfWidth=b.vjCanvasWidth/2,b.halfHeight=b.vjCanvasHeight/2},!1),b.vjCanvas=document.createElement("canvas"),b.vjCanvasWidth=window.innerWidth,b.vjCanvasHeight=window.innerHeight,b.vjCanvas.width=window.innerWidth,b.vjCanvas.height=window.innerHeight,b.vjCanvas.style.width="100%",b.vjCanvas.style.height="100%",b.vjCanvas.style.position="absolute",b.vjCanvas.style.backgroundColor="transparent",b.vjCanvas.style.top="0px",b.vjCanvas.style.left="0px",b.vjCanvas.style.zIndex="5",b.vjCanvas.style.msTouchAction="none",b.vjCanvasContext=b.vjCanvas.getContext("2d"),b.vjCanvasContext.strokeStyle="#ffffff",b.vjCanvasContext.lineWidth=2,document.body.appendChild(b.vjCanvas)),b.halfWidth=b.vjCanvas.width/2,b.halfHeight=b.vjCanvas.height/2,this.pressed=!1,this._joystickColor="cyan",this._joystickPointerID=-1,this._joystickPointerPos=new a.Vector2(0,0),this._joystickPointerStartPos=new a.Vector2(0,0),this._deltaJoystickVector=new a.Vector2(0,0),b.vjCanvas.addEventListener("pointerdown",function(a){d._onPointerDown(a)},!1),b.vjCanvas.addEventListener("pointermove",function(a){d._onPointerMove(a)},!1),b.vjCanvas.addEventListener("pointerup",function(a){d._onPointerUp(a)},!1),b.vjCanvas.addEventListener("pointerout",function(a){d._onPointerUp(a)},!1),b.vjCanvas.addEventListener("contextmenu",function(a){a.preventDefault()},!1),requestAnimationFrame(function(){d._drawVirtualJoystick()})}return b.prototype.setJoystickSensibility=function(a){this._joystickSensibility=a,this._inversedSensibility=1/(this._joystickSensibility/1e3)},b.prototype._onPointerDown=function(a){var c;a.preventDefault(),c=this._leftJoystick===!0?a.clientX<b.halfWidth:a.clientX>b.halfWidth,c&&this._joystickPointerID<0?(this._joystickPointerID=a.pointerId,this._joystickPointerStartPos.x=a.clientX,this._joystickPointerStartPos.y=a.clientY,this._joystickPointerPos=this._joystickPointerStartPos.clone(),this._deltaJoystickVector.x=0,this._deltaJoystickVector.y=0,this.pressed=!0,this._touches.add(a.pointerId.toString(),a)):b._globalJoystickIndex<2&&this._action&&(this._action(),this._touches.add(a.pointerId.toString(),a))},b.prototype._onPointerMove=function(a){if(this._joystickPointerID==a.pointerId){this._joystickPointerPos.x=a.clientX,this._joystickPointerPos.y=a.clientY,this._deltaJoystickVector=this._joystickPointerPos.clone(),this._deltaJoystickVector=this._deltaJoystickVector.subtract(this._joystickPointerStartPos);var b=this.reverseLeftRight?-1:1,c=b*this._deltaJoystickVector.x/this._inversedSensibility;switch(this._axisTargetedByLeftAndRight){case 0:this.deltaPosition.x=Math.min(1,Math.max(-1,c));break;case 1:this.deltaPosition.y=Math.min(1,Math.max(-1,c));break;case 2:this.deltaPosition.z=Math.min(1,Math.max(-1,c))}var d=this.reverseUpDown?1:-1,e=d*this._deltaJoystickVector.y/this._inversedSensibility;switch(this._axisTargetedByUpAndDown){case 0:this.deltaPosition.x=Math.min(1,Math.max(-1,e));break;case 1:this.deltaPosition.y=Math.min(1,Math.max(-1,e));break;case 2:this.deltaPosition.z=Math.min(1,Math.max(-1,e))}}else this._touches.item(a.pointerId.toString())&&(this._touches.item(a.pointerId.toString()).x=a.clientX,this._touches.item(a.pointerId.toString()).y=a.clientY)},b.prototype._onPointerUp=function(a){this._clearCanvas(),this._joystickPointerID==a.pointerId&&(this._joystickPointerID=-1,this.pressed=!1),this._deltaJoystickVector.x=0,this._deltaJoystickVector.y=0,this._touches.remove(a.pointerId.toString())},b.prototype.setJoystickColor=function(a){this._joystickColor=a},b.prototype.setActionOnTouch=function(a){this._action=a},b.prototype.setAxisForLeftRight=function(a){switch(a){case 0:case 1:case 2:this._axisTargetedByLeftAndRight=a;break;default:this._axisTargetedByLeftAndRight=0}},b.prototype.setAxisForUpDown=function(a){switch(a){case 0:case 1:case 2:this._axisTargetedByUpAndDown=a;break;default:this._axisTargetedByUpAndDown=1}},b.prototype._clearCanvas=function(){this._leftJoystick?b.vjCanvasContext.clearRect(0,0,b.vjCanvasWidth/2,b.vjCanvasHeight):b.vjCanvasContext.clearRect(b.vjCanvasWidth/2,0,b.vjCanvasWidth,b.vjCanvasHeight)},b.prototype._drawVirtualJoystick=function(){var a=this;this.pressed&&(this._clearCanvas(),this._touches.forEach(function(c){c.pointerId===a._joystickPointerID?(b.vjCanvasContext.beginPath(),b.vjCanvasContext.strokeStyle=a._joystickColor,b.vjCanvasContext.lineWidth=6,b.vjCanvasContext.arc(a._joystickPointerStartPos.x,a._joystickPointerStartPos.y,40,0,2*Math.PI,!0),b.vjCanvasContext.stroke(),b.vjCanvasContext.beginPath(),b.vjCanvasContext.strokeStyle=a._joystickColor,b.vjCanvasContext.lineWidth=2,b.vjCanvasContext.arc(a._joystickPointerStartPos.x,a._joystickPointerStartPos.y,60,0,2*Math.PI,!0),b.vjCanvasContext.stroke(),b.vjCanvasContext.beginPath(),b.vjCanvasContext.strokeStyle=a._joystickColor,b.vjCanvasContext.arc(a._joystickPointerPos.x,a._joystickPointerPos.y,40,0,2*Math.PI,!0),b.vjCanvasContext.stroke()):(b.vjCanvasContext.beginPath(),b.vjCanvasContext.fillStyle="white",b.vjCanvasContext.beginPath(),b.vjCanvasContext.strokeStyle="red",b.vjCanvasContext.lineWidth=6,b.vjCanvasContext.arc(c.x,c.y,40,0,2*Math.PI,!0),b.vjCanvasContext.stroke())})),requestAnimationFrame(function(){a._drawVirtualJoystick()})},b.prototype.releaseCanvas=function(){b.vjCanvas&&(document.body.removeChild(b.vjCanvas),b.vjCanvas=null)},b._globalJoystickIndex=0,b}());a.VirtualJoystick=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){!function(a){var b=function(){function a(){this._count=0,this._collection=new Array}return a.prototype.Count=function(){return this._count},a.prototype.add=function(a,b){return void 0!=this._collection[a]?void 0:(this._collection[a]=b,++this._count)},a.prototype.remove=function(a){return void 0==this._collection[a]?void 0:(delete this._collection[a],--this._count)},a.prototype.item=function(a){return this._collection[a]},a.prototype.forEach=function(a){var b;for(b in this._collection)this._collection.hasOwnProperty(b)&&a(this._collection[b])},a}();a.Collection=b}(a.VirtualJoystick||(a.VirtualJoystick={}));a.VirtualJoystick}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){BABYLON.OculusOrientedCamera=function(a,b,c,d,e,f){b=b?new BABYLON.Vector3(b.x,b.y,b.z):null,BABYLON.Camera.call(this,a,b,c),this._referenceDirection=new BABYLON.Vector3(0,0,1),this._referenceUp=new BABYLON.Vector3(0,1,0),this._actualDirection=new BABYLON.Vector3(1,0,0),this._actualUp=new BABYLON.Vector3(0,1,0),this._currentTargetPoint=new BABYLON.Vector3(0,0,0),this._currentOrientation=Object.create(f||{yaw:0,pitch:0,roll:0}),this._currentViewMatrix=new BABYLON.Matrix,this._currentOrientationMatrix=new BABYLON.Matrix,this._currentInvertOrientationMatrix=new BABYLON.Matrix,this._tempMatrix=new BABYLON.Matrix,this.viewport=d?new BABYLON.Viewport(0,0,.5,1):new BABYLON.Viewport(.5,0,.5,1),this._aspectRatioAspectRatio=e.HResolution/(2*e.VResolution),this._aspectRatioFov=2*Math.atan(e.PostProcessScaleFactor*e.VScreenSize/(2*e.EyeToScreenDistance));var g=e.HScreenSize/4-e.LensSeparationDistance/2,h=4*g/e.HScreenSize;this._hMatrix=BABYLON.Matrix.Translation(d?h:-h,0,0),this._projectionMatrix=new BABYLON.Matrix,this._preViewMatrix=BABYLON.Matrix.Translation(d?.5*e.InterpupillaryDistance:-.5*e.InterpupillaryDistance,0,0),new BABYLON.OculusDistortionCorrectionPostProcess("Oculus Distortion",this,!d,e),this.resetProjectionMatrix(),this.resetViewMatrix()},BABYLON.OculusOrientedCamera.BuildOculusStereoCamera=function(a,b,c,d,e,f,g,h,i,j,k){var l=a.getEngine().getRenderingCanvas();e=e||BABYLON.Vector3.Zero(0,0,0),f=f||{yaw:0,pitch:0,roll:0},k=k||BABYLON.OculusController.CameraSettings_OculusRiftDevKit2013_Metric;var m=new BABYLON.OculusOrientedCamera(b+"_left",e,a,!0,k,f);m.minZ=c,m.maxZ=d,g&&new BABYLON.FxaaPostProcess("fxaa_left",1,m);var n=new BABYLON.OculusOrientedCamera(b+"_right",e.clone(),a,!1,k,f);n.minZ=c,n.maxZ=d,g&&new BABYLON.FxaaPostProcess("fxaa_right",1,n),a.activeCameras=[],a.activeCameras.push(m),a.activeCameras.push(n),m.attachControl(l),n.attachControl(l);var o=new BABYLON.InputControllerMultiTarget([m,n]),p=new BABYLON.OculusController(a,o),q=o;if(!i){var r=new BABYLON.InputCollisionFilter(a,o,j);q=r}if(!h){{var s=new BABYLON.GlobalAxisFactorsFilter(a,q,1,0,1);new BABYLON.GravityInputController(a,q)}q=s}var t=new BABYLON.KeyboardMoveController(a,q);t.attachToCanvas(l);var u={leftCamera:m,rightCamera:n,intermediateControllerTarget:o,oculusController:p,keyboardController:t};return u.dispose=function(){this.leftCamera.detachControl(l),this.rightCamera.detachControl(l),this.leftCamera.dispose(),this.rightCamera.dispose(),this.oculusController.dispose(),this.keyboardController.detachFromCanvas(l),this.keyboardController.dispose()}.bind(u),u},BABYLON.OculusOrientedCamera.prototype=Object.create(BABYLON.Camera.prototype),BABYLON.OculusOrientedCamera.prototype.resetViewMatrix=function(){return BABYLON.Matrix.RotationYawPitchRollToRef(this._currentOrientation.yaw,this._currentOrientation.pitch,-this._currentOrientation.roll,this._currentOrientationMatrix),this._currentOrientationMatrix.invertToRef(this._currentInvertOrientationMatrix),BABYLON.Vector3.TransformNormalToRef(this._referenceDirection,this._currentOrientationMatrix,this._actualDirection),BABYLON.Vector3.TransformNormalToRef(this._referenceUp,this._currentOrientationMatrix,this._actualUp),BABYLON.Vector3.FromFloatsToRef(this.position.x+this._actualDirection.x,this.position.y+this._actualDirection.y,this.position.z+this._actualDirection.z,this._currentTargetPoint),BABYLON.Matrix.LookAtLHToRef(this.position,this._currentTargetPoint,this._actualUp,this._tempMatrix),this._tempMatrix.multiplyToRef(this._preViewMatrix,this._currentViewMatrix),this._currentViewMatrix},BABYLON.OculusOrientedCamera.prototype.getViewMatrix=function(){return this._currentViewMatrix},BABYLON.OculusOrientedCamera.prototype._update=function(){if(this.controllers)for(var a=0;a<this.controllers.length;++a)this.controllers[a].update()},BABYLON.OculusOrientedCamera.prototype.getOrientationMatrix=function(){return this._currentOrientationMatrix},BABYLON.OculusOrientedCamera.prototype.getInvertOrientationMatrix=function(){return this._currentInvertOrientationMatrix},BABYLON.OculusOrientedCamera.prototype.resetProjectionMatrix=function(){return BABYLON.Matrix.PerspectiveFovLHToRef(this._aspectRatioFov,this._aspectRatioAspectRatio,this.minZ,this.maxZ,this._tempMatrix),this._tempMatrix.multiplyToRef(this._hMatrix,this._projectionMatrix),this._projectionMatrix},BABYLON.OculusOrientedCamera.prototype.getProjectionMatrix=function(){return this._projectionMatrix},BABYLON.OculusOrientedCamera.prototype.getOrientation=function(){return this._currentOrientation},BABYLON.OculusOrientedCamera.prototype.getPosition=function(){return this.position},BABYLON.OculusOrientedCamera.prototype.moveRelative=function(a){this._tempMoveVector||(this._tempMoveVector=new BABYLON.Vector3(0,0,0)),BABYLON.Vector3.TransformNormalToRef(a,this._currentOrientationMatrix,this._tempMoveVector),this.position.addInPlace(this._tempMoveVector),this.resetViewMatrix()},BABYLON.OculusOrientedCamera.prototype.rotateRelative=function(a){this._currentOrientation.yaw+=a.yaw,this._currentOrientation.pitch+=a.pitch,this._currentOrientation.roll+=a.roll,this.resetViewMatrix()}}();var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e){b.call(this,c,d,e),this._leftjoystick=new a.VirtualJoystick(!0),this._leftjoystick.setAxisForUpDown(2),this._leftjoystick.setAxisForLeftRight(0),this._leftjoystick.setJoystickSensibility(.15),this._rightjoystick=new a.VirtualJoystick(!1),this._rightjoystick.setAxisForUpDown(0),this._rightjoystick.setAxisForLeftRight(1),this._rightjoystick.reverseUpDown=!0,this._rightjoystick.setJoystickSensibility(.05),this._rightjoystick.setJoystickColor("yellow")}return __extends(c,b),c.prototype._checkInputs=function(){var b=a.Matrix.RotationYawPitchRoll(this.rotation.y,this.rotation.x,0),c=a.Vector3.TransformCoordinates(this._leftjoystick.deltaPosition,b);this.cameraDirection=this.cameraDirection.add(c),this.cameraRotation=this.cameraRotation.add(this._rightjoystick.deltaPosition),this._leftjoystick.pressed||(this._leftjoystick.deltaPosition=this._leftjoystick.deltaPosition.scale(.9)),this._rightjoystick.pressed||(this._rightjoystick.deltaPosition=this._rightjoystick.deltaPosition.scale(.9))},c.prototype.dispose=function(){this._leftjoystick.releaseCanvas()},c}(a.FreeCamera);a.VirtualJoysticksCamera=b}(BABYLON||(BABYLON={}));var BABYLON=BABYLON||{};!function(){BABYLON.KeyboardMoveController=function(a,b){BABYLON.InputController.call(this,a,b),this._keys=[],this.keysUp=[38],this.keysDown=[40],this.keysLeft=[37],this.keysRight=[39],this._currentSpeed=new BABYLON.Vector3(0,0,0),this._lastFrameSpeed=new BABYLON.Vector3(0,0,0),this._currentAcceleration=new BABYLON.Vector3(0,0,0),this._tempSpeed=new BABYLON.Vector3(0,0,0),this._tempSpeed2=new BABYLON.Vector3(0,0,0),this.maxAbsoluteSpeed=2,this.maxAbsoluteAcceleration=5,this._targetSpeed=new BABYLON.Vector3(0,0,0)},BABYLON.KeyboardMoveController.prototype=Object.create(BABYLON.InputController.prototype),BABYLON.KeyboardMoveController.prototype.attachToCanvas=function(a){var b=this;this._canvas=a,this._onKeyDown=function(a){if(-1!==b.keysUp.indexOf(a.keyCode)||-1!==b.keysDown.indexOf(a.keyCode)||-1!==b.keysLeft.indexOf(a.keyCode)||-1!==b.keysRight.indexOf(a.keyCode)){var c=b._keys.indexOf(a.keyCode);-1===c&&b._keys.push(a.keyCode)}},this._onKeyUp=function(a){if(-1!==b.keysUp.indexOf(a.keyCode)||-1!==b.keysDown.indexOf(a.keyCode)||-1!==b.keysLeft.indexOf(a.keyCode)||-1!==b.keysRight.indexOf(a.keyCode)){var c=b._keys.indexOf(a.keyCode);c>=0&&b._keys.splice(c,1)}},this._onLostFocus=function(){b._keys=[]},window.addEventListener("keydown",this._onKeyDown,!1),window.addEventListener("keyup",this._onKeyUp,!1),window.addEventListener("blur",this._onLostFocus,!1)},BABYLON.KeyboardMoveController.prototype.detachFromCanvas=function(){window.removeEventListener("keydown",this._onKeyDown,!1),window.removeEventListener("keyup",this._onKeyUp,!1),window.removeEventListener("blur",this._onLostFocus,!1)},BABYLON.KeyboardMoveController.prototype.updateCurrentSpeed=function(){if(this._lastFrameSpeed.x=this._currentSpeed.x,this._lastFrameSpeed.y=this._currentSpeed.y,this._lastFrameSpeed.z=this._currentSpeed.z,this._currentSpeed.equals(this._targetSpeed))return this._currentAcceleration.x=0,this._currentAcceleration.y=0,void(this._currentAcceleration.z=0);var a=BABYLON.Tools.GetDeltaTime()/1e3,b=this._tempSpeed;this._targetSpeed.subtractToRef(this._lastFrameSpeed,b);var c=b.length()/a;c<this.maxAbsoluteAcceleration?(this._currentSpeed.x=this._targetSpeed.x,this._currentSpeed.y=this._targetSpeed.y,this._currentSpeed.z=this._targetSpeed.z,b.normalize(),b.scaleToRef(c,this._currentAcceleration)):(b.normalize(),b.scaleToRef(this.maxAbsoluteAcceleration,this._currentAcceleration),b.scaleInPlace(this.maxAbsoluteAcceleration*a),this._currentSpeed.addInPlace(b))},BABYLON.KeyboardMoveController.prototype.update=function(){this._targetSpeed.x=0,this._targetSpeed.y=0,this._targetSpeed.z=0;for(var a=0;a<this._keys.length;a++){var b=this._keys[a];-1!==this.keysLeft.indexOf(b)?this._targetSpeed.x-=1:-1!==this.keysUp.indexOf(b)?this._targetSpeed.z+=1:-1!==this.keysRight.indexOf(b)?this._targetSpeed.x+=1:-1!==this.keysDown.indexOf(b)&&(this._targetSpeed.z-=1)}if((0!=this._targetSpeed.x||0!=this._targetSpeed.z)&&(this._targetSpeed.normalize(),this._targetSpeed.scaleInPlace(this.maxAbsoluteSpeed)),this.updateCurrentSpeed(),0!=this._lastFrameSpeed.x||0!=this._lastFrameSpeed.z||0!=this._currentAcceleration.x||0!=this._currentAcceleration.z){var c=BABYLON.Tools.GetDeltaTime()/1e3;this._lastFrameSpeed.scaleToRef(c,this._tempSpeed),this._currentAcceleration.scaleToRef(c*c*.5,this._tempSpeed2),this._tempSpeed.addInPlace(this._tempSpeed2),(0!=this._tempSpeed.x||0!=this._tempSpeed.z)&&this.target.moveRelative(this._tempSpeed)}}}();var BABYLON=BABYLON||{};!function(){BABYLON.OculusController=function(a,b){BABYLON.InputController.call(this,a,b),this._deviceOrientationHandler=this.onOrientationEvent.bind(this),this._tempOrientation={yaw:0,pitch:0,roll:0},this._relativeOrientation={yaw:0,pitch:0,roll:0},window.addEventListener("deviceorientation",this._deviceOrientationHandler)},BABYLON.OculusController.prototype=Object.create(BABYLON.InputController.prototype),BABYLON.OculusController.prototype.onOrientationEvent=function(a){if(this._tempOrientation.yaw=a.alpha/180*Math.PI,this._tempOrientation.pitch=a.beta/180*Math.PI,this._tempOrientation.roll=a.gamma/180*Math.PI,this._lastOrientation){this._relativeOrientation.yaw=this._tempOrientation.yaw-this._lastOrientation.yaw,this._relativeOrientation.pitch=this._tempOrientation.pitch-this._lastOrientation.pitch,this._relativeOrientation.roll=this._tempOrientation.roll-this._lastOrientation.roll;var b=this._tempOrientation;this._tempOrientation=this._lastOrientation,this._lastOrientation=b,this.target.rotateRelative(this._relativeOrientation)}else this._lastOrientation=Object.create(this._tempOrientation)},BABYLON.OculusController.prototype.dispose=function(){window.removeEventListener("deviceorientation",this._deviceOrientationHandler)},BABYLON.OculusController.CameraSettings_OculusRiftDevKit2013_Metric={HResolution:1280,VResolution:800,HScreenSize:.149759993,VScreenSize:.0935999975,VScreenCenter:.0467999987,EyeToScreenDistance:.0410000011,LensSeparationDistance:.063500002,InterpupillaryDistance:.064000003,DistortionK:[1,.219999999,.239999995,0],ChromaAbCorrection:[.995999992,-.00400000019,1.01400006,0],PostProcessScaleFactor:1.714605507808412,LensCenterOffset:.151976421}}();var BABYLON=BABYLON||{};!function(){BABYLON.InputCollisionFilter=function(a,b,c){BABYLON.inputFilter.call(this,a,b),this._transformedDirection=new BABYLON.Vector3,this._tempNewPosition=new BABYLON.Vector3,this._tempNewPosition2=new BABYLON.Vector3,this._ellipsoid=c||new BABYLON.Vector3(.2,.855,.2),this._collider=new BABYLON.Collider,this._collidedPosition=new BABYLON.Vector3(0,0,0),this._cameraHeight=1.7,this._positionBottom=new BABYLON.Vector3(0,0,0)},BABYLON.InputCollisionFilter.prototype=Object.create(BABYLON.inputFilter.prototype),BABYLON.InputCollisionFilter.prototype.moveRelative=function(a){this.getOrientation();BABYLON.Vector3.TransformNormalToRef(a,this.getOrientationMatrix(),this._transformedDirection),this.getPosition().addToRef(this._transformedDirection,this._tempNewPosition),this._collider.radius=this._ellipsoid;var b=this.getPosition();this._positionBottom.x=b.x,this._positionBottom.y=b.y,this._positionBottom.z=b.z,this._positionBottom.y+=this._ellipsoid.y-this._cameraHeight,this.scene._getNewPosition(this._positionBottom,this._transformedDirection,this._collider,3,this._collidedPosition),this._collidedPosition.subtractToRef(this._positionBottom,this._tempNewPosition2),this._tempNewPosition2.length()>2*BABYLON.Engine.collisionsEpsilon&&(BABYLON.Vector3.TransformNormalToRef(this._tempNewPosition2,this.getInvertOrientationMatrix(),this._tempNewPosition),this.target.moveRelative(this._tempNewPosition))}}();var BABYLON=BABYLON||{};!function(){BABYLON.GravityInputController=function(a,b){BABYLON.InputController.call(this,a,b),this._moveVectorGlobal=new BABYLON.Vector3(0,0,0),this._moveVectorLocal=new BABYLON.Vector3(0,0,0),this._fallSpeed=2},BABYLON.GravityInputController.prototype=Object.create(BABYLON.InputController.prototype),BABYLON.GravityInputController.prototype.update=function(){this._moveVectorGlobal.x=0,this._moveVectorGlobal.y=-this._fallSpeed*BABYLON.Tools.GetDeltaTime()/1e3,this._moveVectorGlobal.z=0,BABYLON.Vector3.TransformNormalToRef(this._moveVectorGlobal,this.target.getInvertOrientationMatrix(),this._moveVectorLocal),this.target.moveRelative(this._moveVectorLocal)}}();var BABYLON=BABYLON||{};!function(){BABYLON.GlobalAxisFactorsFilter=function(a,b,c,d,e){BABYLON.inputFilter.call(this,a,b),this.xFactor=c,this.yFactor=d,this.zFactor=e,this._globalMovement=new BABYLON.Vector3(0,0,0)
},BABYLON.GlobalAxisFactorsFilter.prototype=Object.create(BABYLON.inputFilter.prototype),BABYLON.GlobalAxisFactorsFilter.prototype.moveRelative=function(a){this.getOrientation();BABYLON.Vector3.TransformNormalToRef(a,this.getOrientationMatrix(),this._globalMovement),this._globalMovement.x*=this.xFactor,this._globalMovement.y*=this.yFactor,this._globalMovement.z*=this.zFactor,BABYLON.Vector3.TransformNormalToRef(this._globalMovement,this.getInvertOrientationMatrix(),a),this.target.moveRelative(a)}}();var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e,f){b.call(this,c,d),this._textures=new Array,this._floats=new Array,this._floatsArrays={},this._colors3=new Array,this._colors4=new Array,this._vectors2=new Array,this._vectors3=new Array,this._matrices=new Array,this._cachedWorldViewMatrix=new a.Matrix,this._shaderPath=e,f.needAlphaBlending=f.needAlphaBlending||!1,f.needAlphaTesting=f.needAlphaTesting||!1,f.attributes=f.attributes||["position","normal","uv"],f.uniforms=f.uniforms||["worldViewProjection"],f.samplers=f.samplers||[],this._options=f}return __extends(c,b),c.prototype.needAlphaBlending=function(){return this._options.needAlphaBlending},c.prototype.needAlphaTesting=function(){return this._options.needAlphaTesting},c.prototype._checkUniform=function(a){-1===this._options.uniforms.indexOf(a)&&this._options.uniforms.push(a)},c.prototype.setTexture=function(a,b){return-1===this._options.samplers.indexOf(a)&&this._options.samplers.push(a),this._textures[a]=b,this},c.prototype.setFloat=function(a,b){return this._checkUniform(a),this._floats[a]=b,this},c.prototype.setFloats=function(a,b){return this._checkUniform(a),this._floatsArrays[a]=b,this},c.prototype.setColor3=function(a,b){return this._checkUniform(a),this._colors3[a]=b,this},c.prototype.setColor4=function(a,b){return this._checkUniform(a),this._colors4[a]=b,this},c.prototype.setVector2=function(a,b){return this._checkUniform(a),this._vectors2[a]=b,this},c.prototype.setVector3=function(a,b){return this._checkUniform(a),this._vectors3[a]=b,this},c.prototype.setMatrix=function(a,b){return this._checkUniform(a),this._matrices[a]=b,this},c.prototype.isReady=function(){var a=this.getScene().getEngine();return this._effect=a.createEffect(this._shaderPath,this._options.attributes,this._options.uniforms,this._options.samplers,"",null,this.onCompiled,this.onError),this._effect.isReady()?!0:!1},c.prototype.bind=function(a){-1!==this._options.uniforms.indexOf("world")&&this._effect.setMatrix("world",a),-1!==this._options.uniforms.indexOf("view")&&this._effect.setMatrix("view",this.getScene().getViewMatrix()),-1!==this._options.uniforms.indexOf("worldView")&&(a.multiplyToRef(this.getScene().getViewMatrix(),this._cachedWorldViewMatrix),this._effect.setMatrix("worldView",this._cachedWorldViewMatrix)),-1!==this._options.uniforms.indexOf("projection")&&this._effect.setMatrix("projection",this.getScene().getProjectionMatrix()),-1!==this._options.uniforms.indexOf("worldViewProjection")&&this._effect.setMatrix("worldViewProjection",a.multiply(this.getScene().getTransformMatrix()));for(var b in this._textures)this._effect.setTexture(b,this._textures[b]);for(b in this._floats)this._effect.setFloat(b,this._floats[b]);for(b in this._floatsArrays)this._effect.setArray(b,this._floatsArrays[b]);for(b in this._colors3)this._effect.setColor3(b,this._colors3[b]);for(b in this._colors4){var c=this._colors4[b];this._effect.setFloat4(b,c.r,c.g,c.b,c.a)}for(b in this._vectors2)this._effect.setVector2(b,this._vectors2[b]);for(b in this._vectors3)this._effect.setVector3(b,this._vectors3[b]);for(b in this._matrices)this._effect.setMatrix(b,this._matrices[b])},c.prototype.dispose=function(a){for(var c in this._textures)this._textures[c].dispose();this._textures=[],b.prototype.dispose.call(this,a)},c}(a.Material);a.ShaderMaterial=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(){}return b.prototype.set=function(b,c){switch(c){case a.VertexBuffer.PositionKind:this.positions=b;break;case a.VertexBuffer.NormalKind:this.normals=b;break;case a.VertexBuffer.UVKind:this.uvs=b;break;case a.VertexBuffer.UV2Kind:this.uv2s=b;break;case a.VertexBuffer.ColorKind:this.colors=b;break;case a.VertexBuffer.MatricesIndicesKind:this.matricesIndices=b;break;case a.VertexBuffer.MatricesWeightsKind:this.matricesWeights=b}},b.prototype.applyToMesh=function(a,b){this._applyTo(a,b)},b.prototype.applyToGeometry=function(a,b){this._applyTo(a,b)},b.prototype.updateMesh=function(a){this._update(a)},b.prototype.updateGeometry=function(a){this._update(a)},b.prototype._applyTo=function(b,c){this.positions&&b.setVerticesData(a.VertexBuffer.PositionKind,this.positions,c),this.normals&&b.setVerticesData(a.VertexBuffer.NormalKind,this.normals,c),this.uvs&&b.setVerticesData(a.VertexBuffer.UVKind,this.uvs,c),this.uv2s&&b.setVerticesData(a.VertexBuffer.UV2Kind,this.uv2s,c),this.colors&&b.setVerticesData(a.VertexBuffer.ColorKind,this.colors,c),this.matricesIndices&&b.setVerticesData(a.VertexBuffer.MatricesIndicesKind,this.matricesIndices,c),this.matricesWeights&&b.setVerticesData(a.VertexBuffer.MatricesWeightsKind,this.matricesWeights,c),this.indices&&b.setIndices(this.indices)},b.prototype._update=function(b,c,d){this.positions&&b.updateVerticesData(a.VertexBuffer.PositionKind,this.positions,c,d),this.normals&&b.updateVerticesData(a.VertexBuffer.NormalKind,this.normals,c,d),this.uvs&&b.updateVerticesData(a.VertexBuffer.UVKind,this.uvs,c,d),this.uv2s&&b.updateVerticesData(a.VertexBuffer.UV2Kind,this.uv2s,c,d),this.colors&&b.updateVerticesData(a.VertexBuffer.ColorKind,this.colors,c,d),this.matricesIndices&&b.updateVerticesData(a.VertexBuffer.MatricesIndicesKind,this.matricesIndices,c,d),this.matricesWeights&&b.updateVerticesData(a.VertexBuffer.MatricesWeightsKind,this.matricesWeights,c,d),this.indices&&b.setIndices(this.indices)},b.prototype.transform=function(b){var c=a.Vector3.Zero();if(this.positions)for(var d=a.Vector3.Zero(),e=0;e<this.positions.length;e+=3)a.Vector3.FromArrayToRef(this.positions,e,d),a.Vector3.TransformCoordinatesToRef(d,b,c),this.positions[e]=c.x,this.positions[e+1]=c.y,this.positions[e+2]=c.z;if(this.normals){var f=a.Vector3.Zero();for(e=0;e<this.normals.length;e+=3)a.Vector3.FromArrayToRef(this.normals,e,f),a.Vector3.TransformNormalToRef(f,b,c),this.normals[e]=c.x,this.normals[e+1]=c.y,this.normals[e+2]=c.z}},b.prototype.merge=function(a){if(a.indices){this.indices||(this.indices=[]);for(var b=this.positions?this.positions.length/3:0,c=0;c<a.indices.length;c++)this.indices.push(a.indices[c]+b)}if(a.positions)for(this.positions||(this.positions=[]),c=0;c<a.positions.length;c++)this.positions.push(a.positions[c]);if(a.normals)for(this.normals||(this.normals=[]),c=0;c<a.normals.length;c++)this.normals.push(a.normals[c]);if(a.uvs)for(this.uvs||(this.uvs=[]),c=0;c<a.uvs.length;c++)this.uvs.push(a.uvs[c]);if(a.uv2s)for(this.uv2s||(this.uv2s=[]),c=0;c<a.uv2s.length;c++)this.uv2s.push(a.uv2s[c]);if(a.matricesIndices)for(this.matricesIndices||(this.matricesIndices=[]),c=0;c<a.matricesIndices.length;c++)this.matricesIndices.push(a.matricesIndices[c]);if(a.matricesWeights)for(this.matricesWeights||(this.matricesWeights=[]),c=0;c<a.matricesWeights.length;c++)this.matricesWeights.push(a.matricesWeights[c]);if(a.colors)for(this.colors||(this.colors=[]),c=0;c<a.colors.length;c++)this.colors.push(a.colors[c])},b.ExtractFromMesh=function(a){return b._ExtractFrom(a)},b.ExtractFromGeometry=function(a){return b._ExtractFrom(a)},b._ExtractFrom=function(b){var c=new a.VertexData;return b.isVerticesDataPresent(a.VertexBuffer.PositionKind)&&(c.positions=b.getVerticesData(a.VertexBuffer.PositionKind)),b.isVerticesDataPresent(a.VertexBuffer.NormalKind)&&(c.normals=b.getVerticesData(a.VertexBuffer.NormalKind)),b.isVerticesDataPresent(a.VertexBuffer.UVKind)&&(c.uvs=b.getVerticesData(a.VertexBuffer.UVKind)),b.isVerticesDataPresent(a.VertexBuffer.UV2Kind)&&(c.uv2s=b.getVerticesData(a.VertexBuffer.UV2Kind)),b.isVerticesDataPresent(a.VertexBuffer.ColorKind)&&(c.colors=b.getVerticesData(a.VertexBuffer.ColorKind)),b.isVerticesDataPresent(a.VertexBuffer.MatricesIndicesKind)&&(c.matricesIndices=b.getVerticesData(a.VertexBuffer.MatricesIndicesKind)),b.isVerticesDataPresent(a.VertexBuffer.MatricesWeightsKind)&&(c.matricesWeights=b.getVerticesData(a.VertexBuffer.MatricesWeightsKind)),c.indices=b.getIndices(),c},b.CreateBox=function(b){var c=[new a.Vector3(0,0,1),new a.Vector3(0,0,-1),new a.Vector3(1,0,0),new a.Vector3(-1,0,0),new a.Vector3(0,1,0),new a.Vector3(0,-1,0)],d=[],e=[],f=[],g=[];b=b||1;for(var h=0;h<c.length;h++){var i=c[h],j=new a.Vector3(i.y,i.z,i.x),k=a.Vector3.Cross(i,j),l=e.length/3;d.push(l),d.push(l+1),d.push(l+2),d.push(l),d.push(l+2),d.push(l+3);var m=i.subtract(j).subtract(k).scale(b/2);e.push(m.x,m.y,m.z),f.push(i.x,i.y,i.z),g.push(1,1),m=i.subtract(j).add(k).scale(b/2),e.push(m.x,m.y,m.z),f.push(i.x,i.y,i.z),g.push(0,1),m=i.add(j).add(k).scale(b/2),e.push(m.x,m.y,m.z),f.push(i.x,i.y,i.z),g.push(0,0),m=i.add(j).subtract(k).scale(b/2),e.push(m.x,m.y,m.z),f.push(i.x,i.y,i.z),g.push(1,0)}var n=new a.VertexData;return n.indices=d,n.positions=e,n.normals=f,n.uvs=g,n},b.CreateSphere=function(b,c){b=b||32,c=c||1;for(var d=c/2,e=2+b,f=2*e,g=[],h=[],i=[],j=[],k=0;e>=k;k++){for(var l=k/e,m=l*Math.PI,n=0;f>=n;n++){var o=n/f,p=o*Math.PI*2,q=a.Matrix.RotationZ(-m),r=a.Matrix.RotationY(p),s=a.Vector3.TransformCoordinates(a.Vector3.Up(),q),t=a.Vector3.TransformCoordinates(s,r),u=t.scale(d),v=a.Vector3.Normalize(u);h.push(u.x,u.y,u.z),i.push(v.x,v.y,v.z),j.push(l,o)}if(k>0)for(var w=h.length/3,x=w-2*(f+1);w>x+f+2;x++)g.push(x),g.push(x+1),g.push(x+f+1),g.push(x+f+1),g.push(x+1),g.push(x+f+2)}var y=new a.VertexData;return y.indices=g,y.positions=h,y.normals=i,y.uvs=j,y},b.CreateCylinder=function(b,c,d,e){var f=c/2,g=d/2,h=[],i=[],j=[],k=[];b=b||1,c=c||.5,d=d||1,e=e||16;var l=function(b){var c=2*b*Math.PI/e,d=Math.sin(c),f=Math.cos(c);return new a.Vector3(d,0,f)},m=function(c){var d=c?f:g;if(0!=d){for(var m=0;e-2>m;m++){var n=(m+1)%e,o=(m+2)%e;if(!c){var p=n;n=o,o=p}var q=i.length/3;h.push(q),h.push(q+n),h.push(q+o)}var r=new a.Vector3(0,-1,0),s=new a.Vector2(-.5,-.5);for(c||(r=r.scale(-1),s.x=-s.x),m=0;e>m;m++){var t=l(m),u=t.scale(d).add(r.scale(b)),v=new a.Vector2(t.x*s.x+.5,t.z*s.y+.5);i.push(u.x,u.y,u.z),j.push(r.x,r.y,r.z),k.push(v.x,v.y)}}};b/=2;for(var n=new a.Vector3(0,1,0).scale(b),o=e+1,p=0;e>=p;p++){var q=l(p),r=q.scale(g),s=q.scale(f),t=new a.Vector2(p/e,0),u=r.add(n);i.push(u.x,u.y,u.z),j.push(q.x,q.y,q.z),k.push(t.x,t.y),u=s.subtract(n),t.y+=1,i.push(u.x,u.y,u.z),j.push(q.x,q.y,q.z),k.push(t.x,t.y),h.push(2*p),h.push((2*p+2)%(2*o)),h.push(2*p+1),h.push(2*p+1),h.push((2*p+2)%(2*o)),h.push((2*p+3)%(2*o))}m(!0),m(!1);var v=new a.VertexData;return v.indices=h,v.positions=i,v.normals=j,v.uvs=k,v},b.CreateTorus=function(b,c,d){var e=[],f=[],g=[],h=[];b=b||1,c=c||.5,d=d||16;for(var i=d+1,j=0;d>=j;j++)for(var k=j/d,l=j*Math.PI*2/d-Math.PI/2,m=a.Matrix.Translation(b/2,0,0).multiply(a.Matrix.RotationY(l)),n=0;d>=n;n++){var o=1-n/d,p=n*Math.PI*2/d+Math.PI,q=Math.cos(p),r=Math.sin(p),s=new a.Vector3(q,r,0),t=s.scale(c/2),u=new a.Vector2(k,o);t=a.Vector3.TransformCoordinates(t,m),s=a.Vector3.TransformNormal(s,m),f.push(t.x,t.y,t.z),g.push(s.x,s.y,s.z),h.push(u.x,u.y);var v=(j+1)%i,w=(n+1)%i;e.push(j*i+n),e.push(j*i+w),e.push(v*i+n),e.push(j*i+w),e.push(v*i+w),e.push(v*i+n)}var x=new a.VertexData;return x.indices=e,x.positions=f,x.normals=g,x.uvs=h,x},b.CreateGround=function(b,c,d){var e,f,g=[],h=[],i=[],j=[];for(b=b||1,c=c||1,d=d||1,e=0;d>=e;e++)for(f=0;d>=f;f++){var k=new a.Vector3(f*b/d-b/2,0,(d-e)*c/d-c/2),l=new a.Vector3(0,1,0);h.push(k.x,k.y,k.z),i.push(l.x,l.y,l.z),j.push(f/d,1-e/d)}for(e=0;d>e;e++)for(f=0;d>f;f++)g.push(f+1+(e+1)*(d+1)),g.push(f+1+e*(d+1)),g.push(f+e*(d+1)),g.push(f+(e+1)*(d+1)),g.push(f+1+(e+1)*(d+1)),g.push(f+e*(d+1));var m=new a.VertexData;return m.indices=g,m.positions=h,m.normals=i,m.uvs=j,m},b.CreateGroundFromHeightMap=function(b,c,d,e,f,g,h,i){var j,k,l=[],m=[],n=[],o=[];for(j=0;d>=j;j++)for(k=0;d>=k;k++){var p=new a.Vector3(k*b/d-b/2,0,(d-j)*c/d-c/2),q=(p.x+b/2)/b*(h-1)|0,r=(1-(p.z+c/2)/c)*(i-1)|0,s=4*(q+r*h),t=g[s]/255,u=g[s+1]/255,v=g[s+2]/255,w=.3*t+.59*u+.11*v;p.y=e+(f-e)*w,m.push(p.x,p.y,p.z),n.push(0,0,0),o.push(k/d,1-j/d)}for(j=0;d>j;j++)for(k=0;d>k;k++)l.push(k+1+(j+1)*(d+1)),l.push(k+1+j*(d+1)),l.push(k+j*(d+1)),l.push(k+(j+1)*(d+1)),l.push(k+1+(j+1)*(d+1)),l.push(k+j*(d+1));a.VertexData.ComputeNormals(m,l,n);var x=new a.VertexData;return x.indices=l,x.positions=m,x.normals=n,x.uvs=o,x},b.CreatePlane=function(b){var c=[],d=[],e=[],f=[];b=b||1;var g=b/2;d.push(-g,-g,0),e.push(0,0,-1),f.push(0,0),d.push(g,-g,0),e.push(0,0,-1),f.push(1,0),d.push(g,g,0),e.push(0,0,-1),f.push(1,1),d.push(-g,g,0),e.push(0,0,-1),f.push(0,1),c.push(0),c.push(1),c.push(2),c.push(0),c.push(2),c.push(3);var h=new a.VertexData;return h.indices=c,h.positions=d,h.normals=e,h.uvs=f,h},b.CreateTorusKnot=function(b,c,d,e,f,g){var h=[],i=[],j=[],k=[];b=b||2,c=c||.5,d=d||32,e=e||32,f=f||2,g=g||3;for(var l=function(c){var d=Math.cos(c),e=Math.sin(c),h=g/f*c,i=Math.cos(h),j=b*(2+i)*.5*d,k=b*(2+i)*e*.5,l=b*Math.sin(h)*.5;return new a.Vector3(j,k,l)},m=0;d>=m;m++){var n=m%d,o=n/d*2*f*Math.PI,p=l(o),q=l(o+.01),r=q.subtract(p),s=q.add(p),t=a.Vector3.Cross(r,s);s=a.Vector3.Cross(t,r),t.normalize(),s.normalize();for(var u=0;e>u;u++){var v=u%e,w=v/e*2*Math.PI,x=-c*Math.cos(w),y=c*Math.sin(w);i.push(p.x+x*s.x+y*t.x),i.push(p.y+x*s.y+y*t.y),i.push(p.z+x*s.z+y*t.z),k.push(m/d),k.push(u/e)}}for(m=0;d>m;m++)for(u=0;e>u;u++){var z=(u+1)%e,A=m*e+u,B=(m+1)*e+u,C=(m+1)*e+z,D=m*e+z;h.push(D),h.push(B),h.push(A),h.push(D),h.push(C),h.push(B)}a.VertexData.ComputeNormals(i,h,j);var E=new a.VertexData;return E.indices=h,E.positions=i,E.normals=j,E.uvs=k,E},b.ComputeNormals=function(b,c,d){var e,f=[],g=[];for(e=0;e<b.length;e+=3){var h=new a.Vector3(b[e],b[e+1],b[e+2]);f.push(h),g.push([])}var i=[];for(e=0;e<c.length/3;e++){var j=c[3*e],k=c[3*e+1],l=c[3*e+2],m=f[j],n=f[k],o=f[l],p=m.subtract(n),q=o.subtract(n);i[e]=a.Vector3.Normalize(a.Vector3.Cross(p,q)),g[j].push(e),g[k].push(e),g[l].push(e)}for(e=0;e<f.length;e++){for(var r=g[e],s=a.Vector3.Zero(),t=0;t<r.length;t++)s.addInPlace(i[r[t]]);s=a.Vector3.Normalize(s.scale(1/r.length)),d[3*e]=s.x,d[3*e+1]=s.y,d[3*e+2]=s.z}},b}();a.VertexData=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b,c){b._leftCamera.isIntermediate=!0,b.subCameras.push(b._leftCamera),b.subCameras.push(b._rightCamera),b._leftTexture=new a.PassPostProcess(c+"_leftTexture",1,b._leftCamera),b._anaglyphPostProcess=new a.AnaglyphPostProcess(c+"_anaglyph",1,b._rightCamera),b._anaglyphPostProcess.onApply=function(a){a.setTextureFromPostProcess("leftSampler",b._leftTexture)},b._update()},c=function(c){function d(d,e,f,g,h,i,j){c.call(this,d,e,f,g,h,j),this._eyeSpace=a.Tools.ToRadians(i),this._leftCamera=new a.ArcRotateCamera(d+"_left",e-this._eyeSpace,f,g,h,j),this._rightCamera=new a.ArcRotateCamera(d+"_right",e+this._eyeSpace,f,g,h,j),b(this,d)}return __extends(d,c),d.prototype._update=function(){this._updateCamera(this._leftCamera),this._updateCamera(this._rightCamera),this._leftCamera.alpha=this.alpha-this._eyeSpace,this._rightCamera.alpha=this.alpha+this._eyeSpace,c.prototype._update.call(this)},d.prototype._updateCamera=function(a){a.beta=this.beta,a.radius=this.radius,a.minZ=this.minZ,a.maxZ=this.maxZ,a.fov=this.fov,a.target=this.target},d}(a.ArcRotateCamera);a.AnaglyphArcRotateCamera=c;var d=function(c){function d(d,e,f,g){c.call(this,d,e,g),this._eyeSpace=a.Tools.ToRadians(f),this._transformMatrix=new a.Matrix,this._leftCamera=new a.FreeCamera(d+"_left",e.clone(),g),this._rightCamera=new a.FreeCamera(d+"_right",e.clone(),g),b(this,d)}return __extends(d,c),d.prototype._getSubCameraPosition=function(b,c){var d=this.getTarget();a.Matrix.Translation(-d.x,-d.y,-d.z).multiplyToRef(a.Matrix.RotationY(b),this._transformMatrix),this._transformMatrix=this._transformMatrix.multiply(a.Matrix.Translation(d.x,d.y,d.z)),a.Vector3.TransformCoordinatesToRef(this.position,this._transformMatrix,c)},d.prototype._update=function(){this._getSubCameraPosition(-this._eyeSpace,this._leftCamera.position),this._getSubCameraPosition(this._eyeSpace,this._rightCamera.position),this._updateCamera(this._leftCamera),this._updateCamera(this._rightCamera),c.prototype._update.call(this)},d.prototype._updateCamera=function(a){a.minZ=this.minZ,a.maxZ=this.maxZ,a.fov=this.fov,a.viewport=this.viewport,a.setTarget(this.getTarget())},d}(a.FreeCamera);a.AnaglyphFreeCamera=d}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g){a.call(this,b,"anaglyph",null,["leftSampler"],c,d,e,f,g)}return __extends(b,a),b}(a.PostProcess);a.AnaglyphPostProcess=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(){}return b.EnableFor=function(a){a._tags=a._tags||{},a.hasTags=function(){return b.HasTags(a)},a.addTags=function(c){return b.AddTagsTo(a,c)},a.removeTags=function(c){return b.RemoveTagsFrom(a,c)},a.matchesTagsQuery=function(c){return b.MatchesQuery(a,c)}},b.DisableFor=function(a){delete a._tags,delete a.hasTags,delete a.addTags,delete a.removeTags,delete a.matchesTagsQuery},b.HasTags=function(b){return b._tags?!a.Tools.IsEmpty(b._tags):!1},b.GetTags=function(a){return a._tags?a._tags:null},b.AddTagsTo=function(a,c){if(c){var d=c.split(" ");for(var e in d)b._AddTagTo(a,d[e])}},b._AddTagTo=function(a,c){c=c.trim(),""!==c&&"true"!==c&&"false"!==c&&(c.match(/[\s]/)||c.match(/^([!]|([|]|[&]){2})/)||(b.EnableFor(a),a._tags[c]=!0))},b.RemoveTagsFrom=function(a,c){if(b.HasTags(a)){var d=c.split(" ");for(var e in d)b._RemoveTagFrom(a,d[e])}},b._RemoveTagFrom=function(a,b){delete a._tags[b]},b.MatchesQuery=function(c,d){return void 0===d?!0:""===d?b.HasTags(c):a.Internals.AndOrNotEvaluator.Eval(d,function(a){return b.HasTags(c)&&c._tags[a]})},b}();a.Tags=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){!function(a){var b=function(){function a(){}return a.Eval=function(b,c){return b=b.match(/\([^\(\)]*\)/g)?b.replace(/\([^\(\)]*\)/g,function(b){return b=b.slice(1,b.length-1),a._HandleParenthesisContent(b,c)}):a._HandleParenthesisContent(b,c),"true"===b?!0:"false"===b?!1:a.Eval(b,c)},a._HandleParenthesisContent=function(b,c){c=c||function(a){return"true"===a?!0:!1};var d,e=b.split("||");for(var f in e){var g=a._SimplifyNegation(e[f].trim()),h=g.split("&&");if(h.length>1)for(var i=0;i<h.length;++i){var j=a._SimplifyNegation(h[i].trim());if(d="true"!==j&&"false"!==j?"!"===j[0]?!c(j.substring(1)):c(j):"true"===j?!0:!1,!d){g="false";break}}if(d||"true"===g){d=!0;break}d="true"!==g&&"false"!==g?"!"===g[0]?!c(g.substring(1)):c(g):"true"===g?!0:!1}return d?"true":"false"},a._SimplifyNegation=function(a){return a=a.replace(/^[\s!]+/,function(a){return a=a.replace(/[\s]/g,function(){return""}),a.length%2?"!":""}),a=a.trim(),"!true"===a?a="false":"!false"===a&&(a="true"),a},a}();a.AndOrNotEvaluator=b}(a.Internals||(a.Internals={}));a.Internals}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b,c,d,e,f,g){this._enabled=!0,this._refCount=0,this._name=c,this._renderTexture=new a.RenderTargetTexture(c,d,b),this.setRenderList(e),this._renderTexture.onBeforeRender=f,this._renderTexture.onAfterRender=g,this._scene=b}return b.prototype._incRefCount=function(){return 0===this._refCount&&this._scene.customRenderTargets.push(this._renderTexture),++this._refCount},b.prototype._decRefCount=function(){return this._refCount--,this._refCount<=0&&this._scene.customRenderTargets.splice(this._scene.customRenderTargets.indexOf(this._renderTexture),1),this._refCount},b.prototype._update=function(){this.setRenderList(this._renderList)},b.prototype.setRenderList=function(a){this._renderTexture.renderList=a},b.prototype.getRenderTexture=function(){return this._renderTexture},b}();a.PostProcessRenderPass=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b,c,d,e,f){this._engine=a,this._name=b,this._postProcessType=c,this._ratio=d||1,this._samplingMode=e||null,this._singleInstance=f||!0,this._cameras=[],this._postProcesses=[],this._indicesForCamera=[],this._renderPasses=[],this._renderEffectAsPasses=[],this.parameters=function(){}}return b._GetInstance=function(a,c,d,e){for(var f,g,h=[],i=b._GetParametersNames(c),j=0;j<i.length;j++)switch(i[j]){case"name":h[j]=c.toString();break;case"ratio":h[j]=d;break;case"camera":h[j]=null;break;case"samplingMode":h[j]=e;break;case"engine":h[j]=a;break;case"reusable":h[j]=!0;break;default:h[j]=null}return f=function(){},f.prototype=c.prototype,g=new f,c.apply(g,h),g},b._GetParametersNames=function(a){var b=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,c=a.toString().replace(b,""),d=c.slice(c.indexOf("(")+1,c.indexOf(")")).match(/([^\s,]+)/g);return null===d&&(d=[]),d},b.prototype._update=function(){for(var a in this._renderPasses)this._renderPasses[a]._update()},b.prototype.addPass=function(a){this._renderPasses[a._name]=a,this._linkParameters()},b.prototype.removePass=function(a){delete this._renderPasses[a._name],this._linkParameters()},b.prototype.addRenderEffectAsPass=function(a){this._renderEffectAsPasses[a._name]=a,this._linkParameters()},b.prototype.getPass=function(a){for(var b in this._renderPasses)if(b===a)return this._renderPasses[a]},b.prototype.emptyPasses=function(){this._renderPasses.length=0,this._linkParameters()},b.prototype._attachCameras=function(c){for(var d,e=a.Tools.MakeArray(c||this._cameras),f=0;f<e.length;f++){var g=e[f],h=g.name;d=this._singleInstance?0:h,this._postProcesses[d]=this._postProcesses[d]||b._GetInstance(this._engine,this._postProcessType,this._ratio,this._samplingMode);var i=g.attachPostProcess(this._postProcesses[d]);null===this._indicesForCamera[h]&&(this._indicesForCamera[h]=[]),this._indicesForCamera[h].push(i),-1===this._cameras.indexOf(g)&&(this._cameras[h]=g);for(var j in this._renderPasses)this._renderPasses[j]._incRefCount()}this._linkParameters()},b.prototype._detachCameras=function(b){for(var c=a.Tools.MakeArray(b||this._cameras),d=0;d<c.length;d++){var e=c[d],f=e.name;e.detachPostProcess(this._postProcesses[this._singleInstance?0:f],this._indicesForCamera[f]);var g=this._cameras.indexOf(f);this._indicesForCamera.splice(g,1),this._cameras.splice(g,1);for(var h in this._renderPasses)this._renderPasses[h]._decRefCount()}},b.prototype._enable=function(b){for(var c=a.Tools.MakeArray(b||this._cameras),d=0;d<c.length;d++){for(var e=c[d],f=e.name,g=0;g<this._indicesForCamera[f].length;g++)void 0===e._postProcesses[this._indicesForCamera[f][g]]&&b[d].attachPostProcess(this._postProcesses[this._singleInstance?0:f],this._indicesForCamera[f][g]);for(var h in this._renderPasses)this._renderPasses[h]._incRefCount()}},b.prototype._disable=function(b){for(var c=a.Tools.MakeArray(b||this._cameras),d=0;d<c.length;d++){var e=c[d],f=e.Name;e.detachPostProcess(this._postProcesses[this._singleInstance?0:f],this._indicesForCamera[f]);for(var g in this._renderPasses)this._renderPasses[g]._decRefCount()}},b.prototype.getPostProcess=function(a){return this._singleInstance?this._postProcesses[0]:this._postProcesses[a.name]},b.prototype._linkParameters=function(){var a=this;for(var b in this._postProcesses)this._postProcesses[b].onApply=function(b){a.parameters(b),a._linkTextures(b)}},b.prototype._linkTextures=function(a){for(var b in this._renderPasses)a.setTexture(b,this._renderPasses[b].getRenderTexture());for(var c in this._renderEffectAsPasses)a.setTextureFromPostProcess(c+"Sampler",this._renderEffectAsPasses[c].getPostProcess())},b}();a.PostProcessRenderEffect=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(a,b){this._engine=a,this._name=b,this._renderEffects=[],this._renderEffectsForIsolatedPass=[],this._cameras=[]}return b.prototype.addEffect=function(a){this._renderEffects[a._name]=a},b.prototype._enableEffect=function(b,c){var d=this._renderEffects[b];d&&d.enable(a.Tools.MakeArray(c||this._cameras))},b.prototype._disableEffect=function(b,c){var d=this._renderEffects[b];d&&d.disable(a.Tools.MakeArray(c||this._cameras))},b.prototype._attachCameras=function(b,c){for(var d=a.Tools.MakeArray(b||this._cameras),e=[],f=0;f<d.length;f++){var g=d[f],h=g.name;-1===this._cameras.indexOf(g)?this._cameras[h]=g:c&&e.push(f)}for(var f=0;f<e.length;f++)b.splice(e[f],1);for(var i in this._renderEffects)this._renderEffects[i]._attachCameras(d)},b.prototype._detachCameras=function(b){var c=a.Tools.MakeArray(b||this._cameras);for(var d in this._renderEffects)this._renderEffects[d]._detachCameras(c);for(var e=0;e<c.length;e++)this._cameras.splice(this._cameras.indexOf(c[e]),1)},b.prototype._enableDisplayOnlyPass=function(c,d){var e=a.Tools.MakeArray(d||this._cameras),f=null;for(var g in this._renderEffects)if(f=this._renderEffects[g].getPass(c),null!=f)break;if(null!==f){for(var g in this._renderEffects)this._renderEffects[g]._disable(e);f._name=b.PASS_SAMPLER_NAME;for(var h=0;h<e.length;h++){var i=e[h],j=i.name;this._renderEffectsForIsolatedPass[j]=this._renderEffectsForIsolatedPass[j]||new a.PostProcessRenderEffect(this._engine,b.PASS_EFFECT_NAME,"BABYLON.DisplayPassPostProcess",1,null,null),this._renderEffectsForIsolatedPass[j].emptyPasses(),this._renderEffectsForIsolatedPass[j].addPass(f),this._renderEffectsForIsolatedPass[j]._attachCameras(i)}}},b.prototype._disableDisplayOnlyPass=function(c){for(var d=a.Tools.MakeArray(c||this._cameras),e=0;e<d.length;e++){var f=d[e],g=f.name;this._renderEffectsForIsolatedPass[g]=this._renderEffectsForIsolatedPass[g]||new a.PostProcessRenderEffect(this._engine,b.PASS_EFFECT_NAME,"BABYLON.DisplayPassPostProcess",1,null,null),this._renderEffectsForIsolatedPass[g]._disable(f)}for(var h in this._renderEffects)this._renderEffects[h]._enable(d)},b.prototype._update=function(){for(var a in this._renderEffects)this._renderEffects[a]._update();for(var b=0;b<this._cameras.length;b++){var c=this._cameras[b].name;this._renderEffectsForIsolatedPass[c]&&this._renderEffectsForIsolatedPass[c]._update()}},b.PASS_EFFECT_NAME="passEffect",b.PASS_SAMPLER_NAME="passSampler",b}();a.PostProcessRenderPipeline=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(){this._renderPipelines=[]}return a.prototype.addPipeline=function(a){this._renderPipelines[a._name]=a},a.prototype.attachCamerasToRenderPipeline=function(a,b,c){var d=this._renderPipelines[a];d&&d.attachCameras(b,c)},a.prototype.detachCamerasFromRenderPipeline=function(a,b){var c=this._renderPipelines[a];c&&c.detachCameras(b)},a.prototype.enableEffectInPipeline=function(a,b,c){var d=this._renderPipelines[a];d&&d.enableEffect(b,c)},a.prototype.disableEffectInPipeline=function(a,b,c){var d=this._renderPipelines[a];d&&d.disableEffect(b,c)},a.prototype.enableDisplayOnlyPassInPipeline=function(a,b,c){var d=this._renderPipelines[a];d&&d.enableDisplayOnlyPass(b,c)},a.prototype.disableDisplayOnlyPassInPipeline=function(a,b){var c=this._renderPipelines[a];c&&c.disableDisplayOnlyPass(b)},a.prototype.update=function(){for(var a in this._renderPipelines)this._renderPipelines[a]._update()},a}();a.PostProcessRenderPipelineManager=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e,f,g){a.call(this,b,"displayPass",["passSampler"],["passSampler"],c,d,e,f,g)}return __extends(b,a),b}(a.PostProcess);a.DisplayPassPostProcess=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(b){this.frontColor=new a.Color3(1,1,1),this.backColor=new a.Color3(.1,.1,.1),this.showBackLines=!0,this.renderList=new a.SmartArray(32),this._scene=b,this._colorShader=new a.ShaderMaterial("colorShader",b,"color",{attributes:["position"],uniforms:["worldViewProjection","color"]});var c=this._scene.getEngine(),d=a.VertexData.CreateBox(1);this._vb=new a.VertexBuffer(c,d.positions,a.VertexBuffer.PositionKind,!1),this._ib=c.createIndexBuffer([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,7,1,6,2,5,3,4])}return b.prototype.reset=function(){this.renderList.reset()},b.prototype.render=function(){if(0!=this.renderList.length&&this._colorShader.isReady()){var b=this._scene.getEngine();b.setDepthWrite(!1),this._colorShader._preBind();for(var c=0;c<this.renderList.length;c++){var d=this.renderList.data[c],e=d.minimum,f=d.maximum,g=f.subtract(e),h=e.add(g.scale(.5)),i=a.Matrix.Scaling(g.x,g.y,g.z).multiply(a.Matrix.Translation(h.x,h.y,h.z)).multiply(d.getWorldMatrix());b.bindBuffers(this._vb.getBuffer(),this._ib,[3],12,this._colorShader.getEffect()),this.showBackLines&&(b.setDepthFunctionToGreaterOrEqual(),this._colorShader.setColor3("color",this.backColor),this._colorShader.bind(i),b.draw(!1,0,24)),b.setDepthFunctionToLess(),this._colorShader.setColor3("color",this.frontColor),this._colorShader.bind(i),b.draw(!1,0,24)}this._colorShader.unbind(),b.setDepthFunctionToLessOrEqual(),b.setDepthWrite(!0)}},b.prototype.dispose=function(){this._colorShader.dispose(),this._vb.dispose(),this._scene.getEngine()._releaseBuffer(this._ib)},b}();a.BoundingBoxRenderer=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){!function(b){var c=function(){function b(){}return b.GetTGAHeader=function(a){var b=0,c={id_length:a[b++],colormap_type:a[b++],image_type:a[b++],colormap_index:a[b++]|a[b++]<<8,colormap_length:a[b++]|a[b++]<<8,colormap_size:a[b++],origin:[a[b++]|a[b++]<<8,a[b++]|a[b++]<<8],width:a[b++]|a[b++]<<8,height:a[b++]|a[b++]<<8,pixel_size:a[b++],flags:a[b++]};return c},b.UploadContent=function(c,d){if(d.length<19)return void a.Tools.Error("Unable to load TGA file - Not enough data to contain header");var e=18,f=b.GetTGAHeader(d);if(f.id_length+e>d.length)return void a.Tools.Error("Unable to load TGA file - Not enough data");e+=f.id_length;var g=!1,h=!1,i=!1,j=!1;switch(f.image_type){case b._TYPE_RLE_INDEXED:g=!0;case b._TYPE_INDEXED:h=!0;break;case b._TYPE_RLE_RGB:g=!0;case b._TYPE_RGB:i=!0;break;case b._TYPE_RLE_GREY:g=!0;case b._TYPE_GREY:j=!0}var k,l,m=(15&f.flags,f.pixel_size>>3),n=f.width*f.height*m;if(h&&(l=d.subarray(e,e+=f.colormap_length*(f.colormap_size>>3))),g){k=new Uint8Array(n);for(var o,p,q,r=0,s=new Uint8Array(m);n>e;)if(o=d[e++],p=(127&o)+1,128&o){for(q=0;m>q;++q)s[q]=d[e++];for(q=0;p>q;++q)k.set(s,r+q*m);r+=m*p}else{for(p*=m,q=0;p>q;++q)k[r+q]=d[e++];r+=p}}else k=d.subarray(e,e+=h?f.width*f.height:n);var t,u,v,w,x,y;switch((f.flags&b._ORIGIN_MASK)>>b._ORIGIN_SHIFT){default:case b._ORIGIN_UL:t=0,v=1,y=f.width,u=0,w=1,x=f.height;break;case b._ORIGIN_BL:t=0,v=1,y=f.width,u=f.height-1,w=-1,x=-1;break;case b._ORIGIN_UR:t=f.width-1,v=-1,y=-1,u=0,w=1,x=f.height;break;case b._ORIGIN_BR:t=f.width-1,v=-1,y=-1,u=f.height-1,w=-1,x=-1}var z="_getImageData"+(j?"Grey":"")+f.pixel_size+"bits",A=b[z](f,l,k,u,w,x,t,v,y);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,f.width,f.height,0,c.RGBA,c.UNSIGNED_BYTE,A)},b._getImageData8bits=function(a,b,c,d,e,f,g,h,i){var j,k,l,m=c,n=b,o=a.width,p=a.height,q=0,r=new Uint8Array(o*p*4);for(l=d;l!==f;l+=e)for(k=g;k!==i;k+=h,q++)j=m[q],r[4*(k+o*l)+3]=255,r[4*(k+o*l)+2]=n[3*j+0],r[4*(k+o*l)+1]=n[3*j+1],r[4*(k+o*l)+0]=n[3*j+2];return r},b._getImageData16bits=function(a,b,c,d,e,f,g,h,i){var j,k,l,m=c,n=a.width,o=a.height,p=0,q=new Uint8Array(n*o*4);for(l=d;l!==f;l+=e)for(k=g;k!==i;k+=h,p+=2)j=m[p+0]+(m[p+1]<<8),q[4*(k+n*l)+0]=(31744&j)>>7,q[4*(k+n*l)+1]=(992&j)>>2,q[4*(k+n*l)+2]=(31&j)>>3,q[4*(k+n*l)+3]=32768&j?0:255;
return q},b._getImageData24bits=function(a,b,c,d,e,f,g,h,i){var j,k,l=c,m=a.width,n=a.height,o=0,p=new Uint8Array(m*n*4);for(k=d;k!==f;k+=e)for(j=g;j!==i;j+=h,o+=3)p[4*(j+m*k)+3]=255,p[4*(j+m*k)+2]=l[o+0],p[4*(j+m*k)+1]=l[o+1],p[4*(j+m*k)+0]=l[o+2];return p},b._getImageData32bits=function(a,b,c,d,e,f,g,h,i){var j,k,l=c,m=a.width,n=a.height,o=0,p=new Uint8Array(m*n*4);for(k=d;k!==f;k+=e)for(j=g;j!==i;j+=h,o+=4)p[4*(j+m*k)+2]=l[o+0],p[4*(j+m*k)+1]=l[o+1],p[4*(j+m*k)+0]=l[o+2],p[4*(j+m*k)+3]=l[o+3];return p},b._getImageDataGrey8bits=function(a,b,c,d,e,f,g,h,i){var j,k,l,m=c,n=a.width,o=a.height,p=0,q=new Uint8Array(n*o*4);for(l=d;l!==f;l+=e)for(k=g;k!==i;k+=h,p++)j=m[p],q[4*(k+n*l)+0]=j,q[4*(k+n*l)+1]=j,q[4*(k+n*l)+2]=j,q[4*(k+n*l)+3]=255;return q},b._getImageDataGrey16bits=function(a,b,c,d,e,f,g,h,i){var j,k,l=c,m=a.width,n=a.height,o=0,p=new Uint8Array(m*n*4);for(k=d;k!==f;k+=e)for(j=g;j!==i;j+=h,o+=2)p[4*(j+m*k)+0]=l[o+0],p[4*(j+m*k)+1]=l[o+0],p[4*(j+m*k)+2]=l[o+0],p[4*(j+m*k)+3]=l[o+1];return p},b._TYPE_NO_DATA=0,b._TYPE_INDEXED=1,b._TYPE_RGB=2,b._TYPE_GREY=3,b._TYPE_RLE_INDEXED=9,b._TYPE_RLE_RGB=10,b._TYPE_RLE_GREY=11,b._ORIGIN_MASK=48,b._ORIGIN_SHIFT=4,b._ORIGIN_BL=0,b._ORIGIN_BR=1,b._ORIGIN_UL=2,b._ORIGIN_UR=3,b}();b.TGATools=c}(a.Internals||(a.Internals={}));a.Internals}(BABYLON||(BABYLON={}));var BABYLON;!function(a){!function(b){function c(a){return a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)}function d(a){return String.fromCharCode(255&a,a>>8&255,a>>16&255,a>>24&255)}var e=542327876,f=131072,g=512,h=4,i=64,j=131072,k=c("DXT1"),l=c("DXT3"),m=c("DXT5"),n=31,o=0,p=1,q=2,r=3,s=4,t=7,u=20,v=21,w=22,x=28,y=function(){function b(){}return b.GetDDSInfo=function(a){var b=new Int32Array(a,0,n),c=1;return b[q]&f&&(c=Math.max(1,b[t])),{width:b[s],height:b[r],mipmapCount:c,isFourCC:(b[u]&h)===h,isRGB:(b[u]&i)===i,isLuminance:(b[u]&j)===j,isCube:(b[x]&g)===g}},b.GetRGBAArrayBuffer=function(a,b,c,d,e){for(var f=new Uint8Array(d),g=new Uint8Array(e),h=0,i=b-1;i>=0;i--)for(var j=0;a>j;j++){var k=c+4*(j+i*a);f[h+2]=g[k],f[h+1]=g[k+1],f[h]=g[k+2],f[h+3]=g[k+3],h+=4}return f},b.GetRGBArrayBuffer=function(a,b,c,d,e){for(var f=new Uint8Array(d),g=new Uint8Array(e),h=0,i=b-1;i>=0;i--)for(var j=0;a>j;j++){var k=c+3*(j+i*a);f[h+2]=g[k],f[h+1]=g[k+1],f[h]=g[k+2],h+=3}return f},b.GetLuminanceArrayBuffer=function(a,b,c,d,e){for(var f=new Uint8Array(d),g=new Uint8Array(e),h=0,i=b-1;i>=0;i--)for(var j=0;a>j;j++){var k=c+(j+i*a);f[h]=g[k],h++}return f},b.UploadDDSLevels=function(c,g,h,i,j,u){var x,y,z,A,B,C,D,E,F,G,H=new Int32Array(h,0,n);if(H[o]!=e)return void a.Tools.Error("Invalid magic number in DDS header");if(!i.isFourCC&&!i.isRGB&&!i.isLuminance)return void a.Tools.Error("Unsupported format, must contain a FourCC, RGB or LUMINANCE code");if(i.isFourCC)switch(x=H[v]){case k:y=8,z=g.COMPRESSED_RGBA_S3TC_DXT1_EXT;break;case l:y=16,z=g.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case m:y=16,z=g.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return void console.error("Unsupported FourCC code:",d(x))}F=1,H[q]&f&&j!==!1&&(F=Math.max(1,H[t]));for(var I=H[w],J=0;u>J;J++){var K=1==u?c.TEXTURE_2D:c.TEXTURE_CUBE_MAP_POSITIVE_X+J;for(A=H[s],B=H[r],D=H[p]+4,G=0;F>G;++G)i.isRGB?24==I?(C=A*B*3,E=b.GetRGBArrayBuffer(A,B,D,C,h),c.texImage2D(K,G,c.RGB,A,B,0,c.RGB,c.UNSIGNED_BYTE,E)):(C=A*B*4,E=b.GetRGBAArrayBuffer(A,B,D,C,h),c.texImage2D(K,G,c.RGBA,A,B,0,c.RGBA,c.UNSIGNED_BYTE,E)):i.isLuminance?(C=A*B,E=b.GetLuminanceArrayBuffer(A,B,D,C,h),c.texImage2D(K,G,c.LUMINANCE,A,B,0,c.LUMINANCE,c.UNSIGNED_BYTE,E)):(C=Math.max(4,A)/4*Math.max(4,B)/4*y,E=new Uint8Array(h,D,C),c.compressedTexImage2D(K,G,z,A,B,0,E)),D+=C,A*=.5,B*=.5}},b}();b.DDSTools=y}(a.Internals||(a.Internals={}));a.Internals}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(b){this.length=0,this._duplicateId=0,this.data=new Array(b),this._id=a._GlobalId++}return a.prototype.push=function(a){this.data[this.length++]=a,this.length>this.data.length&&(this.data.length*=2),a.__smartArrayFlags||(a.__smartArrayFlags={}),a.__smartArrayFlags[this._id]=this._duplicateId},a.prototype.pushNoDuplicate=function(a){a.__smartArrayFlags&&a.__smartArrayFlags[this._id]===this._duplicateId||this.push(a)},a.prototype.sort=function(a){this.data.sort(a)},a.prototype.reset=function(){this.length=0,this._duplicateId++},a.prototype.concat=function(a){if(0!==a.length){this.length+a.length>this.data.length&&(this.data.length=2*(this.length+a.length));for(var b=0;b<a.length;b++)this.data[this.length++]=(a.data||a)[b]}},a.prototype.concatWithNoDuplicate=function(a){if(0!==a.length){this.length+a.length>this.data.length&&(this.data.length=2*(this.length+a.length));for(var b=0;b<a.length;b++){var c=(a.data||a)[b];this.pushNoDuplicate(c)}}},a.prototype.indexOf=function(a){var b=this.data.indexOf(a);return b>=this.length?-1:b},a._GlobalId=0,a}();a.SmartArray=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function b(){this._registeredMeshes=[],this._physicsMaterials=[]}return b.prototype.initialize=function(a){"undefined"==typeof a&&(a=10),this._world=new CANNON.World,this._world.broadphase=new CANNON.NaiveBroadphase,this._world.solver.iterations=a},b.prototype._checkWithEpsilon=function(b){return b<a.PhysicsEngine.Epsilon?a.PhysicsEngine.Epsilon:b},b.prototype.runOneStep=function(b){this._world.step(b);for(var c=0;c<this._registeredMeshes.length;c++){var d=this._registeredMeshes[c];d.isChild||(d.mesh.position.x=d.body.position.x,d.mesh.position.y=d.body.position.z,d.mesh.position.z=d.body.position.y,d.mesh.rotationQuaternion||(d.mesh.rotationQuaternion=new a.Quaternion(0,0,0,1)),d.mesh.rotationQuaternion.x=d.body.quaternion.x,d.mesh.rotationQuaternion.y=d.body.quaternion.z,d.mesh.rotationQuaternion.z=d.body.quaternion.y,d.mesh.rotationQuaternion.w=-d.body.quaternion.w)}},b.prototype.setGravity=function(a){this._world.gravity.set(a.x,a.z,a.y)},b.prototype.registerMesh=function(b,c,d){switch(this.unregisterMesh(b),b.computeWorldMatrix(!0),c){case a.PhysicsEngine.SphereImpostor:var e=b.getBoundingInfo().boundingBox,f=e.maximumWorld.x-e.minimumWorld.x,g=e.maximumWorld.y-e.minimumWorld.y,h=e.maximumWorld.z-e.minimumWorld.z;return this._createSphere(Math.max(this._checkWithEpsilon(f),this._checkWithEpsilon(g),this._checkWithEpsilon(h))/2,b,d);case a.PhysicsEngine.BoxImpostor:e=b.getBoundingInfo().boundingBox;var i=e.minimumWorld,j=e.maximumWorld,k=j.subtract(i).scale(.5);return this._createBox(this._checkWithEpsilon(k.x),this._checkWithEpsilon(k.y),this._checkWithEpsilon(k.z),b,d);case a.PhysicsEngine.PlaneImpostor:return this._createPlane(b,d);case a.PhysicsEngine.MeshImpostor:var l=b.getVerticesData(a.VertexBuffer.PositionKind),m=b.getIndices();return this._createConvexPolyhedron(l,m,b,d)}return null},b.prototype._createSphere=function(a,b,c){var d=new CANNON.Sphere(a);return c?this._createRigidBodyFromShape(d,b,c.mass,c.friction,c.restitution):d},b.prototype._createBox=function(a,b,c,d,e){var f=new CANNON.Box(new CANNON.Vec3(a,c,b));return e?this._createRigidBodyFromShape(f,d,e.mass,e.friction,e.restitution):f},b.prototype._createPlane=function(a,b){var c=new CANNON.Plane;return b?this._createRigidBodyFromShape(c,a,b.mass,b.friction,b.restitution):c},b.prototype._createConvexPolyhedron=function(b,c,d,e){var f=[],g=[];d.computeWorldMatrix(!0);for(var h=0;h<b.length;h+=3){var i=a.Vector3.Zero();a.Vector3.TransformNormalFromFloatsToRef(b[h],b[h+1],b[h+2],d.getWorldMatrix(),i),f.push(new CANNON.Vec3(i.x,i.z,i.y))}for(var j=0;j<c.length;j+=3)g.push([c[j],c[j+2],c[j+1]]);var k=new CANNON.ConvexPolyhedron(f,g);return e?this._createRigidBodyFromShape(k,d,e.mass,e.friction,e.restitution):k},b.prototype._addMaterial=function(a,b){var c,d;for(c=0;c<this._physicsMaterials.length;c++)if(d=this._physicsMaterials[c],d.friction===a&&d.restitution===b)return d;var e=new CANNON.Material;for(e.friction=a,e.restitution=b,this._physicsMaterials.push(e),c=0;c<this._physicsMaterials.length;c++){d=this._physicsMaterials[c];var f=new CANNON.ContactMaterial(d,e,d.friction*e.friction,d.restitution*e.restitution);f.contactEquationStiffness=1e10,f.contactEquationRegularizationTime=10,this._world.addContactMaterial(f)}return e},b.prototype._createRigidBodyFromShape=function(b,c,d,e,f){var g=null;c.rotationQuaternion&&(g=c.rotationQuaternion.clone(),c.rotationQuaternion=new a.Quaternion(0,0,0,1));var h=this._addMaterial(e,f),i=new CANNON.RigidBody(d,b,h);return g&&(i.quaternion.x=g.x,i.quaternion.z=g.y,i.quaternion.y=g.z,i.quaternion.w=-g.w),i.position.set(c.position.x,c.position.z,c.position.y),this._world.add(i),this._registeredMeshes.push({mesh:c,body:i,material:h}),i},b.prototype.registerMeshesAsCompound=function(a,b){for(var c=new CANNON.Compound,d=0;d<a.length;d++){var e=a[d].mesh,f=this.registerMesh(e,a[d].impostor);0==d?c.addChild(f,new CANNON.Vec3(0,0,0)):c.addChild(f,new CANNON.Vec3(e.position.x,e.position.z,e.position.y))}var g=a[0].mesh,h=this._createRigidBodyFromShape(c,g,b.mass,b.friction,b.restitution);return h.parts=a,h},b.prototype._unbindBody=function(a){for(var b=0;b<this._registeredMeshes.length;b++){var c=this._registeredMeshes[b];c.body===a&&(c.body=null)}},b.prototype.unregisterMesh=function(a){for(var b=0;b<this._registeredMeshes.length;b++){var c=this._registeredMeshes[b];if(c.mesh===a)return c.body&&(this._world.remove(c.body),this._unbindBody(c.body)),void this._registeredMeshes.splice(b,1)}},b.prototype.applyImpulse=function(a,b,c){for(var d=new CANNON.Vec3(c.x,c.z,c.y),e=new CANNON.Vec3(b.x,b.z,b.y),f=0;f<this._registeredMeshes.length;f++){var g=this._registeredMeshes[f];if(g.mesh===a)return void g.body.applyImpulse(e,d)}},b.prototype.createLink=function(a,b,c,d){for(var e=null,f=null,g=0;g<this._registeredMeshes.length;g++){var h=this._registeredMeshes[g];h.mesh===a?e=h.body:h.mesh===b&&(f=h.body)}if(!e||!f)return!1;var i=new CANNON.PointToPointConstraint(e,new CANNON.Vec3(c.x,c.z,c.y),f,new CANNON.Vec3(d.x,d.z,d.y));return this._world.addConstraint(i),!0},b.prototype.dispose=function(){for(;this._registeredMeshes.length;)this.unregisterMesh(this._registeredMeshes[0].mesh)},b.prototype.isSupported=function(){return void 0!==window.CANNON},b}();a.CannonJSPlugin=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(){function a(a){this._actionManager=a}return a.prototype.isValid=function(){return!0},a.prototype._getProperty=function(a){return this._actionManager._getProperty(a)},a.prototype._getEffectiveTarget=function(a,b){return this._actionManager._getEffectiveTarget(a,b)},a}();a.Condition=b;var c=function(a){function b(c,d,e,f,g){"undefined"==typeof g&&(g=b.IsEqual),a.call(this,c),this.propertyPath=e,this.value=f,this.operator=g,this._target=this._getEffectiveTarget(d,this.propertyPath),this._property=this._getProperty(this.propertyPath)}return __extends(b,a),Object.defineProperty(b,"IsEqual",{get:function(){return b._IsEqual},enumerable:!0,configurable:!0}),Object.defineProperty(b,"IsDifferent",{get:function(){return b._IsDifferent},enumerable:!0,configurable:!0}),Object.defineProperty(b,"IsGreater",{get:function(){return b._IsGreater},enumerable:!0,configurable:!0}),Object.defineProperty(b,"IsLesser",{get:function(){return b._IsLesser},enumerable:!0,configurable:!0}),b.prototype.isValid=function(){switch(this.operator){case b.IsGreater:return this._target[this._property]>this.value;case b.IsLesser:return this._target[this._property]<this.value;case b.IsEqual:case b.IsDifferent:var a;return a=this.value.equals?this.value.equals(this._target[this._property]):this.value===this._target[this._property],this.operator===b.IsEqual?a:!a}return!1},b._IsEqual=0,b._IsDifferent=1,b._IsGreater=2,b._IsLesser=3,b}(b);a.ValueCondition=c;var d=function(a){function b(b,c){a.call(this,b),this.predicate=c}return __extends(b,a),b.prototype.isValid=function(){return this.predicate()},b}(b);a.PredicateCondition=d;var e=function(a){function b(b,c,d){a.call(this,b),this.value=d,this._target=c}return __extends(b,a),b.prototype.isValid=function(){return this._target.state===this.value},b}(b);a.StateCondition=e}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a,b){this.trigger=a,this._nextActiveAction=this,this._condition=b}return a.prototype._prepare=function(){},a.prototype._executeCurrent=function(a){if(this._condition){var b=this._actionManager.getScene().getRenderId();if(this._condition._evaluationId===b){if(!this._condition._currentResult)return}else{if(this._condition._evaluationId=b,!this._condition.isValid())return void(this._condition._currentResult=!1);this._condition._currentResult=!0}}this._nextActiveAction.execute(a),this._nextActiveAction=this._nextActiveAction._child?this._nextActiveAction._child:this},a.prototype.execute=function(){},a.prototype.then=function(a){return this._child=a,a._actionManager=this._actionManager,a._prepare(),a},a.prototype._getProperty=function(a){return this._actionManager._getProperty(a)},a.prototype._getEffectiveTarget=function(a,b){return this._actionManager._getEffectiveTarget(a,b)},a}();a.Action=b}(BABYLON||(BABYLON={}));var BABYLON;!function(a){var b=function(){function a(a,b,c,d){this.source=a,this.pointerX=b,this.pointerY=c,this.meshUnderPointer=d}return a.CreateNew=function(b){var c=b.getScene();return new a(b,c.pointerX,c.pointerY,c.meshUnderPointer)},a}();a.ActionEvent=b;var c=function(){function b(a){this.actions=new Array,this._scene=a}return Object.defineProperty(b,"NothingTrigger",{get:function(){return b._NothingTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnPickTrigger",{get:function(){return b._OnPickTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnLeftPickTrigger",{get:function(){return b._OnLeftPickTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnRightPickTrigger",{get:function(){return b._OnRightPickTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnCenterPickTrigger",{get:function(){return b._OnCenterPickTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnPointerOverTrigger",{get:function(){return b._OnPointerOverTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnPointerOutTrigger",{get:function(){return b._OnPointerOutTrigger},enumerable:!0,configurable:!0}),Object.defineProperty(b,"OnEveryFrameTrigger",{get:function(){return b._OnEveryFrameTrigger},enumerable:!0,configurable:!0}),b.prototype.getScene=function(){return this._scene},b.prototype.registerAction=function(c){return c.trigger===b.OnEveryFrameTrigger&&this.getScene().actionManager!==this?(a.Tools.Warn("OnEveryFrameTrigger can only be used with scene.actionManager"),null):(this.actions.push(c),c._actionManager=this,c._prepare(),c)},b.prototype.processTrigger=function(a,b){for(var c=0;c<this.actions.length;c++){var d=this.actions[c];d.trigger===a&&d._executeCurrent(b)}},b.prototype._getEffectiveTarget=function(a,b){for(var c=b.split("."),d=0;d<c.length-1;d++)a=a[c[d]];return a},b.prototype._getProperty=function(a){var b=a.split(".");return b[b.length-1]},b._NothingTrigger=0,b._OnPickTrigger=1,b._OnLeftPickTrigger=2,b._OnRightPickTrigger=3,b._OnCenterPickTrigger=4,b._OnPointerOverTrigger=5,b._OnPointerOutTrigger=6,b._OnEveryFrameTrigger=7,b}();a.ActionManager=c}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(a,c,d,e,f,g,h){"undefined"==typeof f&&(f=1e3),b.call(this,a,g),this.propertyPath=d,this.value=e,this.duration=f,this.stopOtherAnimations=h,this._target=c}return __extends(c,b),c.prototype._prepare=function(){this._target=this._getEffectiveTarget(this._target,this.propertyPath),this._property=this._getProperty(this.propertyPath)},c.prototype.execute=function(){var b,c=this._actionManager.getScene(),d=[{frame:0,value:this._target[this._property]},{frame:100,value:this.value}];if("number"==typeof this.value)b=a.Animation.ANIMATIONTYPE_FLOAT;else if(this.value instanceof a.Color3)b=a.Animation.ANIMATIONTYPE_COLOR3;else if(this.value instanceof a.Vector3)b=a.Animation.ANIMATIONTYPE_VECTOR3;else if(this.value instanceof a.Matrix)b=a.Animation.ANIMATIONTYPE_MATRIX;else{if(!(this.value instanceof a.Quaternion))return void a.Tools.Warn("InterpolateValueAction: Unsupported type ("+typeof this.value+")");b=a.Animation.ANIMATIONTYPE_QUATERNION}var e=new a.Animation("InterpolateValueAction",this._property,100*(1e3/this.duration),b,a.Animation.ANIMATIONLOOPMODE_CONSTANT);e.setKeys(d),this.stopOtherAnimations&&c.stopAnimation(this._target),c.beginDirectAnimation(this._target,[e],0,100)},c}(a.Action);a.InterpolateValueAction=b}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(a){function b(b,c,d,e){a.call(this,b,e),this.propertyPath=d,this._target=c}return __extends(b,a),b.prototype._prepare=function(){this._target=this._getEffectiveTarget(this._target,this.propertyPath),this._property=this._getProperty(this.propertyPath)},b.prototype.execute=function(){this._target[this._property]=!this._target[this._property]},b}(a.Action);a.SwitchBooleanAction=b;var c=function(a){function b(b,c,d,e){a.call(this,b,e),this.value=d,this._target=c}return __extends(b,a),b.prototype.execute=function(){this._target.state=this.value},b}(a.Action);a.SetStateAction=c;var d=function(a){function b(b,c,d,e,f){a.call(this,b,f),this.propertyPath=d,this.value=e,this._target=c}return __extends(b,a),b.prototype._prepare=function(){this._target=this._getEffectiveTarget(this._target,this.propertyPath),this._property=this._getProperty(this.propertyPath)},b.prototype.execute=function(){this._target[this._property]=this.value},b}(a.Action);a.SetValueAction=d;var e=function(b){function c(a,c,d,e,f){b.call(this,a,f),this.propertyPath=d,this.value=e,this._target=c}return __extends(c,b),c.prototype._prepare=function(){this._target=this._getEffectiveTarget(this._target,this.propertyPath),this._property=this._getProperty(this.propertyPath),"number"!=typeof this._target[this._property]&&a.Tools.Warn("Warning: IncrementValueAction can only be used with number values")},c.prototype.execute=function(){this._target[this._property]+=this.value},c}(a.Action);a.IncrementValueAction=e;var f=function(a){function b(b,c,d,e,f,g){a.call(this,b,g),this.from=d,this.to=e,this.loop=f,this._target=c}return __extends(b,a),b.prototype._prepare=function(){},b.prototype.execute=function(){var a=this._actionManager.getScene();a.beginAnimation(this._target,this.from,this.to,this.loop)},b}(a.Action);a.PlayAnimationAction=f;var g=function(a){function b(b,c,d){a.call(this,b,d),this._target=c}return __extends(b,a),b.prototype._prepare=function(){},b.prototype.execute=function(){var a=this._actionManager.getScene();a.stopAnimation(this._target)},b}(a.Action);a.StopAnimationAction=g;var h=function(b){function c(c,d){"undefined"==typeof c&&(c=a.ActionManager.NothingTrigger),b.call(this,c,d)}return __extends(c,b),c.prototype.execute=function(){},c}(a.Action);a.DoNothingAction=h;var i=function(a){function b(b,c,d){a.call(this,b,d),this.children=c}return __extends(b,a),b.prototype._prepare=function(){for(var a=0;a<this.children.length;a++)this.children[a]._actionManager=this._actionManager,this.children[a]._prepare()},b.prototype.execute=function(a){for(var b=0;b<this.children.length;b++)this.children[b].execute(a)},b}(a.Action);a.CombineAction=i;var j=function(a){function b(b,c,d){a.call(this,b,d),this.func=c}return __extends(b,a),b.prototype.execute=function(a){this.func(a)},b}(a.Action);a.ExecuteCodeAction=j;var k=function(b){function c(a,c,d,e){b.call(this,a,e),this._target=c,this._parent=d}return __extends(c,b),c.prototype._prepare=function(){},c.prototype.execute=function(){if(this._target.parent!==this._parent){var b=this._parent.getWorldMatrix().clone();b.invert(),this._target.position=a.Vector3.TransformCoordinates(this._target.position,b),this._target.parent=this._parent}},c}(a.Action);a.SetParentAction=k}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(){function b(b,c,d,e,f){this.delayLoadState=a.Engine.DELAYLOADSTATE_NONE,this._totalVertices=0,this._indices=[],this.id=b,this._engine=c.getEngine(),this._meshes=[],this._scene=c,d?this.setAllVerticesData(d,e):(this._totalVertices=0,this._indices=[]),f&&this.applyToMesh(f)}return b.prototype.getScene=function(){return this._scene},b.prototype.getEngine=function(){return this._engine},b.prototype.isReady=function(){return this.delayLoadState===a.Engine.DELAYLOADSTATE_LOADED||this.delayLoadState===a.Engine.DELAYLOADSTATE_NONE},b.prototype.setAllVerticesData=function(a,b){a.applyToGeometry(this,b)},b.prototype.setVerticesData=function(b,c,d){if(this._vertexBuffers=this._vertexBuffers||{},this._vertexBuffers[b]&&this._vertexBuffers[b].dispose(),this._vertexBuffers[b]=new a.VertexBuffer(this._engine,c,b,d,0===this._meshes.length),b===a.VertexBuffer.PositionKind){var e=this._vertexBuffers[b].getStrideSize();this._totalVertices=c.length/e;for(var f=a.Tools.ExtractMinAndMax(c,0,this._totalVertices),g=this._meshes,h=g.length,i=0;h>i;i++){var j=g[i];j._resetPointsArrayCache(),j._boundingInfo=new a.BoundingInfo(f.minimum,f.maximum),j._createGlobalSubMesh(),j.computeWorldMatrix(!0)}}},b.prototype.updateVerticesData=function(b,c,d){var e=this.getVertexBuffer(b);if(e&&(e.update(c),b===a.VertexBuffer.PositionKind)){var f;if(d){var g=e.getStrideSize();this._totalVertices=c.length/g,f=a.Tools.ExtractMinAndMax(c,0,this._totalVertices)}for(var h=this._meshes,i=h.length,j=0;i>j;j++){var k=h[j];k._resetPointsArrayCache(),d&&(k._boundingInfo=new a.BoundingInfo(f.minimum,f.maximum))}}},b.prototype.getTotalVertices=function(){return this.isReady()?this._totalVertices:0},b.prototype.getVerticesData=function(a){var b=this.getVertexBuffer(a);return b?b.getData():null},b.prototype.getVertexBuffer=function(a){return this.isReady()?this._vertexBuffers[a]:null},b.prototype.getVertexBuffers=function(){return this.isReady()?this._vertexBuffers:null},b.prototype.isVerticesDataPresent=function(a){return this._vertexBuffers?void 0!==this._vertexBuffers[a]:this._delayInfo?-1!==this._delayInfo.indexOf(a):!1},b.prototype.getVerticesDataKinds=function(){var a=[];if(!this._vertexBuffers&&this._delayInfo)for(var b in this._delayInfo)a.push(b);else for(b in this._vertexBuffers)a.push(b);return a},b.prototype.setIndices=function(a){this._indexBuffer&&this._engine._releaseBuffer(this._indexBuffer),this._indices=a,0!==this._meshes.length&&this._indices&&(this._indexBuffer=this._engine.createIndexBuffer(this._indices));for(var b=this._meshes,c=b.length,d=0;c>d;d++)b[d]._createGlobalSubMesh()},b.prototype.getTotalIndices=function(){return this.isReady()?this._indices.length:0},b.prototype.getIndices=function(){return this.isReady()?this._indices:null},b.prototype.getIndexBuffer=function(){return this.isReady()?this._indexBuffer:null},b.prototype.releaseForMesh=function(a,b){var c=this._meshes,d=c.indexOf(a);if(-1!==d){for(var e in this._vertexBuffers)this._vertexBuffers[e].dispose();this._indexBuffer&&this._engine._releaseBuffer(this._indexBuffer)&&(this._indexBuffer=null),c.splice(d,1),a._geometry=null,0==c.length&&b&&this.dispose()}},b.prototype.applyToMesh=function(a){if(a._geometry!==this){var b=a._geometry;b&&b.releaseForMesh(a);var c=this._meshes;a._geometry=this,this._scene.pushGeometry(this),c.push(a),this.isReady()?this._applyToMesh(a):a._boundingInfo=this._boundingInfo}},b.prototype._applyToMesh=function(b){var c=this._meshes.length;for(var d in this._vertexBuffers)if(1===c&&this._vertexBuffers[d].create(),this._vertexBuffers[d]._buffer.references=c,d===a.VertexBuffer.PositionKind){b._resetPointsArrayCache();var e=a.Tools.ExtractMinAndMax(this._vertexBuffers[d].getData(),0,this._totalVertices);b._boundingInfo=new a.BoundingInfo(e.minimum,e.maximum),b._createGlobalSubMesh()}1===c&&this._indices&&(this._indexBuffer=this._engine.createIndexBuffer(this._indices)),this._indexBuffer&&(this._indexBuffer.references=c)},b.prototype.load=function(b,c){var d=this;if(this.delayLoadState!==a.Engine.DELAYLOADSTATE_LOADING){if(this.isReady())return void(c&&c());this.delayLoadState=a.Engine.DELAYLOADSTATE_LOADING,b._addPendingData(this),a.Tools.LoadFile(this.delayLoadingFile,function(e){d._delayLoadingFunction(JSON.parse(e),d),d.delayLoadState=a.Engine.DELAYLOADSTATE_LOADED,d._delayInfo=[],b._removePendingData(d);for(var f=d._meshes,g=f.length,h=0;g>h;h++)d._applyToMesh(f[h]);c&&c()},function(){},b.database)}},b.prototype.dispose=function(){for(var b=this._meshes,c=b.length,d=0;c>d;d++)this.releaseForMesh(b[d]);this._meshes=[];for(var e in this._vertexBuffers)this._vertexBuffers[e].dispose();this._vertexBuffers=[],this._totalVertices=0,this._indexBuffer&&this._engine._releaseBuffer(this._indexBuffer),this._indexBuffer=null,this._indices=[],this.delayLoadState=a.Engine.DELAYLOADSTATE_NONE,this.delayLoadingFile=null,this._delayLoadingFunction=null,this._delayInfo=[],this._boundingInfo=null;var f=this._scene.getGeometries();d=f.indexOf(this),d>-1&&f.splice(d,1)},b.prototype.copy=function(b){var c=new a.VertexData;c.indices=[];for(var d=this.getIndices(),e=0;e<d.length;e++)c.indices.push(d[e]);var f=!1,g=!1;for(var h in this._vertexBuffers)c.set(this.getVerticesData(h),h),g||(f=this.getVertexBuffer(h).isUpdatable(),g=!f);var i=new a.Geometry(b,this._scene,c,f,null);i.delayLoadState=this.delayLoadState,i.delayLoadingFile=this.delayLoadingFile,i._delayLoadingFunction=this._delayLoadingFunction;for(h in this._delayInfo)i._delayInfo=i._delayInfo||[],i._delayInfo.push(h);var j=a.Tools.ExtractMinAndMax(this.getVerticesData(a.VertexBuffer.PositionKind),0,this.getTotalVertices());return i._boundingInfo=new a.BoundingInfo(j.minimum,j.maximum),i},b.ExtractFromMesh=function(a,b){var c=a._geometry;return c?c.copy(b):null},b.RandomId=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})},b}();a.Geometry=b,function(b){!function(c){var d=function(a){function b(b,c,d,e,f){this._beingRegenerated=!0,this._canBeRegenerated=e,a.call(this,b,c,d,!1,f),this._beingRegenerated=!1}return __extends(b,a),b.prototype.canBeRegenerated=function(){return this._canBeRegenerated},b.prototype.regenerate=function(){this._canBeRegenerated&&(this._beingRegenerated=!0,this.setAllVerticesData(this._regenerateVertexData(),!1),this._beingRegenerated=!1)},b.prototype.asNewGeometry=function(b){return a.prototype.copy.call(this,b)},b.prototype.setAllVerticesData=function(b){this._beingRegenerated&&a.prototype.setAllVerticesData.call(this,b,!1)},b.prototype.setVerticesData=function(b,c){this._beingRegenerated&&a.prototype.setVerticesData.call(this,b,c,!1)},b.prototype._regenerateVertexData=function(){throw new Error("Abstract method")},b.prototype.copy=function(){throw new Error("Must be overriden in sub-classes.")},b}(b);c._Primitive=d;var e=function(b){function c(a,c,d,e,f){this.size=d,b.call(this,a,c,this._regenerateVertexData(),e,f)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateBox(this.size)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.size,this.canBeRegenerated(),null)},c}(d);c.Box=e;var f=function(b){function c(a,c,d,e,f,g){this.segments=d,this.diameter=e,b.call(this,a,c,this._regenerateVertexData(),f,g)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateSphere(this.segments,this.diameter)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.segments,this.diameter,this.canBeRegenerated(),null)},c}(d);c.Sphere=f;var g=function(b){function c(a,c,d,e,f,g,h,i){this.height=d,this.diameterTop=e,this.diameterBottom=f,this.tessellation=g,b.call(this,a,c,this._regenerateVertexData(),h,i)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateCylinder(this.height,this.diameterTop,this.diameterBottom,this.tessellation)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.height,this.diameterTop,this.diameterBottom,this.tessellation,this.canBeRegenerated(),null)},c}(d);c.Cylinder=g;var h=function(b){function c(a,c,d,e,f,g,h){this.diameter=d,this.thickness=e,this.tessellation=f,b.call(this,a,c,this._regenerateVertexData(),g,h)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateTorus(this.diameter,this.thickness,this.tessellation)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.diameter,this.thickness,this.tessellation,this.canBeRegenerated(),null)},c}(d);c.Torus=h;var i=function(b){function c(a,c,d,e,f,g,h){this.width=d,this.height=e,this.subdivisions=f,b.call(this,a,c,this._regenerateVertexData(),g,h)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateGround(this.width,this.height,this.subdivisions)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.width,this.height,this.subdivisions,this.canBeRegenerated(),null)},c}(d);c.Ground=i;var j=function(b){function c(a,c,d,e,f){this.size=d,b.call(this,a,c,this._regenerateVertexData(),e,f)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreatePlane(this.size)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.size,this.canBeRegenerated(),null)},c}(d);c.Plane=j;var k=function(b){function c(a,c,d,e,f,g,h,i,j,k){this.radius=d,this.tube=e,this.radialSegments=f,this.tubularSegments=g,this.p=h,this.q=i,b.call(this,a,c,this._regenerateVertexData(),j,k)}return __extends(c,b),c.prototype._regenerateVertexData=function(){return a.VertexData.CreateTorusKnot(this.radius,this.tube,this.radialSegments,this.tubularSegments,this.p,this.q)},c.prototype.copy=function(a){return new c(a,this.getScene(),this.radius,this.tube,this.radialSegments,this.tubularSegments,this.p,this.q,this.canBeRegenerated(),null)},c}(d);c.TorusKnot=k}(b.Primitives||(b.Primitives={}));b.Primitives}(a.Geometry||(a.Geometry={}));var b=a.Geometry}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(){function b(a){var b=this;this.babylonGamepads=[],this.oneGamepadConnected=!1,this.isMonitoring=!1,this.gamepadEventSupported="GamepadEvent"in window,this.gamepadSupportAvailable=navigator.getGamepads||!!navigator.webkitGetGamepads||!!navigator.msGetGamepads||!!navigator.webkitGamepads,this.buttonADataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA9aSURBVHja7FtpbBzneX7m3otcihSpm9Z9UJalxPKhVLZlp6ktNzEaxE0CtAnQAgnSoPWPBi3syuiPwordFi5Qt2haFygCoylSV4Vby6os1I3kOLYrS65kXXQoypJJSaFEUTyXy925+rzfzC6HFFlL1kpAIe7i5czO7H7zPs97ft8MtTAMcSu/dNzirxkCZgiYIWCGgBkCZgi4hV/mDR5fSxAt+0ZiX0ucDxMSTJLK+f83BFSA6TFgK75OclshouKBFbA+xaV4k7Z+fD6sNRlmjYFXQMu4NiUVS/oHe5/ecnHo3MYxd7QthN9UcsdW6FqEPwgDOFbqpAajL2VlTrTULzj4Ow8+s4+nipSxWMoxIUkyrl/pGswFtIR7WzHgDCX77K7vfHNkbOA+AryjYZadb27OIJdzCNZBKmXw4kbk35qPsTEfJbeEkZESentHMdBfGtY142gu1bDvqV/925f4tQJlNCaj4hXX7RHXS0AFuJEAXvfHr/zmk67vPjir0V68aFEe8xtuQ6O1FHlrEXLmHBiaDUtzYBlpNYjrF+GFZfhhCcPeBQy53ehzT+H8QBe6uwfRf7l8xjKsvX/y5X98jl8fThDhJ4i46QQkrS5I6v7oX7/++77vPtLUlFnZtnIRlubvxRxnHbJmE79sxD/SqG0oZk8MFarRqufUkQAFrxcXSkfx0eB+nOggKX2jHYZhvf79r/z4L2IiipO84aYRkASfefnAX695p3P3c9mM/UufuaMVdzRvxVx7A0xaWdOMqVULJ6Z3TZv6KmHo0ztK6CkfxpHe3Th0pAuF0fLbn1u+9cmv3vW77bE3fGoSPi0BVfAvvPEHm9rPv//iooWz5m9Z/wCWZx+Go9UrN48QTD9IGMZ1cJIzTPisRQclPMrhME4W9mDfB2+i+2z/+TXz7/z2E7/85+9OIuGGE6BV3H77zm/d33nx6Ktr18zFg2t+DQude2n1tLJ8tcJ90vDhpG5Am7qTkJAQErywiLOld7G3/d9xvL0Hy1vWPbbtS3//00Q4hDeaAFXintrx1fu7+jp2r13bgofX/gaazbVkJQdLT9P6VqRFDSu2hIgXlBUBLgtCr3cce47/CMePX0Rr08qtzz7+8k8TpfKGtcKq1jPZre7oObyjdWkGd628l7AXwvMCeL7HjO6qrS8S1E5kTE9tfbiur665ccU9EB1EF9Ep0WXesEZIJb9j5/b/XUtzNrt29Rw0og2lchmBVqLo8LSAHlCixbTpddGm8Y7pjkttCCUP+JQy3FiatNuxdvUx9F4ayopO/OL9sQeEN4oA/eHn577oWPbGVes11PsrUBxjDafze1Te1VzouqnK2TgmLQljQqmrnAsT+iaPVb5b2co7EC+QhBgUeM1R1AcrsGp9Jy6+4W8U3fZ8r+e3EnOI2uaAX3l+zgNB4O9rW5/B8tY5WGo9BtOrJ4uMfUl+uj0B8HTmPXj8Pex86xVEnTDBBSE2r78fX9i09RPyZfT2A5ceIMSPwDOH8JH7Kk5+fAHtR0Zh6MZ9e7534Wc3wgO0sXLhD9OpFOa0egjGMhguD8BgTJooMfPbV1h/umz25ondcFP90IzY2iTgrfY9uH31aqSc9CeSEHkBEyITv28M8XMGc2/z0HGCpWCs8BS/9sWrDYOrJuCBZ+vu5sUfXbicia5kYGzUw4DWTwJKbApSjHuTBBjT2H68zg0MD4KlEwabZi0Y7wd85u/3O9/B6sVrPlEXeiF9nMmRxPt6Qf4y/HyIbh3HwkdF1zefGt5fUwK8wP2WAGwh02MFE/5ogYr3Qg/STL0W3d8aB1ppa+Pw0uI2Tz6/134Mg+UoIGZlZ2HMLaJYHkPICr6//RBamvPj/UA4dYKsegGrXqAXMaqNsDT6SreOY5Gu/FptCeBFN+caAphGiKFiGaOjA3AJHoGt6r7GgNbjqjo5yQkBUVHQ8PaJExjiaZ2yue12nO27gCNdHSptvf/xGdw11I2UZSmvCIJgQiJMhoEfeqpNDvUSRvUB5hMX9fUecg0aBi+Hm2uaAz633bmbm1VN8+h07LfKJdkOkQB2fL4BTlsj8No4YLG2putMSjwjp3QNvZdH8YsiExV501isFjU30lpF7D8dVfCA8sFHp7BuWYtaIwiCsCrCSDVhh9IX8k0CoHsoMQ84FrfFAE3zQAK0VaLzO9tK79XKAxSj+aYALt3XLfNipZD1v492YexrE/sP0zBgUIQIoYaflAXbz16CzyY6YKqYl8uheTarRioD7xAxCQHUpv18L1Yud+Iloujtk4zQo9WZcKURqjbHclzKvj0Gvcw8UA6oY2WqonSuGQGb5I+TJgEFEsB4daXzc0eopabcX13W0BXwgAnRZL4Q62s8ppnR/pFz/QjF+tRvxeIsY/cizGwRt83P4czACL8HdA1JUivCNGVogvdkNkgaGDNe4CvXFyJ8n+B5XGLJ1FmJXJ53AzjZKgGbatkKL5c/liNWIPO8uM/4VO2uKCQZjLmBqQAGJ4EmI8NMabDTOuyUobYXmPlCEpiqA1IkYdWSBpjpEDl6wsrF9aAjqHNOPXDyXAGprAknY5B0btOGGk/GlfE1taqofCNuuYNIJ+omOiZ1rpUHtEYWjkpWoP5EWV2sb5isA7aIQTHHxaIniNADui8PIs0Eb6SY/Z0UQc+j+mXYuoM7Vy/Age7zkBUyCZGLhRLSOYcWpfXFA1wPhqup8JNKq5UkKeoqSHxPLSoqnUQtw5ioc60IyE/VkOji8mYE2nZELNgCXLaOkGDFJBg4OzCMDEcxCfAzS1pQX5fHSNDLClLGwmwzls6vQ09hGFJYegdZ1hha2bqIBNelB5Qjog02TzpFNVEquYpMuTSYr/lcQPKPJHoRQ8W1GYO3lDgpO9pPWTEZEQGnuodg5Hyk66Lyd8fKOQQ6gqyWict7GeuWz8HQyWEFw+bB7ksF3Nk2V1nfpZTLQqSLslzXlDmHpsQ1osVoy/Solwf/GpdErpaAQUqjWxL2GWcWaSfAMIis7RBwiuCdtD1OgmNHBJCg7r4uZBnbdjaaq+3YewB+USYicY8juYPnMtloqdCjG3f39eO+3JKIAFadSiiZigBdgdcqItMxsmZbIbvUIKlzzQjoEgLGRjU2KTp8AjRCkzEnAG0mtQh8Ku0oAqok8JzP+Lw0MkB3jpKjKpapaL5WKZxafDdBqoC6O8LtyMAQhoZdzG7MwLU8FUYKPINcl+qimismRj26v2I71I3jDxfdpM41I6CTsmG4X0djKyc8RYu9t0Vl2QJbBJ5xFPiICJIg1hdhR3fs5HnWeldleZXABLA98b7Y5HtjkgwNEtbTN4iFC5oI3I1CTsAbsfVjAizJB3Qbx9HphRp6eqr3TDprSYA0FI/3ntOxbpUNM2OjpEcE6HYEWkhIKw+ICeBxi+T09F1WZU+iJq2n8fRDf4Ymu3XSrcOIgg8H9uOFn31fNUVC0oddZ7B5YxtDwlTgo66SEici2fokwCJjju0hw7J54WypQsB7tSRAza+H+nld30Y+m2b7SS+Qn9PKFl1egRciHIfWpxC8x+7tdA97+3zUcNyWX4Ci/THOoD2x/hmlQTox+3gDjWYeg/4gmF853xjBpUsjaGnJR24fu36FNzX5pmfY7EPStlSLIgb6gwk616QRYk8tS88/l/2PT/loyqbQkEmhPpNGNp1CmvtieQHvONGtL4sdy9Hjp5kkpTWmSzM7L529hErHs0cCpt2qW00BymDV3JXSU8HkAXKIjtNnedxS48m4Mr5cR9YlMrx+XTqNRmbP2ZkMOjvHKir/PNa5pouiitFjH44iZ6YwO5tFAy+eo6SdpOUJyhBQTJR+HT9HYLJaFve0PqQmTQLaVOCdmIRIWE+wrmWTzG8iAugF7qgWjSWkGbYa32EjJQTkGFv5dBZNJKCeHdb77UPXZP1rWhKLZ4Rqjv2Fz86lLMNlpusCY9BnqTNUIyTgrVhhs7rVq2KoW2TSxWlXLOCqWX4svmpzZdEjWvgQcdVWPnu+i4ClUS+HyLIFnsVf/9eBduw8eKYy2D1XMxO8Jg+IB9wl+3s/uAC3qKMpXY88m/ecnUHaSis3Na8Ab1UtaCh3j1y+sm8m9o0J+9Fv9MR4Zhw6DufTWasOebsOs+xZKHJOtvtQtertulrwV+0BtH5yWvyW7CxubsCTX9+KUQZ4ga7qmdGUFmrya8QWHwcxlReMF8Mw4QETrR8oy7tq2ivH5Tvya8n8aXZMGc4An/nRDpy52FfR8b5KCJCImt8YkYF/KDtnegfwz3sPodGajQajCTk9z/4mQ6iphMWv9AA9IeMWdyYdn+gBkVc5amwHWV6lHvVaI2YZzfinN95Ngv/htcT/p31CRNbdV8l8e++xD5HPNeHxhx5Bgf18kTN5T1kvjBfEjGjBJCai4gnjHqAnlvqS8e9NeujEjEul/NokDbai4V/2voafHD1S0evdWLeb8ojMNyly5fS//ffbcD0L33j4K4RX4rtMh/UUGLXmr6BWXN9MEFAhYfzmZ6hcXI+TpISRH8061Ui68gTWGUJP4aU9P8ZrB39S+Xkx1ummPSMkbebnJcxU1jm4D5eGhvB7j32HJcpUJHhxLIfxTZpxwGa8eKrHC51a9Tmp+N5P1RsQ01cJAwEflHw8/+pfYn/HgaQ+n7/a1vd6k+BUS2XvVD401TXhu488gQ0r71QUuLJsrWT8mSYtfkBMm0BAmFhNrgDX4oRqqeaJMw4c6TyIv/qPP0Xf8KUJ6sXuP1XluuEEyGsD5TXKgsqBNQvW4RtbnkDb4ttJQlGt/IQqLMJE7tWqOSBZCSrL6dFSqq3AnzhzDC/tewHt5w4nr3suvgN0+P8o3TeegFe3vYDHtj+xhLt/Q3kkeW5d693YuuHXsWHZPcixW4tCwo+trVU9QEs8G6HFqW5kdBiHTu3H64dfxpGuK8r665Tv7tz2D6e/tP23cT0E1OA5QR2iiIbs1i9u/9qTPPC12CtwlIofjZVvW/BZ3LVsC5bPW4u5DQuxaPay2NpRIuy61IkLA+dw8hdHceDUPpw49z9TXUysvWPXtl3bQ4yQtMJ1a18DAsbvRO/atvM5DXXPPbp9yzP8+GXBXTkngKYBdTWvE5RXdm87+HQEfLh2T57UIAdM95Js9+04LKSDbLzG31+Omxpx9xfxKR6AukkhMP0aKuUHsag5VEzE3fGSddsUVu6KFzIE+H/iJry0mX+bu8VfMwTMEDBDwAwBMwTMEHALv/5XgAEASpR5N6rB30UAAAAASUVORK5CYII=",this._callbackGamepadConnected=a,this.gamepadSupportAvailable?(this.gamepadEventSupported?(window.addEventListener("gamepadconnected",function(a){b._onGamepadConnected(a)
},!1),window.addEventListener("gamepaddisconnected",function(a){b._onGamepadDisconnected(a)},!1)):this._startMonitoringGamepads(),this.oneGamepadConnected||this._insertGamepadDOMInstructions()):this._insertGamepadDOMNotSupported()}return b.prototype._insertGamepadDOMInstructions=function(){b.gamepadDOMInfo=document.createElement("div");var a=document.createElement("img");a.src=this.buttonADataURL;var c=document.createElement("span");c.innerHTML="<strong>to activate gamepad</strong>",b.gamepadDOMInfo.appendChild(a),b.gamepadDOMInfo.appendChild(c),b.gamepadDOMInfo.style.position="absolute",b.gamepadDOMInfo.style.width="100%",b.gamepadDOMInfo.style.height="48px",b.gamepadDOMInfo.style.bottom="0px",b.gamepadDOMInfo.style.backgroundColor="rgba(1, 1, 1, 0.15)",b.gamepadDOMInfo.style.textAlign="center",b.gamepadDOMInfo.style.zIndex="10",a.style.position="relative",a.style.bottom="8px",c.style.position="relative",c.style.fontSize="32px",c.style.bottom="32px",c.style.color="green",document.body.appendChild(b.gamepadDOMInfo)},b.prototype._insertGamepadDOMNotSupported=function(){b.gamepadDOMInfo=document.createElement("div");var a=document.createElement("span");a.innerHTML="<strong>gamepad not supported</strong>",b.gamepadDOMInfo.appendChild(a),b.gamepadDOMInfo.style.position="absolute",b.gamepadDOMInfo.style.width="100%",b.gamepadDOMInfo.style.height="40px",b.gamepadDOMInfo.style.bottom="0px",b.gamepadDOMInfo.style.backgroundColor="rgba(1, 1, 1, 0.15)",b.gamepadDOMInfo.style.textAlign="center",b.gamepadDOMInfo.style.zIndex="10",a.style.position="relative",a.style.fontSize="32px",a.style.color="red",document.body.appendChild(b.gamepadDOMInfo)},b.prototype._onGamepadConnected=function(a){var b=this._addNewGamepad(a.gamepad);this._callbackGamepadConnected&&this._callbackGamepadConnected(b),this._startMonitoringGamepads()},b.prototype._addNewGamepad=function(c){this.oneGamepadConnected||(this.oneGamepadConnected=!0,b.gamepadDOMInfo&&(document.body.removeChild(b.gamepadDOMInfo),b.gamepadDOMInfo=null));var d;return d=-1!==c.id.search("Xbox 360")||-1!==c.id.search("xinput")?new a.Xbox360Pad(c.id,c.index,c):new a.GenericPad(c.id,c.index,c),this.babylonGamepads.push(d),d},b.prototype._onGamepadDisconnected=function(a){for(var b in this.babylonGamepads)if(this.babylonGamepads[b].index==a.gamepad.index){this.babylonGamepads.splice(b,1);break}0==this.babylonGamepads.length&&this._stopMonitoringGamepads()},b.prototype._startMonitoringGamepads=function(){this.isMonitoring||(this.isMonitoring=!0,this._checkGamepadsStatus())},b.prototype._stopMonitoringGamepads=function(){this.isMonitoring=!1},b.prototype._checkGamepadsStatus=function(){var a=this;this._updateGamepadObjects();for(var b in this.babylonGamepads)this.babylonGamepads[b].update();this.isMonitoring&&(window.requestAnimationFrame?window.requestAnimationFrame(function(){a._checkGamepadsStatus()}):window.mozRequestAnimationFrame?window.mozRequestAnimationFrame(function(){a._checkGamepadsStatus()}):window.webkitRequestAnimationFrame&&window.webkitRequestAnimationFrame(function(){a._checkGamepadsStatus()}))},b.prototype._updateGamepadObjects=function(){for(var a=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads():[],b=0;b<a.length;b++)if(a[b])if(a[b].index in this.babylonGamepads)this.babylonGamepads[b].browserGamepad=a[b];else{var c=this._addNewGamepad(a[b]);this._callbackGamepadConnected&&this._callbackGamepadConnected(c)}},b}();a.Gamepads=b;var c=function(){function a(a,b){this.x=a,this.y=b}return a}();a.StickValues=c;var d=function(){function a(a,b,c){this.id=a,this.index=b,this.browserGamepad=c,this.browserGamepad.axes.length>=2&&(this._leftStick={x:this.browserGamepad.axes[0],y:this.browserGamepad.axes[1]}),this.browserGamepad.axes.length>=4&&(this._rightStick={x:this.browserGamepad.axes[2],y:this.browserGamepad.axes[3]})}return a.prototype.onleftstickchanged=function(a){this._onleftstickchanged=a},a.prototype.onrightstickchanged=function(a){this._onrightstickchanged=a},Object.defineProperty(a.prototype,"leftStick",{get:function(){return this._leftStick},set:function(a){!this._onleftstickchanged||this._leftStick.x===a.x&&this._leftStick.y===a.y||this._onleftstickchanged(a),this._leftStick=a},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"rightStick",{get:function(){return this._rightStick},set:function(a){!this._onrightstickchanged||this._rightStick.x===a.x&&this._rightStick.y===a.y||this._onrightstickchanged(a),this._rightStick=a},enumerable:!0,configurable:!0}),a.prototype.update=function(){this._leftStick&&(this.leftStick={x:this.browserGamepad.axes[0],y:this.browserGamepad.axes[1]}),this._rightStick&&(this.rightStick={x:this.browserGamepad.axes[2],y:this.browserGamepad.axes[3]})},a}();a.Gamepad=d;var e=function(a){function b(b,c,d){a.call(this,b,c,d),this.id=b,this.index=c,this.gamepad=d,this._buttons=new Array(d.buttons.length)}return __extends(b,a),b.prototype.onbuttondown=function(a){this._onbuttondown=a},b.prototype.onbuttonup=function(a){this._onbuttonup=a},b.prototype._setButtonValue=function(a,b,c){return a!==b&&(this._onbuttondown&&1===a&&this._onbuttondown(c),this._onbuttonup&&0===a&&this._onbuttonup(c)),a},b.prototype.update=function(){a.prototype.update.call(this);for(var b=0;b<this._buttons.length;b++)this._buttons[b]=this._setButtonValue(this.gamepad.buttons[b].value,this._buttons[b],b)},b}(d);a.GenericPad=e,function(a){a[a.A=0]="A",a[a.B=1]="B",a[a.X=2]="X",a[a.Y=3]="Y",a[a.Start=4]="Start",a[a.Back=5]="Back",a[a.LB=6]="LB",a[a.RB=7]="RB",a[a.LeftStick=8]="LeftStick",a[a.RightStick=9]="RightStick"}(a.Xbox360Button||(a.Xbox360Button={}));a.Xbox360Button;!function(a){a[a.Up=0]="Up",a[a.Down=1]="Down",a[a.Left=2]="Left",a[a.Right=3]="Right"}(a.Xbox360Dpad||(a.Xbox360Dpad={}));var f=(a.Xbox360Dpad,function(a){function b(){a.apply(this,arguments),this._leftTrigger=0,this._rightTrigger=0,this._buttonA=0,this._buttonB=0,this._buttonX=0,this._buttonY=0,this._buttonBack=0,this._buttonStart=0,this._buttonLB=0,this._buttonRB=0,this._buttonLeftStick=0,this._buttonRightStick=0,this._dPadUp=0,this._dPadDown=0,this._dPadLeft=0,this._dPadRight=0}return __extends(b,a),b.prototype.onlefttriggerchanged=function(a){this._onlefttriggerchanged=a},b.prototype.onrighttriggerchanged=function(a){this._onrighttriggerchanged=a},Object.defineProperty(b.prototype,"leftTrigger",{get:function(){return this._leftTrigger},set:function(a){this._onlefttriggerchanged&&this._leftTrigger!==a&&this._onlefttriggerchanged(a),this._leftTrigger=a},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"rightTrigger",{get:function(){return this._rightTrigger},set:function(a){this._onrighttriggerchanged&&this._rightTrigger!==a&&this._onrighttriggerchanged(a),this._rightTrigger=a},enumerable:!0,configurable:!0}),b.prototype.onbuttondown=function(a){this._onbuttondown=a},b.prototype.onbuttonup=function(a){this._onbuttonup=a},b.prototype.ondpaddown=function(a){this._ondpaddown=a},b.prototype.ondpadup=function(a){this._ondpadup=a},b.prototype._setButtonValue=function(a,b,c){return a!==b&&(this._onbuttondown&&1===a&&this._onbuttondown(c),this._onbuttonup&&0===a&&this._onbuttonup(c)),a},b.prototype._setDPadValue=function(a,b,c){return a!==b&&(this._ondpaddown&&1===a&&this._ondpaddown(c),this._ondpadup&&0===a&&this._ondpadup(c)),a},Object.defineProperty(b.prototype,"buttonA",{get:function(){return this._buttonA},set:function(a){this._buttonA=this._setButtonValue(a,this._buttonA,0)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonB",{get:function(){return this._buttonB},set:function(a){this._buttonB=this._setButtonValue(a,this._buttonB,1)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonX",{get:function(){return this._buttonX},set:function(a){this._buttonX=this._setButtonValue(a,this._buttonX,2)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonY",{get:function(){return this._buttonY},set:function(a){this._buttonY=this._setButtonValue(a,this._buttonY,3)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonStart",{get:function(){return this._buttonStart},set:function(a){this._buttonStart=this._setButtonValue(a,this._buttonStart,4)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonBack",{get:function(){return this._buttonBack},set:function(a){this._buttonBack=this._setButtonValue(a,this._buttonBack,5)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonLB",{get:function(){return this._buttonLB},set:function(a){this._buttonLB=this._setButtonValue(a,this._buttonLB,6)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonRB",{get:function(){return this._buttonRB},set:function(a){this._buttonRB=this._setButtonValue(a,this._buttonRB,7)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonLeftStick",{get:function(){return this._buttonLeftStick},set:function(a){this._buttonLeftStick=this._setButtonValue(a,this._buttonLeftStick,8)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"buttonRightStick",{get:function(){return this._buttonRightStick},set:function(a){this._buttonRightStick=this._setButtonValue(a,this._buttonRightStick,9)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"dPadUp",{get:function(){return this._dPadUp},set:function(a){this._dPadUp=this._setDPadValue(a,this._dPadUp,0)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"dPadDown",{get:function(){return this._dPadDown},set:function(a){this._dPadDown=this._setDPadValue(a,this._dPadDown,1)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"dPadLeft",{get:function(){return this._dPadLeft},set:function(a){this._dPadLeft=this._setDPadValue(a,this._dPadLeft,2)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"dPadRight",{get:function(){return this._dPadRight},set:function(a){this._dPadRight=this._setDPadValue(a,this._dPadRight,3)},enumerable:!0,configurable:!0}),b.prototype.update=function(){a.prototype.update.call(this),this.buttonA=this.browserGamepad.buttons[0].value,this.buttonB=this.browserGamepad.buttons[1].value,this.buttonX=this.browserGamepad.buttons[2].value,this.buttonY=this.browserGamepad.buttons[3].value,this.buttonLB=this.browserGamepad.buttons[4].value,this.buttonRB=this.browserGamepad.buttons[5].value,this.leftTrigger=this.browserGamepad.buttons[6].value,this.rightTrigger=this.browserGamepad.buttons[7].value,this.buttonBack=this.browserGamepad.buttons[8].value,this.buttonStart=this.browserGamepad.buttons[9].value,this.buttonLeftStick=this.browserGamepad.buttons[10].value,this.buttonRightStick=this.browserGamepad.buttons[11].value,this.dPadUp=this.browserGamepad.buttons[12].value,this.dPadDown=this.browserGamepad.buttons[13].value,this.dPadLeft=this.browserGamepad.buttons[14].value,this.dPadRight=this.browserGamepad.buttons[15].value},b}(d));a.Xbox360Pad=f}(BABYLON||(BABYLON={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},BABYLON;!function(a){var b=function(b){function c(c,d,e){var f=this;b.call(this,c,d,e),this.angularSensibility=200,this.moveSensibility=75,this._gamepads=new a.Gamepads(function(a){f._onNewGameConnected(a)})}return __extends(c,b),c.prototype._onNewGameConnected=function(a){0===a.index&&(this._gamepad=a)},c.prototype._checkInputs=function(){if(this._gamepad){var b=this._gamepad.leftStick,c=b.x/this.moveSensibility,d=b.y/this.moveSensibility;b.x=Math.abs(c)>.005?0+c:0,b.y=Math.abs(d)>.005?0+d:0;var e=this._gamepad.rightStick,f=e.x/this.angularSensibility,g=e.y/this.angularSensibility;e.x=Math.abs(f)>.001?0+f:0,e.y=Math.abs(g)>.001?0+g:0;var h=a.Matrix.RotationYawPitchRoll(this.rotation.y,this.rotation.x,0),i=a.Vector3.TransformCoordinates(new a.Vector3(b.x,0,-b.y),h);this.cameraDirection=this.cameraDirection.add(i),this.cameraRotation=this.cameraRotation.add(new a.Vector3(e.y,e.x,0))}},c.prototype.dispose=function(){},c}(a.FreeCamera);a.GamepadCamera=b}(BABYLON||(BABYLON={}));;
(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Site,GlobalReferences,Math,Samples,WebSharper,List,AnimatedTorus,Set,Cube,SceneLoading,Client,document,Option,Builder,T,Operators,Sample,Html,Client1,Default,Operators1,Unchecked,jQuery,EventsPervasives,Seq;
 Runtime.Define(Global,{
  Site:{
   AnimatedTorus:{
    Main:function(container)
    {
     var patternInput,scene,engine,light,torus;
     patternInput=GlobalReferences.initializeSample(container,640,360);
     scene=patternInput[1];
     engine=patternInput[0];
     light=new Global.BABYLON.PointLight("Sun",new Global.BABYLON.Vector3(0,0,-15),scene);
     torus=Global.BABYLON.Mesh.CreateTorus("Torus",10,1,50,scene,true);
     (new Global.BABYLON.ArcRotateCamera("Camera",0,0,0,Global.BABYLON.Vector3.Zero(),scene)).setPosition(new Global.BABYLON.Vector3(0,0,-25));
     scene.activeCamera.attachControl(GlobalReferences.canvas());
     return engine.runRenderLoop(function()
     {
      scene.render();
      torus.rotation.x=torus.rotation.x+Math.PI/-180;
      return;
     });
    },
    Sample:Runtime.Field(function()
    {
     return Samples.Build().Id("AnimatedTorus").FileName("AnimatedTorus.fs").Keywords(List.ofArray(["animation","torus"])).Render(function(container)
     {
      return AnimatedTorus.Main(container);
     }).Create();
    })
   },
   Client:{
    All:Runtime.Field(function()
    {
     return Set.Create(List.ofArray([GlobalReferences.op_BangPlus(Cube.Sample()),GlobalReferences.op_BangPlus(AnimatedTorus.Sample()),GlobalReferences.op_BangPlus(SceneLoading.Sample())]));
    }),
    Main:Runtime.Field(function()
    {
     return Client.All().Show();
    })
   },
   Cube:{
    Main:function(container)
    {
     var patternInput,scene,engine;
     patternInput=GlobalReferences.initializeSample(container,640,360);
     scene=patternInput[1];
     engine=patternInput[0];
     new Global.BABYLON.PointLight("Sun",new Global.BABYLON.Vector3(0,10,-15),scene);
     Global.BABYLON.Mesh.CreateBox("Cube",10,scene);
     new Global.BABYLON.FreeCamera("Camera",new Global.BABYLON.Vector3(0,0,-25),scene);
     scene.activeCamera.attachControl(GlobalReferences.canvas());
     return engine.runRenderLoop(function()
     {
      return scene.render();
     });
    },
    Sample:Runtime.Field(function()
    {
     return Samples.Build().Id("Cube").FileName("Cube.fs").Keywords(List.ofArray(["basics","cube"])).Render(function(container)
     {
      return Cube.Main(container);
     }).Create();
    })
   },
   GlobalReferences:{
    canvas:Runtime.Field(function()
    {
     return document.createElement("canvas");
    }),
    engine:Runtime.Field(function()
    {
     return{
      contents:{
       $:0
      }
     };
    }),
    initializeSample:function(container,width,height)
    {
     GlobalReferences.canvas().setAttribute("width",Global.String(width));
     GlobalReferences.canvas().setAttribute("height",Global.String(height));
     container.appendChild(GlobalReferences.canvas());
     Option.iter(function(engine)
     {
      return engine.stopRenderLoop();
     },GlobalReferences.engine().contents);
     GlobalReferences.engine().contents={
      $:1,
      $0:new Global.BABYLON.Engine(GlobalReferences.canvas(),true)
     };
     Option.iter(function(scene)
     {
      return scene.activeCamera.detachControl(GlobalReferences.canvas());
     },GlobalReferences.scene().contents);
     GlobalReferences.scene().contents={
      $:1,
      $0:new Global.BABYLON.Scene(GlobalReferences.op_BangBang(GlobalReferences.engine()))
     };
     return[GlobalReferences.op_BangBang(GlobalReferences.engine()),GlobalReferences.op_BangBang(GlobalReferences.scene())];
    },
    op_BangBang:function(a)
    {
     return a.contents.$0;
    },
    op_BangPlus:function(a)
    {
     return Set.Singleton(a);
    },
    scene:Runtime.Field(function()
    {
     return{
      contents:{
       $:0
      }
     };
    })
   },
   Samples:{
    Build:function()
    {
     var BId;
     BId={
      $:0
     };
     return Runtime.New(Builder,{
      BFileName:{
       $:0
      },
      BId:BId,
      BKeywords:Runtime.New(T,{
       $:0
      }),
      BRender:{
       $:0
      },
      BTitle:{
       $:0
      }
     });
    },
    Builder:Runtime.Class({
     Create:function()
     {
      var id,title;
      id=Samples.req("Id",Samples.op_PlusPlus(this.BId,this.BTitle));
      title=Operators.DefaultArg(Samples.op_PlusPlus(this.BTitle,this.BId),"Sample");
      return Runtime.New(Sample,{
       FileName:Samples.req("FileName",this.BFileName),
       Id:id,
       Keywords:this.BKeywords,
       Render:Samples.req("Render",this.BRender),
       Title:title
      });
     },
     FileName:function(x)
     {
      this.BFileName={
       $:1,
       $0:x
      };
      return this;
     },
     Id:function(x)
     {
      this.BId={
       $:1,
       $0:x
      };
      return this;
     },
     Keywords:function(x)
     {
      this.BKeywords=x;
      return this;
     },
     Render:function(x)
     {
      this.BRender={
       $:1,
       $0:x
      };
      return this;
     },
     Title:function(x)
     {
      this.BTitle={
       $:1,
       $0:x
      };
      return this;
     }
    }),
    Clear:function(el)
    {
     while(el.hasChildNodes())
      {
       el.removeChild(el.firstChild);
      }
     return;
    },
    Sample:Runtime.Class({
     Show:function()
     {
      var sMain,sSide,url,x,s=this;
      sMain=document.getElementById("sample-main");
      sSide=document.getElementById("sample-side");
      Samples.Clear(sMain);
      Samples.Clear(sSide);
      this.Render.call(null,sMain);
      url="http://github.com/intellifactory/websharper.babylonjs/blob/master/Site/"+this.FileName;
      x=Default.Div(Runtime.New(T,{
       $:0
      }));
      Operators1.OnAfterRender(function(self)
      {
       var matchValue,copy;
       matchValue=document.getElementById(s.Id);
       if(Unchecked.Equals(matchValue,null))
        {
         return null;
        }
       else
        {
         copy=matchValue.cloneNode(true);
         copy.attributes.removeNamedItem("id");
         return self.AppendN(copy);
        }
      },x);
      return Default.Div(List.ofArray([x,Operators1.add(Default.A(List.ofArray([Default.Attr().Class("btn btn-primary btn-lg"),Default.HRef(url)])),List.ofArray([Default.Text("Source")]))])).AppendTo("sample-side");
     }
    }),
    Set:Runtime.Class({
     Show:function()
     {
      var s=this;
      return jQuery(function()
      {
       var samples,select,navs;
       samples=s.$0;
       select=function(s1,dom)
       {
        jQuery("#sample-navs ul").children("li").removeClass("active");
        jQuery(dom).addClass("active");
        return s1.Show();
       };
       navs=Operators1.add(Default.UL(List.ofArray([Default.Attr().Class("nav nav-pills")])),List.mapi(function(i)
       {
        return function(s1)
        {
         var x,x1,x2;
         x=Default.LI(List.ofArray([Operators1.add(Default.A(List.ofArray([Default.HRef("#")])),List.ofArray([Default.Text(s1.Title)]))]));
         Operators1.OnAfterRender(function(self)
         {
          return i===0?select(s1,self.Dom):null;
         },x);
         x1=x;
         x2=function(self)
         {
          return function()
          {
           return select(s1,self.Dom);
          };
         };
         EventsPervasives.Events().OnClick(x2,x1);
         return x1;
        };
       },samples));
       return navs.AppendTo("sample-navs");
      });
     }
    },{
     Create:function(ss)
     {
      return Runtime.New(Set,{
       $:0,
       $0:Seq.toList(Seq.delay(function()
       {
        return Seq.collect(function(matchValue)
        {
         return matchValue.$0;
        },ss);
       }))
      });
     },
     Singleton:function(s)
     {
      return Runtime.New(Set,{
       $:0,
       $0:List.ofArray([s])
      });
     }
    }),
    op_PlusPlus:function(a,b)
    {
     return a.$==0?b:a;
    },
    req:function(name,f)
    {
     return f.$==1?f.$0:Operators.FailWith("Required property not set: "+name);
    }
   },
   SceneLoading:{
    Main:function(container)
    {
     var engine;
     engine=(GlobalReferences.initializeSample(container,640,360))[0];
     return Global.BABYLON.SceneLoader.Load("Resources/Scenes/Spaceship/","Spaceship.babylon",engine,function(scene)
     {
      return scene.executeWhenReady(function()
      {
       scene.activeCamera.attachControl(GlobalReferences.canvas());
       engine.runRenderLoop(function()
       {
        return scene.render();
       });
       GlobalReferences.scene().contents={
        $:1,
        $0:scene
       };
       return;
      });
     },function()
     {
     });
    },
    Sample:Runtime.Field(function()
    {
     return Samples.Build().Id("SceneLoading").FileName("SceneLoading.fs").Keywords(List.ofArray(["scene","external","model"])).Render(function(container)
     {
      return SceneLoading.Main(container);
     }).Create();
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Site=Runtime.Safe(Global.Site);
  GlobalReferences=Runtime.Safe(Site.GlobalReferences);
  Math=Runtime.Safe(Global.Math);
  Samples=Runtime.Safe(Site.Samples);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  List=Runtime.Safe(WebSharper.List);
  AnimatedTorus=Runtime.Safe(Site.AnimatedTorus);
  Set=Runtime.Safe(Samples.Set);
  Cube=Runtime.Safe(Site.Cube);
  SceneLoading=Runtime.Safe(Site.SceneLoading);
  Client=Runtime.Safe(Site.Client);
  document=Runtime.Safe(Global.document);
  Option=Runtime.Safe(WebSharper.Option);
  Builder=Runtime.Safe(Samples.Builder);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(WebSharper.Operators);
  Sample=Runtime.Safe(Samples.Sample);
  Html=Runtime.Safe(WebSharper.Html);
  Client1=Runtime.Safe(Html.Client);
  Default=Runtime.Safe(Client1.Default);
  Operators1=Runtime.Safe(Client1.Operators);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  jQuery=Runtime.Safe(Global.jQuery);
  EventsPervasives=Runtime.Safe(Client1.EventsPervasives);
  return Seq=Runtime.Safe(WebSharper.Seq);
 });
 Runtime.OnLoad(function()
 {
  SceneLoading.Sample();
  GlobalReferences.scene();
  GlobalReferences.engine();
  GlobalReferences.canvas();
  Cube.Sample();
  Client.Main();
  Client.All();
  AnimatedTorus.Sample();
  return;
 });
}());


if (typeof IntelliFactory !=='undefined')
  IntelliFactory.Runtime.Start();
