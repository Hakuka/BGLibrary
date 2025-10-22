Some notes to keep project consistend during developing (will be removed later). 


.form-label {
  font-size: 0.8rem;
  color: var(--primary-color);
  margin-bottom: 0px; /* odstęp od inputa */
  font-weight: 500;
}

.form-control:focus {
  box-shadow: 0 0 0 1px var(--select-color);
}


.btn.btn-primary {
  background-color: var(--primary-color);
  border-color: transparent;
  transition: all 0.2s ease;
}

.btn.btn-secondary {
  background-color: var(--secondary-color);
  border-color: transparent;
  transition: all 0.2s ease;
}

.btn.btn-primary:hover,
.btn.btn-secondary:hover {
  background-color: var(--select-color);
}


- move to global if everywhere the same