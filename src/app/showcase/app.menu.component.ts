import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from './service/appconfigservice';
import { Subscription } from 'rxjs';
import { AppConfig } from './domain/appconfig';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu/app-menu.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden',
                opacity: 0,
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        ])
    ]
})
export class AppMenuComponent {

    @Input() active: boolean;

    activeSubmenus: {[key: string]: boolean} = {};

    filteredRoutes: any[];

    selectedRoute: any;

    submenuRouting: boolean;

    routes = [
        {
            label: 'General', value: 'general', 
            items: [
                {label: 'Setup', value: '/setup'},
                {label: 'Locale', value: '/i18n'}
            ]
        },
        {
            label: 'Support', value: 'support', 
            items: [
                {label: 'Long Term Support', value: '/lts'},
                {label: 'PRO Support', value: '/support'}
            ]
        },
        {
            label: 'Theming', value: 'theming', 
            items: [
                {label: 'Guide', value: '/theming'},
                {label: 'Colors', value: '/colors'}
            ]
        },
        {
            label: 'PrimeFlex', value: 'primeflex', 
            items: [
                {label: 'Setup', value: '/primeflex'},
                {label: 'Display', value: '/primeflex/display'},
                {label: 'Elevation', value: '/primeflex/elevation'},
                {label: 'FlexBox', value: '/primeflex/flexbox'},
                {label: 'Form Layout', value: '/primeflex/formlayout'},
                {label: 'Spacing', value: '/primeflex/spacing'},
                {label: 'Text', value: '/primeflex/text'}
            ]
        },
        {
            label: 'PrimeIcons', value: 'primeicons', 
            items: [
                {label: 'Icons v4.1', value: '/icons'}
            ]
        },
        {
            label: 'Form', value: 'form', 
            items: [
                {label: 'AutoComplete', value: '/autocomplete'},
                {label: 'Calendar', value: '/calendar'},
                {label: 'CascadeSelect', value: '/cascadeselect'},
                {label: 'Checkbox', value: '/checkbox'},
                {label: 'Chips', value: '/chips'},
                {label: 'ColorPicker', value: '/colorpicker'},
                {label: 'Dropdown', value: '/dropdown'},
                {label: 'Editor', value: '/editor'},
                {label: 'FloatLabel', value: '/floatlabel'},
                {label: 'InputGroup', value: '/inputgroup'},
                {label: 'InputMask', value: '/inputmask'},
                {label: 'InputNumber', value: '/inputnumber'},
                {label: 'InputSwitch', value: '/inputswitch'},
                {label: 'InputText', value: '/inputtext'},
                {label: 'InputTextArea', value: '/inputtextarea'},
                {label: 'InvalidState', value: '/invalid'},
                {label: 'Knob', value: '/knob'},
                {label: 'KeyFilter', value: '/keyfilter'},
                {label: 'Listbox', value: '/listbox'},
                {label: 'MultiSelect', value: '/multiselect'},
                {label: 'Password', value: '/password'},
                {label: 'RadioButton', value: '/radiobutton'},
                {label: 'Rating', value: '/rating'},
                {label: 'Slider', value: '/slider'},
                {label: 'SelectButton', value: '/selectbutton'},
                {label: 'ToggleButton', value: '/togglebutton'},
                {label: 'TriCheckbox', value: '/tristatecheckbox'}
            ]
        },
        {
            label: 'Button', value: 'button', 
            items: [
                {label: 'Button', value: '/button'},
                {label: 'SplitButton', value: '/splitbutton'}
            ]
        },
        {
            label: 'Data', value: 'data', 
            items: [
                {label: 'DataView', value: '/dataview'},
                {label: 'FullCalendar', value: '/fullcalendar'},
                {label: 'GMap', value: '/gmap'},
                {label: 'OrderList', value: '/orderlist'},
                {label: 'Org Chart', value: '/organizationchart'},
                {label: 'Paginator', value: '/paginator'},
                {label: 'PickList', value: '/picklist'},
                {label: 'Timeline', value: '/timeline'},
                {label: 'VirtualScroller', value: '/virtualscroller'},
            ]
        },

        {
            label: 'Table', value: 'table', 
            items: [
                {label: 'Documentation', value: '/table'},
                {label: 'Basic', value: '/table/basic'},
                {label: 'Dynamic', value: '/table/dynamic'},
                {label: 'Templating', value: '/table/templating'},
                {label: 'Size', value: '/table/size'},
                {label: 'Gridlines', value: '/table/gridlines'},
                {label: 'Striped', value: '/table/striped'},
                {label: 'ColGroup', value: '/table/colgroup'},
                {label: 'Page', value: '/table/page'},
                {label: 'Sort', value: '/table/sort'},
                {label: 'Filter', value: '/table/filter'},
                {label: 'Selection', value: '/table/selection'},
                {label: 'Scroll', value: '/table/scroll'},
                {label: 'VirtualScroll', value: '/table/virtualscroll'},
                {label: 'FlexScroll', value: '/table/flexscroll'},
                {label: 'RowExpand', value: '/table/rowexpansion'},
                {label: 'Lazy', value: '/table/lazy'},
                {label: 'Edit', value: '/table/edit'},
                {label: 'Toggle', value: '/table/coltoggle'},
                {label: 'Resize', value: '/table/colresize'},
                {label: 'Reorder', value: '/table/reorder'},
                {label: 'RowGroup', value: '/table/rowgroup'},
                {label: 'ContextMenu', value: '/table/contextmenu'},
                {label: 'Responsive', value: '/table/responsive'},
                {label: 'Export', value: '/table/export'},
                {label: 'State', value: '/table/state'},
                {label: 'Style', value: '/table/style'},
                {label: 'Sticky', value: '/table/sticky'},
                {label: 'Crud', value: '/table/crud'},
            ]
        },
        {
            label: 'Tree', value: 'tree', 
            items: [
                {label: 'Documentation', value: '/tree'},
                {label: 'Templating', value: '/tree/templating'},
                {label: 'Selection', value: '/tree/selection'},
                {label: 'Filter', value: '/tree/filter'},
                {label: 'Lazy', value: '/tree/lazy'},
                {label: 'Scroll', value: '/tree/scroll'},
                {label: 'ContextMenu', value: '/tree/contextmenu'},
                {label: 'DragDrop', value: '/tree/dragdrop'},
                {label: 'Horizontal', value: '/tree/horizontal'}
            ]
        },
        {
            label: 'TreeTable', value: 'treetable', 
            items: [
                {label: 'Documentation', value: '/treetable'},
                {label: 'Templating', value: '/treetable/templating'},
                {label: 'Page', value: '/treetable/page'},
                {label: 'Sort', value: '/treetable/sort'},
                {label: 'Selection', value: '/treetable/selection'},
                {label: 'ColGroup', value: '/treetable/colgroup'},
                {label: 'Lazy', value: '/treetable/lazy'},
                {label: 'Edit', value: '/treetable/edit'},
                {label: 'Scroll', value: '/treetable/scroll'},
                {label: 'Resize', value: '/treetable/colresize'},
                {label: 'Reorder', value: '/treetable/reorder'},
                {label: 'Toggle', value: '/treetable/coltoggle'},
                {label: 'Style', value: '/treetable/style'},
                {label: 'ContextMenu', value: '/treetable/contextmenu'},
                {label: 'Responsive', value: '/treetable/responsive'},
                {label: 'Filter', value: '/treetable/filter'},
                {label: 'Size', value: '/treetable/size'}
            ]
        },
        {
            label: 'Panel', value: 'panel', 
            items: [
                {label: 'Accordion', value: '/accordion'},
                {label: 'Card', value: '/card'},
                {label: 'Divider', value: '/divider'},
                {label: 'Fieldset', value: '/fieldset'},
                {label: 'Panel', value: '/panel'},
                {label: 'Splitter', value: '/splitter'},
                {label: 'ScrollPanel', value: '/scrollpanel'},
                {label: 'TabView', value: '/tabview'},
                {label: 'Toolbar', value: '/toolbar'}
            ]
        },
        {
            label: 'Overlay', value: 'overlay', 
            items: [
                {label: 'ConfirmDialog', value: '/confirmdialog'},
                {label: 'ConfirmPopup', value: '/confirmpopup'},
                {label: 'Dialog', value: '/dialog'},
                {label: 'DynamicDialog', value: '/dynamicdialog'},
                {label: 'OverlayPanel', value: '/overlaypanel'},
                {label: 'Sidebar', value: '/sidebar'},
                {label: 'Tooltip', value: '/tooltip'}
            ]
        },
        {
            label: 'File', value: 'fileupload', 
            items: [
                {label: 'Upload', value: '/fileupload'}
            ]
        },
        {
            label: 'Menu', value: 'menu', 
            items: [
                {label: 'MenuModel', value: '/menumodel'},
                {label: 'Breadcrumb', value: '/breadcrumb'},
                {label: 'ContextMenu', value: '/contextmenu'},
                {label: 'MegaMenu', value: '/megamenu'},
                {label: 'Menu', value: '/menu'},
                {label: 'Menubar', value: '/menubar'},
                {label: 'PanelMenu', value: '/panelmenu'},
                {label: 'SlideMenu', value: '/slidemenu'},
                {label: 'Steps', value: '/steps'},
                {label: 'TabMenu', value: '/tabmenu'},
                {label: 'TieredMenu', value: '/tieredmenu'}
            ]
        },
        {
            label: 'Chart', value: 'chart', 
            items: [
                {label: 'ChartModel', value: '/chart'},
                {label: 'Bar', value: '/chart/bar'},
                {label: 'Doughnut', value: '/chart/doughnut'},
                {label: 'Line', value: '/chart/line'},
                {label: 'PolarArea', value: '/chart/polararea'},
                {label: 'Pie', value: '/chart/pie'},
                {label: 'Radar', value: '/chart/radar'},
                {label: 'Combo', value: '/chart/combo'}
            ]
        },
        {
            label: 'Messages', value: 'messages', 
            items: [
                {label: 'Messages', value: '/messages'},
                {label: 'Toast', value: '/toast'}
            ]
        },
        {
            label: 'Media', value: 'media', 
            items: [
                {label: 'Carousel', value: '/carousel'}
            ]
        },
        {
            label: 'Galleria', value: 'galleria', 
            items: [
                {label: 'Documentation', value: '/galleria'},
                {label: 'Programmatic', value: '/galleria/programmatic'},
                {label: 'Indicator', value: '/galleria/indicator'},
                {label: 'Thumbnail', value: '/galleria/thumbnail'},
                {label: 'Navigator', value: '/galleria/navigator'},
                {label: 'Responsive', value: '/galleria/responsive'},
                {label: 'Fullscreen', value: '/galleria/fullscreen'},
                {label: 'AutoPlay', value: '/galleria/autoplay'},
                {label: 'Caption', value: '/galleria/caption'},
                {label: 'Advanced', value: '/galleria/advanced'}
            ]
        },
        {
            label: 'DragDrop', value: 'dragdrop', 
            items: [
                {label: 'DragDrop', value: '/dragdrop'}
            ]
        },
        {
            label: 'Misc', value: 'misc', 
            items: [
                {label: 'Avatar', value: '/avatar'},
                {label: 'Badge', value: '/badge'},
                {label: 'BlockUI', value: '/blockui'},
                {label: 'Captcha', value: '/captcha'},
                {label: 'Chip', value: '/chip'},
                {label: 'Inplace', value: '/inplace'},
                {label: 'ProgressBar', value: '/progressbar'},
                {label: 'ProgressSpinner', value: '/progressspinner'},
                {label: 'ScrollTop', value: '/scrolltop'},
                {label: 'Skeleton', value: '/skeleton'},
                {label: 'Tag', value: '/tag'},
                {label: 'Terminal', value: '/terminal'}
            ]
        },
        {
            label: 'Directives', value: 'directives', 
            items: [
                {label: 'Defer', value: '/defer'},
                {label: 'FocusTrap', value: '/focustrap'},
                {label: 'Ripple', value: '/ripple'}
            ]
        },
        {
            label: 'Utilities', value: 'utilities', 
            items: [
                {label: 'FilterService', value: '/filterservice'}
            ]
        },
    ];

    scrollable = true;

    config: AppConfig;

    subscription: Subscription;

    constructor(private el: ElementRef,private router: Router, private filterService: FilterService, private configService: AppConfigService) {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
        router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationStart && (routerEvent.navigationTrigger ==="popstate" || this.scrollable)){
                    let routeUrl = routerEvent.url;

                    if (this.isSubmenu(routeUrl) && !this.isSubmenuActive('/'+routeUrl.split('/')[1])){
                        this.submenuRouting = true;
                    }

                    if (routerEvent.navigationTrigger ==="popstate") {
                        this.scrollable = true;
                    }
                }
    
                if (routerEvent instanceof NavigationEnd && !this.submenuRouting && this.scrollable){
                    setTimeout(() => {
                        this.scrollToSelectedRoute();
                    },1);
                }
        });
    }

    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.routes) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['value'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        if (this.router.url !== event.value) {
            this.scrollable = true;
            this.router.navigate([event.value]);
        }

        this.selectedRoute = null;
    }

    onAnimationDone() {
        if (this.submenuRouting) {
            this.scrollToSelectedRoute();
            this.submenuRouting = false;
        }
    }

    scrollToSelectedRoute() {
        let routeEl = DomHandler.findSingle(this.el.nativeElement, '.router-link-exact-active');

        if (routeEl) 
            routeEl.scrollIntoView({inline: 'start'});

        this.scrollable = false;
    }

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenu(route) {
        return route.includes('table') || route.includes('treetable') || route.includes('tree') || route.includes('galleria');
    }

    isSubmenuActive(name: string) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }
}