let React = require("react");
let ReactDOM = require("react-dom");
let FluxMixin = require("fluxxor/lib/flux_mixin")(React);
let StoreWatchMixin = require("fluxxor/lib/store_watch_mixin");
let _ = require("lodash");
let moment = require("moment");
let Shepherd = require("tether-shepherd");
let Link = require("react-router/lib/components/Link");
let OutcomeRow = require("./OutcomeRow");
let utils = require("../../libs/utilities");

let MarketRow = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("market")],

    getInitialState() {
        return {};
    },

    getStateFromFlux() {
        return {};
    },

    render() {
        let market = this.props.market;
        let tourClass = (this.props.tour) ? " tour" : "";
        let endDateLabel = (market.endDate != null && market.matured) ? "Matured" : "End Date";
        let endDateFormatted = market.endDate != null ? moment(market.endDate).format("MMM Do, YYYY") : "-";

        var tags = [];
        if (market.metadata && market.metadata.tags && market.metadata.tags.length) {
            console.log("tags:", market.metadata.tags);
            for (var i = 0, n = market.metadata.tags.length; i < n; ++i) {
                tags.push(<span className="tag">{market.metadata.tags[i]}</span>);
            }
        }

        return (
            <div className="market-row">
                <div className="info">
                    <h4 className={"description" + tourClass}>{market.description}</h4>
                    <div className="subtitle">
                        <span className="subtitle-label trading-fee-label">Trading Fee:</span>
                        <span className="subtitle-value trading-fee">{market.tradingFee ? +market.tradingFee.times(100).toFixed(2) + '%' : '-'}</span>
                        <span className="subtitle-label end-date-label">{endDateLabel}:</span>
                        <span className="subtitle-value end-date">{endDateFormatted}</span>
                    </div>
                    <div className="tags">
                        {tags}
                    </div>
                    <div className="details">
                        <div className="table-container outcomes">
                            <table className="tabular tabular-condensed">
                                <thead>
                                    <tr>
                                        <th colSpan="3">Market Leaders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {market.outcomes.map((outcome) => {
                                        return (
                                            <OutcomeRow
                                                key={`${market._id}-${outcome.id}`}
                                                outcome={outcome}
                                                market={market}
                                                contentType={this.props.contentType} />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="table-container holdings">
                            <table className="tabular tabular-condensed">
                                <thead>
                                    <tr>
                                        <th colSpan="4">Your Trading [DUMMY]</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="title">Positions</td><td className="value">2</td>
                                        <td className="title">Trades</td><td className="value">8</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Open Orders</td>
                                        <td className="value">{this.props.numOpenOrders}</td>
                                        <td className="title">Profit / Loss</td>
                                        <td className="value">
                                            <span className={Math.random() > 0.5 ? 'green' : 'red'}>+5.06%</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <Link ref="tradeButton"
                        className="btn btn-primary trade-button"
                        to="market"
                        params={{marketId: market.id.toString(16)}} >
                        Trade
                    </Link>
                </div>
            </div>
        );
    },

    componentDidMount() {
        var self = this;

        if (!this.props.tour || localStorage.getItem("tour")) {
            return;
        }

        localStorage.setItem("tour", true);

        let outcomes = this.props.market.outcomes;
        let numOutcomes = parseInt(this.props.market.numOutcomes);
        let outcomeNames = new Array(numOutcomes);
        let outcomeName;
        for (var i = 0; i < numOutcomes; ++i) {
            outcomeName = utils.getOutcomeName(outcomes[i].id, this.props.market);
            outcomeNames[i] = outcomeName.outcome;
        }
        outcomes.reverse();
        outcomeNames.reverse();

        let tour = new Shepherd.Tour({
            defaults: {
                classes: "shepherd-element shepherd-open shepherd-theme-arrows",
                showCancelLink: true
            }
        });

        // TODO add glowing border to current top market
        tour.addStep("markets-list", {
            title: "Welcome to Augur!",
            text: "<p>On Augur, you can trade the probability of any real-world event happening.</p>"+
                "<p>In this market, you are considering:<br /><br /><i>" + this.props.market.description + "</i></p>",
            attachTo: ".market-row .info .tour top",
            buttons: [{
                text: "Exit Tour",
                classes: "shepherd-button-secondary",
                action: tour.back
            }, {
                text: "Next",
                action: tour.next
            }]
        });

        // TODO highlight outcome labels
        let outcomeList = "";
        for (i = 0; i < numOutcomes; ++i) {
            outcomeList += "<li>" + outcomeNames[i] + " has a probability of " + (parseFloat(outcomes[i].price) * 100).toFixed(2) + "%</li>";
        }
        tour.addStep("outcomes", {
            text: "<p>This event has " + numOutcomes + " possible outcomes: " + outcomeNames.join(" or ") + "</p>" +
                "<p>According to the market:</p>"+
                "<ul class='tour-outcome-list'>" + outcomeList + "</ul>",
            attachTo: ".outcomes right",
            buttons: [{
                text: "Back",
                classes: "shepherd-button-secondary",
                action: tour.back
            }, {
                text: "Next",
                action: tour.next
            }]
        });

        // TODO highlight trade button
        tour.addStep("trade-button", {
            title: "What do you think?",
            text: "<p>" + this.props.market.description + " " + outcomeNames.join(" or ") + "?</p>"+
                "<p>If you feel strongly enough, put your money where your mouth is and click the Trade button!</p>",
            attachTo: ".buttons a left",
            buttons: [{
                text: "Exit Tour",
                classes: "shepherd-button-secondary",
                action: tour.complete
            }, {
                text: "Back",
                classes: "shepherd-button-secondary",
                action: tour.back
            }],
            when: {
                show: function() {
                    let el = ReactDOM.findDOMNode(self.refs.tradeButton);
                    el.className += ' btn-highlighted super-highlight';
                },

                hide: function() {
                    let el = ReactDOM.findDOMNode(self.refs.tradeButton);
                    el.className = el.className.replace(' btn-highlighted super-highlight', '');
                }
            },
            advanceOn: '.trade-button click'
        });

        // highlight Yes price
        let price = parseFloat(outcomes[0].price);
        tour.addStep("outcome-price", {
            title: "Market price",
            text: "<p>The current price of " + outcomeNames[0] + " is " + price.toFixed(4) + ".</p>"+
                "<p>People are betting that there is a " + (price * 100).toFixed(2) + "% chance that the answer to</p>"+
                "<p><i>" + this.props.market.description + "</i></p>"+
                "<p>will be " + outcomeNames[0] + ".</p>"+
                "<p>If you think they're wrong, then place a bet!</p>"+
                "<p>If you're right, you'll make money, and this market's odds will be more accurate, too.</p>",
            buttons: [{
                text: "Next",
                action: tour.next
            }]
        });

        tour.addStep("buy-shares", {
            title: "Do you agree with these probabilities?",
            text: "<p>Do you think the chances of " + outcomeNames[0] + " are <i>higher</i> than " + (price * 100).toFixed(2) + "%?</p>"+
                "<ul class='tour-outcome-list'><li>If so, <b>Buy</b> the " + outcomeNames[0] + " to trade on the " + outcomeNames[0] + " outcome.</li></ul>"+
                "<p>Do you think the chances of " + outcomeNames[1] + " are <i>higher</i> than " + (price * 100).toFixed(2) + "%?</p>"+
                "<ul class='tour-outcome-list'><li>If so, <b>Buy</b> the " + outcomeNames[1] + " to trade on the " + outcomeNames[1] + " outcome.</li></ul>"+
                "<p>(You will need to sign in or run a local Ethereum node to place a bet!)</p>",
            buttons: [{
                text: "Back",
                classes: "shepherd-button-secondary",
                action: tour.back
            }, {
                text: "Done",
                action: tour.next
            }]
        });

        setTimeout(() => tour.start(), 3000);
    }

});

module.exports = MarketRow;
