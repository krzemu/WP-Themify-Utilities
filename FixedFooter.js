class FixedFooter {
    constructor({ mainFooter, enableMobile = false, mobileBreakpoint = '768' }) {
        this.footerDOM = {
            mainFooter
        }
        this.mobileFooter = {
            enableMobile, mobileBreakpoint
        }
        this.status = {
            footerScrollMax: false,
            footerInView: false,
        }

        this.setUp();
    }

    setUp() {
        const { enableMobile, mobileBreakpoint } = this.mobileFooter;
        if (enableMobile === true || window.innerWidth > mobileBreakpoint) {
            window.addEventListener('load', () => {
                this.setUpFooters();
                this.scrollEvent();
            });
        }
    }

    createBackdropFooter() {
        const { footerDOM } = this;
        footerDOM.backdropFooter = document.createElement('div');
        footerDOM.backdropFooter.style = `width:100%; height:${footerDOM.mainFooter.clientHeight}px;`;
        footerDOM.backdropFooter.id = 'hoelho';
        footerDOM.mainFooter.parentElement.append(footerDOM.backdropFooter);

    }

    setUpFooters() {
        const { mainFooter, backdropFooter } = this.footerDOM;
        this.createBackdropFooter();
        mainFooter.style.position = 'fixed';
        mainFooter.style.bottom = '0';
        mainFooter.style.zIndex = '-10';

        if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - mainFooter.clientHeight) {
            this.maxHeightReachHandler();
        }
        else {
            this.getBackFromView();
        }

    }


    scrollEvent() {
        window.addEventListener('scroll', (e) => this.scrollHander(e));
    }
    scrollHander(event) {
        const { footerDOM, status } = this;
        let h = window.scrollY;

        // Reaching footer area
        if (status.footerInView !== true && h >= document.documentElement.scrollHeight - window.innerHeight - footerDOM.mainFooter.clientHeight) {
            this.reachingFooterHandler();
        }

        // Max document height reach
        if (h >= document.documentElement.scrollHeight - window.innerHeight) {
            this.maxHeightReachHandler();
        }
        // Get back from footer view and reaching max
        if (status.footerScrollMax === true && h < document.documentElement.scrollHeight - window.innerHeight - this.footerDOM.mainFooter.clientHeight) {
            this.getBackFromView();
        }
        // Get back from footer view but not reaching max
        if (status.footerInView === true && h < document.documentElement.scrollHeight - window.innerHeight - this.footerDOM.mainFooter.clientHeight) {
            this.getBackFromView();
        }

    }

    // utilities
    reachingFooterHandler() {
        const { status, footerDOM } = this;
        status.footerInView = true;
        footerDOM.mainFooter.style.visibility = 'visible';
    }

    maxHeightReachHandler() {
        const { status, footerDOM } = this;
        footerDOM.mainFooter.style.position = 'absolute';
        footerDOM.mainFooter.style.zIndex = '1';
        status.footerScrollMax = true;
    }

    getBackFromView() {
        const { status, footerDOM } = this;
        footerDOM.mainFooter.style.position = 'fixed';
        footerDOM.mainFooter.style.zIndex = '-100';
        status.footerScrollMax = false;
        status.footerInView = false;
        footerDOM.mainFooter.style.visibility = 'hidden';
    }

}

const fixedFooter = new FixedFooter({
    mainFooter: document.querySelector('.footer-lt__main'),
})