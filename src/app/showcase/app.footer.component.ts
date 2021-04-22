import {Component} from '@angular/core';

@Component({
    selector: "app-footer",
    template: `
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <ul class="footer_box">
                            <h4>Products</h4>
                            <li><a href="#">Mens</a></li>
                            <li><a href="#">Womens</a></li>
                            <li><a href="#">Youth</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <ul class="footer_box">
                            <h4>About</h4>
                            <li><a href="#">Careers and internships</a></li>
                            <li><a href="#">Sponserships</a></li>
                            <li><a href="#">team</a></li>
                            <li><a href="#">Catalog Request/Download</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <ul class="footer_box">
                            <h4>Customer Support</h4>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Shipping and Order Tracking</a></li>
                            <li><a href="#">Easy Returns</a></li>
                            <li><a href="#">Warranty</a></li>
                            <li><a href="#">Replacement Binding Parts</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <ul class="footer_box">
                            <h4>Newsletter</h4>
                            <div class="footer_search">
                                <form>
                                    <input
                                        type="text"
                                        value="Enter your email"
                                        onfocus="this.value = '';"
                                        onblur="if (this.value == '') {this.value = 'Enter your email';}"
                                    />
                                    <input type="submit" value="Go" />
                                </form>
                            </div>
                            <ul class="social">
                                <li class="facebook">
                                    <a href="#"><span> </span></a>
                                </li>
                                <li class="twitter">
                                    <a href="#"><span> </span></a>
                                </li>
                                <li class="instagram">
                                    <a href="#"><span> </span></a>
                                </li>
                                <li class="pinterest">
                                    <a href="#"><span> </span></a>
                                </li>
                                <li class="youtube">
                                    <a href="#"><span> </span></a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div class="row footer_bottom">
                    <div class="copy">
                        <p>
                            &copy; {{currentYear}}
                            <a href="http://facebook.com/nemmta" target="_blank"
                                >Nemran., JSC</a
                            >
                        </p>
                    </div>
                    <dl id="sample" class="dropdown">
                        <dt>
                            <a href="javascript:;"><span>Change Region</span></a>
                        </dt>
                        <dd>
                            <ul>
                                <li>
                                    <a href="#"
                                        >Australia<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/as.png"
                                            alt=""
                                        /><span class="value">AS</span></a
                                    >
                                </li>
                                <li>
                                    <a href="#"
                                        >Sri Lanka<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/srl.png"
                                            alt=""
                                        /><span class="value">SL</span></a
                                    >
                                </li>
                                <li>
                                    <a href="#"
                                        >Newziland<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/nz.png"
                                            alt=""
                                        /><span class="value">NZ</span></a
                                    >
                                </li>
                                <li>
                                    <a href="#"
                                        >Pakistan<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/pk.png"
                                            alt=""
                                        /><span class="value">Pk</span></a
                                    >
                                </li>
                                <li>
                                    <a href="#"
                                        >United Kingdom<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/uk.png"
                                            alt=""
                                        /><span class="value">UK</span></a
                                    >
                                </li>
                                <li>
                                    <a href="#"
                                        >United States<img
                                            class="flag"
                                            src="../../../../assets/kassets/images/us.png"
                                            alt=""
                                        /><span class="value">US</span></a
                                    >
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    `,
  styleUrls: [
    '../../assets/kassets/css/googleapis.css',
    '../../assets/kassets/css/bootstrap.css',
    '../../assets/kassets/css/style.css',
    '../../assets/kassets/css/fwslider.css']
})
export class AppFooterComponent {
    currentYear: number = new Date().getFullYear();
}