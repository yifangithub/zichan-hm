/*mousewheel*/
(function(a) {
    function d(b) {
        var c = b || window.event
          , d = [].slice.call(arguments, 1)
          , e = 0
          , f = !0
          , g = 0
          , h = 0;
        return b = a.event.fix(c),
        b.type = "mousewheel",
        c.wheelDelta && (e = c.wheelDelta / 120),
        c.detail && (e = -c.detail / 3),
        h = e,
        c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0,
        g = -1 * e),
        c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120),
        c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120),
        d.unshift(b, e, g, h),
        (a.event.dispatch || a.event.handle).apply(this, d)
    }
    var b = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks)
        for (var c = b.length; c; )
            a.event.fixHooks[b[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = b.length; a; )
                    this.addEventListener(b[--a], d, !1);
            else
                this.onmousewheel = d
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = b.length; a; )
                    this.removeEventListener(b[--a], d, !1);
            else
                this.onmousewheel = null 
        }
    },
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);
/*custom scrollbar*/
(function(c) {
    var b = {
        init: function(e) {
            var f = {
                set_width: false,
                set_height: false,
                horizontalScroll: false,
                scrollInertia: 950,
                mouseWheel: true,
                mouseWheelPixels: "auto",
                autoDraggerLength: true,
                autoHideScrollbar: false,
                snapAmount: null ,
                snapOffset: 0,
                scrollButtons: {
                    enable: false,
                    scrollType: "continuous",
                    scrollSpeed: "auto",
                    scrollAmount: 40
                },
                advanced: {
                    updateOnBrowserResize: true,
                    updateOnContentResize: false,
                    autoExpandHorizontalScroll: false,
                    autoScrollOnFocus: true,
                    normalizeMouseWheelDelta: false
                },
                contentTouchScroll: true,
                callbacks: {
                    onScrollStart: function() {},
                    onScroll: function() {},
                    onTotalScroll: function() {},
                    onTotalScrollBack: function() {},
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    whileScrolling: function() {}
                },
                theme: "light"
            }
              , e = c.extend(true, f, e);
            return this.each(function() {
                var m = c(this);
                if (e.set_width) {
                    m.css("width", e.set_width)
                }
                if (e.set_height) {
                    m.css("height", e.set_height)
                }
                if (!c(document).data("mCustomScrollbar-index")) {
                    c(document).data("mCustomScrollbar-index", "1")
                } else {
                    var t = parseInt(c(document).data("mCustomScrollbar-index"));
                    c(document).data("mCustomScrollbar-index", t + 1)
                }
                m.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + c(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + c(document).data("mCustomScrollbar-index"));
                var g = m.children(".mCustomScrollBox");
                if (e.horizontalScroll) {
                    g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                    var k = g.children(".mCSB_h_wrapper");
                    k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                        width: k.children().outerWidth(),
                        position: "relative"
                    }).unwrap()
                } else {
                    g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
                }
                var o = g.children(".mCSB_container");
                if (c.support.touch) {
                    o.addClass("mCS_touch")
                }
                o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                var l = g.children(".mCSB_scrollTools")
                  , h = l.children(".mCSB_draggerContainer")
                  , q = h.children(".mCSB_dragger");
                if (e.horizontalScroll) {
                    q.data("minDraggerWidth", q.width())
                } else {
                    q.data("minDraggerHeight", q.height())
                }
                if (e.scrollButtons.enable) {
                    if (e.horizontalScroll) {
                        l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")
                    } else {
                        l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")
                    }
                }
                g.bind("scroll", function() {
                    if (!m.is(".mCS_disabled")) {
                        g.scrollTop(0).scrollLeft(0)
                    }
                });
                m.data({
                    mCS_Init: true,
                    mCustomScrollbarIndex: c(document).data("mCustomScrollbar-index"),
                    horizontalScroll: e.horizontalScroll,
                    scrollInertia: e.scrollInertia,
                    scrollEasing: "mcsEaseOut",
                    mouseWheel: e.mouseWheel,
                    mouseWheelPixels: e.mouseWheelPixels,
                    autoDraggerLength: e.autoDraggerLength,
                    autoHideScrollbar: e.autoHideScrollbar,
                    snapAmount: e.snapAmount,
                    snapOffset: e.snapOffset,
                    scrollButtons_enable: e.scrollButtons.enable,
                    scrollButtons_scrollType: e.scrollButtons.scrollType,
                    scrollButtons_scrollSpeed: e.scrollButtons.scrollSpeed,
                    scrollButtons_scrollAmount: e.scrollButtons.scrollAmount,
                    autoExpandHorizontalScroll: e.advanced.autoExpandHorizontalScroll,
                    autoScrollOnFocus: e.advanced.autoScrollOnFocus,
                    normalizeMouseWheelDelta: e.advanced.normalizeMouseWheelDelta,
                    contentTouchScroll: e.contentTouchScroll,
                    onScrollStart_Callback: e.callbacks.onScrollStart,
                    onScroll_Callback: e.callbacks.onScroll,
                    onTotalScroll_Callback: e.callbacks.onTotalScroll,
                    onTotalScrollBack_Callback: e.callbacks.onTotalScrollBack,
                    onTotalScroll_Offset: e.callbacks.onTotalScrollOffset,
                    onTotalScrollBack_Offset: e.callbacks.onTotalScrollBackOffset,
                    whileScrolling_Callback: e.callbacks.whileScrolling,
                    bindEvent_scrollbar_drag: false,
                    bindEvent_content_touch: false,
                    bindEvent_scrollbar_click: false,
                    bindEvent_mousewheel: false,
                    bindEvent_buttonsContinuous_y: false,
                    bindEvent_buttonsContinuous_x: false,
                    bindEvent_buttonsPixels_y: false,
                    bindEvent_buttonsPixels_x: false,
                    bindEvent_focusin: false,
                    bindEvent_autoHideScrollbar: false,
                    mCSB_buttonScrollRight: false,
                    mCSB_buttonScrollLeft: false,
                    mCSB_buttonScrollDown: false,
                    mCSB_buttonScrollUp: false
                });
                if (e.horizontalScroll) {
                    if (m.css("max-width") !== "none") {
                        if (!e.advanced.updateOnContentResize) {
                            e.advanced.updateOnContentResize = true
                        }
                    }
                } else {
                    if (m.css("max-height") !== "none") {
                        var s = false
                          , r = parseInt(m.css("max-height"));
                        if (m.css("max-height").indexOf("%") >= 0) {
                            s = r,
                            r = m.parent().height() * s / 100
                        }
                        m.css("overflow", "hidden");
                        g.css("max-height", r)
                    }
                }
                m.mCustomScrollbar("update");
                if (e.advanced.updateOnBrowserResize) {
                    var i, j = c(window).width(), u = c(window).height();
                    c(window).bind("resize." + m.data("mCustomScrollbarIndex"), function() {
                        if (i) {
                            clearTimeout(i)
                        }
                        i = setTimeout(function() {
                            if (!m.is(".mCS_disabled") && !m.is(".mCS_destroyed")) {
                                var w = c(window).width()
                                  , v = c(window).height();
                                if (j !== w || u !== v) {
                                    if (m.css("max-height") !== "none" && s) {
                                        g.css("max-height", m.parent().height() * s / 100)
                                    }
                                    m.mCustomScrollbar("update");
                                    j = w;
                                    u = v
                                }
                            }
                        }, 150)
                    })
                }
                if (e.advanced.updateOnContentResize) {
                    var p;
                    if (e.horizontalScroll) {
                        var n = o.outerWidth()
                    } else {
                        var n = o.outerHeight()
                    }
                    p = setInterval(function() {
                        if (e.horizontalScroll) {
                            if (e.advanced.autoExpandHorizontalScroll) {
                                o.css({
                                    position: "absolute",
                                    width: "auto"
                                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                    width: o.outerWidth(),
                                    position: "relative"
                                }).unwrap()
                            }
                            var v = o.outerWidth()
                        } else {
                            var v = o.outerHeight()
                        }
                        if (v != n) {
                            m.mCustomScrollbar("update");
                            n = v
                        }
                    }, 300)
                }
            })
        },
        update: function() {
            var n = c(this)
              , k = n.children(".mCustomScrollBox")
              , q = k.children(".mCSB_container");
            q.removeClass("mCS_no_scrollbar");
            n.removeClass("mCS_disabled mCS_destroyed");
            k.scrollTop(0).scrollLeft(0);
            var y = k.children(".mCSB_scrollTools")
              , o = y.children(".mCSB_draggerContainer")
              , m = o.children(".mCSB_dragger");
            if (n.data("horizontalScroll")) {
                var A = y.children(".mCSB_buttonLeft")
                  , t = y.children(".mCSB_buttonRight")
                  , f = k.width();
                if (n.data("autoExpandHorizontalScroll")) {
                    q.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: q.outerWidth(),
                        position: "relative"
                    }).unwrap()
                }
                var z = q.outerWidth()
            } else {
                var w = y.children(".mCSB_buttonUp")
                  , g = y.children(".mCSB_buttonDown")
                  , r = k.height()
                  , i = q.outerHeight()
            }
            if (i > r && !n.data("horizontalScroll")) {
                y.css("display", "block");
                var s = o.height();
                if (n.data("autoDraggerLength")) {
                    var u = Math.round(r / i * s)
                      , l = m.data("minDraggerHeight");
                    if (u <= l) {
                        m.css({
                            height: l
                        })
                    } else {
                        if (u >= s - 10) {
                            var p = s - 10;
                            m.css({
                                height: p
                            })
                        } else {
                            m.css({
                                height: u
                            })
                        }
                    }
                    m.children(".mCSB_dragger_bar").css({
                        "line-height": m.height() + "px"
                    })
                }
                var B = m.height()
                  , x = (i - r) / (s - B);
                n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
                var D = Math.abs(q.position().top);
                n.mCustomScrollbar("scrollTo", D, {
                    scrollInertia: 0,
                    trigger: "internal"
                })
            } else {
                if (z > f && n.data("horizontalScroll")) {
                    y.css("display", "block");
                    var h = o.width();
                    if (n.data("autoDraggerLength")) {
                        var j = Math.round(f / z * h)
                          , C = m.data("minDraggerWidth");
                        if (j <= C) {
                            m.css({
                                width: C
                            })
                        } else {
                            if (j >= h - 10) {
                                var e = h - 10;
                                m.css({
                                    width: e
                                })
                            } else {
                                m.css({
                                    width: j
                                })
                            }
                        }
                    }
                    var v = m.width()
                      , x = (z - f) / (h - v);
                    n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
                    var D = Math.abs(q.position().left);
                    n.mCustomScrollbar("scrollTo", D, {
                        scrollInertia: 0,
                        trigger: "internal"
                    })
                } else {
                    k.unbind("mousewheel focusin");
                    if (n.data("horizontalScroll")) {
                        m.add(q).css("left", 0)
                    } else {
                        m.add(q).css("top", 0)
                    }
                    y.css("display", "none");
                    q.addClass("mCS_no_scrollbar");
                    n.data({
                        bindEvent_mousewheel: false,
                        bindEvent_focusin: false
                    })
                }
            }
        },
        scrolling: function(h, p, m, j, w, e, A, v) {
            var k = c(this);
            if (!k.data("bindEvent_scrollbar_drag")) {
                var n, o;
                if (c.support.msPointer) {
                    j.bind("MSPointerDown", function(H) {
                        H.preventDefault();
                        k.data({
                            on_drag: true
                        });
                        j.addClass("mCSB_dragger_onDrag");
                        var G = c(this)
                          , J = G.offset()
                          , F = H.originalEvent.pageX - J.left
                          , I = H.originalEvent.pageY - J.top;
                        if (F < G.width() && F > 0 && I < G.height() && I > 0) {
                            n = I;
                            o = F
                        }
                    });
                    c(document).bind("MSPointerMove." + k.data("mCustomScrollbarIndex"), function(H) {
                        H.preventDefault();
                        if (k.data("on_drag")) {
                            var G = j
                              , J = G.offset()
                              , F = H.originalEvent.pageX - J.left
                              , I = H.originalEvent.pageY - J.top;
                            D(n, o, I, F)
                        }
                    }).bind("MSPointerUp." + k.data("mCustomScrollbarIndex"), function(x) {
                        k.data({
                            on_drag: false
                        });
                        j.removeClass("mCSB_dragger_onDrag")
                    })
                } else {
                    j.bind("mousedown touchstart", function(H) {
                        H.preventDefault();
                        H.stopImmediatePropagation();
                        var G = c(this), K = G.offset(), F, J;
                        if (H.type === "touchstart") {
                            var I = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0];
                            F = I.pageX - K.left;
                            J = I.pageY - K.top
                        } else {
                            k.data({
                                on_drag: true
                            });
                            j.addClass("mCSB_dragger_onDrag");
                            F = H.pageX - K.left;
                            J = H.pageY - K.top
                        }
                        if (F < G.width() && F > 0 && J < G.height() && J > 0) {
                            n = J;
                            o = F
                        }
                    }).bind("touchmove", function(H) {
                        H.preventDefault();
                        H.stopImmediatePropagation();
                        var K = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0]
                          , G = c(this)
                          , J = G.offset()
                          , F = K.pageX - J.left
                          , I = K.pageY - J.top;
                        D(n, o, I, F)
                    });
                    c(document).bind("mousemove." + k.data("mCustomScrollbarIndex"), function(H) {
                        if (k.data("on_drag")) {
                            var G = j
                              , J = G.offset()
                              , F = H.pageX - J.left
                              , I = H.pageY - J.top;
                            D(n, o, I, F)
                        }
                    }).bind("mouseup." + k.data("mCustomScrollbarIndex"), function(x) {
                        k.data({
                            on_drag: false
                        });
                        j.removeClass("mCSB_dragger_onDrag")
                    })
                }
                k.data({
                    bindEvent_scrollbar_drag: true
                })
            }
            function D(G, H, I, F) {
                if (k.data("horizontalScroll")) {
                    k.mCustomScrollbar("scrollTo", (j.position().left - (H)) + F, {
                        moveDragger: true,
                        trigger: "internal"
                    })
                } else {
                    k.mCustomScrollbar("scrollTo", (j.position().top - (G)) + I, {
                        moveDragger: true,
                        trigger: "internal"
                    })
                }
            }
            if (c.support.touch && k.data("contentTouchScroll")) {
                if (!k.data("bindEvent_content_touch")) {
                    var l, B, r, s, u, C, E;
                    p.bind("touchstart", function(x) {
                        x.stopImmediatePropagation();
                        l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
                        B = c(this);
                        r = B.offset();
                        u = l.pageX - r.left;
                        s = l.pageY - r.top;
                        C = s;
                        E = u
                    });
                    p.bind("touchmove", function(x) {
                        x.preventDefault();
                        x.stopImmediatePropagation();
                        l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
                        B = c(this).parent();
                        r = B.offset();
                        u = l.pageX - r.left;
                        s = l.pageY - r.top;
                        if (k.data("horizontalScroll")) {
                            k.mCustomScrollbar("scrollTo", E - u, {
                                trigger: "internal"
                            })
                        } else {
                            k.mCustomScrollbar("scrollTo", C - s, {
                                trigger: "internal"
                            })
                        }
                    })
                }
            }
            if (!k.data("bindEvent_scrollbar_click")) {
                m.bind("click", function(F) {
                    var x = (F.pageY - m.offset().top) * k.data("scrollAmount")
                      , y = c(F.target);
                    if (k.data("horizontalScroll")) {
                        x = (F.pageX - m.offset().left) * k.data("scrollAmount")
                    }
                    if (y.hasClass("mCSB_draggerContainer") || y.hasClass("mCSB_draggerRail")) {
                        k.mCustomScrollbar("scrollTo", x, {
                            trigger: "internal",
                            scrollEasing: "draggerRailEase"
                        })
                    }
                });
                k.data({
                    bindEvent_scrollbar_click: true
                })
            }
            if (k.data("mouseWheel")) {
                if (!k.data("bindEvent_mousewheel")) {
                    h.bind("mousewheel", function(H, J) {
                        var G, F = k.data("mouseWheelPixels"), x = Math.abs(p.position().top), I = j.position().top, y = m.height() - j.height();
                        if (k.data("normalizeMouseWheelDelta")) {
                            if (J < 0) {
                                J = -1
                            } else {
                                J = 1
                            }
                        }
                        if (F === "auto") {
                            F = 100 + Math.round(k.data("scrollAmount") / 2)
                        }
                        if (k.data("horizontalScroll")) {
                            I = j.position().left;
                            y = m.width() - j.width();
                            x = Math.abs(p.position().left)
                        }
                        if ((J > 0 && I !== 0) || (J < 0 && I !== y)) {
                            H.preventDefault();
                            H.stopImmediatePropagation()
                        }
                        G = x - (J * F);
                        k.mCustomScrollbar("scrollTo", G, {
                            trigger: "internal"
                        })
                    });
                    k.data({
                        bindEvent_mousewheel: true
                    })
                }
            }
            if (k.data("scrollButtons_enable")) {
                if (k.data("scrollButtons_scrollType") === "pixels") {
                    if (k.data("horizontalScroll")) {
                        v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
                        k.data({
                            bindEvent_buttonsContinuous_x: false
                        });
                        if (!k.data("bindEvent_buttonsPixels_x")) {
                            v.bind("click", function(x) {
                                x.preventDefault();
                                q(Math.abs(p.position().left) + k.data("scrollButtons_scrollAmount"))
                            });
                            A.bind("click", function(x) {
                                x.preventDefault();
                                q(Math.abs(p.position().left) - k.data("scrollButtons_scrollAmount"))
                            });
                            k.data({
                                bindEvent_buttonsPixels_x: true
                            })
                        }
                    } else {
                        e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
                        k.data({
                            bindEvent_buttonsContinuous_y: false
                        });
                        if (!k.data("bindEvent_buttonsPixels_y")) {
                            e.bind("click", function(x) {
                                x.preventDefault();
                                q(Math.abs(p.position().top) + k.data("scrollButtons_scrollAmount"))
                            });
                            w.bind("click", function(x) {
                                x.preventDefault();
                                q(Math.abs(p.position().top) - k.data("scrollButtons_scrollAmount"))
                            });
                            k.data({
                                bindEvent_buttonsPixels_y: true
                            })
                        }
                    }
                    function q(x) {
                        if (!j.data("preventAction")) {
                            j.data("preventAction", true);
                            k.mCustomScrollbar("scrollTo", x, {
                                trigger: "internal"
                            })
                        }
                    }
                } else {
                    if (k.data("horizontalScroll")) {
                        v.add(A).unbind("click");
                        k.data({
                            bindEvent_buttonsPixels_x: false
                        });
                        if (!k.data("bindEvent_buttonsContinuous_x")) {
                            v.bind("mousedown touchstart MSPointerDown", function(y) {
                                y.preventDefault();
                                var x = z();
                                k.data({
                                    mCSB_buttonScrollRight: setInterval(function() {
                                        k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) + x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var i = function(x) {
                                x.preventDefault();
                                clearInterval(k.data("mCSB_buttonScrollRight"))
                            }
                            ;
                            v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", i);
                            A.bind("mousedown touchstart MSPointerDown", function(y) {
                                y.preventDefault();
                                var x = z();
                                k.data({
                                    mCSB_buttonScrollLeft: setInterval(function() {
                                        k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) - x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var g = function(x) {
                                x.preventDefault();
                                clearInterval(k.data("mCSB_buttonScrollLeft"))
                            }
                            ;
                            A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", g);
                            k.data({
                                bindEvent_buttonsContinuous_x: true
                            })
                        }
                    } else {
                        e.add(w).unbind("click");
                        k.data({
                            bindEvent_buttonsPixels_y: false
                        });
                        if (!k.data("bindEvent_buttonsContinuous_y")) {
                            e.bind("mousedown touchstart MSPointerDown", function(y) {
                                y.preventDefault();
                                var x = z();
                                k.data({
                                    mCSB_buttonScrollDown: setInterval(function() {
                                        k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) + x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var t = function(x) {
                                x.preventDefault();
                                clearInterval(k.data("mCSB_buttonScrollDown"))
                            }
                            ;
                            e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", t);
                            w.bind("mousedown touchstart MSPointerDown", function(y) {
                                y.preventDefault();
                                var x = z();
                                k.data({
                                    mCSB_buttonScrollUp: setInterval(function() {
                                        k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) - x, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var f = function(x) {
                                x.preventDefault();
                                clearInterval(k.data("mCSB_buttonScrollUp"))
                            }
                            ;
                            w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", f);
                            k.data({
                                bindEvent_buttonsContinuous_y: true
                            })
                        }
                    }
                    function z() {
                        var x = k.data("scrollButtons_scrollSpeed");
                        if (k.data("scrollButtons_scrollSpeed") === "auto") {
                            x = Math.round((k.data("scrollInertia") + 100) / 40)
                        }
                        return x
                    }
                }
            }
            if (k.data("autoScrollOnFocus")) {
                if (!k.data("bindEvent_focusin")) {
                    h.bind("focusin", function() {
                        h.scrollTop(0).scrollLeft(0);
                        var x = c(document.activeElement);
                        if (x.is("input,textarea,select,button,a[tabindex],area,object")) {
                            var G = p.position().top
                              , y = x.position().top
                              , F = h.height() - x.outerHeight();
                            if (k.data("horizontalScroll")) {
                                G = p.position().left;
                                y = x.position().left;
                                F = h.width() - x.outerWidth()
                            }
                            if (G + y < 0 || G + y > F) {
                                k.mCustomScrollbar("scrollTo", y, {
                                    trigger: "internal"
                                })
                            }
                        }
                    });
                    k.data({
                        bindEvent_focusin: true
                    })
                }
            }
            if (k.data("autoHideScrollbar")) {
                if (!k.data("bindEvent_autoHideScrollbar")) {
                    h.bind("mouseenter", function(x) {
                        h.addClass("mCS-mouse-over");
                        d.showScrollbar.call(h.children(".mCSB_scrollTools"))
                    }).bind("mouseleave touchend", function(x) {
                        h.removeClass("mCS-mouse-over");
                        if (x.type === "mouseleave") {
                            d.hideScrollbar.call(h.children(".mCSB_scrollTools"))
                        }
                    });
                    k.data({
                        bindEvent_autoHideScrollbar: true
                    })
                }
            }
        },
        scrollTo: function(e, f) {
            var i = c(this), o = {
                moveDragger: false,
                trigger: "external",
                callbacks: true,
                scrollInertia: i.data("scrollInertia"),
                scrollEasing: i.data("scrollEasing")
            }, f = c.extend(o, f), p, g = i.children(".mCustomScrollBox"), k = g.children(".mCSB_container"), r = g.children(".mCSB_scrollTools"), j = r.children(".mCSB_draggerContainer"), h = j.children(".mCSB_dragger"), t = draggerSpeed = f.scrollInertia, q, s, m, l;
            if (!k.hasClass("mCS_no_scrollbar")) {
                i.data({
                    mCS_trigger: f.trigger
                });
                if (i.data("mCS_Init")) {
                    f.callbacks = false
                }
                if (e || e === 0) {
                    if (typeof (e) === "number") {
                        if (f.moveDragger) {
                            p = e;
                            if (i.data("horizontalScroll")) {
                                e = h.position().left * i.data("scrollAmount")
                            } else {
                                e = h.position().top * i.data("scrollAmount")
                            }
                            draggerSpeed = 0
                        } else {
                            p = e / i.data("scrollAmount")
                        }
                    } else {
                        if (typeof (e) === "string") {
                            var v;
                            if (e === "top") {
                                v = 0
                            } else {
                                if (e === "bottom" && !i.data("horizontalScroll")) {
                                    v = k.outerHeight() - g.height()
                                } else {
                                    if (e === "left") {
                                        v = 0
                                    } else {
                                        if (e === "right" && i.data("horizontalScroll")) {
                                            v = k.outerWidth() - g.width()
                                        } else {
                                            if (e === "first") {
                                                v = i.find(".mCSB_container").find(":first")
                                            } else {
                                                if (e === "last") {
                                                    v = i.find(".mCSB_container").find(":last")
                                                } else {
                                                    v = i.find(e)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (v.length === 1) {
                                if (i.data("horizontalScroll")) {
                                    e = v.position().left
                                } else {
                                    e = v.position().top
                                }
                                p = e / i.data("scrollAmount")
                            } else {
                                p = e = v
                            }
                        }
                    }
                    if (i.data("horizontalScroll")) {
                        if (i.data("onTotalScrollBack_Offset")) {
                            s = -i.data("onTotalScrollBack_Offset")
                        }
                        if (i.data("onTotalScroll_Offset")) {
                            l = g.width() - k.outerWidth() + i.data("onTotalScroll_Offset")
                        }
                        if (p < 0) {
                            p = e = 0;
                            clearInterval(i.data("mCSB_buttonScrollLeft"));
                            if (!s) {
                                q = true
                            }
                        } else {
                            if (p >= j.width() - h.width()) {
                                p = j.width() - h.width();
                                e = g.width() - k.outerWidth();
                                clearInterval(i.data("mCSB_buttonScrollRight"));
                                if (!l) {
                                    m = true
                                }
                            } else {
                                e = -e
                            }
                        }
                        var n = i.data("snapAmount");
                        if (n) {
                            e = Math.round(e / n) * n - i.data("snapOffset")
                        }
                        d.mTweenAxis.call(this, h[0], "left", Math.round(p), draggerSpeed, f.scrollEasing);
                        d.mTweenAxis.call(this, k[0], "left", Math.round(e), t, f.scrollEasing, {
                            onStart: function() {
                                if (f.callbacks && !i.data("mCS_tweenRunning")) {
                                    u("onScrollStart")
                                }
                                if (i.data("autoHideScrollbar")) {
                                    d.showScrollbar.call(r)
                                }
                            },
                            onUpdate: function() {
                                if (f.callbacks) {
                                    u("whileScrolling")
                                }
                            },
                            onComplete: function() {
                                if (f.callbacks) {
                                    u("onScroll");
                                    if (q || (s && k.position().left >= s)) {
                                        u("onTotalScrollBack")
                                    }
                                    if (m || (l && k.position().left <= l)) {
                                        u("onTotalScroll")
                                    }
                                }
                                h.data("preventAction", false);
                                i.data("mCS_tweenRunning", false);
                                if (i.data("autoHideScrollbar")) {
                                    if (!g.hasClass("mCS-mouse-over")) {
                                        d.hideScrollbar.call(r)
                                    }
                                }
                            }
                        })
                    } else {
                        if (i.data("onTotalScrollBack_Offset")) {
                            s = -i.data("onTotalScrollBack_Offset")
                        }
                        if (i.data("onTotalScroll_Offset")) {
                            l = g.height() - k.outerHeight() + i.data("onTotalScroll_Offset")
                        }
                        if (p < 0) {
                            p = e = 0;
                            clearInterval(i.data("mCSB_buttonScrollUp"));
                            if (!s) {
                                q = true
                            }
                        } else {
                            if (p >= j.height() - h.height()) {
                                p = j.height() - h.height();
                                e = g.height() - k.outerHeight();
                                clearInterval(i.data("mCSB_buttonScrollDown"));
                                if (!l) {
                                    m = true
                                }
                            } else {
                                e = -e
                            }
                        }
                        var n = i.data("snapAmount");
                        if (n) {
                            e = Math.round(e / n) * n - i.data("snapOffset")
                        }
                        d.mTweenAxis.call(this, h[0], "top", Math.round(p), draggerSpeed, f.scrollEasing);
                        d.mTweenAxis.call(this, k[0], "top", Math.round(e), t, f.scrollEasing, {
                            onStart: function() {
                                if (f.callbacks && !i.data("mCS_tweenRunning")) {
                                    u("onScrollStart")
                                }
                                if (i.data("autoHideScrollbar")) {
                                    d.showScrollbar.call(r)
                                }
                            },
                            onUpdate: function() {
                                if (f.callbacks) {
                                    u("whileScrolling")
                                }
                            },
                            onComplete: function() {
                                if (f.callbacks) {
                                    u("onScroll");
                                    if (q || (s && k.position().top >= s)) {
                                        u("onTotalScrollBack")
                                    }
                                    if (m || (l && k.position().top <= l)) {
                                        u("onTotalScroll")
                                    }
                                }
                                h.data("preventAction", false);
                                i.data("mCS_tweenRunning", false);
                                if (i.data("autoHideScrollbar")) {
                                    if (!g.hasClass("mCS-mouse-over")) {
                                        d.hideScrollbar.call(r)
                                    }
                                }
                            }
                        })
                    }
                    if (i.data("mCS_Init")) {
                        i.data({
                            mCS_Init: false
                        })
                    }
                }
            }
            function u(w) {
                this.mcs = {
                    top: k.position().top,
                    left: k.position().left,
                    draggerTop: h.position().top,
                    draggerLeft: h.position().left,
                    topPct: Math.round((100 * Math.abs(k.position().top)) / Math.abs(k.outerHeight() - g.height())),
                    leftPct: Math.round((100 * Math.abs(k.position().left)) / Math.abs(k.outerWidth() - g.width()))
                };
                switch (w) {
                case "onScrollStart":
                    i.data("mCS_tweenRunning", true).data("onScrollStart_Callback").call(i, this.mcs);
                    break;
                case "whileScrolling":
                    i.data("whileScrolling_Callback").call(i, this.mcs);
                    break;
                case "onScroll":
                    i.data("onScroll_Callback").call(i, this.mcs);
                    break;
                case "onTotalScrollBack":
                    i.data("onTotalScrollBack_Callback").call(i, this.mcs);
                    break;
                case "onTotalScroll":
                    i.data("onTotalScroll_Callback").call(i, this.mcs);
                    break
                }
            }
        },
        stop: function() {
            var g = c(this)
              , e = g.children().children(".mCSB_container")
              , f = g.children().children().children().children(".mCSB_dragger");
            d.mTweenAxisStop.call(this, e[0]);
            d.mTweenAxisStop.call(this, f[0])
        },
        disable: function(e) {
            var j = c(this)
              , f = j.children(".mCustomScrollBox")
              , h = f.children(".mCSB_container")
              , g = f.children(".mCSB_scrollTools")
              , i = g.children().children(".mCSB_dragger");
            f.unbind("mousewheel focusin mouseenter mouseleave touchend");
            h.unbind("touchstart touchmove");
            if (e) {
                if (j.data("horizontalScroll")) {
                    i.add(h).css("left", 0)
                } else {
                    i.add(h).css("top", 0)
                }
            }
            g.css("display", "none");
            h.addClass("mCS_no_scrollbar");
            j.data({
                bindEvent_mousewheel: false,
                bindEvent_focusin: false,
                bindEvent_content_touch: false,
                bindEvent_autoHideScrollbar: false
            }).addClass("mCS_disabled")
        },
        destroy: function() {
            var e = c(this);
            e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();
            c(document).unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex"));
            c(window).unbind("resize." + e.data("mCustomScrollbarIndex"))
        }
    }
      , d = {
        showScrollbar: function() {
            this.stop().animate({
                opacity: 1
            }, "fast")
        },
        hideScrollbar: function() {
            this.stop().animate({
                opacity: 0
            }, "fast")
        },
        mTweenAxis: function(g, i, h, f, o, y) {
            var y = y || {}
              , v = y.onStart || function() {}
              , p = y.onUpdate || function() {}
              , w = y.onComplete || function() {}
            ;
            var n = t(), l, j = 0, r = g.offsetTop, s = g.style;
            if (i === "left") {
                r = g.offsetLeft
            }
            var m = h - r;
            q();
            e();
            function t() {
                if (window.performance && window.performance.now) {
                    return window.performance.now()
                } else {
                    if (window.performance && window.performance.webkitNow) {
                        return window.performance.webkitNow()
                    } else {
                        if (Date.now) {
                            return Date.now()
                        } else {
                            return new Date().getTime()
                        }
                    }
                }
            }
            function x() {
                if (!j) {
                    v.call()
                }
                j = t() - n;
                u();
                if (j >= g._time) {
                    g._time = (j > g._time) ? j + l - (j - g._time) : j + l - 1;
                    if (g._time < j + 1) {
                        g._time = j + 1
                    }
                }
                if (g._time < f) {
                    g._id = _request(x)
                } else {
                    w.call()
                }
            }
            function u() {
                if (f > 0) {
                    g.currVal = k(g._time, r, m, f, o);
                    s[i] = Math.round(g.currVal) + "px"
                } else {
                    s[i] = h + "px"
                }
                p.call()
            }
            function e() {
                l = 1000 / 60;
                g._time = j + l;
                _request = (!window.requestAnimationFrame) ? function(z) {
                    u();
                    return setTimeout(z, 0.01)
                }
                 : window.requestAnimationFrame;
                g._id = _request(x)
            }
            function q() {
                if (g._id == null ) {
                    return
                }
                if (!window.requestAnimationFrame) {
                    clearTimeout(g._id)
                } else {
                    window.cancelAnimationFrame(g._id)
                }
                g._id = null 
            }
            function k(B, A, F, E, C) {
                switch (C) {
                case "linear":
                    return F * B / E + A;
                    break;
                case "easeOutQuad":
                    B /= E;
                    return -F * B * (B - 2) + A;
                    break;
                case "easeInOutQuad":
                    B /= E / 2;
                    if (B < 1) {
                        return F / 2 * B * B + A
                    }
                    B--;
                    return -F / 2 * (B * (B - 2) - 1) + A;
                    break;
                case "easeOutCubic":
                    B /= E;
                    B--;
                    return F * (B * B * B + 1) + A;
                    break;
                case "easeOutQuart":
                    B /= E;
                    B--;
                    return -F * (B * B * B * B - 1) + A;
                    break;
                case "easeOutQuint":
                    B /= E;
                    B--;
                    return F * (B * B * B * B * B + 1) + A;
                    break;
                case "easeOutCirc":
                    B /= E;
                    B--;
                    return F * Math.sqrt(1 - B * B) + A;
                    break;
                case "easeOutSine":
                    return F * Math.sin(B / E * (Math.PI / 2)) + A;
                    break;
                case "easeOutExpo":
                    return F * (-Math.pow(2, -10 * B / E) + 1) + A;
                    break;
                case "mcsEaseOut":
                    var D = (B /= E) * B
                      , z = D * B;
                    return A + F * (0.499999999999997 * z * D + -2.5 * D * D + 5.5 * z + -6.5 * D + 4 * B);
                    break;
                case "draggerRailEase":
                    B /= E / 2;
                    if (B < 1) {
                        return F / 2 * B * B * B + A
                    }
                    B -= 2;
                    return F / 2 * (B * B * B + 2) + A;
                    break
                }
            }
        },
        mTweenAxisStop: function(e) {
            if (e._id == null ) {
                return
            }
            if (!window.requestAnimationFrame) {
                clearTimeout(e._id)
            } else {
                window.cancelAnimationFrame(e._id)
            }
            e._id = null 
        },
        rafPolyfill: function() {
            var f = ["ms", "moz", "webkit", "o"]
              , e = f.length;
            while (--e > -1 && !window.requestAnimationFrame) {
                window.requestAnimationFrame = window[f[e] + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[f[e] + "CancelAnimationFrame"] || window[f[e] + "CancelRequestAnimationFrame"]
            }
        }
    };
    d.rafPolyfill.call();
    c.support.touch = !!("ontouchstart" in window);
    c.support.msPointer = window.navigator.msPointerEnabled;
    var a = ("https:" == document.location.protocol) ? "https:" : "http:";
    c.event.special.mousewheel || document.write('<script src="' + a + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');
    c.fn.mCustomScrollbar = function(e) {
        if (b[e]) {
            return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof e === "object" || !e) {
                return b.init.apply(this, arguments)
            } else {
                c.error("Method " + e + " does not exist")
            }
        }
    }
})(jQuery);
/*
slick */
!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null ,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(a, b) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null ,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null ,
                currentDirection: 0,
                currentLeft: null ,
                currentSlide: 0,
                direction: 1,
                $dots: null ,
                listWidth: null ,
                listHeight: null ,
                loadIndex: 0,
                $nextArrow: null ,
                $prevArrow: null ,
                slideCount: null ,
                slideWidth: null ,
                $slideTrack: null ,
                $slides: null ,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null ,
                $list: null ,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            a.extend(e, e.initials),
            e.activeBreakpoint = null ,
            e.animType = null ,
            e.animProp = null ,
            e.breakpoints = [],
            e.breakpointSettings = [],
            e.cssTransitions = !1,
            e.hidden = "hidden",
            e.paused = !1,
            e.positionProp = null ,
            e.respondTo = null ,
            e.rowCount = 1,
            e.shouldClick = !0,
            e.$slider = a(c),
            e.$slidesCache = null ,
            e.transformType = null ,
            e.transitionType = null ,
            e.visibilityChange = "visibilitychange",
            e.windowWidth = 0,
            e.windowTimer = null ,
            f = a(c).data("slick") || {},
            e.options = a.extend({}, e.defaults, f, d),
            e.currentSlide = e.options.initialSlide,
            e.originalSettings = e.options,
            "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden",
            e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden",
            e.visibilityChange = "webkitvisibilitychange"),
            e.autoPlay = a.proxy(e.autoPlay, e),
            e.autoPlayClear = a.proxy(e.autoPlayClear, e),
            e.changeSlide = a.proxy(e.changeSlide, e),
            e.clickHandler = a.proxy(e.clickHandler, e),
            e.selectHandler = a.proxy(e.selectHandler, e),
            e.setPosition = a.proxy(e.setPosition, e),
            e.swipeHandler = a.proxy(e.swipeHandler, e),
            e.dragHandler = a.proxy(e.dragHandler, e),
            e.keyHandler = a.proxy(e.keyHandler, e),
            e.autoPlayIterator = a.proxy(e.autoPlayIterator, e),
            e.instanceUid = b++,
            e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            e.registerBreakpoints(),
            e.init(!0),
            e.checkResponsive(!0)
        }
        var b = 0;
        return c
    }(),
    b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c)
            d = c,
            c = null ;
        else if (0 > c || c >= e.slideCount)
            return !1;
        e.unload(),
        "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack),
        e.$slides = e.$slideTrack.children(this.options.slide),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.append(e.$slides),
        e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }),
        e.$slidesCache = e.$slides,
        e.reinit()
    }
    ,
    b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }
    ,
    b.prototype.animateSlide = function(b, c) {
        var d = {}
          , e = this;
        e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
        a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a),
                e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)",
                e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)",
                e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(),
        b = Math.ceil(b),
        d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)",
        e.$slideTrack.css(d),
        c && setTimeout(function() {
            e.disableTransition(),
            c.call()
        }, e.options.speed))
    }
    ,
    b.prototype.asNavFor = function(b) {
        var c = this
          , d = c.options.asNavFor;
        d && null  !== d && (d = a(d).not(c.$slider)),
        null  !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }
    ,
    b.prototype.applyTransition = function(a) {
        var b = this
          , c = {};
        c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase,
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer),
        a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }
    ,
    b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }
    ,
    b.prototype.autoPlayIterator = function() {
        var a = this;
        a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0),
        a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1),
        a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
    }
    ,
    b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"),
        b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"),
        b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
        b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
        b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (d = '<ul class="' + b.options.dotsClass + '">',
            c = 0; c <= b.getDotCount(); c += 1)
                d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
            d += "</ul>",
            b.$dots = a(d).appendTo(b.options.appendDots),
            b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }),
        b.$slidesCache = b.$slides,
        b.$slider.addClass("slick-slider"),
        b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(),
        b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.options.draggable === !0 && b.$list.addClass("draggable")
    }
    ,
    b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(),
        g = a.$slider.children(),
        a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows,
            f = Math.ceil(g.length / h),
            b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.html(e),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive && d.options.responsive.length && null  !== d.options.responsive) {
            f = null ;
            for (e in d.breakpoints)
                d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null  !== f ? null  !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : null  !== d.activeBreakpoint && (d.activeBreakpoint = null ,
            d.options = d.originalSettings,
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b),
            h = f),
            b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }
    ,
    b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this, e = a(b.target);
        switch (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        h = 0 !== d.slideCount % d.options.slidesToScroll,
        f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll,
        b.data.message) {
        case "previous":
            g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
            break;
        case "next":
            g = 0 === f ? d.options.slidesToScroll : f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
            break;
        case "index":
            var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c),
            e.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(),
        d = 0,
        a > c[c.length - 1])
            a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }
    ,
    b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null  !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide),
        b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))),
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
        b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)),
        b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)),
        b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler),
        a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(),
        b.removeAttr("style"),
        a.$slider.html(b))
    }
    ,
    b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(),
        a.stopPropagation(),
        a.preventDefault())
    }
    ,
    b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(),
        c.touchObject = {},
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }),
        c.$slideTrack.children(this.options.slide).detach(),
        c.$slideTrack.detach(),
        c.$list.detach(),
        c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.unslicked = !0,
        b || c.$slider.trigger("destroy", [c])
    }
    ,
    b.prototype.disableTransition = function(a) {
        var b = this
          , c = {};
        c[b.transitionType] = "",
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }),
        c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a),
        c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }),
        b && setTimeout(function() {
            c.disableTransition(a),
            b.call()
        }, c.options.speed))
    }
    ,
    b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a),
        b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }
    ,
    b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null  !== a && (b.unload(),
        b.$slideTrack.children(this.options.slide).detach(),
        b.$slidesCache.filter(a).appendTo(b.$slideTrack),
        b.reinit())
    }
    ,
    b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }
    ,
    b.prototype.getDotCount = function() {
        var a = this
          , b = 0
          , c = 0
          , d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToShow,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0)
            d = a.slideCount;
        else
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToShow,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d - 1
    }
    ,
    b.prototype.getLeft = function(a) {
        var c, d, f, b = this, e = 0;
        return b.slideOffset = 0,
        d = b.$slides.first().outerHeight(!0),
        b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = -1 * b.slideWidth * b.options.slidesToShow,
        e = -1 * d * b.options.slidesToShow),
        0 !== b.slideCount % b.options.slidesToScroll && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = -1 * (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth,
        e = -1 * (b.options.slidesToShow - (a - b.slideCount)) * d) : (b.slideOffset = -1 * b.slideCount % b.options.slidesToScroll * b.slideWidth,
        e = -1 * b.slideCount % b.options.slidesToScroll * d))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth,
        e = (a + b.options.slidesToShow - b.slideCount) * d),
        b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0,
        e = 0),
        b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0,
        b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)),
        c = b.options.vertical === !1 ? -1 * a * b.slideWidth + b.slideOffset : -1 * a * d + e,
        b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow),
        c = f[0] ? -1 * f[0].offsetLeft : 0,
        b.options.centerMode === !0 && (f = b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1),
        c = f[0] ? -1 * f[0].offsetLeft : 0,
        c += (b.$list.width() - f.outerWidth()) / 2)),
        c
    }
    ,
    b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }
    ,
    b.prototype.getNavigableIndexes = function() {
        var e, a = this, b = 0, c = 0, d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll,
        c = -1 * a.options.slidesToScroll,
        e = 2 * a.slideCount); e > b; )
            d.push(b),
            b = c + a.options.slidesToScroll,
            c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }
    ,
    b.prototype.getSlick = function() {
        return this
    }
    ,
    b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0,
        b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f,
            !1) : void 0
        }),
        c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }
    ,
    b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }
    ,
    b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA()
    }
    ,
    b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
            message: "previous"
        }, a.changeSlide),
        a.$nextArrow.on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }
    ,
    b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide),
        b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1))
    }
    ,
    b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(),
        b.initDotEvents(),
        b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler),
        b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler),
        b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)),
        b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)),
        b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
        a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(),
        a.$nextArrow.show()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(),
        a.options.autoplay === !0 && a.autoPlay()
    }
    ,
    b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: "next"
            }
        }))
    }
    ,
    b.prototype.lazyLoad = function() {
        function g(b) {
            a("img[data-lazy]", b).each(function() {
                var b = a(this)
                  , c = a(this).attr("data-lazy")
                  , d = document.createElement("img");
                d.onload = function() {
                    b.animate({
                        opacity: 0
                    }, 100, function() {
                        b.attr("src", c).animate({
                            opacity: 1
                        }, 200, function() {
                            b.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }
                ,
                d.src = c
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1),
        f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)),
        f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide,
        f = e + b.options.slidesToShow,
        b.options.fade === !0 && (e > 0 && e--,
        f <= b.slideCount && f++)),
        c = b.$slider.find(".slick-slide").slice(e, f),
        g(c),
        b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"),
        g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow),
        g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow),
        g(d))
    }
    ,
    b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(),
        a.$slideTrack.css({
            opacity: 1
        }),
        a.$slider.removeClass("slick-loading"),
        a.initUI(),
        "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }
    ,
    b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(),
        a.setPosition()
    }
    ,
    b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(),
        a.paused = !0
    }
    ,
    b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.paused = !1,
        a.autoPlay()
    }
    ,
    b.prototype.postSlide = function(a) {
        var b = this;
        b.$slider.trigger("afterChange", [b, a]),
        b.animating = !1,
        b.setPosition(),
        b.swipeLeft = null ,
        b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(),
        b.options.accessibility === !0 && b.initADA()
    }
    ,
    b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }
    ,
    b.prototype.progressiveLazyLoad = function() {
        var c, d, b = this;
        c = a("img[data-lazy]", b.$slider).length,
        c > 0 && (d = a("img[data-lazy]", b.$slider).first(),
        d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function() {
            d.removeAttr("data-lazy"),
            b.progressiveLazyLoad(),
            b.options.adaptiveHeight === !0 && b.setPosition()
        }).error(function() {
            d.removeAttr("data-lazy"),
            b.progressiveLazyLoad()
        }))
    }
    ,
    b.prototype.refresh = function(b) {
        var c = this
          , d = c.currentSlide;
        c.destroy(!0),
        a.extend(c, c.initials, {
            currentSlide: d
        }),
        c.init(),
        b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }
    ,
    b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this, f = b.options.responsive || null ;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1,
                d = f[c].breakpoint,
                f.hasOwnProperty(c)) {
                    for (; e >= 0; )
                        b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1),
                        e--;
                    b.breakpoints.push(d),
                    b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }
    ,
    b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        b.setSlideClasses(0),
        b.setPosition(),
        b.$slider.trigger("reInit", [b]),
        b.options.autoplay === !0 && b.focusHandler()
    }
    ,
    b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay),
        b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(),
            b.checkResponsive(),
            b.unslicked || b.setPosition()
        }, 50))
    }
    ,
    b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a,
        a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a,
        d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(),
        c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
        d.$slides = d.$slideTrack.children(this.options.slide),
        d.$slideTrack.children(this.options.slide).detach(),
        d.$slideTrack.append(d.$slides),
        d.$slidesCache = d.$slides,
        d.reinit(),
        void 0)
    }
    ,
    b.prototype.setCSS = function(a) {
        var d, e, b = this, c = {};
        b.options.rtl === !0 && (a = -a),
        d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        c[b.positionProp] = a,
        b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {},
        b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")",
        b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)",
        b.$slideTrack.css(c)))
    }
    ,
    b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow),
        a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })),
        a.listWidth = a.$list.width(),
        a.listHeight = a.$list.height(),
        a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow),
        a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth),
        a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }
    ,
    b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = -1 * b.slideWidth * d,
            b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            })
        }),
        b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }
    ,
    b.prototype.setOption = b.prototype.slickSetOption = function(b, c, d) {
        var f, g, e = this;
        if ("responsive" === b && "array" === a.type(c))
            for (g in c)
                if ("array" !== a.type(e.options.responsive))
                    e.options.responsive = [c[g]];
                else {
                    for (f = e.options.responsive.length - 1; f >= 0; )
                        e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1),
                        f--;
                    e.options.responsive.push(c[g])
                }
        else
            e.options[b] = c;
        d === !0 && (e.unload(),
        e.reinit())
    }
    ,
    b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(),
        a.setHeight(),
        a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(),
        a.$slider.trigger("setPosition", [a])
    }
    ,
    b.prototype.setProps = function() {
        var a = this
          , b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left",
        "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0),
        a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex),
        void 0 !== b.OTransform && (a.animType = "OTransform",
        a.transformType = "-o-transform",
        a.transitionType = "OTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.MozTransform && (a.animType = "MozTransform",
        a.transformType = "-moz-transform",
        a.transitionType = "MozTransition",
        void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
        void 0 !== b.webkitTransform && (a.animType = "webkitTransform",
        a.transformType = "-webkit-transform",
        a.transitionType = "webkitTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.msTransform && (a.animType = "msTransform",
        a.transformType = "-ms-transform",
        a.transitionType = "msTransition",
        void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform",
        a.transformType = "transform",
        a.transitionType = "transition"),
        a.transformsEnabled = null  !== a.animType && a.animType !== !1
    }
    ,
    b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2),
        b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
        d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")),
        b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow,
        e = b.options.infinite === !0 ? b.options.slidesToShow + a : a,
        b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }
    ,
    b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1),
        b.options.infinite === !0 && b.options.fade === !1 && (d = null ,
        b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow,
            c = b.slideCount; c > b.slideCount - e; c -= 1)
                d = c - 1,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1)
                d = c,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }
    ,
    b.prototype.setPaused = function(a) {
        var b = this;
        b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a,
        a ? b.autoPlayClear() : b.autoPlay())
    }
    ,
    b.prototype.selectHandler = function(b) {
        var c = this
          , d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide")
          , e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0),
        c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e),
        c.asNavFor(e),
        void 0) : (c.slideHandler(e),
        void 0)
    }
    ,
    b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, h = null , i = this;
        return b = b || !1,
        i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a),
        d = a,
        h = i.getLeft(d),
        g = i.getLeft(i.currentSlide),
        i.currentLeft = null  === i.swipeLeft ? g : i.swipeLeft,
        i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d)),
        void 0) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d)),
        void 0) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer),
        e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d,
        i.animating = !0,
        i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
        f = i.currentSlide,
        i.currentSlide = e,
        i.setSlideClasses(i.currentSlide),
        i.updateDots(),
        i.updateArrows(),
        i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f),
        i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e),
        i.animateHeight(),
        void 0) : (c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e),
        void 0)))
    }
    ,
    b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(),
        a.$nextArrow.hide()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
        a.$slider.addClass("slick-loading")
    }
    ,
    b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX,
        b = e.touchObject.startY - e.touchObject.curY,
        c = Math.atan2(b, a),
        d = Math.round(180 * c / Math.PI),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical"
    }
    ,
    b.prototype.swipeEnd = function() {
        var c, b = this;
        if (b.dragging = !1,
        b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0,
        void 0 === b.touchObject.curX)
            return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]),
        b.touchObject.swipeLength >= b.touchObject.minSwipe)
            switch (b.swipeDirection()) {
            case "left":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(),
                b.slideHandler(c),
                b.currentDirection = 0,
                b.touchObject = {},
                b.$slider.trigger("swipe", [b, "left"]);
                break;
            case "right":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(),
                b.slideHandler(c),
                b.currentDirection = 1,
                b.touchObject = {},
                b.$slider.trigger("swipe", [b, "right"])
            }
        else
            b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide),
            b.touchObject = {})
    }
    ,
    b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse")))
            switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1,
            b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold,
            b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
            a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
            }
    }
    ,
    b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null ,
        !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide),
        b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX,
        b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY,
        b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))),
        b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
        e = b.swipeDirection(),
        "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
        g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1),
        b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
        f = b.touchObject.swipeLength,
        b.touchObject.edgeHit = !1,
        b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction,
        b.touchObject.edgeHit = !0),
        b.swipeLeft = b.options.vertical === !1 ? d + f * g : d + f * (b.$list.height() / b.listWidth) * g,
        b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
        b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null ,
        !1) : (b.setCSS(b.swipeLeft),
        void 0)) : void 0)
    }
    ,
    b.prototype.swipeStart = function(a) {
        var c, b = this;
        return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {},
        !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
        b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX,
        b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY,
        b.dragging = !0,
        void 0)
    }
    ,
    b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null  !== a.$slidesCache && (a.unload(),
        a.$slideTrack.children(this.options.slide).detach(),
        a.$slidesCache.appendTo(a.$slideTrack),
        a.reinit())
    }
    ,
    b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
        b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
        b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]),
        b.destroy()
    }
    ,
    b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2),
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    b.prototype.updateDots = function() {
        var a = this;
        null  !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    b.prototype.visibility = function() {
        var a = this;
        document[a.hidden] ? (a.paused = !0,
        a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1,
        a.autoPlay())
    }
    ,
    b.prototype.initADA = function() {
        var b = this;
        /*b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }),
        null  !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        b.activateADA()*/
    }
    ,
    b.prototype.activateADA = function() {
        var a = this
          , b = a.$slider.find("*").is(":focus");
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false",
            tabindex: "0"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        }),
        b && a.$slideTrack.find(".slick-active").focus()
    }
    ,
    b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.on("focus.slick blur.slick", "*", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.isPlay && (d.is(":focus") ? (b.autoPlayClear(),
                b.paused = !0) : (b.paused = !1,
                b.autoPlay()))
            }, 0)
        })
    }
    ,
    a.fn.slick = function() {
        var g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length, f = 0;
        for (f; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f],c) : g = a[f].slick[c].apply(a[f].slick, d),
            "undefined" != typeof g)
                return g;
        return a
    }
});
/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) {
    $.fn.touchwipe = function(settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {},
            wipeRight: function() {},
            wipeUp: function() {},
            wipeDown: function() {},
            preventDefaultEvents: true
        };
        if (settings)
            $.extend(config, settings);
        this.each(function() {
            var startX;
            var startY;
            var isMoving = false;
            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null ;
                isMoving = false
            }
            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault()
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft()
                        } else {
                            config.wipeRight()
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown()
                        } else {
                            config.wipeUp()
                        }
                    }
                }
            }
            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false)
                }
            }
            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false)
            }
        });
        return this
    }
})(jQuery);

var memoryDesgin = {};
var open_inside = false;
var flag = true;
memoryDesgin.menu_icon = function() {
    var menu_btn = $('.menu-btn')
      , container = $('.container')
      , nav_box = $('.nav-box');
      /**ie8**/
      var o = navigator.userAgent;
      var onOff = true;
    menu_btn.click(function(e) {
        $(this).toggleClass('cross open-nav');
        $(this).find('span').toggleClass('opacity0');
        nav_box.toggleClass('open');
        container.toggleClass('open');
        if(o.indexOf('MSIE 8.0') !=-1 ){
           if($(this).has('.nav_sub') && onOff){
               $('.iconClick').attr('src','images/cha.png');
               $('.menu-btn').css({
                  right : 142
               });
               onOff = false;

           }else{
                $('.iconClick').attr('src','images/iconClick.png');
                $('.menu-btn').css({
                  right : 20
               })
              onOff = true;
           }
        }
        e.preventDefault()
    })
}
;
memoryDesgin.service_list = function() {
    var service_wrap = $('.service-list-wrap')
      , service_list = $('.service-list');
    service_list.css({
        'width': service_list.find('li').length * 363 + 'px'
    });
    if (canvasAnimate) {
        $(".service-list-wrap").mCustomScrollbar({
            horizontalScroll: true,
            autoHideScrollbar: false,
            theme: "dark",
            advanced: {
                updateOnContentResize: true,
            },
            mouseWheel: false,
            scrollButtons: {
                enable: true
            }
        })
    }
}
;
memoryDesgin.data_product = function() {
    var data_pro_list = $('.data-pro-list');
    var subsidiary = $('.subsidiary-list');
    data_pro_list.find('ul').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false
    });
    subsidiary.slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    })
}
;
memoryDesgin.open_iframe = function() {
    var service_list = $('.service-list');
    var data_pro_list = $('.data-pro-list');
    var about_us_list = $('.about-us-list');
    var iframe = $('.iframe');
    var link = null ;
    var mask = $('.mask');
    var inside_page_name = $('.inside-page-name');
    var open_detail = function(obj) {
        obj.find('a').click(function(e) {
            if ($(this).data("mylink") == "1")
                return;
            e.preventDefault();
            link = $(this).attr('href');
            inside_page_name.find('.name').html($(this).find('.title').html());
            iframe.attr('src', link).addClass('open');
            mask.removeClass('hide');
            inside_page_name.addClass('open');
            open_inside = true;
            flag =false;/**禁止滚轮**/
        })
    }
    ;
    var close_detail = function() {
        iframe.removeClass('open');
        inside_page_name.removeClass('open');
        setTimeout(function() {
            mask.addClass('hide');
            iframe.attr('src', '');
            open_inside = false;
        }, 400)
        flag =true;/**开启滚轮**/
    }
    ;
    inside_page_name.click(function() {
        close_detail()
    });
    mask.click(function() {
        close_detail()
    });
    open_detail(service_list);
    open_detail(data_pro_list);
    open_detail(about_us_list);
}
;
memoryDesgin.homeAnimate = function() {
    var container, stats;
    var camera, scene, renderer, group, particle;
    var mouseX = 0
      , mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    if (canvasAnimate) {
        init();
        animate()
    }
    ;function init() {
        /*move = document.getElementById('move');
        container = document.createElement('div');
        move.appendChild(container);*/
        /*camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,3000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        var PI2 = Math.PI * 2;
        var program = function(context) {
            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill()
        }
        ;
        group = new THREE.Group();
        scene.add(group);
        for (var i = 0; i < 300; i++) {
            var material = new THREE.SpriteCanvasMaterial({
                color: 0xFFFFFF,
                program: program,
                opacity: Math.random() * 1
            });
            particle = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 2000 - 1000;
            particle.scale.x = particle.scale.y = Math.random() * 2 + 10;
            group.add(particle)
        }
        ;renderer = new THREE.CanvasRenderer({
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);*/
       /* container.appendChild(renderer.domElement);*/
        /*stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', onWindowResize, false)*/
    }
    ;function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    ;function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY
    }
    ;function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY
        }
    }
    ;function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY
        }
    }
    ;function animate() {
        //requestAnimationFrame(animate);
       /* render();*/
        /*stats.update()*/
    }
    /*function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        group.rotation.x += 0.007;
        group.rotation.y += 0.015;
        renderer.render(scene, camera)
    }*/
    ;var bannerRotate = $('#banner-rotate')
      , bannerImg = bannerRotate.find('.banner-img')
      , center_txt = bannerRotate.find('.center-txt')
      , circle_txt = bannerRotate.find('.circle-txt');
    setTimeout(function() {
        bannerImg.addClass('circleScale')
    }, 500);
    setTimeout(function() {
        center_txt.addClass('txtIn')
    }, 1000);
    var inTime, longTime;
    setTimeout(function() {
        bannerImg.removeClass('circleScale').addClass('circleRotate');
        $('#center-mouse').hover(function() {
            clearTimeout(longTime);
            inTime = setTimeout(function() {
                center_txt.removeClass('txtLong2 txtLong txtFlickIn').addClass('txtFlickOut');
                circle_txt.removeClass('cirOut').addClass('cirIn')
            }, 300)
        }, function() {
            clearTimeout(inTime);
            center_txt.removeClass('txtFlickOut').addClass('txtFlickIn');
            longTime = setTimeout(function() {
                center_txt.removeClass('txtFlickIn').addClass('txtLong2')
            }, 3000);
            circle_txt.removeClass('cirIn').addClass('cirOut')
        })
    }, 1500);
    var page_on = 0
      , nav_front = $('#nav_front')
      , nav_a = $('#menu li a')
      , page_menu = 1
      , section = $('.section')
      , scrollbar_tips = $('.scrollbar-tips');
    nav_a.click(function(event) {
        var eq = $(this).index() + 1;
        page_menu = eq;
        page_on = $(".container").find(".content_current").index() + 1;
        var menu_on = nav_a.eq(page_on - 1);
        if (page_on == eq)
            return false;
        switch (eq) {
        case 1:
            $('.copyright').removeClass('hide');
            break;
        /**footer颜色**/
        case 3 :
            $('.copyright').css({
                'background-color' : '#161c2a'
            })
            break;
        case 4:
            $('.copyright').removeClass('hide');
            $('.copyright').css({
                'background-color' : '#161c2a'
            })
            setTimeout(function() {
                scrollbar_tips.fadeOut(function() {
                    $(this).remove()
                })
            }, 10000);
            break;
        default:
            $('.copyright').removeClass('hide')
            $('.copyright').css({//footer颜色
                'background-color' : '#0d1114'
            })
        }
        ;nav_a.removeClass('active');
        $(this).addClass('active');
        $('#page-' + page_on).addClass('pt-page-rotatePushBottom');
        nav_front.css('display', 'block');
        $('#page-' + eq).addClass('pt-page-rotatePullTop content_current pt-page-delay180').css({
            'background-image': $('#page-' + eq).attr('data-bg')
        });
        $('#page-' + page_on).delay(30).animate({
            'top': '0px'
        }, 300, function() {
            $('#page-' + page_on).removeClass('pt-page-rotatePushBottom content_current');
            $('#page-' + eq).removeClass('pt-page-rotatePullTop pt-page-delay180');
            nav_front.css('display', 'none');
            flag = true
        });
        event.preventDefault()
    });
    

    $(window).bind('mousewheel', function(event, delta) {
        var page_on = null ;
        if (flag ) {
            flag = false;
            page_on = $(".container").find(".content_current").index() + 1;
            if (delta < 0) {
                if (page_on == section.length) {
                    flag = true;
                    return false
                }
                if(page_on == 2){
                    $('.copyright').css({
                      'background-color' : '#161c2a'
                     })
                }else{
                    $('.copyright').css({
                      'background-color' : '#0d1114'
                     })
                }
                ;nav_a.eq(page_on).click()
            } else {
                if (page_on == 1) {
                    flag = true;
                    return false
                }
                //console.log(section.length);
                if(page_on == section.length){
                    $('.copyright').css({
                      'background-color' : '#161c2a'
                     })
                }else{
                    $('.copyright').css({
                      'background-color' : '#0d1114'
                     })
                }
                ;nav_a.eq(page_on - 2).click()
            }
        } else {
            return false
        }
    });
    $(".subsidiary-list .item").click(function() {
        var dataPage = $(this).data("page");
        if (dataPage == null )
            return;
        nav_a.eq(dataPage - 1).click()
    });
    $(".container").touchwipe({
        wipeUp: function() {
            if (flag && !open_inside) {
                flag = false;
                page_on = $(".container").find(".content_current").index() + 1;
                if (page_on == 1) {
                    flag = true;
                    return false
                }
                ;nav_a.eq(page_on - 2).click()
            }
        },
        wipeDown: function() {
            if (flag && !open_inside) {
                flag = false;
                page_on = $(".container").find(".content_current").index() + 1;
                if (page_on == section.length) {
                    flag = true;
                    return false
                }
                ;nav_a.eq(page_on).click()
            }
        },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    })
}
;
/*zoomPic*/
/*function ZoomPic() {
    this.initialize.apply(this, arguments)
}
;ZoomPic.prototype = {
    initialize: function(id) {
        var _this = this;
        this.wrap = typeof id === "string" ? document.getElementById(id) : id;
        this.oUl = this.wrap.getElementsByTagName("ul")[0];
        this.aLi = this.wrap.getElementsByTagName("li");
        this.prev = this.wrap.getElementsByTagName("span")[0];
        this.next = this.wrap.getElementsByTagName("span")[1];
        this.timer = 1000;
        this.aSort = [];
        this.iCenter = 2;
        this._doPrev = function() {
            return _this.doPrev.apply(_this)
        }
        ;
        this._doNext = function() {
            return _this.doNext.apply(_this)
        }
        ;
        this.options = [{
            width: 210,
            height: 321,
            top: 14,
            left: 0,
            zIndex: 1
        }, {
            width: 224,
            height: 337,
            top: 7,
            left: 218,
            zIndex: 2
        }, {
            width: 240,
            height: 350,
            top: 0,
            left: 447,
            zIndex: 3
        }, {
            width: 224,
            height: 337,
            top: 7,
            left: 693,
            zIndex: 2
        }, {
            width: 210,
            height: 321,
            top: 14,
            left: 926,
            zIndex: 1
        }, ];
        for (var i = 0; i < this.aLi.length; i++)
            this.aSort[i] = this.aLi[i];
        this.aSort.unshift(this.aSort.pop());
        this.setUp();
        this.addEvent(this.prev, "click", this._doPrev);
        this.addEvent(this.next, "click", this._doNext);
        this.doImgClick();
        this.timer = setInterval(function() {
            _this.doNext()
        }, 5000);
        this.wrap.onmouseover = function() {
            clearInterval(_this.timer)
        }
        ;
        this.wrap.onmouseout = function() {
            _this.timer = setInterval(function() {
                _this.doNext()
            }, 5000)
        }
    },
    doPrev: function() {
        this.aSort.unshift(this.aSort.pop());
        this.setUp()
    },
    doNext: function() {
        this.aSort.push(this.aSort.shift());
        this.setUp()
    },
    doImgClick: function() {
        var _this = this;
        for (var i = 0; i < this.aSort.length; i++) {
            this.aSort[i].onclick = function() {
                if (this.index > _this.iCenter) {
                    for (var i = 0; i < this.index - _this.iCenter; i++)
                        _this.aSort.push(_this.aSort.shift());
                    _this.setUp()
                } else if (this.index < _this.iCenter) {
                    for (var i = 0; i < _this.iCenter - this.index; i++)
                        _this.aSort.unshift(_this.aSort.pop());
                    _this.setUp()
                }
            }
        }
    },
    setUp: function() {
        var _this = this;
        var i = 0;
        for (i = 0; i < this.aSort.length; i++)
            this.oUl.appendChild(this.aSort[i]);
        for (i = 0; i < this.aSort.length; i++) {
            this.aSort[i].index = i;
            if (i < 5) {
                this.css(this.aSort[i], "display", "block");
                this.doMove(this.aSort[i], this.options[i], function() {
                    _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
                        opacity: 100
                    }, function() {
                        _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {
                            opacity: 100
                        })
                    })
                })
            } else {
                this.css(this.aSort[i], "display", "none");
                this.css(this.aSort[i], "width", 0);
                this.css(this.aSort[i], "height", 0);
                this.css(this.aSort[i], "top", 37);
                this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
            }
            ;if (i < this.iCenter || i > this.iCenter) {
                this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 50);
                _this.doMove(this.aSort[i].getElementsByTagName("div")[0], {
                    bottom: -147
                });
                this.aSort[i].onmouseover = function() {
                    _this.doMove(this.getElementsByTagName("img")[0], {
                        opacity: 100
                    })
                }
                ;
                this.aSort[i].onmouseout = function() {
                    _this.doMove(this.getElementsByTagName("img")[0], {
                        opacity: 50
                    })
                }
                ;
                this.aSort[i].onmouseout()
            } else {
                _this.doMove(this.aSort[i].getElementsByTagName("div")[0], {
                    bottom: 0
                });
                this.aSort[i].onmouseover = this.aSort[i].onmouseout = null 
            }
        }
    },
    addEvent: function(oElement, sEventType, fnHandler) {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    css: function(oElement, attr, value) {
        if (arguments.length == 2) {
            return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null )[attr]
        } else if (arguments.length == 3) {
            switch (attr) {
            case "width":
            case "height":
            case "top":
            case "left":
            case "bottom":
                oElement.style[attr] = value + "px";
                break;
            case "opacity":
                oElement.style.filter = "alpha(opacity=" + value + ")";
                oElement.style.opacity = value / 100;
                break;
            default:
                oElement.style[attr] = value;
                break
            }
        }
    },
    doMove: function(oElement, oAttr, fnCallBack) {
        var _this = this;
        clearInterval(oElement.timer);
        oElement.timer = setInterval(function() {
            var bStop = true;
            for (var property in oAttr) {
                var iCur = parseFloat(_this.css(oElement, property));
                property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
                var iSpeed = (oAttr[property] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != oAttr[property]) {
                    bStop = false;
                    _this.css(oElement, property, iCur + iSpeed)
                }
            }
            ;if (bStop) {
                clearInterval(oElement.timer);
                fnCallBack && fnCallBack.apply(_this, arguments)
            }
        }, 30)
    }
};
window.onload = function() 
{
    new ZoomPic("focus_Box");
}*/
;
var canvasAnimate = true;
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //  document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        canvasAnimate = false;
    
    }
    else {
        canvasAnimate = true;
    }
}
;
$(window).load(function() {
    browserRedirect();
    memoryDesgin.menu_icon();
    memoryDesgin.service_list();
    /*memoryDesgin.data_product();*/
    memoryDesgin.open_iframe();
    memoryDesgin.homeAnimate();
    $('.home-loading').fadeOut(function() {
        $(this).remove();
    });
    var mapBox = $('#map'), 
    mapDot = $('.contact-map').children(), 
    mapIndex;
    mapDot.click(function() {
        if ($(this).hasClass('active'))
            return
        mapIndex = $(this).index();
        mapDot.removeClass('active');
        $(this).addClass('active');
        mapDot.parent().next().children().fadeOut()
        .eq(mapIndex).delay(500).fadeIn();
    });

});
