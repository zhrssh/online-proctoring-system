import time

class SuspicionTracker:
    def __init__(self, decay_factor=0.9, max_suspicion_level=100):
        # self.triggers = 0
        self.last_trigger_time = None
        self.suspicion_level = 0.0
        self.decay_factor = decay_factor  # Controls how fast the suspicion level decreases over time
        self.max_suspicion_level = max_suspicion_level
        
    def trigger(self):
        current_time = time.time()
        if self.last_trigger_time is not None:
            time_since_last_trigger = current_time - self.last_trigger_time
            self.suspicion_level *= self.decay_factor ** time_since_last_trigger
        
        # self.triggers += 1
        self.last_trigger_time = current_time
        self.suspicion_level += 0.3
        self.suspicion_level = min(self.suspicion_level, self.max_suspicion_level)

    def update(self):
        current_time = time.time()
        if self.last_trigger_time is not None:
            time_since_last_trigger = current_time - self.last_trigger_time
            self.suspicion_level *= self.decay_factor ** time_since_last_trigger
        
    def get_suspicion_level(self):
        return self.suspicion_level

# # Usage
# tracker = SuspicionTracker()

# # Simulate triggers
# tracker.trigger()  # A trigger event occurred
# suspicion_level = tracker.get_suspicion_level()
# print("Suspicion Level:", suspicion_level)
# time.sleep(2)

# tracker.trigger()
# suspicion_level = tracker.get_suspicion_level()
# print("Suspicion Level:", suspicion_level)
# time.sleep(10)

# tracker.trigger()
# suspicion_level = tracker.get_suspicion_level()
# print("Suspicion Level:", suspicion_level)
# time.sleep(2)

# tracker.trigger()  # Another trigger event occurred

# # Get the current suspicion level
# suspicion_level = tracker.get_suspicion_level()
# print("Suspicion Level:", suspicion_level)