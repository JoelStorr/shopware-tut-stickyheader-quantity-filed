import QuantityField from './script/quantity-field.plugin';
import Stickyheader from './script/sticky-header.plugin';


const PluginManager = window.PluginManager;

PluginManager.register('QuantityField', QuantityField, '[data-quantity-field]');
PluginManager.register("StickyHeader", Stickyheader, "[data-sticky-header]", {
  showOnScrollPosition: 100,
});

PluginManager.initializePlugins();