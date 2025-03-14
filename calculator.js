
document.addEventListener('DOMContentLoaded', function() {
    // Service prices and details
    const services = {
      'marble-polish': { name: 'Marble Polish', price: 40, unit: 'per sq.ft' },
      'granite-polish': { name: 'Granite Polish', price: 35, unit: 'per sq.ft' },
      'terrazzo-polish': { name: 'Terrazzo Polish', price: 30, unit: 'per sq.ft' },
      'crystallization': { name: 'Crystallization', price: 50, unit: 'per sq.ft' },
      'home-cleaning': { name: 'Home Cleaning', price: 10, unit: 'per sq.ft' }
    };
    
    // Location fees
    const locationFees = {
      'urban': { name: 'Urban', fee: 0 },
      'suburban': { name: 'Suburban', fee: 500 },
      'rural': { name: 'Rural', fee: 1000 }
    };
    
    // Additional services
    const additionalServices = {
      'sealing': { name: 'Sealing Treatment', price: 10 },
      'repair': { name: 'Crack Repair', price: 15 },
      'stain': { name: 'Stain Removal', price: 8 }
    };
    
    // Get elements
    const serviceSelect = document.getElementById('service');
    const areaInput = document.getElementById('area');
    const locationSelect = document.getElementById('location');
    const sealingCheckbox = document.getElementById('sealing');
    const repairCheckbox = document.getElementById('repair');
    const stainCheckbox = document.getElementById('stain');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result');
    const priceBreakdown = document.getElementById('price-breakdown');
    const totalPrice = document.getElementById('total-price');
    
    // Calculate price on button click
    calculateBtn.addEventListener('click', function() {
      // Validate inputs
      const serviceId = serviceSelect.value;
      const area = parseFloat(areaInput.value);
      const locationId = locationSelect.value;
      
      if (!serviceId || isNaN(area) || area <= 0) {
        alert('Please select a service and enter a valid area.');
        return;
      }
      
      // Get selected service and location
      const service = services[serviceId];
      const location = locationFees[locationId];
      
      if (!service || !location) {
        alert('Please select valid options.');
        return;
      }
      
      // Calculate base price (service price * area)
      const basePrice = service.price * area;
      
      // Calculate additional services costs
      let additionalCosts = 0;
      let additionalDetails = [];
      
      if (sealingCheckbox.checked) {
        const sealingCost = additionalServices.sealing.price * area;
        additionalCosts += sealingCost;
        additionalDetails.push({
          name: additionalServices.sealing.name,
          cost: sealingCost
        });
      }
      
      if (repairCheckbox.checked) {
        const repairCost = additionalServices.repair.price * area;
        additionalCosts += repairCost;
        additionalDetails.push({
          name: additionalServices.repair.name,
          cost: repairCost
        });
      }
      
      if (stainCheckbox.checked) {
        const stainCost = additionalServices.stain.price * area;
        additionalCosts += stainCost;
        additionalDetails.push({
          name: additionalServices.stain.name,
          cost: stainCost
        });
      }
      
      // Add location fee
      const locationCost = location.fee;
      
      // Calculate total
      const totalCost = basePrice + additionalCosts + locationCost;
      
      // Display result
      displayResult(service, area, basePrice, location, locationCost, additionalDetails, totalCost);
    });
    
    // Display the calculation result
    function displayResult(service, area, basePrice, location, locationCost, additionalDetails, totalCost) {
      // Clear previous breakdown
      priceBreakdown.innerHTML = '';
      
      // Create breakdown list
      const list = document.createElement('ul');
      list.className = 'price-list';
      
      // Add base service
      const baseItem = document.createElement('li');
      baseItem.textContent = `${service.name} (${area} sq.ft × ₹${service.price}): ₹${basePrice.toLocaleString()}`;
      list.appendChild(baseItem);
      
      // Add location fee
      if (locationCost > 0) {
        const locationItem = document.createElement('li');
        locationItem.textContent = `${location.name} location fee: ₹${locationCost.toLocaleString()}`;
        list.appendChild(locationItem);
      }
      
      // Add additional services
      additionalDetails.forEach(item => {
        const additionalItem = document.createElement('li');
        additionalItem.textContent = `${item.name}: ₹${item.cost.toLocaleString()}`;
        list.appendChild(additionalItem);
      });
      
      // Add list to breakdown
      priceBreakdown.appendChild(list);
      
      // Show total
      totalPrice.textContent = `Total: ₹${totalCost.toLocaleString()}`;
      
      // Show result section
      resultSection.style.display = 'block';
      
      // Scroll to result
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  